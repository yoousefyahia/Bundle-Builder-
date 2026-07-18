import Badge from "./Badge";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onIncrease: () => void;
  onDecrease: () => void;
  onSelectVariant: (id: string) => void;
}

export default function ProductCard({
  product,
  onIncrease,
  onDecrease,
  onSelectVariant,
}: ProductCardProps) {
  const selectedVariant = product.variants?.find(
    (v) => v.id === product.selectedVariant
  );

  const quantity = product.variants
    ? (selectedVariant?.quantity ?? 0)
    : (product.quantity ?? 0);

  // Card is selected if ANY variant or the product itself has qty > 0
  const isSelected = product.variants
    ? product.variants.some((v) => v.quantity > 0)
    : (product.quantity ?? 0) > 0;

  const displayImage = selectedVariant?.image ?? product.image;

  return (
<div
  className={`
    relative flex flex-col
    md:flex-row
    xl:flex-col

    rounded-xl bg-white transition-all duration-200
    border-2 ${
      isSelected
        ? "border-[#5B3AFF] shadow-lg shadow-purple-100"
        : "border-gray-200 hover:border-gray-300 shadow-sm"
    }
  `}
>
      {/* Badge */}
      {product.badge && (
        <div className="absolute left-3 top-3 z-10">
          <Badge text={product.badge} />
        </div>
      )}

      {/* Image area */}
<div
  className="
    flex items-center justify-center
    px-4 pt-4

    md:w-[170px] md:shrink-0 md:pt-0

    xl:w-full xl:pt-4
  "
>        <img
          src={displayImage}
          alt={product.title}
          className="max-h-[110px] w-full object-contain"
        />
      </div>

      {/* Content */}
<div
  className="
    flex flex-1 flex-col gap-1 p-3

    md:py-4 md:pr-4 md:pl-0 xl:p-3"> <div>
          <h3 className="text-[13px] font-bold leading-snug text-gray-900">
            {product.title}
          </h3>
          <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500 line-clamp-2">
            {product.description}
          </p>
          {product.learnMore && (
            <a
              href={product.learnMore}
              className="mt-0.5 inline-block text-[11px] font-semibold text-[#5B3AFF] hover:underline"
            >
              Learn More
            </a>
          )}
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <VariantSelector
            variants={product.variants}
            selectedVariant={product.selectedVariant ?? ""}
            onSelect={onSelectVariant}
          />
        )}

        {/* Stepper + Price */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <QuantityStepper
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            size="md"
          />

          <div className="flex flex-col items-end">
            {product.comparePrice && product.comparePrice > product.price && (
<span className="text-[11px] text-[#E5484D] line-through leading-none">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
            <span
              className={`text-[13px] font-bold leading-tight ${
                product.isFree ? "text-[#5B3AFF]" : "text-gray-900"
              }`}
            >
              {product.isFree ? "FREE" : `$${product.price.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}