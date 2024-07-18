import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaShoppingCart, FaTimes, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

function CartPage() {
  const { t } = useTranslation();
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    toast.success(t("remove"));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Helmet>
        <title>{t("cart")}</title>
        <meta
          name="description"
          content="Review your cart items and proceed to checkout."
        />
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t("your_cart")}</h2>
        <FaShoppingCart className="w-8 h-8 text-gray-600" />
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-4">
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("empty_cart")}
          </motion.p>
          <motion.img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
            alt="Empty Cart"
            className="mx-auto mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: "300px" }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center p-6 space-x-4"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                  onClick={() => removeFromCart(index)}
                  aria-label={t("remove")}
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="p-6 bg-gray-50">
            <Link to="/checkout">
              <motion.button
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t("proceed_checkout")}</span>
                <FaChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CartPage;
