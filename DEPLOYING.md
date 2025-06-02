# Deploying Your Next.js Application to Vercel with Neon PostgreSQL

This guide provides step-by-step instructions for deploying your Next.js application to Vercel, using Neon PostgreSQL as the database.

## Prerequisites

- A [GitHub](https://github.com/) account
- A [Vercel](https://vercel.com/) account (you can sign up with your GitHub account)
- A [Neon PostgreSQL](https://neon.tech/) account

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub
2. Push your code to the repository:

```bash
# Initialize git if not already done
git init

# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 2: Configure Your Neon Database

1. Make sure your Neon database is set up
2. Copy your connection string from the Neon dashboard
3. The connection string should look like:
   ```
   postgresql://[user]:[password]@[endpoint]/[dbname]?sslmode=require
   ```

## Step 3: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project" or "New Project"
3. Select your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Build Command: Vercel will use the one in vercel.json
   - Output Directory: Default (.next)

5. Environment Variables:
   - Click "Environment Variables"
   - Add the following variables:
     - `DATABASE_URL` = your Neon PostgreSQL connection string
     - `NEXTAUTH_SECRET` = a random string (generate with `openssl rand -base64 32`)
     - `NEXTAUTH_URL` = your Vercel deployment URL (e.g., https://your-app.vercel.app)
     - Add any other environment variables from your .env file

6. Click "Deploy"

## Step 4: Run Prisma Migrations (First Deployment Only)

After the first deployment, you'll need to run Prisma migrations on your production database. You can do this using the Vercel CLI:

1. Install Vercel CLI: `npm i -g vercel`
2. Log in: `vercel login`
3. Run: `vercel env pull .env.production.local`
4. Run: `npx prisma migrate deploy --preview-feature`

## Subsequent Deployments

For subsequent deployments, just push to your GitHub repository, and Vercel will automatically deploy your changes.

## Troubleshooting

- **Database Connection Issues**: Check that your DATABASE_URL is correctly formatted and the credentials are valid.
- **Build Errors**: Check the build logs in the Vercel dashboard for specific errors.
- **API Route Errors**: Some API routes might not work correctly during build time due to static generation. This is normal and won't affect runtime performance.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs) 