import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHome, FaInfoCircle, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { CartContext } from "../context/CartContext";

function NavBar({ changeLanguage }) {
  const { t } = useTranslation();
  const { cart } = useContext(CartContext);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-white text-black border-b-4 border-black p-4 shadow-md flex justify-between items-center container px-16 mx-auto"
      aria-label="Main Navigation"
    >
      <Link to="/" className="text-2xl font-bold flex items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
        >
          <FaHome className="inline-block mr-2" aria-hidden="true" />
        </motion.div>
        <span aria-label="QuickShop">QuickShop</span>
      </Link>
      <div className="flex space-x-6 text-black">
        <Link to="/" className="hover:text-gray-500 flex items-center">
          <FaHome className="mr-1" aria-hidden="true" /> {t("home")}
        </Link>
        <Link to="/products" className="hover:text-gray-500 flex items-center">
          <FaSearch className="mr-1" aria-hidden="true" /> {t("products")}
        </Link>
        <Link to="/cart" className="hover:text-gray-500 flex items-center">
          <FaShoppingCart className="mr-1" aria-hidden="true" /> {t("cart")}{" "}
          {cart.length}
        </Link>
        <Link to="/about" className="hover:text-gray-500 flex items-center">
          <FaInfoCircle className="mr-1" aria-hidden="true" /> {t("about")}
        </Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => changeLanguage("en")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("ar")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          AR
        </button>
      </div>
    </motion.nav>
  );
}

export default NavBar;
