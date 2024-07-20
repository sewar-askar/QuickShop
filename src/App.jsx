import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import { CartProvider } from "./context/CartContext.jsx";
import { useTranslation } from "react-i18next";

import i18n from "./i18n";

function App() {
  const { t, i18n } = useTranslation();
  const [cart, setCart] = useState([]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <CartProvider>
      <div className="w-full  bg-white text-black">
        <Helmet>
          <title>QuickShop</title>
          <meta
            name="description"
            content="QuickShop - Discover amazing products at great prices!"
          />
          <meta
            name="keywords"
            content="QuickShop, online shopping, best products, great prices"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="QuickShop" />
          <meta
            property="og:description"
            content="Discover amazing products at great prices!"
          />
          <meta property="og:image" content="URL_to__image" />
          <meta property="og:url" content="to_be_deployed" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
        </Helmet>
        <Navbar changeLanguage={changeLanguage} />
        <Suspense fallback={<ClipLoader color="#000" size={50} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
