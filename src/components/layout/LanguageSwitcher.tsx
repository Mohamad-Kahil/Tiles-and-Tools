import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  variant?: "icon" | "text" | "full";
  className?: string;
}

const LanguageSwitcher = ({
  currentLanguage,
  onLanguageChange,
  variant = "icon",
  className = "",
}: LanguageSwitcherProps) => {
  const toggleLanguage = () => {
    onLanguageChange(currentLanguage === "en" ? "ar" : "en");
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLanguage}
        className={className}
        aria-label={`Switch to ${currentLanguage === "en" ? "Arabic" : "English"}`}
      >
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  if (variant === "text") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={className}
      >
        {currentLanguage === "en" ? "العربية" : "English"}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className={`${className} justify-start`}
      onClick={toggleLanguage}
    >
      <Globe className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
      {currentLanguage === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    </Button>
  );
};

export default LanguageSwitcher;
