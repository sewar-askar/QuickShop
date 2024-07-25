import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ProgressBar from "../components/ProgressBar";

const OrderSummaryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const orderSummary = JSON.parse(localStorage.getItem("orderSummary"));

  if (!orderSummary) {
    navigate("/");
    return null;
  }

  return (
    <motion.div
      className="container mx-auto mt-12 p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ProgressBar currentStep={3} />
      <div className="bg-white shadow-lg rounded-lg p-8 min-w-4xl mx-auto border border-gray-40">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {t("order_summary")}
        </h2>
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <p className="text-gray-700 text-center mb-6">{t("thank_you")}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {t("order_details")}
            </h3>
            <p className="text-gray-800 mb-2">
              {t("name")}: {orderSummary.name}
            </p>
            <p className="text-gray-800 mb-2">
              {t("email")}: {orderSummary.email}
            </p>
            <p className="text-gray-800 mb-2">
              {t("phone")}: {orderSummary.phone}
            </p>
            <p className="text-gray-800 mb-2">
              {t("address")}: {orderSummary.address}
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-4 text-gray-800">
              {t("items_ordered")}
            </h4>
            <ul className="list-disc list-inside text-gray-800 space-y-2">
              {orderSummary.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">
                    {item.title} (x{item.quantity})
                  </span>
                  <span className="text-gray-800 font-bold">${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryPage;
