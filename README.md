# Invoice Management System (Frontend Prototype)

A modern Vue.js frontend prototype for an invoice management system. Currently client-side only with Pinia state management, designed to eventually support dynamic item creation and backend integration.

## Current Status

**Work in Progress** - Frontend prototype with core invoice functionality implemented. Backend integration and dynamic item creation features are planned for future development.

## Core Features

- **Client Management** - Select clients with persistent selection across sessions
- **Invoice Creation** - Add items, calculate totals with VAT and discounts
- **Item Inventory** - Pre-loaded styles and samples with search functionality
- **Real-time Calculations** - Automatic price calculations as items are added
- **Theme Support** - Dark/light mode with custom CSS properties
- **Responsive Design** - Mobile-friendly interface

## Tech Stack

- **Vue 3** (Composition API)
- **Pinia** for state management
- **Tailwind CSS** for styling
- **Vue Router** for navigation
- **VueUse** composables

## Quick Start

```bash
git clone https://github.com/viktorHadz/invoicing-app.git
cd invoicing-app
npm install
npm run dev
```

## Project Structure

```
src/
├── stores/           # Pinia stores (clients, invoice, items)
├── components/       # Vue components
├── views/           # Main page components
├── composables/     # Reusable logic (calculations, forms)
└── router/          # Vue Router setup
```

## Key Components

### State Management
- **Client Store** - Manages client selection with localStorage persistence
- **Invoice Store** - Handles invoice data and price calculations
- **Items Store** - Manages inventory (currently uses dummy API data)

### Invoice Workflow
1. Select client from pre-loaded list
2. Add items from styles/samples inventory
3. Adjust quantities and review calculated totals
4. View real-time price updates

## Current Limitations

- Frontend only - no backend persistence
- Uses external dummy API for sample data
- Limited to pre-defined item types
- No PDF export or email functionality

## Planned Features

- Backend API integration
- Dynamic item creation and management
- PDF invoice generation
- User authentication
- Enhanced reporting

## Development Notes

Built as a learning project to demonstrate:
- Modern Vue 3 patterns with Composition API
- State management with Pinia
- Responsive UI design
- Real-time data calculations

---

This is a frontend prototype showcasing modern Vue.js development practices for a future full-stack invoice management solution.
