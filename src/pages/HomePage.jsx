import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import truncateTitle from "../utils/truncateTitle";

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
          content="Discover amazing products at great prices on QuickShop's!"
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
          "https://fakestoreapi.com/products?limit=6"
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="max-w-4xl mx-auto">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="p-4">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">
              {truncateTitle(product.title)}
            </h3>
            <p className="text-lg text-gray-700">${product.price}</p>
          </motion.div>
        </Link>
      ))}
    </Slider>
  );
}

export default HomePage;
