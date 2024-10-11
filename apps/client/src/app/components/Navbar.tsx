import React, { useCallback, useState } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import { Award, Home, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItems {
  name: string
  href: string
  icon: React.ElementType
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("/")

  const navItems: NavItems[] = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Mes certificats", href: "/certificates", icon: Award },
    { name: "Mon compte", href: "/account", icon: User },
  ];

  const handleNavClick = useCallback((href: string) => {
    setActiveTab(href)
    setIsOpen(false)
  }, [])

  return (
    <Router>
      <nav className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0" onClick={() => handleNavClick("/")}>
                <span className="sr-only">PPS Easy Logo</span>
                <div className="w-8 h-8 bg-primary rounded-full" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeTab === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open main menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeTab === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        onClick={() => handleNavClick(item.href)}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
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
    </Router>
  )
}
