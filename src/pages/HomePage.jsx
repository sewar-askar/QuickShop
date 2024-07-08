import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ImageGallery from "react-image-gallery";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
function HomePage() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="container mx-auto px-16 mt-12 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>QuickShop - {t("home")}</title>
        <meta
          name="description"
          content="Discover amazing products at great prices on QuickShop's !"
        />
      </Helmet>
      <h1 className="text-5xl font-bold mb-6">{t("welcome")}</h1>
      <p className="text-xl mb-8">{t("discover")}</p>
      <Link to="/products">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          {t("shop_now")}
        </button>
      </Link>
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">{t("best_sellers")}</h2>
        <BestSellers />
      </div>
    </motion.div>
  );
}

function BestSellers() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=3"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  const images = products.map((product) => ({
    original: product.image,
    originalTitle: product.title,
    originalAlt: product.title,
    description: `${product.title} - $${product.price}`,
    originalClass: "fixed-dimensions bg-gray-500 rounded-lg w-full",
    loading: "lazy",
    productId: product.id,
  }));

  const renderItem = (item) => (
    <Link to={`/product/${item.productId}`} className="image-gallery-item">
      <div
        className="image-wrapper mx-auto"
        style={{ width: "300px", height: "400px" }}
      >
        <img
          src={item.original}
          alt={item.originalAlt}
          title={item.originalTitle}
          className="image-gallery-image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="image-gallery-description">{item.description}</div>
    </Link>
  );

  return (
    <div className="best-sellers-gallery">
      <ImageGallery
        items={images}
        showBullets={true}
        lazyLoad={true}
        autoPlay={true}
        renderItem={renderItem}
      />
    </div>
  );
}

export default HomePage;
