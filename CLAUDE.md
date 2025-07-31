# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev      # Start development server on port 8080
```

### Build
```bash
npm run build         # Production build
npm run build:dev     # Development build
npm run preview       # Preview production build locally
```

### Code Quality
```bash
npm run lint     # Run ESLint for TypeScript files
```

## High-Level Architecture

This is a React + TypeScript application built with Vite and styled using Tailwind CSS and shadcn/ui components.

### Core Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui component library
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation

### Project Structure
- `/src/components/` - React components including UI components from shadcn/ui
- `/src/pages/` - Page components (Index, NotFound)
- `/src/lib/` - Utilities and shared functions
- `/src/hooks/` - Custom React hooks

### Key Application Routes
- `/` - Landing page (LandingPage component)
- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - User dashboard for email management
- `/admin` - Admin dashboard for system management

### Application Context
This appears to be a SaaS platform for AI-powered email response automation with:
- Multi-language support via GPT-4 integration
- Email provider integrations (Gmail, Outlook, IMAP)
- User and admin dashboards
- Subscription-based pricing tiers

### TypeScript Configuration
- Path alias: `@/` maps to `./src/` directory
- Relaxed type checking enabled (noImplicitAny: false, strictNullChecks: false)

### Important Notes
- The project uses Lovable for deployment and collaborative development
- Particles.js is used for visual effects on the landing page
- Nunito font is configured as the primary font family