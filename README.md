# E_Mitra - Restaurant E-Commerce Platform

## Overview

E_Mitra is a comprehensive e-commerce platform designed specifically for restaurants to manage their online ordering system and related services. The platform provides a seamless experience for both customers and restaurant administrators to handle orders, menu management, and other restaurant services.

## Tech Stack

- **Frontend**: Next.js
- **UI Components**: shadcn/ui
- **Backend**: Strapi (Headless CMS)
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: Strapi Authentication
- **Styling**: Tailwind CSS

## Features

### Product Management

- **Complete CRUD Operations**
  - Add new products with details and images
  - View product listings with search and filters
  - Update product information
  - Delete products from the catalog
  - Category management
  - Price management

### Order Management

- **Order Processing**
  - Real-time order tracking
  - Order status updates
  - Order history
  - Custom order notes

### Customer Features

- **User Authentication**
  - Customer registration and login
  - Profile management
  - Order history tracking

### Admin Dashboard

- **Management Interface**
  - Product management dashboard
  - Order management
  - Basic sales overview

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Supabase account
- Strapi CLI

## Installation

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/RahulKoju/E_Mitra.git

# Navigate to project directory
cd E_Mitra

# Install dependencies
npm install

# Install shadcn/ui components
npx shadcn-ui@latest init

# Create .env file and add necessary environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Backend Setup

```bash
# Clone the Strapi backend repository
git clone https://github.com/RahulKoju/strapi-backend.git

# Navigate to backend directory
cd strapi-backend

# Install dependencies
npm install

# Start Strapi server
npm run develop
```

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_STRAPI_API_URL=your_strapi_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Project Structure

```
src/
├── app/
│   ├── _components/      # Shared components for the app
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   │
│   ├── _context/        # React Context providers
│   │   ├── CartContext.tsx
│   │   └── ...
│   │
│   ├── utils/           # Utility functions
│   │   ├── api.ts
│   │   ├── helpers.ts
│   │   └── ...
│   │
│   ├── (auth)/          # Authentication group routes
│   │   ├── sign-in/     # Sign in functionality
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   └── sign-up/     # Sign up functionality
│   │       ├── page.tsx
│   │       └── components/
│   │
│   ├── (routes)/        # Main application routes
│   │   ├── (admin)/     # Admin section
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │
│   │   ├── about/       # About page
│   │   │   └── page.tsx
│   │   │
│   │   ├── category/    # Category related pages
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── checkout/    # Checkout process
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │
│   │   ├── contact/     # Contact page
│   │   │   └── page.tsx
│   │   │
│   │   ├── my-order/    # Order management
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │
│   │   ├── order-confirmation/  # Order confirmation
│   │   │   └── page.tsx
│   │   │
│   │   ├── product/    # Product pages
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   └── search/     # Search functionality
│   │       ├── page.tsx
│   │       └── components/
│   │
│   ├── fonts/          # Custom font configurations
│   │   └── font-imports.ts
│   │
│   ├── favicon.ico     # Site favicon
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── providers.tsx   # App providers setup
│
├── components/         # Global shared components
│   ├── ui/            # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── ...
│
└── lib/               # Shared libraries and configurations
    ├── utils.ts
    ├── types.ts
    └── ...
```

## UI Components

The project uses shadcn/ui for its component library. To add new components:

```bash
# Add specific shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# ... etc
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

- Project Link: [https://github.com/RahulKoju/E_Mitra](https://github.com/RahulKoju/E_Mitra)
- Backend Repository: [https://github.com/RahulKoju/strapi-backend](https://github.com/RahulKoju/strapi-backend)

## Acknowledgments

- Strapi - For providing the headless CMS solution
- Supabase - For database hosting and real-time features
- Next.js - For the frontend framework
- shadcn/ui - For UI components
- Tailwind CSS - For styling utilities
