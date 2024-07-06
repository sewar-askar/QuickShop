import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
      className="container mx-auto mt-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white border-2 border-gray-400  p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-black">
          {t("order_summary")}
        </h2>
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <p className="text-black">{t("thank_you")}</p>
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-xl font-bold p-1 text-black">
              {t("order_details")}
            </h3>
            <p className="text-black p-1">
              {t("name")}: {orderSummary.name}
            </p>
            <p className="text-black p-1">
              {t("email")}: {orderSummary.email}
            </p>
            <p className="text-black p-1">
              {t("phone")}: {orderSummary.phone}
            </p>
            <p className="text-black p-1">
              {t("address")}: {orderSummary.address}
            </p>
            <h4 className="text-lg font-bold text-white mt-4">
              {t("items_ordered")}
            </h4>
            <ul className="list-disc list-inside text-black">
              {orderSummary.items.map((item, index) => (
                <li key={index}>
                  {item.title} - ${item.price}
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
