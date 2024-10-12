import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Mail } from "lucide-react";

import { Button } from "@pps-easy/ui/button";

interface FooterLink {
  name: string
  href: string
}

interface SocialLink {
  name: string
  href: string
  icon: React.ElementType
}

export const Footer = () => {
  const footerLinks: FooterLink[] = [
    { name: "À propos", href: "/about" },
    { name: "Conditions d'utilisation", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks: SocialLink[] = [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "Email", href: "mailto:contact@example.com", icon: Mail },
  ]

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">PPS Easy</h3>
            <p className="text-sm text-muted-foreground">
              Simplifiez la gestion de vos certificats avec PPS Easy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <link.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PPS Easy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
