import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCategories } from "@/hooks/categories";
import { dictionary } from "@/utils/dictionary";
import { Link } from "react-router-dom";

export default function Categories() {
  const { data: categories } = useCategories();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !categories) return;

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth / 2 || 0;

        gsap.to(".category-item", {
          x: `-=${totalWidth}`,
          ease: "none",
          duration: 70,
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [categories]);

  if (!categories) return null;

  const loopCategories = [...categories, ...categories];

  return (
    <div className="overflow-hidden mt-10 relative" ref={containerRef}>
      <div className="flex gap-6 sm:gap-10 md:gap-12 w-max py-5">
        {loopCategories.map((category, index) => {
          const match = dictionary.find(
            (item) => item.label.toLowerCase() === category.name.toLowerCase()
          );

          return (
            <Link
              to={`/category/${category.name}`}
              key={`${category._id}-${index}`}
              className="category-item flex flex-col items-center gap-2 sm:gap-3 min-w-[100px] sm:min-w-[120px]"
            >
              {match && (
                <img
                  src={`/categories/${match.path}`}
                  alt={category.name}
                  loading="lazy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                />
              )}
              <p className="text-white text-xs sm:text-sm font-medium capitalize text-center font-montserrat mt-1">
                {category.name}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="absolute left-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-blue-950 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-blue-950 to-transparent pointer-events-none"></div>
    </div>
  );
}
