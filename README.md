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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Features
- [X] sign up (create account)
- [X] sign in
- [X] sign in with OAuth Providers
- [X] sign out
- [ ] welcome email
- [X] send verification email
- [X] verify email page
- [X] send reset password email
- [X] reset password page
- [X] redirect to reset password from sign in form
- [X] profile management
- [X] change password tab in profile page (for users using a credentials)
- [X] redirect to set password from profile page (for users using an OAuth provider)
- [X] session management
- [X] linked accounts management
- [X] delete account functionality
- [X] two-factor authentication (2FA)
- [ ] passkeys better-auth plugin (has an Error 🔴)
- [X] Admin better-auth plugin + admin page
- [ ] create multiple roles using admin plugin
- [ ] organization better-auth plugin
    - [ ] organizations invitations inbox
    - [ ] organizations invite email
- [ ] website skeleton loading 
- [ ] navbar to be able to return to home from anywhere
- [ ] profile page: show verification status (turn `requireEmailVerification` off first) 
- [ ] using react email templates
- [ ] add google to the "supported OAuth providers"
- [ ] verify form schemas in this application
- [ ] next.js redirect VS next/navigation/router.push ??
- [ ] in case the user has no organizations, instead of showing nothing but the create organization button, why not show some description about organizations and how they work

## Errors 🔴
- [ ] listing passkeys
- [X] impersonation button always visible
- [ ] loading indicator from 2fa form stays visible for a very long time
- [ ] messages/prerender-errors error in reset-password.tsx page