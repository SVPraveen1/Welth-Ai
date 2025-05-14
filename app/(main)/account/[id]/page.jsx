import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

// Configure segment behavior
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate static params if needed
export async function generateStaticParams() {
  return [];
}

/**
 * @param {Object} props
 * @param {Object} props.params
 * @param {string} props.params.id
 */
export default async function AccountPage({ params }) {
  // Await params before using its properties
  const resolvedParams = await Promise.resolve(params);
  
  // Validate and handle the id parameter
  const id = Array.isArray(resolvedParams?.id) ? resolvedParams.id[0] : resolvedParams?.id;
  
  if (!id) {
    notFound();
  }

  try {
    const accountData = await getAccountWithTransactions(id);

    if (!accountData) {
      notFound();
    }

    const { transactions, ...account } = accountData;

    return (
      <div className="space-y-8 px-5">
        <div className="flex gap-4 items-end justify-between">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
              {account.name}
            </h1>
            <p className="text-muted-foreground">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
              Account
            </p>
          </div>

          <div className="text-right pb-2">
            <div className="text-xl sm:text-2xl font-bold">
              ${parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <AccountChart transactions={transactions} />
        </Suspense>

        {/* Transactions Table */}
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading account:', error);
    notFound();
  }
}