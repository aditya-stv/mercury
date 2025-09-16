# Overview

This is a modern finance web application called "Wyckoff" with the tagline "Ahead of Time." It's a comprehensive stock market platform that provides sentiment analysis, market data, watchlists, alerts, and trading insights. The app follows a full-stack architecture with React frontend and Express backend, designed specifically for the Indian stock market (Nifty, Sensex, etc.) with additional global market support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **Styling**: TailwindCSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Charts**: Recharts for data visualization (price charts, sentiment charts, heatmaps)
- **Theme**: Dark mode by default with a modern, sleek design using Inter font

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage**: Dual storage system - in-memory storage for development/testing and database storage for production
- **API Design**: RESTful API with endpoints for stocks, market data, watchlists, alerts, and news

## Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon (serverless Postgres)
- **ORM**: Drizzle with migrations for schema management
- **Schema Design**: Normalized tables for users, stocks, watchlists, alerts, and news
- **Development Storage**: In-memory mock storage with realistic data for development and testing

## Authentication and Authorization
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage
- **User Management**: Basic username/password authentication system
- **Security**: Environment-based configuration for database connections

## Key Features Architecture
- **Market Data**: Real-time stock prices, sentiment analysis, and market indices
- **Sentiment Analysis**: 0-100 sentiment scoring with bullish/bearish/neutral labels
- **Watchlists**: User-specific stock tracking with real-time updates
- **Alerts**: Configurable price and sentiment alerts with email notifications
- **Charts**: Interactive price and sentiment charts with multiple timeframes
- **Market Overview**: Sector heatmaps and top movers analysis

# External Dependencies

## Development Tools
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Type checking and development tooling
- **ESBuild**: Fast JavaScript bundler for production builds

## UI Components
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework

## Data Management
- **TanStack Query**: Server state management with caching and background updates
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation for API requests and responses

## Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database toolkit
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Charts & Visualization
- **Recharts**: React charting library for price and sentiment visualization
- **Date-fns**: Date manipulation and formatting utilities

## Development Experience
- **Replit Integration**: Development environment optimizations for Replit
- **Error Handling**: Runtime error modals for development
- **Hot Reload**: Fast refresh during development