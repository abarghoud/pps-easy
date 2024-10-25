import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FileUser, Menu } from "lucide-react";
import { Button } from "@pps-easy/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@pps-easy/ui/sheet";
import { useAuth } from '../hooks/useAuth';

interface NavItems {
  name: string;
  href: string;
  icon: React.ElementType;
  onClick?: () => void;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems: NavItems[] = [
    { name: "Générer un certificat", href: "/", icon: FileUser },
    {
      name: "Logout",
      href: "/login",
      icon: LogOut,
      onClick: async () => {
        await logout();
        navigate('/login');
      },
    },
  ];

  const handleNavClick = useCallback((href: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else {
      setActiveTab(href);
    }
    setIsOpen(false);
  }, []);

  return (
    <nav className="bg-background border-b border-border shadow-lg transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-primary cursor-pointer">
            ⌘ PPS Easy
          </div>

          <div className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${activeTab === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                onClick={() => handleNavClick(item.href, item.onClick)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-background transition-colors duration-200 ease-in-out rounded-full"
                  aria-label="Open main menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 p-4 bg-background text-foreground shadow-lg rounded-lg">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${activeTab === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      onClick={() => handleNavClick(item.href, item.onClick)}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
