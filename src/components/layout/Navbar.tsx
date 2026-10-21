import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCount } = useCart();

  const navLinks = [
    { label: 'Shop', href: '/shop', hasDropdown: true },
    { label: 'On Sale', href: '/shop' },
    { label: 'New Arrivals', href: '/#new-arrivals' },
    { label: 'Brands', href: '/#brands' },
  ];

  const shopCategories = [
    { label: 'Casual Wear', href: '/shop' },
    { label: 'Formal Wear', href: '/shop' },
    { label: 'Party Outfits', href: '/shop' },
    { label: 'Gym & Active', href: '/shop' },
    { label: 'All T-shirts', href: '/shop' },
    { label: 'Denim & Jeans', href: '/shop' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-theme-border/60 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          {/* Mobile Menu Button + Logo Container */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1 text-theme-text-main hover:text-theme-primary transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Brand Logo */}
            <a
              href="/"
              id="navbar-brand-logo"
              className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-none text-theme-text-main hover:opacity-90 transition-opacity inline-flex items-center will-change-transform"
            >
              baGGy
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-theme-text-main">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setShopDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setShopDropdownOpen(false)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 hover:text-coffee-600 transition-colors py-1 group"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <FiChevronDown
                      size={16}
                      className={`text-theme-text-muted group-hover:text-coffee-600 transition-transform ${
                        shopDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {shopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full pt-2 w-48 z-50"
                      >
                        <div className="bg-white border border-theme-border rounded-xl shadow-lg p-2 flex flex-col space-y-1">
                          {shopCategories.map((cat) => (
                            <a
                              key={cat.label}
                              href={cat.href}
                              className="px-3 py-2 text-xs font-semibold text-theme-text-main hover:bg-theme-bg-light hover:text-theme-primary rounded-lg transition-colors"
                            >
                              {cat.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative flex items-center w-full">
              <FiSearch
                size={18}
                className="absolute left-4 text-theme-text-muted/70 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-theme-input-bg text-theme-text-main placeholder-theme-text-muted/70 text-sm rounded-full pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-primary/20 border border-transparent focus:border-theme-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Mobile search toggle */}
            <button
              className="sm:hidden p-2 text-theme-text-main hover:text-theme-primary cursor-pointer"
              aria-label="Search"
            >
              <FiSearch size={21} />
            </button>

            {/* Cart Icon */}
            <a
              href="/cart"
              className="relative p-2 text-theme-text-main hover:text-coffee-600 transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart size={22} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-theme-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </a>

            {/* User Profile Icon */}
            <a
              href="#profile"
              className="p-2 text-theme-text-main hover:text-coffee-600 transition-colors cursor-pointer"
              aria-label="User Account"
            >
              <FiUser size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-theme-border bg-white px-4 pt-3 pb-6 space-y-3"
          >
            {/* Mobile Search */}
            <div className="relative flex items-center w-full mb-4">
              <FiSearch
                size={18}
                className="absolute left-4 text-theme-text-muted/70 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-theme-input-bg text-theme-text-main text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-theme-text-main hover:bg-theme-bg-light rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <FiChevronDown size={16} />}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
