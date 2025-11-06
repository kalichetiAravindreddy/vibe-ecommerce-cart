# Vibe Commerce - Shopping Cart App

## Overview
A full-stack e-commerce shopping cart application built for Vibe Commerce screening. Handles add/remove items, calculate totals, and mock checkout process without real payments.

# Screenshots

[product-page](./screenshots/products-page.png)  
[shopping cart](./screenshots/cart-page.png)  
[checkout form](./screenshots/checkout-form.png)  
[order receipt](./screenshots/recipt-modal.png)  

 ## Demo Video
[📹 Click here to watch the 2-minute demo video](https://www.loom.com/share/3e5b7c4b25ec4fb89671dcde3266e179)

### 🎯 What the demo shows:
- **0-30s**: Products page - Browse items and add to cart
- **30-60s**: Shopping cart - View items, quantities, and total calculation  
- **60-90s**: Checkout process - Fill customer details and submit order
- **90-120s**: Order confirmation - Receipt with order details and mock transaction

### ✨ Features demonstrated:
-  Full product catalog display
-  Add/remove items from cart
-  Real-time total calculation
-  Checkout form validation
-  Order receipt generation


## 🛠️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **APIs**: RESTful APIs

### Prerequisites
- Node.js installed on your system
- Git for version control

### Installation & Setup

#### 1. Clone the Repository
  bash
git clone <your-repository-url>
cd vibe-commerce


2. Backend Setup

bash
# Navigate to backend directory
cd backend
# Install dependencies
npm install
# Start the backend server
npm run dev
Backend running on: http://localhost:5000

3. Frontend Setup
bash
# Open new terminal and navigate to frontend directory
cd frontend
# Install dependencies
npm install
# Start the React application
npm start
Frontend running on: http://localhost:3000
# API Endpoints

Method Endpoint Description
GET /api/products Get all products
POST /api/cart Add item to cart {productId, quantity}
DELETE /api/cart/:id Remove item from cart
GET /api/cart Get cart items with total
POST /api/checkout Process checkout {name, email, cartItems}

# Project Structure  

vibe-commerce/  
├── backend/  
│   ├── server.js              # Express server & APIs  
│   ├── package.json           # Backend dependencies  
│   └── .gitignore             # Backend ignore rules  
├── frontend/    
│   ├── src/    
│   │   └── App.js             # Main React component  
│   ├── public/    
│   ├── package.json           # Frontend dependencies  
│   └── .gitignore             # Frontend ignore rules  
└── README.md                  # Project documentation  

# Backend Requirements

· GET /api/products - Returns 5-10 mock products
· POST /api/cart - Add items to cart with quantity
· DELETE /api/cart/:id - Remove items from cart
· GET /api/cart - Get cart with calculated total
· POST /api/checkout - Mock receipt generation

# Frontend Requirements

· Products grid with "Add to Cart" buttons
· Cart view showing items, quantities, and totals
· Remove/update buttons in cart
· Checkout form with name and email fields
· Receipt modal after successful checkout
· Responsive design for all screen sizes

# Bonus Features

· Database persistence with SQLite
· Error handling for API calls
· Professional UI/UX design
· Clean code structure

# Development

Running in Development Mode

```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)  
cd frontend && npm start
```

Building for Production

```bash
# Build frontend
cd frontend
npm run build
```

# Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Author : kalicheti aravind reddy
