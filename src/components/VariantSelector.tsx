import type { Variant } from "../types/variant";
import VariantChip from "./VariantChip";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: string;
  onSelect: (id: string) => void;
}

export default function VariantSelector({ variants, selectedVariant, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((v) => (
<VariantChip
  key={v.id}
  name={v.name}
  color={v.color}
  image={v.image}
  active={selectedVariant === v.id}
  onClick={() => onSelect(v.id)}
/>
      ))}
    </div>
  );
}