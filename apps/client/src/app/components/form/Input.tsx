import { FC } from "react";
import { cn } from "@pps-easy/shadcn/utils";
import { Input as ShadcnInput } from "@pps-easy/ui/input";
import { Label } from "@pps-easy/ui/label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const Input: FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <Label className="text-sm text-white">{label}</Label>}
      <ShadcnInput
        className={cn(
          "p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-primary",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
