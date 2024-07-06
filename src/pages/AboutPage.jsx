import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

function AboutPage() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="container  px-16 mx-auto mt-12 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>{t("about_us")}</title>
        <meta name="description" content="Learn more about QuickShop" />
      </Helmet>
      <h2 className="text-3xl font-bold mb-8 mx-4">{t("about_us")}</h2>
      <p className="text-lg  mx-4">{t("about_description")}</p>
      <div className="mt-8  mx-4"></div>
    </motion.div>
  );
}
export default AboutPage;
