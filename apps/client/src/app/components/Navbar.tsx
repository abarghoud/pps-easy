import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Home, Menu, User } from "lucide-react";

import { Button } from "@pps-easy/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@pps-easy/ui/sheet";

interface NavItems {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");

  const navItems: NavItems[] = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Mes certificats", href: "/certificates", icon: Award },
    { name: "Mon compte", href: "/account", icon: User },
  ];

  const handleNavClick = useCallback((href: string) => {
    setActiveTab(href);
    setIsOpen(false);
  }, []);

  return (
    <nav className="bg-background border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${activeTab === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  onClick={() => handleNavClick(item.href)}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-background transition-colors duration-200 ease-in-out rounded-full"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${activeTab === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      onClick={() => handleNavClick(item.href)}
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
