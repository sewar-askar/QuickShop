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
import DiscountModal from "../components/DiscountModal ";
import FAQSection from "../components/FAQSection";

const testimonials = [
  {
    photo: "https://img.icons8.com/?size=256&id=7821&format=png",
    name: "John Doe",
    rating: 5,
    quote: "Great product! Highly recommend!",
  },
  {
    photo: "https://img.icons8.com/?size=256&id=23239&format=png",
    name: "Jane Smith",
    rating: 5,
    quote: "Excellent service and quality.",
  },
  {
    photo: "https://img.icons8.com/?size=256&id=20751&format=png",
    name: "Alice Johnson",
    rating: 5,
    quote: "Will buy again. Very satisfied!",
  },
];

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking number provided in your order confirmation email.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping charges and times vary depending on your location.",
  },
];

function HomePage() {
  const { t } = useTranslation();
  return (
    <motion.div>
      <Helmet>
        <title>QuickShop - {t("home")}</title>
        <meta
          name="description"
          content="Discover amazing products at great prices on QuickShop's!"
        />
      </Helmet>
      <DiscountModal />
      <HeroSection t={t} />
      <div className="mt-12">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          {t("best_sellers")}
        </h2>
        <BestSellers />
      </div>
      <div className="relative h-12 mt-12">
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              d="M0,48 L48,36 L96,48 L144,36 L192,48 L240,36 L288,48 L336,36 L384,48 L432,36 L480,48 L528,36 L576,48 L624,36 L672,48 L720,36 L768,48 L816,36 L864,48 L912,36 L960,48 L1008,36 L1056,48 L1104,36 L1152,48 L1200,36 L1248,48 L1296,36 L1344,48 L1392,36 L1440,48 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="bg-gray-200 pt-12">
        <TestimonialsSection />
      </div>
      <div className="bg-gray-200 pt-12">
        <FAQSection faqData={faqData} />
      </div>
    </motion.div>
  );
}

const HeroSection = ({ t }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src="https://scontent.fcai22-2.fna.fbcdn.net/v/t1.6435-9/135607471_189812262850719_2919503723434041457_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=06a7ca&_nc_ohc=ZdwSPDdtq7EQ7kNvgFhhNuJ&_nc_ht=scontent.fcai22-2.fna&oh=00_AYDtM3LgXJhO2batZ7RTGInxop4iFnwHlAVTpDjLXnzAeg&oe=66C3A85F"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        className="relative z-20 text-center text-white max-w-4xl px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8">
          {t("discover")}
        </h1>
        <a href="/products" className="inline-block">
          <button className="bg-white text-black px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-full text-sm md:text-lg font-semibold hover:bg-gray-200 transition duration-300">
            {t("shop_now")}
          </button>
        </a>
      </motion.div>
    </section>
  );
};

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

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="bg-white py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          What Our Clients Say
        </h2>
        <div className="container mx-auto px-4">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-teal-500"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <div className="flex text-teal-500">
                        {Array(testimonial.rating)
                          .fill()
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg italic">
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default HomePage;
