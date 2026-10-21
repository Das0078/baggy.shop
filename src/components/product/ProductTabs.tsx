import React, { useState } from 'react';
import { ProductDetail, sampleProductReviews, ReviewItem } from '../../data/allProducts';
import { StarRating } from '../common/StarRating';
import { FiCheck, FiMoreHorizontal, FiSliders, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductTabsProps {
  product: ProductDetail;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faqs'>('reviews');
  const [reviews, setReviews] = useState<ReviewItem[]>(sampleProductReviews);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim() && newContent.trim()) {
      const newReview: ReviewItem = {
        id: `r-${Date.now()}`,
        author: newAuthor.trim(),
        rating: 5,
        verified: true,
        content: newContent.trim(),
        date: 'Posted just now',
      };
      setReviews([newReview, ...reviews]);
      setNewAuthor('');
      setNewContent('');
      setShowWriteModal(false);
    }
  };

  return (
    <div className="mt-14 sm:mt-18">
      {/* 3 Main Tabs Nav */}
      <div className="flex items-center justify-around border-b border-theme-border">
        <button
          onClick={() => setActiveTab('details')}
          className={`pb-4 text-sm sm:text-base md:text-lg font-medium transition-colors cursor-pointer relative ${
            activeTab === 'details'
              ? 'font-bold text-theme-text-main'
              : 'text-theme-text-muted hover:text-theme-primary'
          }`}
        >
          Product Details
          {activeTab === 'details' && (
            <motion.div
              layoutId="tabUnderline"
              className="absolute bottom-0 inset-x-0 h-0.5 bg-theme-primary"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 text-sm sm:text-base md:text-lg font-medium transition-colors cursor-pointer relative ${
            activeTab === 'reviews'
              ? 'font-bold text-theme-text-main'
              : 'text-theme-text-muted hover:text-theme-primary'
          }`}
        >
          Rating & Reviews
          {activeTab === 'reviews' && (
            <motion.div
              layoutId="tabUnderline"
              className="absolute bottom-0 inset-x-0 h-0.5 bg-theme-primary"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`pb-4 text-sm sm:text-base md:text-lg font-medium transition-colors cursor-pointer relative ${
            activeTab === 'faqs'
              ? 'font-bold text-theme-text-main'
              : 'text-theme-text-muted hover:text-theme-primary'
          }`}
        >
          FAQs
          {activeTab === 'faqs' && (
            <motion.div
              layoutId="tabUnderline"
              className="absolute bottom-0 inset-x-0 h-0.5 bg-theme-primary"
            />
          )}
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="pt-8">
        {/* Rating & Reviews Tab Panel */}
        {activeTab === 'reviews' && (
          <div>
            {/* Header: All Reviews + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl md:text-2xl text-theme-text-main font-display">
                  All Reviews
                </h3>
                <span className="text-xs sm:text-sm text-theme-text-muted font-normal">
                  ({product.reviewCount || 451})
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                {/* Filter Icon button */}
                <button
                  className="p-2 sm:p-2.5 rounded-full bg-theme-bg-light text-theme-text-main hover:bg-coffee-100 transition-colors cursor-pointer"
                  aria-label="Filter reviews"
                >
                  <FiSliders size={18} className="rotate-90" />
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    defaultValue="Latest"
                    className="appearance-none bg-theme-bg-light text-theme-text-main text-xs sm:text-sm font-semibold rounded-full pl-4 pr-8 py-2.5 sm:py-3 focus:outline-none cursor-pointer"
                  >
                    <option value="Latest">Latest</option>
                    <option value="Highest">Highest Rated</option>
                    <option value="Lowest">Lowest Rated</option>
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-theme-text-main"
                  />
                </div>

                {/* Write a Review Button */}
                <button
                  onClick={() => setShowWriteModal(true)}
                  className="bg-theme-primary text-white hover:bg-theme-primary-hover px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* 2-Column Reviews Grid matching design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white border border-theme-border rounded-[20px] p-6 sm:p-7 flex flex-col justify-between hover:shadow-sm transition-shadow"
                >
                  <div>
                    {/* Stars + Options row */}
                    <div className="flex items-center justify-between mb-3">
                      <StarRating rating={rev.rating} showScore={false} size={17} />
                      <button
                        className="text-theme-text-muted/60 hover:text-theme-text-main p-1 cursor-pointer"
                        aria-label="Options"
                      >
                        <FiMoreHorizontal size={18} />
                      </button>
                    </div>

                    {/* Author + Verified checkmark */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <h4 className="font-bold text-base sm:text-lg text-theme-text-main">
                        {rev.author}
                      </h4>
                      {rev.verified && (
                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-theme-verified text-white">
                          <FiCheck size={11} strokeWidth={3.5} />
                        </span>
                      )}
                    </div>

                    {/* Review Content */}
                    <p className="text-theme-text-muted text-xs sm:text-sm leading-relaxed">
                      &ldquo;{rev.content}&rdquo;
                    </p>
                  </div>

                  {/* Date Posted */}
                  <span className="text-[11px] sm:text-xs text-theme-text-muted/70 font-medium mt-4 block">
                    {rev.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Load More Reviews Button */}
            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                onClick={() => {
                  setReviews([...reviews, ...sampleProductReviews.slice(0, 2)]);
                }}
                className="px-8 sm:px-10 py-3 border border-theme-border rounded-full text-xs sm:text-sm font-semibold text-theme-text-main hover:bg-theme-bg-light transition-colors cursor-pointer"
              >
                Load More Reviews
              </button>
            </div>
          </div>
        )}

        {/* Product Details Tab Panel */}
        {activeTab === 'details' && (
          <div className="bg-theme-bg-light/60 rounded-[24px] p-6 sm:p-8 max-w-4xl">
            <h4 className="font-extrabold text-lg text-theme-text-main font-display mb-4">
              Material & Craftsmanship
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-theme-text-muted">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-primary mt-1.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs Tab Panel */}
        {activeTab === 'faqs' && (
          <div className="space-y-4 max-w-4xl">
            {product.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-theme-border rounded-[18px] p-5 sm:p-6"
              >
                <h4 className="font-bold text-sm sm:text-base text-theme-text-main mb-2">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showWriteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowWriteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] p-6 sm:p-8 w-full max-w-lg shadow-2xl"
            >
              <h3 className="text-xl font-bold text-theme-text-main font-display mb-4">
                Write a Review
              </h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-theme-text-muted block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Jordan K."
                    className="w-full bg-theme-input-bg rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-theme-text-muted block mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Tell us what you loved about this piece..."
                    className="w-full bg-theme-input-bg rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWriteModal(false)}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-theme-text-muted hover:text-theme-text-main cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-theme-primary text-white text-xs sm:text-sm font-semibold hover:bg-theme-primary-hover transition-colors cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
