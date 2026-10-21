import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../components/shop/Breadcrumb';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductTabs } from '../components/product/ProductTabs';
import { RelatedProductsSection } from '../components/product/RelatedProductsSection';
import { productCatalog, defaultProduct } from '../data/allProducts';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Handle various ID patterns: /product/:id, /product/id=:id, /prduct/id=:id, /product?id=:id
  const getResolvedId = (): string => {
    if (id) {
      return id.replace(/^id=/, '');
    }
    const params = new URLSearchParams(location.search);
    const queryId = params.get('id');
    if (queryId) return queryId;

    // Check pathname
    const match = location.pathname.match(/\/pr?oduct\/(?:id=)?([^/?#]+)/i);
    if (match && match[1]) {
      return match[1];
    }

    return 'one-life-graphic-tshirt';
  };

  const resolvedId = getResolvedId();
  const product = productCatalog[resolvedId] || defaultProduct;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Breadcrumb Navigation matching design */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'Men', href: '/shop' },
            { label: product.category || 'T-shirts' },
          ]}
        />

        {/* Top Product Display Grid: Gallery on Left, Details & CTAs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-2 sm:mt-4">
          {/* Left: Gallery (Thumbnails + Large Photo) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right: Info, Selectors, and Add to Cart */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Middle: Interactive Tabs (Details, Rating & Reviews, FAQs) */}
        <ProductTabs product={product} />

        {/* Bottom: Related Products Recommendation Carousel */}
        <RelatedProductsSection currentProductId={product.id} />

      </div>
    </div>
  );
};
