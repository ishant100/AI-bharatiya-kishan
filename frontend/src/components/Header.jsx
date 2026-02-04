import { useEffect, useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsPopover } from "@/components/SettingsPopover";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/new-logo.png";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation("common");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur shadow-sm border-border"
          : "bg-transparent border-transparent"
      ].join(" ")}
    >
      <div className="container mx-auto px-4 h-22 flex items-center justify-between">
        {/* Brand (no background behind logo) */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="App logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0 block"
          />
          <div className="animate-fade-in">
            <h1 className="text-xl font-bold text-black">BHARTI-kisan ai</h1>
            <p className="text-sm text-gray-600">{t("subtitle")}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-black hover:text-gray-700" to="/">{t("nav.home")}</Link>
          <Link className="text-black hover:text-gray-700" to="/chat">{t("chat.title")}</Link>
          <Link className="text-black hover:text-gray-700" to="/weather">{t("weather.title")}</Link>
          <Link className="text-black hover:text-gray-700" to="/contacts">{t("nav.contacts")}</Link>
          <Link className="text-black hover:text-gray-700" to="/about">{t("nav.about")}</Link>
        </nav>

        {/* Desktop icons */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-black hover:text-gray-700"
                aria-label={t("a11y.notifications")}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <SettingsPopover />
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-black"
          onClick={() => setOpen(v => !v)}
          aria-label={t("a11y.menu")}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-white/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <Link onClick={() => setOpen(false)} to="/">{t("nav.home")}</Link>
            <Link onClick={() => setOpen(false)} to="/chat">{t("chat.title")}</Link>
            <Link onClick={() => setOpen(false)} to="/weather">{t("weather.title")}</Link>
            <Link onClick={() => setOpen(false)} to="/contacts">{t("nav.contacts")}</Link>
            <Link onClick={() => setOpen(false)} to="/about">{t("nav.about")}</Link>

            <div className="pt-2 border-t">
              {isAuthenticated ? (
                <Button onClick={() => { handleLogout(); setOpen(false); }} className="w-full">Logout</Button>
              ) : (
                <div className="flex gap-2">
                  <Button asChild className="w-full" variant="ghost">
                    <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground mb-1">{t("settings.title")}</div>
              <SettingsPopover />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
