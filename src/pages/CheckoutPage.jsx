import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [orderSummary, setOrderSummary] = useState(null);

  const CheckoutSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      setOrderSummary({ ...values, items: cart });
      setCart([]);
      localStorage.setItem(
        "orderSummary",
        JSON.stringify({ ...values, items: cart })
      );
      toast.success("Order placed successfully!");
      navigate("/order-summary");
    }, 400);
  };

  return (
    <div className="container px-16 mx-auto mt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-dark">{t("checkout")}</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={CheckoutSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-black" htmlFor="name">
                  {t("name")}
                </label>
                <Field
                  id="name"
                  name="name"
                  className="w-full p-2 mt-2 rounded-lg bg-white text-black border border-gray-700"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-500">{errors.name}</div>
                ) : null}
              </div>
              <div>
                <label className="block text-black" htmlFor="email">
                  {t("email")}
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full p-2 mt-2 rounded-lg bg-white text-black border border-gray-700"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <label className="block text-black" htmlFor="phone">
                  {t("phone")}
                </label>
                <Field
                  id="phone"
                  name="phone"
                  className="w-full p-2 mt-2 rounded-lg bg-white text-black border border-gray-700"
                />
                {errors.phone && touched.phone ? (
                  <div className="text-red-500">{errors.phone}</div>
                ) : null}
              </div>
              <div>
                <label className="block text-black" htmlFor="address">
                  {t("address")}
                </label>
                <Field
                  id="address"
                  name="address"
                  className="w-full p-2 mt-2 rounded-lg bg-white text-black border border-gray-700"
                />
                {errors.address && touched.address ? (
                  <div className="text-red-500">{errors.address}</div>
                ) : null}
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="w-full p-2 mt-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : t("place_order")}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
