# Vercel Blob Setup Guide

## 1. Get Vercel Blob Token

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add a new environment variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Get this from Vercel Blob dashboard
5. Go to https://vercel.com/storage/blob
6. Create a new blob store
7. Copy the `BLOB_READ_WRITE_TOKEN` from the store settings

## 2. Add to Local Environment

Add this to your `.env.local` file:

```bash
# Vercel Blob
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token-here"
```

## 3. Deploy to Vercel

The environment variable will automatically be available in production.

## 4. Alternative: AWS S3 Setup

If you prefer AWS S3, you can use:

```bash
npm install @aws-sdk/client-s3
```

And add these environment variables:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET_NAME`
