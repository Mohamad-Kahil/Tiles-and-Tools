import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroCarouselProps {
  slides?: AdSlide[];
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

// Default slides will be replaced with data from CMS
const defaultSlides: AdSlide[] = [
  {
    id: "ad1",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    title: "Summer Sale - Up to 30% Off",
    subtitle: "Exclusive discounts on premium flooring and wall products",
    ctaText: "Shop Now",
    ctaLink: "/category/flooring",
  },
  {
    id: "ad2",
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80",
    title: "New Arrivals - Luxury Hardwood",
    subtitle: "Transform your space with our latest collection",
    ctaText: "Explore Collection",
    ctaLink: "/category/flooring/wooden-flooring",
  },
  {
    id: "ad3",
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&q=80",
    title: "Modern Lighting Solutions",
    subtitle: "Brighten your home with our designer lighting collection",
    ctaText: "View Lighting",
    ctaLink: "/category/lighting",
  },
];

const HeroCarousel = ({
  slides = defaultSlides,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
  className = "",
}: HeroCarouselProps) => {
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

  // Track ad impressions (in a real app, this would call an analytics service)
  useEffect(() => {
    // This would track an impression for the current slide
    console.log(`Ad impression: ${slides[currentSlide].id}`);
  }, [currentSlide, slides]);

  // Track ad clicks
  const handleAdClick = (adId: string, ctaLink: string) => {
    // This would track a click for the ad
    console.log(`Ad click: ${adId}`);
    // Navigate to the CTA link
    window.location.href = ctaLink;
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              {slide.subtitle && (
                <p className="text-xl mb-6 max-w-xl">{slide.subtitle}</p>
              )}
              <Button
                onClick={() => handleAdClick(slide.id, slide.ctaLink)}
                size="lg"
              >
                {slide.ctaText}
              </Button>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
            onClick={goToPrevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
            onClick={goToNextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
