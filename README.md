# Emirhan Kemal Kosem - Personal Website

A modern personal website built with Next.js 15, React 18, TypeScript, and TailwindCSS.

You can check it: <https://emirkemal.com>

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router (latest)
- **React 18** - UI library
- **TypeScript 5.5** - Type safety
- **Zod 4.1** - Runtime type validation and schema definition
- **TailwindCSS 3.4** - Utility-first CSS framework
- **Node.js 20+** - Runtime environment

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.22+

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KemalEmirhan/emirhan.github.io.git
cd emirhan.github.io
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page
│   └── not-found.tsx     # 404 page
├── src/
│   ├── components/       # React components
│   │   ├── About/        # About section component
│   │   ├── Accounts/     # Social accounts component
│   │   └── Icons/        # Icon system with registry
│   ├── hooks/           # Custom React hooks
│   │   └── useAge.ts     # Age calculation hook
│   ├── constants/       # App constants
│   │   └── accountLinks.ts # Social media links
│   └── schemas/         # Zod schemas for type validation
│       └── index.ts     # Type definitions and validation
├── styles/
│   └── globals.css      # Global styles with TailwindCSS
├── tailwind.config.js   # TailwindCSS configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## 🎨 Styling

This project uses TailwindCSS for styling. All components are styled with utility classes for consistency and maintainability. The design follows a minimalist approach with smooth transitions using `duration-150` for optimal user experience.

## 🔒 Type Safety & Validation

This project leverages **Zod** for comprehensive type safety and runtime validation:

- **Schema-first approach** - All data structures are defined using Zod schemas
- **Runtime validation** - Data is validated at runtime to ensure type safety
- **Type inference** - TypeScript types are automatically inferred from Zod schemas
- **Icon system** - Icon registry and props are fully typed and validated
- **Account links** - Social media links are validated for proper URL format and color codes
- **Age calculation** - Birth date validation ensures accurate age calculation

### Key Features

- **Icon Registry** - Centralized SVG icon management with type-safe props
- **Account Links** - Validated social media links with proper URL and color validation
- **Custom Hooks** - Type-safe custom hooks like `useAge` for dynamic age calculation
- **Component Props** - All component props are validated using Zod schemas

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn type-check` - Run TypeScript type checking
- `yarn check-all` - Run all checks (type-check + lint + format:check)
- `yarn fix-all` - Fix all issues (lint:fix + format)
- `yarn clean:build` - Clean build directory

## 🛠️ Development Tools

This project includes comprehensive linting and formatting tools:

- **ESLint** - Code linting with Next.js and TypeScript rules
- **Prettier** - Code formatting for consistent style
- **Husky** - Git hooks for pre-commit linting
- **lint-staged** - Run linters on staged files only
- **TypeScript** - Type checking and validation
- **Zod** - Runtime type validation and schema definition

### Pre-commit Hooks

The project automatically runs linting and formatting on commit:

- ESLint fixes are applied automatically
- Prettier formatting is applied
- Only staged files are processed for faster commits
- TypeScript type checking ensures type safety
