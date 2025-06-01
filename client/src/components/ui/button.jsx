import React from "react";
import { clsx } from "clsx"; // Utility for conditional classnames (optional)

const Button = React.forwardRef(
  (
    {
      variant = "default", // default variant
      size = "md", // default size
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Define styles for different variants and sizes
    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
      ghost: "bg-transparent text-blue-500 hover:bg-blue-100",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
