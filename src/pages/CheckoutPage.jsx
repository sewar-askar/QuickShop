import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import ProgressBar from "../components/ProgressBar";
import { combineCartItems } from "../utils/combineCartItems";
import emailjs from "emailjs-com";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    const combinedCart = combineCartItems(cart);
    setCart(combinedCart);
  }, []);

  const CheckoutSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const emailParams = {
      from_name: values.name,
      from_email: values.email,
      to_name: values.name,
      phone: values.phone,
      address: values.address,
      items: cart.map((item) => `${item.name} (x${item.quantity})`),
      total: (
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        5.0 +
        3.0
      ).toFixed(2),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then((response) => {
        setSubmitting(false);
        setOrderSummary({ ...values, items: cart });
        setCart([]);
        localStorage.setItem(
          "orderSummary",
          JSON.stringify({ ...values, items: cart })
        );
        toast.success("Order placed successfully and email sent!");
        navigate("/order-summary");
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error("Failed to send email. Please try again.");
      });
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const taxes = 3.0;
  const total = subtotal + shipping + taxes;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <ProgressBar currentStep={2} />
      <div className="bg-white p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {t("checkout")}
        </h2>
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
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <p className="text-gray-800">{item.name}</p>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-800 font-bold">${item.price}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <p className="flex justify-between text-gray-700">
                      <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-gray-700">
                      <span>Shipping</span> <span>${shipping.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-gray-700">
                      <span>Taxes</span> <span>${taxes.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span> <span>${total.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    Shipping Information
                  </h3>
                  <div>
                    <label className="block text-gray-700" htmlFor="address">
                      Address
                    </label>
                    <Field
                      id="address"
                      name="address"
                      className="w-full p-2 mt-2 rounded-lg bg-white text-gray-800 border border-gray-300"
                    />
                    {errors.address && touched.address ? (
                      <div className="text-red-500">{errors.address}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div>
                  <label className="block text-gray-700" htmlFor="name">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="w-full p-2 mt-2 rounded-lg bg-white text-gray-800 border border-gray-300"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-500">{errors.name}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-2 mt-2 rounded-lg bg-white text-gray-800 border border-gray-300"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700" htmlFor="phone">
                    Phone
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    className="w-full p-2 mt-2 rounded-lg bg-white text-gray-800 border border-gray-300"
                  />
                  {errors.phone && touched.phone ? (
                    <div className="text-red-500">{errors.phone}</div>
                  ) : null}
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-black text-white hover:bg-white hover:text-black border border-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : t("place_order")}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
