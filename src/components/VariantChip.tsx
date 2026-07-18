interface VariantChipProps {
  name: string;
  color: string;
  image: string;
  active: boolean;
  onClick: () => void;
}

export default function VariantChip({
  name,
  color,
  image,
  active,
  onClick,
}: VariantChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 rounded-lg  px-1 py-1 transition-all
        ${
          active
            ? "border-[#42C7D5] bg-[#EEFDFD]"
            : "border-[#D8D8D8] bg-[#F6F6F6] hover:border-gray-400"
        }
      `}
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="h-8 w-8 object-contain"
      />

      {/* Color */}
      <span
        className="h-3 w-3 rounded-full border border-gray-300"
        style={{ backgroundColor: color }}
      />

      {/* Name */}
      <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
        {name}
      </span>
    </button>
  );
}