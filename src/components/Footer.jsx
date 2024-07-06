import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <motion.footer
      className="p-4 mt-12 bg-gray-800 text-gray-300 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p>
        &copy; 2024 QuickShop. {t("all_rights_reserved")} |{" "}
        {t("privacy_policy")} | {t("terms_of_service")}
      </p>
    </motion.footer>
  );
}

export default Footer;
