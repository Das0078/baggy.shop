import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-20 sm:-mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="bg-theme-primary rounded-[24px] sm:rounded-[28px] md:rounded-[32px] px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-12 shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Big Bold Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black uppercase text-white leading-[1.15] tracking-tight font-display">
              STAY UPTO DATE ABOUT <br className="hidden sm:inline" />
              OUR LATEST OFFERS
            </h2>
          </div>

          {/* Right: Form with Email Input & Subscribe Button */}
          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:max-w-md lg:ml-auto">
              {/* Email Input */}
              <div className="relative flex items-center w-full">
                <FiMail
                  size={19}
                  className="absolute left-4 text-theme-text-muted pointer-events-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white text-theme-text-main placeholder-theme-text-muted/70 text-sm sm:text-base rounded-full pl-11 pr-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-coffee-300"
                />
              </div>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                className="w-full bg-white text-theme-primary hover:bg-coffee-50 transition-colors text-sm sm:text-base font-semibold rounded-full py-3 sm:py-3.5 cursor-pointer shadow-sm text-center"
              >
                {isSubscribed ? 'Subscribed Successfully!' : 'Subscribe to Newsletter'}
              </motion.button>
            </form>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
