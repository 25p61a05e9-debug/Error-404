# FinTrack Frontend Architecture

## Overview
This project implements a frontend-only fintech dashboard for personal finance management using React + Vite + Tailwind CSS. It is structured to be ready for later backend integration while keeping all state and behavior fully local and demonstrable without APIs.

## Core Design Decisions
- Dark naval fintech theme with cyan and violet accents for a premium dashboard feel.
- React Router handles protected and public routes with a mock auth flow built on localStorage.
- FinanceContext holds transactions, budgets, and profile state for mock interactions and calculations.
- Components separate layout, charting, forms, lists, and AI behavior to keep the app maintainable.

## Data Flow
- Authentication: `AuthContext` exposes login, register, logout, and `isAuthenticated` state.
- Finance state: `FinanceContext` stores transactions, budgets, and profile in localStorage.
- Calculations: helper functions compute totals, balance, category expenses, and budget progress.
- UI: pages consume shared context and render reusable cards, charts, and list components.

## Future Backend Integration
- `src/services/api.js` provides placeholder functions (`login`, `register`, `getTransactions`, etc.) for later API replacement.
- All UI logic is separated from API mechanics, so the backend can be wired in without rewriting the UI structure.
- The mock data model is intentionally realistic, making demo and later API migration straightforward.

## Security and Demo Notes
- Authentication here is mock-only and intentionally not secure; it is clearly isolated and easy to replace with real JWT or session-based auth.
- The frontend is designed for local demo purposes while preserving the right extension points for real backend services.
