import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar } from "react-icons/fa";

function ProductDetailsPage() {
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        // Simulate sale data (remove this when backend provides actual sale data)
        const simulatedSaleData = {
          ...response.data,
          isOnSale: true,
          salePrice: (response.data.price * 0.8).toFixed(2),
        };
        setProduct(simulatedSaleData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError("Failed to fetch product details. Please try again later.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4B5563" size={60} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
    toast.success(t("add_to_cart_success"));
  };

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `https://yourwebsite.com/product/${product.id}`,
      priceCurrency: "USD",
      price: product.isOnSale ? product.salePrice : product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-6xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{product.title} - QuickShop</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-gray-100 p-8 flex items-center justify-center relative">
            {product.isOnSale && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Sale
              </div>
            )}
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-contain md:w-96 md:h-96"
              loading="lazy"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="p-8">
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {product.title}
            </motion.h2>
            <motion.div
              className="flex flex-wrap items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {product.isOnSale ? (
                <div className="flex items-baseline w-full sm:w-auto mb-2 sm:mb-0">
                  <span className="text-green-600 font-bold mr-2 text-3xl">
                    New
                  </span>
                  <span className="text-3xl font-bold text-green-600 mr-2">
                    ${product.salePrice}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-indigo-600 w-full sm:w-auto">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <div className="ml-0 sm:ml-4 flex items-center w-full sm:w-auto mt-2 sm:mt-0">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
                <span className="text-gray-600 ml-2">(4.5)</span>
              </div>
            </motion.div>
            <motion.p
              className="text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {product.description}
            </motion.p>
            <motion.button
              className="bg-black border border-black text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 flex items-center justify-center w-full sm:w-auto"
              onClick={addToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart className="mr-2" />
              {t("add_to_cart")}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetailsPage;
