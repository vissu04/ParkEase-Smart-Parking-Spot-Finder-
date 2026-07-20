import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg focus:ring-emerald-500",
        secondary:
          "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };