# 💰 Welth — Premium Personal Finance Platform

Welth is a modern, AI-powered personal finance and budget tracking application built with **Next.js 16 App Router**. It enables intelligent expense tracking, recurring transaction automation, budget alerts, and AI-driven financial insights.

---

## 🚀 Live Application

**Production URL:**
[https://welth-ruddy-seven.vercel.app](https://welth-ruddy-seven.vercel.app)

---

# 🏗️ System Architecture

Welth follows a modern full-stack architecture using:

* Next.js 16 (App Router)
* React Server Components
* Server Actions
* Edge-ready middleware
* Background job processing
* AI-powered analytics layer

The system is designed for scalability, performance, and enterprise-level security.

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Next.js 16
* Tailwind CSS 4
* Shadcn/UI
* Lucide React (Icons)
* Recharts (Data Visualization)

## Backend / API

* Next.js Server Actions
* Next.js API Routes (Inngest integration)

## Database

* PostgreSQL (Supabase / External)
* Prisma ORM

## Authentication

* Clerk (Middleware-based route protection)

## Security

* Arcjet (Bot detection & Shield protection)

## Background Jobs

* Inngest (Recurring transactions, alerts, reports)

## Email

* Resend + React Email templates

## AI Integration

* Google Generative AI (Gemini)
* OpenAI (Financial analysis & insights)

---

# 🗂️ Database Design

Welth uses a relational PostgreSQL schema managed via Prisma ORM.

## 👤 User

* id (Primary Key)
* clerkUserId (Unique)
* email (Unique)
* name

## 🏦 Account

* id (Primary Key)
* name
* balance
* isDefault
* Relation: Owned by User

## 💳 Transaction

* id (Primary Key)
* amount
* type (income / expense)
* category
* isRecurring
* date
* Relation: Belongs to Account & User

## 📊 Budget

* id (Primary Key)
* amount
* lastAlertSent
* Relation: Set by User

This structure enables:

* Multi-account support
* Recurring transaction automation
* Budget monitoring
* AI-driven financial insights

---

# 🔐 Authentication Layer

**File:** middleware.ts

Clerk protects all internal routes except:

* Landing page
* Sign-in / Sign-up
* Public routes

### Flow

1. Request enters middleware
2. Clerk validates session
3. Public routes bypass authentication
4. Protected routes receive authenticated context

---

# 🛡️ Security Layer (Arcjet)

Arcjet protects API routes from:

* Bot traffic
* Abuse attempts
* Malicious activity

Security logic is applied primarily at API route level (e.g., Inngest route) to manage throughput and performance.

---

# 🔄 Background Processing (Inngest)

Managed in:

app/api/inngest/route.js
lib/inngest/

## Scheduled Functions

### 1️⃣ processRecurringTransaction

Processes scheduled recurring transactions and updates account balances.

### 2️⃣ triggerRecurringTransactions (Daily Cron)

Identifies due recurring transactions and queues processing.

### 3️⃣ generateMonthlyReports (Monthly Cron)

Generates AI-powered financial summaries for users.

### 4️⃣ checkBudgetAlerts (Every 6 Hours)

Compares monthly spending against user budgets and triggers email alerts when thresholds exceed 80%.

---

# 🔄 Project Workflow

## 1️⃣ User Onboarding

* User signs up via Clerk.
* First visit to /dashboard triggers checkUser().
* If user does not exist in PostgreSQL, a new User record is created.

## 2️⃣ Account Management

* User creates an account (e.g., "Main Bank").
* Server action validates and stores account in database.
* User can mark one account as default.

## 3️⃣ Transaction Lifecycle

* User manually adds transaction.
* If recurring, nextRecurringDate and interval are stored.
* Inngest cron triggers background processing.
* New transaction is created and balance updated.

## 4️⃣ Monitoring & Alerts

* Budget checks run every 6 hours.
* If spending exceeds threshold, email alert is triggered.
* Monthly AI reports analyze financial behavior.

---

# 🎨 Component Architecture

## Core Components

* Header (Navigation + Clerk UserButton)
* Hero (Landing section)
* CreateAccountDrawer
* Dashboard Cards
* Charts (Recharts integration)

## Layout Structure

### Root Layout

* Theme Provider
* Clerk Provider
* Global Toaster

### Main Layout

* Protected dashboard layout
* Sidebar / Navigation
* Transaction pages

---

# ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/Pawar-Sudharshan/welth.com

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

---

# 📌 Future Enhancements

* Advanced AI forecasting
* Investment portfolio tracking
* Mobile PWA optimization
* Multi-currency support
* Admin analytics dashboard

---

