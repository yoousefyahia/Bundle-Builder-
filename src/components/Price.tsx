interface PriceProps {
  price: number;
  comparePrice?: number;
  isFree?: boolean;
  inline?: boolean;
}

function Price({ price, comparePrice, isFree, inline = false }: PriceProps) {
  const formattedPrice = isFree ? "FREE" : `$${price.toFixed(2)}`;
  const formattedCompare = comparePrice ? `$${comparePrice.toFixed(2)}` : null;

  return (
    <div className={`flex ${inline ? "flex-row items-center gap-1.5" : "flex-col items-end"}`}>
      {formattedCompare && (
        <span className="text-xs text-gray-400 line-through">{formattedCompare}</span>
      )}
      <span
        className={`font-bold ${isFree ? "text-[#5B3AFF]" : "text-gray-900"} ${inline ? "text-sm" : "text-sm"}`}
      >
        {formattedPrice}
      </span>
    </div>
  );
}

export default Price;