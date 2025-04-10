
import React, { useState, useRef, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight, Bell, Search, ChevronDown } from "lucide-react";

// Placeholder content data
const carouselCategories = [
  { id: 1, name: "Populares en Científica" },
  { id: 2, name: "Continuar viendo" },
  { id: 3, name: "Tendencias actuales" },
  { id: 4, name: "Documentales premiados" },
  { id: 5, name: "Ciencia y Tecnología" },
  { id: 6, name: "Recomendaciones para ti" }
];

// Placeholder card content
const generateCards = (count: number, offset = 0) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + offset,
    title: `Título ${i + offset + 1}`,
    imageUrl: `https://picsum.photos/id/${(i + offset) % 100 + 10}/300/170`
  }));
};

const Index = () => {
  const [navbarBg, setNavbarBg] = useState(false);
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel scroll handlers
  const scroll = (carouselIndex: number, direction: "left" | "right") => {
    const carousel = carouselRefs.current[carouselIndex];
    if (!carousel) return;
    
    const scrollAmount = direction === "left" 
      ? -carousel.clientWidth * 0.8 
      : carousel.clientWidth * 0.8;
    
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <nav 
        className={`fixed w-full z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-colors duration-300 ${
          navbarBg ? "bg-netflix-black" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <img 
            src="https://www.cientifica.edu.pe/sites/default/files/logo-cientifica-blanco.svg" 
            alt="Científica Logo" 
            className="h-8 logo-cientifica"
          />
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="navbar-link text-sm">Inicio</a>
            <a href="#" className="navbar-link text-sm">Series</a>
            <a href="#" className="navbar-link text-sm">Películas</a>
            <a href="#" className="navbar-link text-sm">Novedades populares</a>
            <a href="#" className="navbar-link text-sm">Mi lista</a>
            <a href="#" className="navbar-link text-sm">Explorar por idiomas</a>
          </div>
          <div className="md:hidden flex items-center">
            <span className="text-white text-sm mr-1">Explorar</span>
            <ChevronDown size={16} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 text-white" />
          <a href="#" className="navbar-link text-sm hidden md:inline">Niños</a>
          <Bell className="h-5 w-5 text-white" />
          <div className="flex items-center gap-1">
            <img 
              src="https://picsum.photos/id/237/32/32" 
              alt="User Profile" 
              className="h-8 w-8 rounded"
            />
            <ChevronDown size={16} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-[40%] md:pt-[45%] lg:pt-[38%] bg-cientifica-darkblue">
        {/* Hero Image */}
        <div className="absolute top-0 left-0 w-full h-full">
          <img 
            src="https://picsum.photos/id/1005/1920/800" 
            alt="Featured Content" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-[15%] left-12 hero-details">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow animate-fade-in">
            Descubre la Ciencia
          </h1>
          <p className="text-base md:text-lg mb-6 w-full md:w-3/4 opacity-90 animate-slide-up">
            Una aventura por los hallazgos más impresionantes del mundo científico moderno. 
            Explora con nosotros los misterios del universo.
          </p>
          <div className="flex items-center gap-3">
            <button className="button-play">
              <Play size={20} /> <span>Reproducir</span>
            </button>
            <button className="bg-cientifica-gray/80 text-white rounded px-5 py-1 flex items-center gap-1 hover:bg-cientifica-gray/90 transition">
              <Info size={20} /> <span>Más información</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Carousels */}
      <div className="mt-[-100px] md:mt-[-150px] relative z-10 pb-20">
        {carouselCategories.map((category, categoryIndex) => (
          <div key={category.id} className="px-4 md:px-12 mb-8">
            <h2 className="text-xl font-medium mb-2 text-white">{category.name}</h2>
            
            <div className="carousel-container">
              {/* Left scroll button */}
              <button 
                className="carousel-button left-0" 
                onClick={() => scroll(categoryIndex, "left")}
              >
                <ChevronLeft size={30} />
              </button>
              
              {/* Carousel track */}
              <div 
                className="carousel-track" 
                ref={el => carouselRefs.current[categoryIndex] = el}
              >
                {generateCards(15, categoryIndex * 20).map(item => (
                  <div key={item.id} className="card-container w-[220px] md:w-[260px]">
                    <div className="netflix-card group">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full aspect-video object-cover rounded"
                      />
                      <div className="netflix-card-overlay">
                        <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <button className="button-play p-1">
                            <Play size={16} />
                          </button>
                          <button className="button-info">
                            <Info size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right scroll button */}
              <button 
                className="carousel-button right-0" 
                onClick={() => scroll(categoryIndex, "right")}
              >
                <ChevronRight size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-12 text-cientifica-gray text-sm">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex gap-2 mb-4">
            <a href="#" className="hover:text-white">Preguntas frecuentes</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Centro de ayuda</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Términos de uso</a>
          </div>
          <p>© 2025 Científica-Flix, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
