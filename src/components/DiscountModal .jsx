import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const DiscountModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY > window.innerHeight / 2 &&
        !Cookies.get("modalShown")
      ) {
        setIsOpen(true);
        Cookies.set("modalShown", "true", { expires: 1 }); // 1 day
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl sm:text-3xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Limited Time Offer!
            </h2>
            <img
              src="https://i.ibb.co/TMhxmkY/lettering-lettering-flash-sale-with-coins-and-percent-sign-text.png"
              alt="Flash Sale"
              className="mx-auto mb-4 h-24 sm:h-28 md:h-32 shadow-lg rounded-lg"
            />
            <p className="text-center text-white text-base sm:text-lg mb-6">
              Enjoy 20% off on all products. Hurry, shop now and save big!
            </p>
            <button
              onClick={() => (window.location.href = "/products")}
              className="bg-black text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full w-full hover:bg-white hover:text-black border border-black hover:border-gray-300 transition-colors duration-200 shadow-lg text-sm sm:text-base"
            >
              Shop Now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscountModal;
