import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'Women',
    image:
      'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/women_category.png',
  },
  {
    title: 'Men',
    image:
      'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/men_category.png',
  },
  {
    title: 'Jewels',
    image: '../circular_jewels.png',
  },
];

export default function Categorycard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/category'); // 👈 always go to /product
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-[1536px] mx-auto py-6">
      {categories.map(({ title, image }) => (
        <div
          key={title}
          onClick={handleClick}
          className="relative flex flex-col items-center w-[140px] sm:w-[180px] md:w-[200px] lg:w-[240px] group cursor-pointer"
        >
          {/* ✅ Image */}
          <img
            className="rounded-full bg-neutral-100 w-full aspect-square object-cover group-hover:shadow-xl transition-all duration-300"
            src={image}
            alt={title}
          />

          {/* ✅ Title */}
          <div className="mt-3 text-center">
            <span className="font-semibold text-neutral-900 text-base sm:text-lg group-hover:underline group-hover:text-primary-800 transition-all duration-200">
              {title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
