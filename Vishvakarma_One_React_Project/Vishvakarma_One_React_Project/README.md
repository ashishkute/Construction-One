# Vishvakarma One — React + Supabase Foundation

This is the consolidated React/Vite project folder for the next development phase of Vishvakarma One.

## Included
- React 18 + Vite project structure
- Existing React shell, navigation, dashboard and module workspace starter
- Original v86 HTML prototype retained under `public/reference/`
- Supabase JavaScript client configuration in `src/lib/supabase.js`
- Environment-variable template in `.env.example`
- Separate Construction ERP and Contractor ERP navigation foundation

## Supabase configuration
1. Copy `.env.example` to `.env.local` in this folder.
2. Keep the supplied project URL in `VITE_SUPABASE_URL`.
3. Paste your Supabase **publishable** key into `VITE_SUPABASE_PUBLISHABLE_KEY`.
4. Never put a Supabase secret/service-role key in this React project or GitHub.

The Supabase client is prepared but authentication and ERP database workflows are not yet implemented. Do not enter live business or financial data until those workflows and permissions are completed.

## Run locally
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` and enter the publishable key.
5. Run `npm run dev`.

## Build
Run `npm run build` to create the production bundle in `dist/`.

## Important status
This is a React foundation, not a completed production ERP. The v86 reference prototype is retained unchanged. Its existing local-storage business logic has not yet been migrated to Supabase. Authentication, organisation/workspace isolation, role-based permissions, live CRUD, audit history and transaction-safe procurement/store workflows still require implementation and verification.

## Supabase authentication foundation

This version includes email/password sign-in and sign-up using Supabase Auth. Configure these Vite environment variables in your local `.env.local` file or in your hosting provider's environment settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Use the publishable key only. Never place a Supabase secret/service-role key in browser code. `.env.local` is excluded by `.gitignore` and must not be committed.

The app restores the Supabase session, provides sign-in/sign-up and sign-out, and protects the ERP shell behind authentication. Organisation membership enforcement and live ERP table workflows are subsequent implementation steps; this foundation does not yet make the purchase/store modules production-ready.
