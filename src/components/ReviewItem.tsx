import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";

interface ReviewItemProps {
  product: Product;
  quantity: number;
  variantName?: string;

  onIncrease: () => void;
  onDecrease: () => void;
}

function ReviewItem({
  product,
  quantity,
  variantName,
  onIncrease,
  onDecrease,
}: ReviewItemProps) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-200">
      <div className="flex gap-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-16 w-16 rounded-xl border object-contain"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
            Image
          </div>
        )}

        <div>
          <h4 className="font-semibold">
            {product.title}
          </h4>

          {variantName && (
            <p className="text-sm text-gray-500">
              {variantName}
            </p>
          )}

          <div className="mt-2">
            <QuantityStepper
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </div>
        </div>
      </div>

<div className="text-right">
  {product.comparePrice &&
    product.comparePrice > product.price && (
      <p className="text-sm text-gray-400 line-through">
        ${(product.comparePrice * quantity).toFixed(2)}
      </p>
    )}

  <p
    className={`font-bold ${
      product.isFree ? "text-[#5B3AFF]" : "text-[#5B3AFF]"
    }`}
  >
    {product.isFree
      ? "FREE"
      : `$${(product.price * quantity).toFixed(2)}`}
  </p>
</div>
    </div>
  );
}

export default ReviewItem;