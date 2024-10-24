import { Moon, Sun } from "lucide-react";
import { Button } from "@pps-easy/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pps-easy/ui/dropdown-menu";
import { useTheme } from "@pps-easy/ui/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center justify-center rounded-full p-2 transition-colors
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}
          `}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background shadow-lg rounded-md">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center">
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center">
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
