"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializeAmount = (obj) => ({
  ...obj,
  amount: obj.amount.toNumber(),
});

// Helper function to check if date is in a new month compared to last alert
function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}

// Create Transaction
export async function createTransaction(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    // Calculate new balance
    const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
    const newBalance = account.balance.toNumber() + balanceChange;

    // Create transaction and update account balance
    const transaction = await db.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          ...data,
          userId: user.id,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });

      return newTransaction;
    });

    // Only check budget for expense transactions
    if (data.type === "EXPENSE") {
      try {
        // Get user's budget
        const budget = await db.budget.findFirst({
          where: { userId: user.id },
          include: { user: true }
        });

        if (budget) {
          // Calculate current month's expenses
          const startDate = new Date();
          startDate.setDate(1); // Start of current month
          
          const expenses = await db.transaction.aggregate({
            where: {
              userId: user.id,
              type: "EXPENSE",
              date: {
                gte: startDate,
              },
            },
            _sum: { amount: true },
          });
          
          const totalExpenses = expenses._sum.amount ? Number(expenses._sum.amount) : 0;
          const budgetAmount = Number(budget.amount || 0);
            if (budgetAmount > 0) {
            const percentageUsed = (totalExpenses / budgetAmount) * 100;
            
            // Define alert thresholds
            const thresholds = [75, 85, 95, 100];
            const lastAlertPercentage = budget.lastAlertPercentage ? Number(budget.lastAlertPercentage) : 0;
            
            // Find the highest threshold that has been crossed
            let currentThreshold = null;
            for (const threshold of thresholds) {
              if (percentageUsed >= threshold) {
                currentThreshold = threshold;
              }
            }
            
            // Send alert if:
            // 1. We've crossed a new threshold that's higher than the last alert percentage
            // 2. It's a new month (reset alerts)
            // 3. No alert has been sent yet and we're above 75%
            const isNewMonth = !budget.lastAlertSent || 
                              (new Date(budget.lastAlertSent).getMonth() !== new Date().getMonth() ||
                               new Date(budget.lastAlertSent).getFullYear() !== new Date().getFullYear());
            
            const shouldSendAlert = currentThreshold && (
              currentThreshold > lastAlertPercentage || 
              isNewMonth ||
              !budget.lastAlertSent
            );
            
            if (shouldSendAlert) {
              console.log(`Budget alert: ${percentageUsed.toFixed(1)}% used by user ${user.id}, threshold: ${currentThreshold}%`);
              
              // Send email alert
              const emailResult = await sendEmail({
                to: user.email,
                subject: `Budget Alert: ${percentageUsed.toFixed(1)}% used`,
                react: EmailTemplate({
                  userName: user.name || "User",
                  type: "budget-alert",
                  data: {
                    percentageUsed,
                    budgetAmount,
                    totalExpenses
                  }
                })
              });
              
              if (emailResult.success) {
                // Update last alert sent timestamp and percentage
                await db.budget.update({
                  where: { id: budget.id },
                  data: { 
                    lastAlertSent: new Date(),
                    lastAlertPercentage: currentThreshold
                  }
                });
                console.log(`Budget alert email sent to ${user.email} for ${currentThreshold}% threshold`);
              }
            }
          }
        }
      } catch (budgetError) {
        // Log but don't fail the transaction creation if budget check fails
        console.error("Error checking budget after transaction creation:", budgetError);
      }
    }

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTransaction(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const transaction = await db.transaction.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!transaction) throw new Error("Transaction not found");

  return serializeAmount(transaction);
}

export async function updateTransaction(id, data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get original transaction to calculate balance change
    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      },
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    // Calculate balance changes
    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -originalTransaction.amount.toNumber()
        : originalTransaction.amount.toNumber();

    const newBalanceChange =
      data.type === "EXPENSE" ? -data.amount : data.amount;

    const netBalanceChange = newBalanceChange - oldBalanceChange;

    // Update transaction and account balance in a transaction
    const transaction = await db.$transaction(async (tx) => {
      const updated = await tx.transaction.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          ...data,
          nextRecurringDate:
            data.isRecurring && data.recurringInterval
              ? calculateNextRecurringDate(data.date, data.recurringInterval)
              : null,
        },
      });

      // Update account balance
      await tx.account.update({
        where: { id: data.accountId },
        data: {
          balance: {
            increment: netBalanceChange,
          },
        },
      });

      return updated;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get User Transactions
export async function getUserTransactions(query = {}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        ...query,
      },
      include: {
        account: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return { success: true, data: transactions };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Scan Receipt
export async function scanReceipt(file) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    // Convert ArrayBuffer to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )
      
      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If its not a recipt, return an empty object
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const data = JSON.parse(cleanedText);
      return {
        amount: parseFloat(data.amount),
        date: new Date(data.date),
        description: data.description,
        category: data.category,
        merchantName: data.merchantName,
      };
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    console.error("Error scanning receipt:", error);
    throw new Error("Failed to scan receipt");
  }
}

// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}
