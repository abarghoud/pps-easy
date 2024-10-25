import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@pps-easy/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@pps-easy/ui/mode-toggle";

interface FooterLink {
  href: string;
  name: string;
}

interface SocialLink {
  href: string;
  icon: React.ElementType;
  name: string;
}

export const Footer: FC = () => {
  const footerLinks: FooterLink[] = [
    { name: "À propos", href: "/about" },
    { name: "Conditions d'utilisation", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks: SocialLink[] = [
    { name: "Github", href: "https://github.com/abarghoud/pps-easy", icon: GitHubLogoIcon },
    { name: "Email", href: "/contact-form", icon: Mail },
  ];

  return (
    <footer className="bg-background border-t border-border shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="flex items-center justify-center"
                  >
                    <link.icon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                </Button>
              ))}
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PPS Easy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
