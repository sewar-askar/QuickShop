import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

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
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#fff" size={50} />
      </div>
    );
  }

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
    toast.success(t("add_to_cart"));
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
      className="container px-16 mx-auto mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
      <div
        className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start"
        aria-labelledby="product-details"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 max-h-80 object-contain mb-6 md:mb-0 rounded-lg"
          loading="lazy"
        />
        <div className="md:ml-8 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-4" id="product-details">
            {product.title}
          </h2>
          <p className="text-2xl font-bold mb-4 text-gray-600">
            ${product.price}
          </p>
          <p className="text-lg mb-6 text-gray-400 text-center md:text-left">
            {product.description}
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-white border border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white"
              onClick={addToCart}
            >
              {t("add_to_cart")}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetailsPage;
