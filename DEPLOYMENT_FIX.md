# Deployment Fix for Server-Side Error

## Issues Fixed:
1. ✅ Fixed localStorage SSR issue in admin editor
2. ✅ Fixed type mismatches between TypeScript and Prisma schema
3. ✅ API routes are working locally

## Environment Variables to Set in Vercel:

Go to Vercel Dashboard → Project Settings → Environment Variables

### Required Variables:
1. **DATABASE_URL** - Get from your Neon.tech dashboard
2. **NEXTAUTH_URL** - Your production URL (e.g., https://your-app.vercel.app)
3. **NEXTAUTH_SECRET** - Generate with: `openssl rand -base64 32`
4. **EMAIL_SERVER_HOST** - smtp.gmail.com
5. **EMAIL_SERVER_PORT** - 587
6. **EMAIL_SERVER_USER** - Your Gmail address
7. **EMAIL_SERVER_PASSWORD** - Generate Gmail app password
8. **EMAIL_FROM** - Your email address
9. **BLOB_READ_WRITE_TOKEN** - Generate in Vercel Blob storage settings

### How to Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### How to Generate Gmail App Password:
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Generate new app password for "Mail"

## Steps to Deploy:
1. Update environment variables in Vercel dashboard
2. Redeploy the application
3. Test the admin panel functionality

## ⚠️ SECURITY WARNING:
**Never commit actual credentials to Git!** Always use environment variables for sensitive data.

The server-side error should be resolved after these changes.