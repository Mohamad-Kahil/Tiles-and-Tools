// Language translations for the application

export type Language = "en" | "ar";

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Common translations used across the application
export const translations: Translations = {
  // Navigation
  home: {
    en: "Home",
    ar: "الرئيسية",
  },
  products: {
    en: "Products",
    ar: "المنتجات",
  },
  cart: {
    en: "Cart",
    ar: "عربة التسوق",
  },
  wishlist: {
    en: "Wishlist",
    ar: "المفضلة",
  },
  account: {
    en: "Account",
    ar: "الحساب",
  },
  signIn: {
    en: "Sign In",
    ar: "تسجيل الدخول",
  },
  signUp: {
    en: "Sign Up",
    ar: "إنشاء حساب",
  },
  logout: {
    en: "Logout",
    ar: "تسجيل الخروج",
  },
  search: {
    en: "Search products...",
    ar: "البحث عن منتجات...",
  },

  // Categories
  categories: {
    en: "Categories",
    ar: "الفئات",
  },
  flooring: {
    en: "Flooring",
    ar: "الأرضيات",
  },
  wallProducts: {
    en: "Wall Products",
    ar: "منتجات الحائط",
  },
  lighting: {
    en: "Lighting",
    ar: "الإضاءة",
  },
  furniture: {
    en: "Furniture",
    ar: "الأثاث",
  },
  bathroom: {
    en: "Bathroom",
    ar: "الحمام",
  },
  kitchen: {
    en: "Kitchen",
    ar: "المطبخ",
  },

  // Product details
  addToCart: {
    en: "Add to Cart",
    ar: "إضافة إلى السلة",
  },
  addToWishlist: {
    en: "Add to Wishlist",
    ar: "إضافة إلى المفضلة",
  },
  removeFromWishlist: {
    en: "Remove from Wishlist",
    ar: "إزالة من المفضلة",
  },
  quantity: {
    en: "Quantity",
    ar: "الكمية",
  },
  available: {
    en: "available",
    ar: "متوفر",
  },
  inStock: {
    en: "In Stock",
    ar: "متوفر",
  },
  outOfStock: {
    en: "Out of Stock",
    ar: "غير متوفر",
  },
  specifications: {
    en: "Specifications",
    ar: "المواصفات",
  },
  reviews: {
    en: "Reviews",
    ar: "التقييمات",
  },
  shipping: {
    en: "Shipping & Returns",
    ar: "الشحن والإرجاع",
  },
  keyFeatures: {
    en: "Key Features",
    ar: "الميزات الرئيسية",
  },
  relatedProducts: {
    en: "Related Products",
    ar: "منتجات ذات صلة",
  },

  // Cart
  yourCart: {
    en: "Your Shopping Cart",
    ar: "سلة التسوق الخاصة بك",
  },
  emptyCart: {
    en: "Your cart is empty",
    ar: "سلة التسوق فارغة",
  },
  startShopping: {
    en: "Start Shopping",
    ar: "ابدأ التسوق",
  },
  continueShopping: {
    en: "Continue Shopping",
    ar: "مواصلة التسوق",
  },
  subtotal: {
    en: "Subtotal",
    ar: "المجموع الفرعي",
  },
  shippingLabel: {
    en: "Shipping",
    ar: "الشحن",
  },
  total: {
    en: "Total",
    ar: "المجموع",
  },
  proceedToCheckout: {
    en: "Proceed to Checkout",
    ar: "المتابعة إلى الدفع",
  },
  free: {
    en: "Free",
    ar: "مجاني",
  },

  // Checkout
  checkout: {
    en: "Checkout",
    ar: "الدفع",
  },
  contactInformation: {
    en: "Contact Information",
    ar: "معلومات الاتصال",
  },
  shippingAddress: {
    en: "Shipping Address",
    ar: "عنوان الشحن",
  },
  paymentMethod: {
    en: "Payment Method",
    ar: "طريقة الدفع",
  },
  placeOrder: {
    en: "Place Order",
    ar: "إتمام الطلب",
  },

  // Order confirmation
  orderConfirmedTitle: {
    en: "Order Confirmed!",
    ar: "تم تأكيد الطلب!",
  },
  orderNumber: {
    en: "Order Number",
    ar: "رقم الطلب",
  },
  orderTimeline: {
    en: "Order Timeline",
    ar: "جدول زمني للطلب",
  },
  orderConfirmedStatus: {
    en: "Order Confirmed",
    ar: "تم تأكيد الطلب",
  },
  orderProcessing: {
    en: "Order Processing",
    ar: "جاري تجهيز الطلب",
  },
  orderShipped: {
    en: "Order Shipped",
    ar: "تم شحن الطلب",
  },
  delivery: {
    en: "Delivery",
    ar: "التوصيل",
  },

  // Footer
  aboutUs: {
    en: "About Us",
    ar: "من نحن",
  },
  contactUs: {
    en: "Contact Us",
    ar: "اتصل بنا",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  termsOfService: {
    en: "Terms of Service",
    ar: "شروط الخدمة",
  },
  newsletter: {
    en: "Newsletter",
    ar: "النشرة الإخبارية",
  },
  subscribe: {
    en: "Subscribe",
    ar: "اشترك",
  },
};

// Function to get translation
export const getTranslation = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][language];
};

// Format currency based on language
export const formatCurrency = (amount: number, language: Language): string => {
  return amount.toLocaleString(language === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "EGP",
    currencyDisplay: "symbol",
  });
};

// Format date based on language
export const formatDate = (date: Date | string, language: Language): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get direction based on language
export const getDirection = (language: Language): "rtl" | "ltr" => {
  return language === "ar" ? "rtl" : "ltr";
};
