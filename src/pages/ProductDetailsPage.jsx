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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch product details.");
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
      price: product.price,
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
          <div className="md:flex-shrink-0 bg-gray-100 p-8 flex items-center justify-center">
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
              className="flex items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-3xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="ml-4 flex items-center">
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
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center w-full md:w-auto"
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
