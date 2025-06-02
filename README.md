This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Copy the `.env.example` file to `.env.local` and fill in the required environment variables:

```bash
cp .env.example .env.local
```

### Required Environment Variables

- `NEXTAUTH_URL`: The base URL of your application (e.g., `http://localhost:3000` for development)
- `NEXTAUTH_SECRET`: A random string used to hash tokens and sign cookies
- `DATABASE_URL`: The connection string for your database

### Email Notifications

This project uses [Resend](https://resend.com) for sending email notifications. To enable email functionality:

1. Sign up for a Resend account
2. Create an API key
3. Add the API key to your `.env.local` file as `RESEND_API_KEY`
4. Set `EMAIL_FROM` to your verified sender email address
5. Set `NEXT_PUBLIC_APP_URL` to your application's URL (used in email links)

Email notifications are sent for:
- User registration (welcome email)
- New comments on posts
- Weekly forum digest (via cron job)

Users can manage their notification preferences in their profile settings.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on [Vercel](https://vercel.com/import)
3. Vercel will detect that you're using Next.js and set up the build configuration for you
4. Add your environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your production database connection string
   - `NEXTAUTH_SECRET`: A strong random string for authentication
   - `RESEND_API_KEY`: Your Resend API key (if using email functionality)
   - `EMAIL_FROM`: Your verified sender email
   - Any other environment variables from your `.env.local` file

### Database Setup

This project uses Prisma with PostgreSQL. For Vercel deployment:

1. Create a PostgreSQL database (Vercel Postgres, Neon, Supabase, etc.)
2. Add your database connection string as `DATABASE_URL` in Vercel environment variables
3. Prisma migrations will run automatically during the build process

### Git Setup

This repository is already initialized with Git. To push to your own repository:

```bash
# Change the remote URL to your repository
git remote set-url origin https://github.com/yourusername/your-repo-name.git

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Push to your repository
git push -u origin main
```

Remember to update the `NEXTAUTH_URL` in your Vercel environment variables to match your deployed URL.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
