import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { categoryProducts } from '../../data/categoryProducts';
import { CategoryProductCard } from '../shop/CategoryProductCard';

interface RelatedProductsSectionProps {
  currentProductId: string;
}

export const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  currentProductId,
}) => {
  const related = categoryProducts
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  return (
    <section className="pt-14 sm:pt-20 pb-10">
      <div className="mb-10 sm:mb-14">
        <SectionHeader title="YOU MIGHT ALSO LIKE" align="center" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map((prod, index) => (
          <a key={prod.id} href={`/product/${prod.id}`} className="block">
            <CategoryProductCard product={prod} index={index} />
          </a>
        ))}
      </div>
    </section>
  );
};
