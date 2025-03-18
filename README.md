
  

# 🚀 Welth AI Finance

  

>  **An intelligent finance management platform** that helps users track transactions, create budgets, and visualize financial data effectively.

> Automates monthly reports, budget alerts, and handles recurring transactions with background cron jobs.

  

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue?style=flat&logo=vercel)](https://welth-ai-finance.vercel.app)

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org)

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org)

[![Prisma](https://img.shields.io/badge/Prisma-5.x-blue)](https://www.prisma.io)

[![Inngest](https://img.shields.io/badge/Inngest-Cron%20Jobs-orange)](https://www.inngest.com)

[![Arcjet](https://img.shields.io/badge/Arcjet-Bot%20Protection-green)](https://arcjet.com)

  

---

  

## 📑 **Table of Contents**

- [🌟 Overview](#-overview)

- [🚀 Features](#-features)

- [🛠️ Tech Stack](#-tech-stack)

- [📂 Directory Structure](#-directory-structure)

- [⚙️ Installation](#-installation)

- [🚀 Running the Project](#-running-the-project)

- [🔧 Server Actions & Background Jobs](#️-server-actions--background-jobs)

- [🔧 Environment Variables](#-environment-variables)

- [🔐 Authentication](#-authentication)

- [💡 Contributing](#-contributing)

- [📄 License](#-license)

  

---

  

## 🌟 **Overview**

  

**Welth AI Finance** is a modern personal finance management platform designed to simplify financial tracking and automate repetitive tasks. The platform offers:

-  **Real-time financial insights** with charts and reports.

-  **Automated monthly reports** sent via email.

-  **Budget alerts** triggered when expenses exceed 80% of the monthly budget.

-  **Recurring transactions** (e.g., salary crediting or subscriptions) automatically added after the next recurring date.

-  **Receipt and bill scanning** to add transactions.

-  **Background cron jobs** powered by **Inngest** for seamless automation.

-  **Bot protection and rate limiting** using **Arcjet**.

  

---

  

## 🚀 **Features**

✅ **Authentication & Authorization:** Secure login/signup system using Next.js Auth.

✅ **Dashboard:** Real-time financial data visualization, including transaction summaries, budget progress, and spending insights.

✅ **Accounts & Transactions:**

- CRUD operations for accounts and transactions through **server actions**.

- Support for recurring transactions (e.g., salary, subscriptions).

✅ **Budget Management:**

- Create and track monthly budgets.

- Trigger alerts when expenses exceed **80%** of the monthly budget.

✅ **Email Integration:**

- Send monthly financial reports to users via **Resend**.

✅ **Receipt Scanner:**

- Add transactions by scanning receipts and bills using OCR.

✅ **Background Cron Jobs:**

- Automate monthly reports, budget alerts, and recurring transactions with **Inngest**.

✅ **Bot Protection & Rate Limiting:**

- Secure APIs with **Arcjet** to prevent spam and abusive requests.

  

---

  

## 🛠️ **Tech Stack**

  

### **Frontend**
  
   - 🛠️ **Next.js**  – SSR and routing
   -   💻   **React**  – Component-based UI
   
   - 🎨 **Tailwind CSS** – Styling framework
   
   - ⚡ **Shadcn/ui** – UI components
   
   - 📊 **Recharts** – Data visualization

  

### **Backend**

- 🌐 **Node.js** – JavaScript runtime

- 🚀 **Express.js** – Backend server

- 🔥 **Prisma ORM** – Database management

- 💾 **PostgreSQL** – Database

- ✉️ **Inngest** – Background cron jobs

- 🔒 **Arcjet** – Bot protection and rate limiting

- 📧 **Resend** – Email service

- 📨 **React Email** – Email templates

  

---

  

## 📂 **Directory Structure**

  

```

welth-ai-finance/

├── actions/ # Server actions: account, budget, transaction handling

├── app/ # Next.js app router with pages and layout

│ ├── (auth)/ # Authentication pages

│ ├── (main)/ # Main dashboard and account management

│ ├── api/ # API routes (Inngest and seed)

│ ├── lib/ # Prisma schema and utilities

├── components/ # UI Components

│ ├── ui/ # Reusable UI components

├── data/ # Static data (categories, landing page data)

├── emails/ # Email templates for reporting

├── hooks/ # Custom React hooks

├── lib/ # Prisma, Inngest clients, and utils

├── prisma/ # Database schema and migrations

├── public/ # Static assets

├── README.md # Project documentation

├── package.json # Project dependencies

├── pnpm-lock.yaml # Lock file for pnpm

├── next.config.mjs # Next.js configuration

├── eslint.config.mjs # ESLint configuration

├── postcss.config.mjs # PostCSS configuration

```

  

---

  

## ⚙️ **Installation**

  

1.  **Clone the repository:**

```bash

git  clone  https://github.com/SVPraveen1/welth-ai-finance.git

cd  welth-ai-finance

```

  

2.  **Install dependencies:**

```bash

pnpm  install

```

  

3.  **Set up environment variables:**

Create a `.env` file in the root directory with the following variables:

  

### `.env`

```plaintext

DATABASE_URL=your_postgres_url

NEXTAUTH_SECRET=your_secret_key

NEXT_PUBLIC_API_URL=http://localhost:3000

# Email Service

EMAIL_API_KEY=your_resend_api_key

# Bot Protection & Rate Limiting

ARCJET_API_KEY=your_arcjet_api_key
  
# Inngest Cron Jobs

INNGEST_API_KEY=your_inngest_api_key

```

  

4.  **Migrate the database:**

```bash

pnpm  prisma  migrate  dev  --name  init

```

  

---

  

## 🚀 **Running the Project**

  

To run the development server:

```bash

pnpm  dev

```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

  

For production:

```bash

pnpm  build

pnpm  start

```

  

---

  

## 🔧 **Server Actions & Background Jobs**

  

### ✅ **Server Actions**

Your project handles core operations through **server actions** in the `/actions/` directory.

  

### 🔥 **Background Cron Jobs**

Automated financial processes run through **Inngest cron jobs**.

---  
## 🔐 **Authentication**

-  **User authentication** is handled through **Next.js Auth** and **Clerk** authentication
---

## 🌐  **Deployment**

✅ **Deployed On:** [Welth AI Finance](https://welth-ai-finance.vercel.app/)

📧 **Contact:** [EMail](mailto:svpraveenkaruparthi@gmail.com)