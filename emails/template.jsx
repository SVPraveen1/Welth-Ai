import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {  if (type === "monthly-report") {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <Preview>Your Monthly Financial Report for {data?.month}</Preview>
        <Body style={{
          backgroundColor: "#f8fafc",
          fontFamily: "'Inter', sans-serif",
          margin: 0,
          padding: 0,
        }}>
          <Container style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "40px 30px",
            maxWidth: "600px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}>
            {/* Header with Logo */}
            <Section style={{ textAlign: "center", marginBottom: "32px" }}>
              <Heading as="h1" style={{
                color: "#0f172a",
                fontSize: "28px",
                fontWeight: "700",
                margin: 0,
                padding: "0 0 8px 0",
              }}>
                Monthly Financial Report
              </Heading>
              <Text style={{
                color: "#64748b",
                fontSize: "16px",
                margin: 0,
                padding: 0,
              }}>
                {data?.month || "Monthly"} Summary
              </Text>
            </Section>
            
            {/* Greeting */}
            <Section style={{ marginBottom: "32px" }}>
              <Text style={{
                color: "#334155",
                fontSize: "16px",
                lineHeight: "1.5",
                margin: 0,
              }}>
                Hello {userName},
              </Text>
              <Text style={{
                color: "#334155",
                fontSize: "16px",
                lineHeight: "1.5",
                marginTop: "16px",
              }}>
                Here's your financial summary for {data?.month || "this month"}:
              </Text>
            </Section>
            
            {/* Main Stats Cards */}
            <Section style={{
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              {/* Income */}
              <div style={{
                backgroundColor: "#f0fdf4",
                padding: "24px",
                borderRadius: "8px",
                borderLeft: "4px solid #22c55e",
              }}>
                <Text style={{
                  color: "#166534",
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}>
                  Total Income
                </Text>
                <Text style={{
                  color: "#15803d",
                  fontSize: "28px",
                  fontWeight: "700",
                  margin: 0,
                }}>
                  ${data?.stats?.totalIncome?.toLocaleString() || "0"}
                </Text>
              </div>
              
              {/* Expenses */}
              <div style={{
                backgroundColor: "#fef2f2",
                padding: "24px",
                borderRadius: "8px",
                borderLeft: "4px solid #ef4444",
              }}>
                <Text style={{
                  color: "#991b1b",
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}>
                  Total Expenses
                </Text>
                <Text style={{
                  color: "#dc2626",
                  fontSize: "28px",
                  fontWeight: "700",
                  margin: 0,
                }}>
                  ${data?.stats?.totalExpenses?.toLocaleString() || "0"}
                </Text>
              </div>
              
              {/* Net */}
              <div style={{
                backgroundColor: "#f0f9ff",
                padding: "24px",
                borderRadius: "8px",
                borderLeft: "4px solid #0ea5e9",
              }}>
                <Text style={{
                  color: "#0c4a6e",
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}>
                  Net Income
                </Text>
                <Text style={{
                  color: "#0369a1",
                  fontSize: "28px",
                  fontWeight: "700",
                  margin: 0,
                }}>
                  ${(data?.stats?.totalIncome - data?.stats?.totalExpenses)?.toLocaleString() || "0"}
                </Text>
              </div>
            </Section>
            
            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={{
                marginBottom: "32px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                padding: "24px",
              }}>
                <Heading style={{
                  color: "#0f172a",
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 16px 0",
                }}>
                  Expenses by Category
                </Heading>
                
                {Object.entries(data?.stats.byCategory).map(([category, amount], index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}>
                    <Text style={{
                      color: "#334155",
                      fontSize: "15px",
                      margin: 0,
                      textTransform: "capitalize",
                    }}>
                      {category}
                    </Text>
                    <Text style={{
                      color: "#0f172a",
                      fontSize: "15px",
                      fontWeight: "600",
                      margin: 0,
                    }}>
                      ${amount.toLocaleString()}
                    </Text>
                  </div>
                ))}
              </Section>
            )}
            
            {/* AI Insights */}
            {data?.insights && (
              <Section style={{
                marginBottom: "32px",
                backgroundColor: "#eff6ff",
                borderRadius: "8px",
                padding: "24px",
                borderLeft: "4px solid #3b82f6",
              }}>
                <Heading style={{
                  color: "#1e40af",
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 16px 0",
                }}>
                  Welth Insights
                </Heading>
                
                {data.insights.map((insight, index) => (
                  <Text key={index} style={{
                    color: "#334155",
                    fontSize: "15px",
                    lineHeight: "1.5",
                    margin: "0 0 12px 0",
                    paddingLeft: "16px",
                    borderLeft: "2px solid #93c5fd",
                  }}>
                    {insight}
                  </Text>
                ))}
              </Section>
            )}
            
            {/* Footer */}
            <Section style={{
              textAlign: "center",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "24px",
            }}>
              <Text style={{
                color: "#64748b",
                fontSize: "14px",
                margin: 0,
              }}>
                Thank you for using Welth. We're here to help you achieve your financial goals.
              </Text>
              <Text style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginTop: "12px",
              }}>
                © {new Date().getFullYear()} Welth Finance. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  // if (type === "budget-alert") {
  //   return (
  //     <Html>
  //       <Head />
  //       <Preview>Budget Alert</Preview>
  //       <Body style={styles.body}>
  //         <Container style={styles.container}>
  //           <Heading style={styles.title}>Budget Alert</Heading>
  //           <Text style={styles.text}>Hello {userName},</Text>
  //           <Text style={styles.text}>
  //             You&rsquo;ve used {data?.percentageUsed.toFixed(1)}% of your
  //             monthly budget.
  //           </Text>
  //           <Section style={styles.statsContainer}>
  //             <div style={styles.stat}>
  //               <Text style={styles.text}>Budget Amount</Text>
  //               <Text style={styles.heading}>${data?.budgetAmount}</Text>
  //             </div>
  //             <div style={styles.stat}>
  //               <Text style={styles.text}>Spent So Far</Text>
  //               <Text style={styles.heading}>${data?.totalExpenses}</Text>
  //             </div>
  //             <div style={styles.stat}>
  //               <Text style={styles.text}>Remaining</Text>
  //               <Text style={styles.heading}>
  //                 ${data?.budgetAmount - data?.totalExpenses}
  //               </Text>
  //             </div>
  //           </Section>
  //         </Container>
  //       </Body>
  //     </Html>
  //   );
  // }
  // In emails/template.jsx
  // Update the budget-alert section of the EmailTemplate component:
  if (type === "budget-alert") {
    // Calculate percentage for visual indicator
    const percentage = data?.percentageUsed || 0;
    const colorClass = percentage >= 90 ? "#ef4444" : percentage >= 75 ? "#f59e0b" : "#22c55e";
    
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <Preview>Budget Alert: {percentage}% of your monthly budget has been used</Preview>
        
        <Body style={{
          backgroundColor: "#f8fafc",
          fontFamily: "'Inter', sans-serif",
          margin: 0,
          padding: 0,
        }}>
          <Container style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "40px 30px",
            maxWidth: "600px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}>
            {/* Header with Logo */}
            <Section style={{ textAlign: "center", marginBottom: "32px" }}>
              <Heading as="h1" style={{
                color: "#0f172a",
                fontSize: "28px",
                fontWeight: "700",
                margin: 0,
                padding: "0 0 8px 0",
              }}>
                Budget Alert
              </Heading>
              <Text style={{
                color: "#64748b",
                fontSize: "16px",
                margin: 0,
                padding: 0,
              }}>
                Your monthly spending update
              </Text>
            </Section>
            
            {/* Greeting */}
            <Section style={{ marginBottom: "32px" }}>
              <Text style={{
                color: "#334155",
                fontSize: "16px",
                lineHeight: "1.5",
                margin: 0,
              }}>
                Hello {userName},
              </Text>
              <Text style={{
                color: "#334155",
                fontSize: "16px",
                lineHeight: "1.5",
                marginTop: "16px",
              }}>
                This is a friendly reminder that you've used <span style={{ fontWeight: "600", color: colorClass }}>{percentage.toFixed(1)}%</span> of your monthly budget.
              </Text>
            </Section>
            
            {/* Progress Bar */}
            <Section style={{ marginBottom: "32px" }}>
              <div style={{ 
                width: "100%", 
                height: "24px", 
                backgroundColor: "#e2e8f0",
                borderRadius: "12px",
                overflow: "hidden"
              }}>
                <div style={{ 
                  width: `${Math.min(percentage, 100)}%`, 
                  height: "100%", 
                  backgroundColor: colorClass,
                  borderRadius: "12px",
                  transition: "width 0.5s ease-in-out"
                }} />
              </div>
              <Text style={{
                color: "#64748b",
                fontSize: "14px",
                textAlign: "right",
                marginTop: "8px",
              }}>
                {percentage.toFixed(1)}% used
              </Text>
            </Section>
            
            {/* Stats */}
            <Section style={{
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "32px",
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}>
                {/* Budget Amount */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  borderLeft: "4px solid #3b82f6",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}>
                  <Text style={{
                    color: "#334155",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: 0,
                  }}>
                    Budget Amount
                  </Text>
                  <Text style={{
                    color: "#0f172a",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: 0,
                  }}>
                    ${data?.budgetAmount ? data.budgetAmount.toFixed(2) : "0.00"}
                  </Text>
                </div>
                
                {/* Spent So Far */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  borderLeft: "4px solid #ef4444",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}>
                  <Text style={{
                    color: "#334155",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: 0,
                  }}>
                    Spent So Far
                  </Text>
                  <Text style={{
                    color: "#0f172a",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: 0,
                  }}>
                    ${data?.totalExpenses ? data.totalExpenses.toFixed(2) : "0.00"}
                  </Text>
                </div>
                
                {/* Remaining */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  borderLeft: "4px solid #22c55e",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}>
                  <Text style={{
                    color: "#334155",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: 0,
                  }}>
                    Remaining
                  </Text>
                  <Text style={{
                    color: "#0f172a",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: 0,
                  }}>
                    ${data?.budgetAmount && data?.totalExpenses
                      ? (data.budgetAmount - data.totalExpenses).toFixed(2)
                      : "0.00"}
                  </Text>
                </div>
              </div>
            </Section>
            
            {/* Tips Section */}
            <Section style={{
              backgroundColor: "#eff6ff",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "32px",
              borderLeft: "4px solid #3b82f6",
            }}>
              <Text style={{
                color: "#1e40af",
                fontSize: "16px",
                fontWeight: "600",
                marginTop: 0,
                marginBottom: "12px",
              }}>
                Tips to Stay on Track
              </Text>
              <Text style={{
                color: "#334155",
                fontSize: "15px",
                lineHeight: "1.5",
                margin: "0 0 8px 0",
              }}>
                • Review your recent expenses to identify any unnecessary spending
              </Text>
              <Text style={{
                color: "#334155",
                fontSize: "15px",
                lineHeight: "1.5",
                margin: "0 0 8px 0",
              }}>
                • Consider prioritizing essential expenses for the rest of the month
              </Text>
              <Text style={{
                color: "#334155",
                fontSize: "15px",
                lineHeight: "1.5",
                margin: 0,
              }}>
                • Set up category-specific budgets to better track your spending
              </Text>
            </Section>
            
            {/* Footer */}
            <Section style={{
              textAlign: "center",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "24px",
            }}>
              <Text style={{
                color: "#64748b",
                fontSize: "14px",
                margin: 0,
              }}>
                Thank you for using Welth. We're here to help you achieve your financial goals.
              </Text>
              <Text style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginTop: "12px",
              }}>
                © {new Date().getFullYear()} Welth Finance. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
