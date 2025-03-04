import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
    title: "Transform Your Home",
    subtitle: "Discover our premium collection of Egyptian home decor",
    ctaText: "Shop Now",
    ctaLink: "/category/featured",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?w=1200&q=80",
    title: "Luxury Flooring Solutions",
    subtitle: "Elevate your space with our exclusive marble and ceramic tiles",
    ctaText: "Explore Collection",
    ctaLink: "/category/flooring",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
    title: "Modern Lighting Fixtures",
    subtitle: "Brighten your home with our designer lighting collection",
    ctaText: "View Lighting",
    ctaLink: "/category/lighting",
  },
];

const HeroSection = ({
  slides = defaultSlides,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
}: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Handle autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, autoplaySpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, autoplaySpeed, slides.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after user interaction
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden bg-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-center h-full max-w-4xl mx-auto px-6 md:px-10 lg:px-0">
              <div className="text-white max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  {slide.subtitle}
                </p>
                <Button size="lg" className="font-medium" asChild>
                  <a href={slide.ctaLink}>{slide.ctaText}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full h-10 w-10"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full h-10 w-10"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80",
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
