import React from "react";
import Header from "./layout/Header";
import HeroSection from "./home/HeroSection";
import CategoryShowcase from "./home/CategoryShowcase";
import FeaturedProducts from "./products/FeaturedProducts";
import Footer from "./layout/Footer";

import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  // Create a local language context for the component
  const languageContext = React.useContext(
    React.createContext({ language: "en", direction: "ltr" }),
  );
  const { language = "en", direction = "ltr" } = languageContext;

  // Promotional banners data
  const promotionalBanners = [
    {
      id: "promo1",
      title: language === "en" ? "Summer Sale" : "تخفيضات الصيف",
      description:
        language === "en"
          ? "Up to 30% off on selected items"
          : "خصم يصل إلى 30٪ على منتجات مختارة",
      backgroundColor: "bg-amber-100",
      textColor: "text-amber-900",
      buttonText: language === "en" ? "Shop Now" : "تسوق الآن",
      buttonLink: "/sale",
    },
    {
      id: "promo2",
      title: language === "en" ? "Free Delivery" : "توصيل مجاني",
      description:
        language === "en"
          ? "On all orders over 5000 EGP"
          : "على جميع الطلبات التي تزيد عن 5000 جنيه",
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-900",
      buttonText: language === "en" ? "Learn More" : "اعرف المزيد",
      buttonLink: "/delivery",
    },
  ];

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Category Showcase */}
          <CategoryShowcase
            title={language === "en" ? "Browse Our Categories" : "تصفح فئاتنا"}
            subtitle={
              language === "en"
                ? "Explore our wide range of Egyptian home decor and finishing products"
                : "استكشف مجموعتنا الواسعة من منتجات الديكور المنزلي والتشطيبات المصرية"
            }
          />

          {/* Promotional Banner */}
          <section className="w-full py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotionalBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`${banner.backgroundColor} ${banner.textColor} rounded-lg p-6 flex flex-col justify-between`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {banner.title}
                      </h3>
                      <p className="mb-4">{banner.description}</p>
                    </div>
                    <a
                      href={banner.buttonLink}
                      className="inline-block bg-white text-primary font-medium px-4 py-2 rounded-md w-fit hover:bg-gray-100 transition-colors"
                    >
                      {banner.buttonText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <FeaturedProducts
            title={language === "en" ? "Featured Products" : "منتجات مميزة"}
            subtitle={
              language === "en"
                ? "Discover our most popular home decoration and finishing products"
                : "اكتشف أكثر منتجات الديكور المنزلي والتشطيبات شعبية لدينا"
            }
          />

          {/* Testimonials Section */}
          <section className="w-full py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  {language === "en"
                    ? "What Our Customers Say"
                    : "ما يقوله عملاؤنا"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {language === "en"
                    ? "Read testimonials from our satisfied customers across Egypt"
                    : "اقرأ شهادات من عملائنا الراضين في جميع أنحاء مصر"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: "t1",
                    name: "Ahmed Hassan",
                    location: language === "en" ? "Cairo" : "القاهرة",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
                    content:
                      language === "en"
                        ? "The quality of the marble flooring I purchased exceeded my expectations. The installation team was professional and efficient."
                        : "جودة أرضيات الرخام التي اشتريتها فاقت توقعاتي. كان فريق التركيب محترفًا وفعالًا.",
                    rating: 5,
                  },
                  {
                    id: "t2",
                    name: "Nour El-Din",
                    location: language === "en" ? "Alexandria" : "الإسكندرية",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
                    content:
                      language === "en"
                        ? "I love the wall paint colors and the customer service was excellent. Will definitely shop here again!"
                        : "أحب ألوان طلاء الجدران وكانت خدمة العملاء ممتازة. سأتسوق هنا مرة أخرى بالتأكيد!",
                    rating: 4,
                  },
                  {
                    id: "t3",
                    name: "Laila Mahmoud",
                    location: language === "en" ? "Giza" : "الجيزة",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
                    content:
                      language === "en"
                        ? "The lighting fixtures transformed my living room completely. Great quality products at reasonable prices."
                        : "لقد غيرت تركيبات الإضاءة غرفة المعيشة الخاصة بي تمامًا. منتجات ذات جودة عالية بأسعار معقولة.",
                    rating: 5,
                  },
                ].map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <p className="mb-4">{testimonial.content}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="w-full py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {language === "en"
                  ? "Subscribe to Our Newsletter"
                  : "اشترك في نشرتنا الإخبارية"}
              </h2>
              <p className="max-w-2xl mx-auto mb-8">
                {language === "en"
                  ? "Stay updated with our latest products, trends, and exclusive offers"
                  : "ابق على اطلاع بأحدث منتجاتنا واتجاهاتنا وعروضنا الحصرية"}
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={
                    language === "en"
                      ? "Your email address"
                      : "عنوان بريدك الإلكتروني"
                  }
                  className="flex-1 px-4 py-3 rounded-md bg-primary-foreground text-primary border-2 border-transparent focus:border-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  {language === "en" ? "Subscribe" : "اشترك"}
                </button>
              </form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Home;
