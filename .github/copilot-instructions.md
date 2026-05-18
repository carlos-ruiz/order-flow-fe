# Security Requirements

## OWASP Top 10 Compliance

All code (backend and frontend) must follow the OWASP Top 10 security rules as a strict requirement. This includes:

- Input validation and sanitization
- Proper authentication and authorization
- Secure handling of sensitive data
- Protection against XSS, CSRF, and injection attacks
- Secure error handling and logging
- Use of secure dependencies and libraries
- Regular security reviews and updates

Any code or feature that does not comply with these rules must be considered a blocker and must not be merged.

# Order Management Dashboard — Copilot Instructions

## TypeScript

- `strict: true` is enabled; always use explicit types and avoid `any`
- Use `interface` for component props (e.g., `interface OrdersTableProps`)
- Use `type` for data models (e.g., `type Order`, `type Status`)
- Use `unknown` when typing caught errors or unvalidated API responses, then cast with type assertions
- Use `import type { ... }` for type-only imports

## React Components

- Functional components only — no class components
- Named exports for all components and utilities (e.g., `export function Dashboard()`)
- Destructure props in the function signature
- Use `useState` and `useMemo` for local and derived state
- No global state library (no Redux, Zustand, or Context API)

## API & Data Fetching

- Always use `getApiUrl()` from `src/config/api.ts` to build endpoint URLs
- Use the native `fetch` API inside `useEffect` or event handlers
- Wrap fetch calls in `try/catch`; log errors with `console.error` and reset state to safe defaults (e.g., `setOrders([])`)

## Styling & UI

- Use Tailwind CSS utility classes for all styling; avoid inline styles
- Use Mantine components from `@mantine/core` for all UI primitives
- Use `lucide-react` for icons

## File & Folder Conventions

- Pages go in `src/pages/` and are the route-level container components
- Feature components go in `src/components/`
- Component filenames: PascalCase (e.g., `OrdersTable.tsx`)
- Utility/config filenames: camelCase (e.g., `api.ts`)

## Import Order

1. React core and hooks
2. Local components and types
3. UI library components (`@mantine/core`)
4. Icons (`lucide-react`) and utilities
