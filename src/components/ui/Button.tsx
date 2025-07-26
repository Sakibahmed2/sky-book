import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = "default",
    size = "md",
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-sm  transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
        default: "bg-indigo-600 text-white hover:bg-indigo-700",
        outline: "border border-indigo-300 text-indigo-800 hover:bg-indigo-50",
        ghost: "text-indigo-800 hover:bg-indigo-100",
        destructive: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizeStyles = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
    };

    return (
        <button
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
