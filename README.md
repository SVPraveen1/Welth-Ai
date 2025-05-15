# 🚀 Welth AI Finance

Welth AI is a modern, intelligent personal finance management platform that helps you track, analyze, and optimize your spending with real-time insights. Built with Next.js 14, Prisma, and cutting-edge AI technologies.

![Welth AI Dashboard](public/banner.png)

## 🌟 Features

### Core Features
- **Smart Account Management**
  - Create and manage multiple accounts (Savings & Current)
  - Track account balances and transactions
  - Set default accounts for quick access
  - Real-time balance updates

### Transaction Management
- **Intelligent Transaction Tracking**
  - Record income and expenses with detailed categorization
  - Smart receipt scanner powered by AI
  - Support for recurring transactions (Daily/Weekly/Monthly/Yearly)
  - Multi-currency support
  - Detailed transaction history with advanced filtering

### Analytics and Insights
- **Advanced Analytics**
  - Visual spending patterns with interactive charts
  - Category-wise expense breakdown
  - Custom date range analysis
  - Budget tracking and alerts

### Budgeting Tools
- **Budget Management**
  - Set and track monthly budgets
  - Visual progress indicators
  - Smart notifications for budget limits
  - Category-wise budget allocation

### AI-Powered Features
- **Intelligent Insights**
  - AI-powered receipt scanning and data extraction
  - Smart categorization of transactions
  - Automated financial insights
  - Spending pattern analysis

### User Experience
- **Modern Interface**
  - Responsive design for all devices
  - Dark/Light mode support
  - Real-time updates
  - Intuitive navigation
  - Beautiful UI components

## 🛠 Technology Stack

- **Frontend**
  - Next.js 14 (React)
  - Tailwind CSS
  - Radix UI Components
  - Recharts for data visualization
  - Clerk for authentication
  - React Hook Form for form handling

- **Backend**
  - Next.js Server Actions
  - Prisma ORM
  - PostgreSQL Database
  - Google AI for receipt scanning
  - Inngest for cron jobs and background tasks

- **Third-Party Services**
  - Clerk (Authentication)
  - Resend (Email notifications)
  - Arcjet (Bot protection & Rate limiting)
  - Google AI (Receipt processing)

## ⚙️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/SVPraveen1/welth-ai.git
cd welth-ai
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory with the following variables:

```plaintext
DATABASE_URL=your_postgres_url
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Email Service
EMAIL_API_KEY=your_resend_api_key

# Bot Protection & Rate Limiting
ARCJET_API_KEY=your_arcjet_api_key

# AI Features
GEMINI_API_KEY=your_gemini_api_key

# Cron Jobs
INNGEST_API_KEY=your_inngest_api_key
```

4. **Initialize the database:**
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

5. **Start the development server:**
```bash
pnpm dev
```

## 📂 Project Structure

```
welth-ai-finance/
├── actions/           # Server actions for data operations
├── app/              # Next.js app router and pages
│   ├── (auth)/      # Authentication routes
│   ├── (main)/      # Main application routes
│   ├── api/         # API endpoints
├── components/       # React components
│   ├── ui/          # Reusable UI components
├── data/            # Static data and configurations
├── emails/          # Email templates
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
│   ├── inngest/     # Background jobs
│   ├── prisma.js    # Database client
├── prisma/          # Database schema and migrations
└── public/          # Static assets
```

## 🔐 Security Features

- Secure authentication via Clerk
- Rate limiting and bot protection with Arcjet
- Secure database operations with Prisma
- Input validation using Zod
- Protected API routes
- Secure session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 💡 Support

For support, email support@welth.ai or create an issue in the repository.