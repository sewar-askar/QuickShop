import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
        const categories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(categories);
      } catch (error) {
        toast.error("Failed to fetch products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#fff" size={50} />
      </div>
    );
  }

  return (
    <motion.div
      className="container px-4 sm:px-6 lg:px-8 mx-auto mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>QuickShop - {t("products")}</title>
        <meta
          name="description"
          content="Browse our extensive range of products on QuickShop."
        />
      </Helmet>
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        {t("our_products")}
      </h2>
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder={t("search_products")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
            aria-label="Search products"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <motion.button
          className="w-full sm:w-auto bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("search")}
        </motion.button>
      </div>
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
          aria-label="Filter by category"
        >
          <option value="">{t("all_categories")}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex items-center w-full sm:w-2/3 gap-4">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
            className="w-full"
            aria-label="Filter by price range"
          />
          <span className="whitespace-nowrap">
            {t("max_price")}: ${priceRange[1]}
          </span>
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <motion.div
              className="relative overflow-hidden h-64 flex justify-center items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {product.title}
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${product.price}
              </p>
              <Link to={`/product/${product.id}`}>
                <motion.button
                  className="w-full bg-indigo-600 text-white  px-6 py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("view_details")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
export default ProductsPage;
