import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import About from "./components/HomePage/About.jsx";
import EventList from "./components/EventList/EventList.jsx";
import EventDetail from "./components/EventList/EventDetail.jsx";
import Cart from "./components/EventList/Cart.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Orders from "./components/Orders/Orders.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventList /> },
      { path: "events/:id", element: <EventDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "orders", element: <Orders /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
);
