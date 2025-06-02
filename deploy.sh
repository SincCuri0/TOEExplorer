#!/bin/bash
# Deployment script for Next.js with Prisma and Neon

# Ensure Prisma client is generated
echo "Generating Prisma client..."
npx prisma generate

# If you want to run migrations on deploy (careful with this in production!)
# echo "Running database migrations..."
# npx prisma migrate deploy

# Build the Next.js application
echo "Building Next.js application..."
npm run build

echo "Deployment preparation complete!"
echo "You can now push your code to GitHub and deploy on Vercel."
echo "Remember to set your DATABASE_URL and other environment variables in Vercel." 