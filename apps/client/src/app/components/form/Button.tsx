import { FC, ReactElement } from "react";
import { cn } from "@pps-easy/shadcn/utils";
import { Button as ShadcnButton } from "@pps-easy/ui/button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement;
  label: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const Button: FC<ButtonProps> = ({ label, className, variant = "default", ...props }) => {
  const baseStyles = "w-full px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 hover:text-white focus:ring-gray-500",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    ghost: "text-blue-600 hover:bg-blue-50 hover:text-blue-800 focus:ring-blue-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 hover:text-white focus:ring-red-500",
    link: "text-blue-600 hover:underline focus:ring-blue-500"
  };

  return (
    <ShadcnButton
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {props.icon}
      {label}
    </ShadcnButton>
  );
};
