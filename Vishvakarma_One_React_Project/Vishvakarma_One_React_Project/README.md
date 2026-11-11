# Vishvakarma One — React Project Foundation

This is the React/Vite project folder for the next development phase of Vishvakarma One.

## Included
- React 18 + Vite setup
- React Router navigation
- Separate Construction ERP and Contractor ERP workspaces
- Module navigation structure
- Responsive application shell
- Starter dashboard
- Generic local prototype register with add, search, delete and CSV export
- Local browser storage helper

## Run on a computer
1. Install Node.js LTS from https://nodejs.org/
2. Extract this ZIP file.
3. Open the extracted `Vishvakarma_One_React_Project` folder in VS Code.
4. Open Terminal → New Terminal.
5. Run `npm install`
6. Run `npm run dev`
7. Open the local URL shown by Vite (normally http://localhost:5173).

## Important
This is a React foundation, not a completed ERP migration. The original v86 HTML prototype is included under `public/reference/` for reference. Existing module-specific business logic must be migrated into React components and services. The generic register is only a temporary local prototype.

Do not enter live business, employee, supplier, customer or financial data. There is no secure backend/database, authentication, multi-user permission system, server-side audit trail or production backup service in this starter.

## Suggested next engineering milestones
1. Extract and migrate the existing module-specific workflows from the reference prototype.
2. Define the central relational database and API contracts.
3. Implement server-side authentication and role-based access control.
4. Implement transaction-safe integrations for Purchase → GRN → Store → Issue → Consumption → Project Cost.
5. Implement Contractor procurement and Builder-supplied material responsibility as separate stock flows.
6. Implement Work Order → BOQ → Measurement Book → RA Bill → Certification → Payment.
7. Implement sales, accounts, HR, reports and document management.
8. Add automated unit, integration and browser tests before production deployment.
