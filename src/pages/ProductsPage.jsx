import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaSearch, FaStar } from "react-icons/fa";
import truncateTitle from "../utils/truncateTitle";

const API_URL = "https://fakestoreapi.com/products";
const INITIAL_PRICE_RANGE = [0, 1000];

const useProductsFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        setError(error);
        toast.error("Failed to fetch products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, categories, error };
};

const useProductFiltering = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(INITIAL_PRICE_RANGE);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filterProducts = () => {
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
    };

    filterProducts();
  }, [searchTerm, selectedCategory, priceRange, products]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    filteredProducts,
  };
};

const SearchBar = ({ searchTerm, setSearchTerm, t }) => (
  <div className="relative flex-1 w-full">
    <input
      type="text"
      placeholder={t("search_products")}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-black focus:ring focus:ring-blue-200 transition duration-300"
      aria-label="Search products"
    />
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

const FilterOptions = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  t,
}) => (
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
        min={INITIAL_PRICE_RANGE[0]}
        max={INITIAL_PRICE_RANGE[1]}
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([INITIAL_PRICE_RANGE[0], Number(e.target.value)])
        }
        className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
        aria-label="Filter by price range"
      />
      <span className="whitespace-nowrap">
        {t("max_price")}: ${priceRange[1]}
      </span>
    </div>
  </div>
);

const ProductCard = ({ product, t }) => {
  // Hardcoded values for now, to be made dynamic later
  const isOnSale = true;
  const oldPrice = product.price;
  const newPrice = (product.price * 0.8).toFixed(2);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl relative"
      initial="hidden"
      animate="show"
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
          {truncateTitle(product.title, 30)}
        </h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 mr-1" />
          ))}
          <span className="text-gray-600 ml-2">(4.5)</span>
        </div>
        <div className="flex items-baseline mb-4">
          {isOnSale ? (
            <>
              <span className="text-green-600 font-bold mr-2 text-2xl">
                New
              </span>
              <span className="text-2xl font-bold text-green-600 mr-2">
                ${newPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${oldPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <Link to={`/product/${product.id}`}>
          <motion.button
            className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black border border-black transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("view_details")}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

function ProductsPage() {
  const { t } = useTranslation();
  const { products, loading, categories, error } = useProductsFetch();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    filteredProducts,
  } = useProductFiltering(products);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#fff" size={50} />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to fetch products.");
    return null;
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
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          t={t}
        />
        <motion.button
          className="w-full sm:w-auto bg-black text-white p-3 rounded-lg hover:bg-white hover:text-black border border-black transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("search")}
        </motion.button>
      </div>
      <FilterOptions
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        t={t}
      />
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
          <ProductCard key={product.id} product={product} t={t} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ProductsPage;
