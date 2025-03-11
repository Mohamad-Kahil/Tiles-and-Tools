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
  backToCart: {
    en: "Back to Cart",
    ar: "العودة إلى السلة",
  },
  needItemsBeforeCheckout: {
    en: "You need to add items to your cart before checking out.",
    ar: "تحتاج إلى إضافة منتجات إلى سلة التسوق قبل إتمام عملية الشراء.",
  },
  browseProducts: {
    en: "Browse Products",
    ar: "تصفح المنتجات",
  },
  firstName: {
    en: "First Name",
    ar: "الاسم الأول",
  },
  lastName: {
    en: "Last Name",
    ar: "اسم العائلة",
  },
  emailAddress: {
    en: "Email Address",
    ar: "البريد الإلكتروني",
  },
  phoneNumber: {
    en: "Phone Number",
    ar: "رقم الهاتف",
  },
  streetAddress: {
    en: "Street Address",
    ar: "عنوان الشارع",
  },
  city: {
    en: "City",
    ar: "المدينة",
  },
  governorate: {
    en: "Governorate",
    ar: "المحافظة",
  },
  selectGovernorate: {
    en: "Select a governorate",
    ar: "اختر محافظة",
  },
  postalCodeOptional: {
    en: "Postal Code (Optional)",
    ar: "الرمز البريدي (اختياري)",
  },
  orderNotesOptional: {
    en: "Order Notes (Optional)",
    ar: "ملاحظات الطلب (اختياري)",
  },
  specialInstructions: {
    en: "Special instructions for delivery or installation",
    ar: "تعليمات خاصة للتوصيل أو التركيب",
  },
  creditDebitCard: {
    en: "Credit/Debit Card",
    ar: "بطاقة ائتمان/خصم",
  },
  paySecurelyWithCard: {
    en: "Pay securely with your card",
    ar: "ادفع بأمان باستخدام بطاقتك",
  },
  cashOnDelivery: {
    en: "Cash on Delivery",
    ar: "الدفع عند الاستلام",
  },
  payWhenReceive: {
    en: "Pay when you receive your order",
    ar: "ادفع عند استلام طلبك",
  },
  payViaFawry: {
    en: "Pay via Fawry at any service point",
    ar: "ادفع عبر فوري في أي نقطة خدمة",
  },
  processing: {
    en: "Processing...",
    ar: "جاري المعالجة...",
  },
  orderSummary: {
    en: "Order Summary",
    ar: "ملخص الطلب",
  },
  item: {
    en: "item",
    ar: "منتج",
  },
  items: {
    en: "items",
    ar: "منتجات",
  },
  inCart: {
    en: "in cart",
    ar: "في السلة",
  },
  addMore: {
    en: "Add",
    ar: "أضف",
  },
  forFreeShipping: {
    en: "more to qualify for free shipping",
    ar: "أكثر للتأهل للشحن المجاني",
  },
  secureCheckout: {
    en: "Secure checkout",
    ar: "دفع آمن",
  },

  // Order confirmation
  orderConfirmedTitle: {
    en: "Order Confirmed!",
    ar: "تم تأكيد الطلب!",
  },
  orderConfirmedDescription: {
    en: "Your order has been successfully placed",
    ar: "تم تقديم طلبك بنجاح",
  },
  orderConfirmedMessage: {
    en: "Thank you for your purchase. Your order has been received and is being processed.",
    ar: "شكرًا لشرائك. تم استلام طلبك وجاري معالجته.",
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
  orderReceivedMessage: {
    en: "Your order has been received and is being processed.",
    ar: "تم استلام طلبك وجاري معالجته.",
  },
  orderProcessing: {
    en: "Order Processing",
    ar: "جاري تجهيز الطلب",
  },
  orderPreparingMessage: {
    en: "Your order is being prepared for shipping.",
    ar: "يتم تجهيز طلبك للشحن.",
  },
  estimatedDays: {
    en: "Estimated: {days} business days",
    ar: "تقديري: {days} أيام عمل",
  },
  orderShipped: {
    en: "Order Shipped",
    ar: "تم شحن الطلب",
  },
  orderShippedMessage: {
    en: "Your order has been shipped and is on its way to you.",
    ar: "تم شحن طلبك وهو في طريقه إليك.",
  },
  trackingInformation: {
    en: "Tracking information will be sent to your email.",
    ar: "سيتم إرسال معلومات التتبع إلى بريدك الإلكتروني.",
  },
  delivery: {
    en: "Delivery",
    ar: "التوصيل",
  },
  deliveryMessage: {
    en: "Your order will be delivered to your address.",
    ar: "سيتم توصيل طلبك إلى عنوانك.",
  },
  estimatedDelivery: {
    en: "Estimated delivery",
    ar: "موعد التسليم المتوقع",
  },
  viewOrderDetails: {
    en: "View Order Details",
    ar: "عرض تفاصيل الطلب",
  },
  orderQuestions: {
    en: "Have questions about your order?",
    ar: "هل لديك أسئلة حول طلبك؟",
  },
  contactSupport: {
    en: "Contact our support team",
    ar: "تواصل مع فريق الدعم",
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
export const getTranslation = (
  key: string,
  language: Language,
  replacements?: Record<string, string>,
): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  let text = translations[key][language];

  // Replace placeholders if replacements are provided
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(`{${placeholder}}`, value);
    });
  }

  return text;
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
