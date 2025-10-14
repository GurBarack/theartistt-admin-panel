# Database Setup Guide

## 1. Vercel Postgres Setup

1. Go to your Vercel Dashboard
2. Select your project: `theartistt-admin-panel`
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Name it: `theartistt-db`
6. Copy the `DATABASE_URL` from the connection string

## 2. Environment Variables

Add this to your Vercel project settings:
- Go to **Settings** → **Environment Variables**
- Add: `DATABASE_URL` with your Postgres connection string

## 3. Run Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migration
npx prisma db push
```

## 4. Test Database Connection

Visit: `https://your-app.vercel.app/api/test-create-page`
This will create a test artist page in your database.

## 5. Verify Setup

Check your Vercel Postgres database to see the created tables and test data.
