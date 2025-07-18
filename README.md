# Full-Stack E-commerce Application

This repository contains the complete codebase for a modern full-stack e-commerce platform. The application offers a rich shopping experience for users, featuring product Browse, detailed product views, a shopping cart, secure payment processing, and robust authentication. Administrators gain access to a dedicated panel for managing users, products, and orders.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
  - [Frontend Structure](#frontend-structure)
  - [Backend Structure](#backend-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Key Functionalities Explained](#key-functionalities-explained)
  - [Authentication & Authorization](#authentication--authorization)
  - [Product Management](#product-management)
  - [Shopping Cart](#shopping-cart)
  - [Order & Payment Processing](#order--payment-processing)
  - [Admin Panel](#admin-panel)
- [Contributing](#contributing)

---

## Features

This full-stack e-commerce application provides a comprehensive set of functionalities for both customers and administrators.

### User Features

* **Responsive User Interface:** A modern and intuitive design optimized for desktop, tablet, and mobile devices.
* **Product Catalog Browse:** Explore a wide range of products categorized for easy navigation.
* **Powerful Search & Filtering:** Efficiently find products using keywords and refine results by categories and price.
* **Detailed Product Pages:** View high-resolution images, descriptions, pricing, and related product suggestions.
* **Interactive Image Zoom:** Get a closer look at product images on detail pages.
* **Shopping Cart Management:** Add items, adjust quantities, and remove products from the cart seamlessly.
* **User Authentication:** Secure registration, login, and logout processes.
* **Order History:** Access a personal dashboard to view past orders and their details.
* **Secure Payment Gateway:** Integrated with **Stripe** for secure and reliable online payments.
* **Toast Notifications:** Real-time feedback to users for actions like adding to cart, login success, etc.

### Admin Features (Role-Based Access)

* **User Management:** View all registered users and update their roles (e.g., promote to 'ADMIN', demote to 'GENERAL').
* **Product Management:**
    * **Create Products:** Add new products to the inventory with all necessary details (name, brand, category, images, pricing).
    * **Update Products:** Modify existing product information.
    * (Future: Delete Products - can be easily extended)
* **Order Management:** View a comprehensive list of all customer orders, including payment and shipping details.

---

## Technologies Used

### Frontend

* **React.js:** A JavaScript library for building dynamic and interactive user interfaces.
* **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development and state management.
* **React Router DOM:** For declarative client-side routing.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Cloudinary:** For cloud-based image storage and delivery.
* **Stripe.js:** Frontend integration for Stripe Checkout.
* **React Toastify:** For elegant toast notifications.
* **Moment.js:** For date and time formatting.
* **React Icons:** A library providing popular SVG icons.

### Backend

* **Node.js:** JavaScript runtime environment.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** A NoSQL document database for data storage.
* **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **JWT (JSON Web Tokens):** For secure user authentication and session management.
* **Bcrypt.js:** For hashing and salting passwords to enhance security.
* **Cookie-Parser:** Middleware to parse cookie headers.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing.
* **Stripe Node.js Library:** Backend integration for Stripe payments and webhooks.
* **Dotenv:** For loading environment variables from a `.env` file.

---

## Project Structure

### Frontend Structure

Given you've provided both the frontend and backend code, I'll create a single, comprehensive README file that covers both parts of your e-commerce project. This will provide a holistic view for anyone looking at your GitHub repository.

Markdown

# Full-Stack E-commerce Application

This repository contains the complete codebase for a modern full-stack e-commerce platform. The application offers a rich shopping experience for users, featuring product Browse, detailed product views, a shopping cart, secure payment processing, and robust authentication. Administrators gain access to a dedicated panel for managing users, products, and orders.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
  - [Frontend Structure](#frontend-structure)
  - [Backend Structure](#backend-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Key Functionalities Explained](#key-functionalities-explained)
  - [Authentication & Authorization](#authentication--authorization)
  - [Product Management](#product-management)
  - [Shopping Cart](#shopping-cart)
  - [Order & Payment Processing](#order--payment-processing)
  - [Admin Panel](#admin-panel)
- [Contributing](#contributing)
- [License](#license)

---

## Features

This full-stack e-commerce application provides a comprehensive set of functionalities for both customers and administrators.

### User Features

* **Responsive User Interface:** A modern and intuitive design optimized for desktop, tablet, and mobile devices.
* **Product Catalog Browse:** Explore a wide range of products categorized for easy navigation.
* **Powerful Search & Filtering:** Efficiently find products using keywords and refine results by categories and price.
* **Detailed Product Pages:** View high-resolution images, descriptions, pricing, and related product suggestions.
* **Interactive Image Zoom:** Get a closer look at product images on detail pages.
* **Shopping Cart Management:** Add items, adjust quantities, and remove products from the cart seamlessly.
* **User Authentication:** Secure registration, login, and logout processes.
* **Order History:** Access a personal dashboard to view past orders and their details.
* **Secure Payment Gateway:** Integrated with **Stripe** for secure and reliable online payments.
* **Toast Notifications:** Real-time feedback to users for actions like adding to cart, login success, etc.

### Admin Features (Role-Based Access)

* **User Management:** View all registered users and update their roles (e.g., promote to 'ADMIN', demote to 'GENERAL').
* **Product Management:**
    * **Create Products:** Add new products to the inventory with all necessary details (name, brand, category, images, pricing).
    * **Update Products:** Modify existing product information.
    * (Future: Delete Products - can be easily extended)
* **Order Management:** View a comprehensive list of all customer orders, including payment and shipping details.

---

## Technologies Used

### Frontend

* **React.js:** A JavaScript library for building dynamic and interactive user interfaces.
* **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development and state management.
* **React Router DOM:** For declarative client-side routing.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Cloudinary:** For cloud-based image storage and delivery.
* **Stripe.js:** Frontend integration for Stripe Checkout.
* **React Toastify:** For elegant toast notifications.
* **Moment.js:** For date and time formatting.
* **React Icons:** A library providing popular SVG icons.

### Backend

* **Node.js:** JavaScript runtime environment.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** A NoSQL document database for data storage.
* **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **JWT (JSON Web Tokens):** For secure user authentication and session management.
* **Bcrypt.js:** For hashing and salting passwords to enhance security.
* **Cookie-Parser:** Middleware to parse cookie headers.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing.
* **Stripe Node.js Library:** Backend integration for Stripe payments and webhooks.
* **Dotenv:** For loading environment variables from a `.env` file.

---

## Project Structure

### Frontend Structure

├── src/
│   ├── assest/              # Static assets (images)
│   ├── common/              # Common constants, API endpoints, roles
│   ├── components/          # Reusable UI components (Header, Footer, Cards, Modals)
│   ├── context/             # React Context for global state/functions (e.g., cart count)
│   ├── helpers/             # Utility functions (e.g., currency formatter, image upload)
│   ├── pages/               # Main application views/pages (Home, Login, AdminPanel)
│   ├── store/               # Redux Toolkit store and slices (user slice)
│   ├── App.css              # Global CSS and Tailwind overrides
│   ├── App.js               # Main React application component
│   ├── index.js             # Entry point of the React app
│   └── router/              # React Router configuration
├── .env.example             # Example frontend environment variables

### Backend Structure

Given you've provided both the frontend and backend code, I'll create a single, comprehensive README file that covers both parts of your e-commerce project. This will provide a holistic view for anyone looking at your GitHub repository.

Markdown

# Full-Stack E-commerce Application

This repository contains the complete codebase for a modern full-stack e-commerce platform. The application offers a rich shopping experience for users, featuring product Browse, detailed product views, a shopping cart, secure payment processing, and robust authentication. Administrators gain access to a dedicated panel for managing users, products, and orders.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
  - [Frontend Structure](#frontend-structure)
  - [Backend Structure](#backend-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Key Functionalities Explained](#key-functionalities-explained)
  - [Authentication & Authorization](#authentication--authorization)
  - [Product Management](#product-management)
  - [Shopping Cart](#shopping-cart)
  - [Order & Payment Processing](#order--payment-processing)
  - [Admin Panel](#admin-panel)
- [Contributing](#contributing)
- [License](#license)

---

## Features

This full-stack e-commerce application provides a comprehensive set of functionalities for both customers and administrators.

### User Features

* **Responsive User Interface:** A modern and intuitive design optimized for desktop, tablet, and mobile devices.
* **Product Catalog Browse:** Explore a wide range of products categorized for easy navigation.
* **Powerful Search & Filtering:** Efficiently find products using keywords and refine results by categories and price.
* **Detailed Product Pages:** View high-resolution images, descriptions, pricing, and related product suggestions.
* **Interactive Image Zoom:** Get a closer look at product images on detail pages.
* **Shopping Cart Management:** Add items, adjust quantities, and remove products from the cart seamlessly.
* **User Authentication:** Secure registration, login, and logout processes.
* **Order History:** Access a personal dashboard to view past orders and their details.
* **Secure Payment Gateway:** Integrated with **Stripe** for secure and reliable online payments.
* **Toast Notifications:** Real-time feedback to users for actions like adding to cart, login success, etc.

### Admin Features (Role-Based Access)

* **User Management:** View all registered users and update their roles (e.g., promote to 'ADMIN', demote to 'GENERAL').
* **Product Management:**
    * **Create Products:** Add new products to the inventory with all necessary details (name, brand, category, images, pricing).
    * **Update Products:** Modify existing product information.
    * (Future: Delete Products - can be easily extended)
* **Order Management:** View a comprehensive list of all customer orders, including payment and shipping details.

---

## Technologies Used

### Frontend

* **React.js:** A JavaScript library for building dynamic and interactive user interfaces.
* **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development and state management.
* **React Router DOM:** For declarative client-side routing.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Cloudinary:** For cloud-based image storage and delivery.
* **Stripe.js:** Frontend integration for Stripe Checkout.
* **React Toastify:** For elegant toast notifications.
* **Moment.js:** For date and time formatting.
* **React Icons:** A library providing popular SVG icons.

### Backend

* **Node.js:** JavaScript runtime environment.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** A NoSQL document database for data storage.
* **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **JWT (JSON Web Tokens):** For secure user authentication and session management.
* **Bcrypt.js:** For hashing and salting passwords to enhance security.
* **Cookie-Parser:** Middleware to parse cookie headers.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing.
* **Stripe Node.js Library:** Backend integration for Stripe payments and webhooks.
* **Dotenv:** For loading environment variables from a `.env` file.

---

## Project Structure

### Frontend Structure

├── src/
│   ├── assest/              # Static assets (images)
│   ├── common/              # Common constants, API endpoints, roles
│   ├── components/          # Reusable UI components (Header, Footer, Cards, Modals)
│   ├── context/             # React Context for global state/functions (e.g., cart count)
│   ├── helpers/             # Utility functions (e.g., currency formatter, image upload)
│   ├── pages/               # Main application views/pages (Home, Login, AdminPanel)
│   ├── store/               # Redux Toolkit store and slices (user slice)
│   ├── App.css              # Global CSS and Tailwind overrides
│   ├── App.js               # Main React application component
│   ├── index.js             # Entry point of the React app
│   └── router/              # React Router configuration
├── .env.example             # Example frontend environment variables


### Backend Structure

├── config/                  # Database connection and Stripe configuration
│   ├── db.js                # MongoDB connection setup
│   └── stripe.js            # Stripe API key initialization
├── controllers/             # Logic for handling API requests
│   ├── order/               # Order-related controllers (payment, webhooks, order history)
│   ├── product/             # Product-related controllers (CRUD, search, filter)
│   ├── user/                # User-related controllers (cart management)
│   └── (root)/              # Core user controllers (signup, login, user details, all users)
├── helper/                  # Backend utility functions (e.g., product upload permission)
├── middleware/              # Express middleware (e.g., authentication token verification)
│   └── authToken.js         # JWT token verification middleware
├── models/                  # Mongoose schemas and models for MongoDB collections
│   ├── cartProduct.js       # Schema for items in user carts
│   ├── orderProductModel.js # Schema for customer orders
│   ├── productModel.js      # Schema for products
│   └── userModel.js         # Schema for users
├── routers/                 # Express router for defining API routes
│   └── index.js             # Centralized route definitions
├── .env.example             # Example backend environment variables
├── server.js                # Main server file (Express app setup)

---

## Getting Started

Follow these steps to set up and run the full-stack application locally.

### Prerequisites

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js) or Yarn
* **MongoDB** (running locally or a cloud instance like MongoDB Atlas)

### Environment Variables

Both the frontend and backend require specific environment variables. Create separate `.env` files in the **root directory of both the `frontend` and `backend` folders**, mirroring the `.env.example` files.

#### Frontend `.env` (in `frontend/.env`)
REACT_APP_BACKEND_URL=http://localhost:8080/api  # Your backend URL
REACT_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key

#### Backend `.env` (in `backend/.env`)
PORT=8080
MONGODB_URL=mongodb://localhost:27017/ecommerce_db # Your MongoDB connection string
TOKEN_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000 # Your frontend URL
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=whsec_your_stripe_webhook_secret (optional for local testing)

**Note:** For `STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY`, you'll typically get this from your Stripe dashboard when setting up a webhook. For local development, you might use the Stripe CLI to forward webhooks.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-folder-name>
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    # or
    yarn install
    cd ..
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    # or
    yarn install
    cd ..
    ```

### Running the Application

1.  **Start the Backend Server:**
    Navigate to the `backend` directory in your terminal:
    ```bash
    cd backend
    npm start
    # or
    yarn start
    ```
    You should see `Server is running at port 8080` and `Database connection successful` in your console.

2.  **Start the Frontend Development Server:**
    Open a **new terminal window**, navigate to the `frontend` directory:
    ```bash
    cd frontend
    npm start
    # or
    yarn start
    ```
    The frontend application will open in your browser at `http://localhost:3000`.

---

## API Endpoints

The backend exposes a RESTful API for various functionalities. All endpoints are prefixed with `/api`.

| Method | Endpoint                     | Description                                    | Authentication |
| :----- | :--------------------------- | :--------------------------------------------- | :------------- |
| `POST` | `/signup`                    | Register a new user                            | None           |
| `POST` | `/login`                     | Authenticate user and set JWT cookie           | None           |
| `GET`  | `/user-details`              | Get details of the currently logged-in user    | Required       |
| `GET`  | `/logout`                    | Log out the current user and clear cookie      | Required       |
| `GET`  | `/all-users`                 | Get a list of all registered users (Admin only)| Required       |
| `POST` | `/update-user-role`          | Update a user's role (Admin only)              | Required       |
| `POST` | `/upload-product`            | Upload a new product (Admin only)              | Required       |
| `GET`  | `/get-all-products`          | Get all products                               | None           |
| `POST` | `/update-product`            | Update product details (Admin only)            | Required       |
| `GET`  | `/get-categoryProduct`       | Get a list of distinct product categories      | None           |
| `POST` | `/category-product`          | Get products by a specific category            | None           |
| `POST` | `/product-details`           | Get details of a single product by ID          | None           |
| `GET`  | `/search?q={query}`          | Search for products by name or category        | None           |
| `POST` | `/filter-product`            | Filter products by multiple categories         | None           |
| `POST` | `/addtocart`                 | Add a product to the user's cart               | Required       |
| `GET`  | `/countAddToCartProduct`     | Get the total count of items in the user's cart| Required       |
| `GET`  | `/view-cart-product`         | View all products in the user's cart           | Required       |
| `POST` | `/update-cart-product`       | Update quantity of a product in the cart       | Required       |
| `POST` | `/remove-product-from-cart`  | Remove a product from the cart                 | Required       |
| `POST` | `/checkout`                  | Initiate Stripe checkout session               | Required       |
| `POST` | `/webhook`                   | Stripe webhook endpoint for payment events     | None           |
| `GET`  | `/order-list`                | Get current user's order history               | Required       |
| `GET`  | `/all-order`                 | Get all orders (Admin only)                    | Required       |

---

## Key Functionalities Explained

### Authentication & Authorization

* **User Model:** Defines the schema for users including `name`, `email`, `password`, `profilePic`, and `role` (GENERAL/ADMIN). Email is unique and required.
* **Password Hashing:** Passwords are securely hashed using `bcryptjs` before being stored in the database.
* **JWT for Sessions:** JSON Web Tokens are used to maintain user sessions. A token containing `email`, `password`, and `_id` is signed and sent as an `httpOnly` cookie upon successful login.
* **`authToken` Middleware:** This middleware verifies the JWT from the request cookies. If valid, it attaches the `userid` to the `req` object, allowing controllers to identify the authenticated user.
* **Role-Based Access:** The `uploadProductPermission` helper and specific controllers (e.g., `allOrderController`, `updateUserRole`) check the user's `role` to restrict access to administrative functions, ensuring only 'ADMIN' users can perform certain actions.

### Product Management

* **Product Model:** Defines fields like `productName`, `brandName`, `category`, `productImage` (array of URLs), `description`, `price`, and `sellingPrice`.
* **Admin-only Product Upload/Update:** The `uploadProductController` and `updateProductController` are protected by the `authToken` middleware and an additional `uploadProductPermission` helper to ensure only administrators can create or modify products.
* **Image Handling:** Product images are uploaded to **Cloudinary** from the frontend, and their URLs are stored in the `productImage` array in the database.
* **Product Views:** Endpoints are available to fetch all products, products by category, and individual product details.
* **Search & Filter:** `seachProduct` uses a regex query on `productName` and `category` for flexible searching. `filterProduct` allows filtering by multiple selected categories.

### Shopping Cart

* **`addToCartModel`:** Stores `productId`, `quantity`, and `userId` to track items in a user's cart. `productId` is referenced to the `productModel` for easy population of product details.
* **`addToCartController`:** Handles adding products to the cart, preventing duplicates for the same user.
* **Cart View & Count:** `addToCartViewProduct` fetches all items in a user's cart, populating product details. `countAddToCartProduct` provides the total number of unique items in the cart.
* **Quantity Updates & Removal:** `updateAddToCartProduct` allows users to change product quantities, and `removeProductFromCart` facilitates item removal from the cart.

### Order & Payment Processing

* **`orderModel`:** Stores comprehensive order details including `productDetails`, `email`, `userid`, `paymentDetails` (Stripe payment ID, method, status), `shipping_options`, and `totalAmount`.
* **Stripe Integration:**
    * **Checkout Session (`paymentController`):** When a user proceeds to checkout, the `paymentController` creates a Stripe Checkout Session. This session is pre-filled with cart items, user email, and sets up success/cancel URLs. `shipping_options` are defined, and `metadata` is used to pass the `userId` to Stripe.
    * **Webhooks (`webhooks` controller):** Stripe's webhook endpoint receives events (e.g., `checkout.session.completed`). Upon successful payment, this controller:
        1.  Retrieves `lineItems` from the Stripe session to get product details.
        2.  Creates a new `orderModel` entry with all transaction and product data.
        3.  **Clears the user's cart** (`addToCartModel.deleteMany`) after a successful order, ensuring a clean shopping experience.
* **Order History:** `orderController` allows users to view their past orders, sorted by the latest first. `allOrderController` is an admin-only endpoint to fetch all orders across the platform.

### Admin Panel

* **Role Check:** The frontend `AdminPanel.jsx` component includes a `useEffect` hook to redirect non-admin users if they try to access the admin panel, providing client-side protection. The backend controllers provide server-side validation.
* **User & Product Management Interfaces:** Dedicated pages (`AllUsers.jsx`, `AllProducts.jsx`, `AllOrders.jsx`) provide tabular views and interactive forms for managing data.
* **Modals:** `UploadProduct`, `AdminEditProduct`, and `ChangeUserRole` components use modals for a focused user experience when performing administrative tasks.

---

## Contributing

Contributions are highly welcome! If you have suggestions for improvements, bug fixes, or new features, please follow these steps:

1.  **Fork** the repository.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
3.  **Make your changes**, ensuring they adhere to the existing code style.
4.  **Write clear, concise commit messages**.
5.  **Push your branch** to your forked repository: `git push origin feature/your-feature-name`.
6.  **Open a Pull Request** to the `main` branch of this repository, describing your changes in detail.

---
