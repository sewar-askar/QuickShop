import React from "react";
import {
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    {
      title: "Cart",
      subtitle: "Add items to your cart",
      icon: <ShoppingCartIcon className="h-6 w-6" />,
    },
    {
      title: "Checkout",
      subtitle: "Provide your information",
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
    },
    {
      title: "Confirmation",
      subtitle: "Order confirmation",
      icon: <CheckCircleIcon className="h-6 w-6" />,
    },
  ];

  const variant = {
    container: "flex items-center justify-between space-x-4",
    step: "flex-1 flex flex-col items-center",
    icon: "flex items-center justify-center w-12 h-12 rounded-full",
    line: "flex-1 h-0.5 mx-2",
  };

  const { container, step, icon, line } = variant;

  return (
    <div className="mb-8">
      <div className={container}>
        {steps.map((s, index) => (
          <React.Fragment key={index}>
            <div className={step}>
              <div
                className={`${icon} ${
                  currentStep === 3 && index === 2
                    ? "bg-green-500 text-white "
                    : currentStep >= index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s.icon}
              </div>
              <div
                className={`mt-2 text-sm font-medium ${
                  currentStep >= index + 1 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {s.title}
              </div>

              <div className="text-xs text-gray-400">{s.subtitle}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${line} ${
                  currentStep > index + 1 ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
