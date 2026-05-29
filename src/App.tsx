/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, MapPin, Clock, Phone, ShoppingCart, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Toast Component ---
function Toast({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-zinc-800"
          role="alert"
        >
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Menu Data ---
const FEATURED_PIZZAS = [
  {
    id: 1,
    name: 'The Margherita Classic',
    description: 'Blistering crust, imported San Marzano tomato sauce, fresh mozzarella di bufala, and hand-torn basil.',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    tags: ['Vegetarian', 'Bestseller']
  },
  {
    id: 2,
    name: 'Spicy Inferno Pepperoni',
    description: 'Double-smoked pepperoni cups that curl and char, hot honey drizzle, and crushed red pepper flakes.',
    price: '$22',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
    tags: ['Spicy', 'Meat Lover']
  },
  {
    id: 3,
    name: 'Truffle Mushroom Canvas',
    description: 'Roasted wild mushrooms, garlic confit base, fontina cheese, finished with white truffle oil and thyme.',
    price: '$24',
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&q=80',
    tags: ['Gourmet']
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (itemName: string) => {
    setToastMessage(`Added 1x ${itemName} to cart`);
  };

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Ingredients', href: '#quality' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#footer' },
  ];

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark selection:bg-brand-red selection:text-white">
      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        isVisible={!!toastMessage} 
        onClose={() => setToastMessage('')} 
      />

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b-2 border-brand-red/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-md">
            <div className="bg-brand-red text-white p-2 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-brand-red-dark transition-colors">
              <Flame className="w-5 h-5" />
            </div>
            <span className={`font-display text-2xl font-black tracking-tighter uppercase ${isScrolled ? 'text-brand-dark' : 'text-white md:text-brand-dark'}`}>Slice<span className="text-brand-red">Fire</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className={`text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm ${isScrolled ? 'text-gray-600' : 'text-gray-800'}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleAddToCart('Online Order started')}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2 outline-none focus-visible:ring-4 focus-visible:ring-brand-red/50"
            >
              <ShoppingCart className="w-4 h-4" />
              Order Now
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 -mr-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${isScrolled ? 'text-brand-dark' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white pt-24 px-6 pb-6 shadow-2xl flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-black uppercase text-brand-dark hover:text-brand-red"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8 pt-8 border-t border-brand-light flex flex-col gap-4">
                <button 
                  onClick={() => {
                    handleAddToCart('Online Order started');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-brand-red text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 text-lg active:bg-brand-red-dark shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order Delivery
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="p-4 md:p-6 lg:p-8 space-y-4">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center px-6 pt-20 rounded-[2.5rem] overflow-hidden bg-brand-dark text-white shadow-2xl">
          <div className="absolute inset-0 z-0">
            {/* Background image optimized for overlay */}
            <img 
              src="https://images.unsplash.com/photo-1544982503-9f984c14501a?w=2000&q=80" 
              alt="Fresh wood-fired pizza coming out of oven" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
          </div>
          
          <div className="relative z-20 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center text-left py-24">
            <div className="flex flex-col gap-6 md:gap-8 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 text-white bg-brand-orange font-black tracking-widest uppercase text-xs px-4 py-1.5 rounded-full w-fit"
              >
                <Flame className="w-4 h-4" /> 800° Wood-Fired Perfection
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-sans font-black text-white leading-[0.9] uppercase tracking-tight"
              >
                Blistering <span className="block text-brand-orange">Crust.</span>
                Melted <span className="text-gray-300">Magic.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 font-medium italic leading-relaxed max-w-lg mb-4"
              >
                48-hour slow-fermented sourdough. San Marzano tomatoes. Fresh local mozzarella. Hot, fast, and delivered to your door in under 30 minutes.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => handleAddToCart('Delivery Order')}
                  className="bg-white hover:bg-gray-100 text-brand-red px-8 py-4 rounded-2xl font-black uppercase tracking-wide text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 group outline-none"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Order Delivery
                </button>
                <button 
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-black uppercase tracking-wide text-sm transition-colors flex items-center justify-center outline-none"
                  onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book a Table
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Menu Grid */}
        <section id="menu" className="py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-2">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-brand-dark mb-1">Bestseller Grid</h2>
              </div>
              <a href="#" className="hidden md:inline-flex text-brand-red text-xs font-bold underline cursor-pointer hover:text-brand-red-dark transition-colors uppercase">
                View Full Menu
              </a>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {FEATURED_PIZZAS.map((pizza, idx) => (
                <article key={pizza.id} className={`bg-white rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-sm border border-gray-100 group transition-all duration-300 ${idx === 1 ? 'border-l-4 border-l-brand-orange' : ''}`}>
                  <div className="relative w-full md:w-32 md:h-32 h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-brand-red/10 bg-[#FEF2F2]">
                    <img 
                      src={pizza.image} 
                      alt={pizza.name} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {pizza.tags.map(tag => (
                        <span key={tag} className="bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow w-full">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h4 className="text-xl font-black text-brand-dark">{pizza.name}</h4>
                      <span className="text-xl font-black text-brand-red shrink-0">{pizza.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm italic line-clamp-2 mt-1 mb-4">
                      {pizza.description}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(pizza.name)}
                      className="self-start md:self-end w-full md:w-auto bg-brand-light border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-colors active:scale-[0.98] outline-none flex items-center justify-center gap-2"
                      aria-label={`Add ${pizza.name} to cart`}
                    >
                      + <span className="md:hidden ml-1">Grab a Slice</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            
            <a href="#" className="mt-6 md:hidden text-brand-red text-xs font-bold underline flex items-center justify-center w-full uppercase py-2">
              View Full Menu
            </a>
          </div>
        </section>

        {/* Quality / Social Proof */}
        <section id="quality" className="bg-brand-red text-white py-16 px-8 rounded-[2.5rem] shadow-xl overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tight mb-4 leading-none">
                  Not Fast Food.<br/>
                  <span className="text-brand-orange">Good Food, Fast.</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed max-w-md italic font-medium">
                  We don't cut corners. Every pie starts with our signature 48-hour cold-fermented dough and ends with a 90-second trip through our oven.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                {[
                  { title: '48-Hour Fermented Dough', desc: 'Airy, digestible sourdough.' },
                  { title: 'San Marzano D.O.P.', desc: 'Gold standard imported tomatoes.' },
                  { title: 'Whole Milk Mozzarella', desc: 'Hand-pulled daily in house.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center bg-white/10 p-4 rounded-2xl">
                    <div className="w-3 h-3 rounded-full bg-white shrink-0" />
                    <div>
                      <strong className="block text-sm font-black uppercase tracking-wider mb-0.5">{item.title}</strong>
                      <span className="text-white/70 text-xs italic">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              {/* Testimonial Carousel */}
              <div className="bg-white/10 text-white rounded-[2rem] p-6 relative z-10">
                <div className="flex gap-1 text-[#FDE047] mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <blockquote className="text-xl md:text-2xl font-serif italic font-medium leading-snug mb-6">
                  "Hands down the best crust in the city. The char is absolutely perfect. A weekly ritual!"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80" alt="Sarah J." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest">Sarah J.</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-[10px] bg-black/20 px-3 py-2 rounded-full w-fit uppercase font-black tracking-widest">
                +1,200 Reviews
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-200 mt-4 rounded-t-[2.5rem]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-brand-dark">
              <div className="bg-brand-red text-white p-2 w-10 h-10 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-black tracking-tighter uppercase text-brand-dark">Slice<span className="text-brand-red">Fire</span></span>
            </a>
            <p className="text-gray-500 max-w-xs text-sm font-medium">Fueling the neighborhood with wood-fired perfection since 2018.</p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase text-brand-red tracking-widest mb-3 flex items-center gap-2">
               Find Us
            </h4>
            <address className="text-sm font-bold not-italic leading-relaxed text-brand-dark">
              123 Main Street<br />
              Food District<br />
              City, ST 12345
            </address>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase text-brand-red tracking-widest mb-3 flex items-center gap-2">
              Hours
            </h4>
            <ul className="text-sm font-bold text-gray-600 space-y-2">
              <li className="flex justify-between"><span>Mon-Thu</span> <span className="text-brand-dark">11am - 10pm</span></li>
              <li className="flex justify-between"><span>Fri-Sat</span> <span className="text-brand-dark">11am - Midnight</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-brand-dark">12pm - 9pm</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase text-brand-red tracking-widest mb-3 flex items-center gap-2">
               Contact
            </h4>
            <div className="space-y-4">
              <a href="tel:5551234567" className="text-xl font-black text-brand-dark hover:text-brand-red transition-colors">(555) 123-4567</a>
              <button 
                onClick={() => document.getElementById('footer')?.scrollIntoView()}
                className="w-full bg-brand-dark text-white hover:bg-black py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-md"
              >
                Claim Your Table
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Slice Fire Pizza.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-red transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-red transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-red transition-colors">IG</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
