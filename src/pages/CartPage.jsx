import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

function CartPage() {
  const { t } = useTranslation();
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    toast.success(t("remove"));
  };

  return (
    <motion.div
      className="container px-16 mx-auto mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>{t("cart")}</title>
        <meta
          name="description"
          content="Review your cart items and proceed to checkout."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-8">{t("your_cart")}</h2>
      {cart.length === 0 ? (
        <p className="text-lg">{t("empty_cart")}</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
                loading="lazy"
              />
              <p className="text-lg flex-1 ml-4">{item.title}</p>
              <p className="text-lg">${item.price}</p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-4"
                onClick={() => removeFromCart(index)}
              >
                {t("remove")}
              </button>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <Link to="/checkout">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg">
                {t("proceed_checkout")}
              </button>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
export default CartPage;
