# Emirhan Kemal Kosem - Personal Website

A modern personal website built with Next.js 15, React 18, TypeScript, and TailwindCSS.

You can check it: <https://emirhan.dev>

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router (latest)
- **React 18** - UI library
- **TypeScript 5.5** - Type safety
- **TailwindCSS 3.4** - Utility-first CSS framework
- **Node.js** - Runtime environment

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KemalEmirhan/emirhan.github.io.git
cd emirhan.github.io
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── src/
│   ├── components/       # React components
│   │   ├── About/        # About section
│   │   ├── Accounts/     # Social accounts
│   │   └── Header/       # Navigation header
│   ├── hooks/           # Custom React hooks
│   └── constants/       # App constants
├── styles/
│   └── globals.css      # Global styles with TailwindCSS
├── tailwind.config.js   # TailwindCSS configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## 🎨 Styling

This project uses TailwindCSS for styling. All components are styled with utility classes for consistency and maintainability.

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

### Pre-commit Hooks

The project automatically runs linting and formatting on commit:

- ESLint fixes are applied automatically
- Prettier formatting is applied
- Only staged files are processed for faster commits

## Preview

![emirhan.dev](https://media.giphy.com/media/HnTe3YJwNAR1lchQb3/giphy.gif)
