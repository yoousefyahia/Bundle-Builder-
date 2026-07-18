interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  size = "md",
}: QuantityStepperProps) {
  const isSmall = size === "sm";

  return (
    <div className="flex items-center gap-0">
      <button
        onClick={onDecrease}
        disabled={quantity === 0}
        aria-label="Decrease"
        className={`
          flex items-center justify-center border border-gray-300 rounded-full
          font-bold text-gray-500 leading-none select-none
          transition hover:border-[#5B3AFF] hover:text-[#5B3AFF]
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-500
          ${isSmall ? "h-5 w-5 text-xs" : "h-6 w-6 text-sm"}
        `}
      >
        −
      </button>

      <span
        className={`
          text-center font-semibold text-gray-800 tabular-nums
          ${isSmall ? "w-5 text-[11px]" : "w-6 text-sm"}
        `}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        aria-label="Increase"
        className={`
          flex items-center justify-center border border-gray-300 rounded-full
          font-bold text-gray-500 leading-none select-none
          transition hover:border-[#5B3AFF] hover:text-[#5B3AFF]
          ${isSmall ? "h-5 w-5 text-xs" : "h-6 w-6 text-sm"}
        `}
      >
        +
      </button>
    </div>
  );
}