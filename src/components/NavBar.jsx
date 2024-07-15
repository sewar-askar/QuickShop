import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { CartContext } from "../context/CartContext";

function NavBar({ changeLanguage }) {
  const { t } = useTranslation();
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: "/", icon: FaHome, label: t("home") },
    { to: "/products", icon: FaSearch, label: t("products") },
    {
      to: "/cart",
      icon: FaShoppingCart,
      label: `${t("cart")} (${cart.length})`,
    },
    { to: "/about", icon: FaInfoCircle, label: t("about") },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-white text-black border-b-2 border-gray-200 p-4 shadow-sm"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 text-black">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-gray-500 flex items-center"
            >
              <item.icon className="mr-1" aria-hidden="true" /> {item.label}
            </Link>
          ))}
        </div>

        {/* Language buttons */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => changeLanguage("en")}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("ar")}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            AR
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hover:text-gray-500 flex items-center px-4 py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  <item.icon className="mr-2" aria-hidden="true" /> {item.label}
                </Link>
              ))}
              <div className="flex gap-4 mt-4 px-4">
                <button
                  onClick={() => {
                    changeLanguage("en");
                    toggleMenu();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    changeLanguage("ar");
                    toggleMenu();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  AR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default NavBar;
