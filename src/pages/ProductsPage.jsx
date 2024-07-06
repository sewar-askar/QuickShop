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
      className="container px-16 mx-auto mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>QuickShop - {t("products")}</title>
        <meta
          name="description"
          content="Browse our extensive range of products on QuickShop."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-8">{t("our_products")}</h2>
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder={t("search_products")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg mr-4 border border-black flex-1 text-black"
          aria-label="Search products"
        />
        <button className="bg-blue-600 text-white p-3 rounded-lg border-2 border-blue-500 hover:bg-blue-700">
          <FaSearch aria-hidden="true" />
        </button>
      </div>
      <div className="mb-8 flex items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-black rounded-lg mr-4 flex-1 text-black"
          aria-label="Filter by category"
        >
          <option value="">{t("all_categories")}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex items-center flex-1">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
            className="p-2 rounded-lg mr-4 flex-1"
            aria-label="Filter by price range"
          />
          <span>
            {t("max_price")}: ${priceRange[1]}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <motion.div key={product.id} whileHover={{ scale: 1.05 }}>
            <div className="bg-white border-1 border-black rounded-lg shadow-md p-6 text-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
                loading="lazy"
              />
              <h3 className="text-2xl mb-2">{product.title}</h3>
              <p className="text-lg text-black mb-4">${product.price}</p>
              <Link to={`/product/${product.id}`}>
                <button className="bg-white border border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white">
                  {t("view_details")}
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
export default ProductsPage;
