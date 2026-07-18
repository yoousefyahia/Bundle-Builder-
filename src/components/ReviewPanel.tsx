import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";
import { FaTruck } from "react-icons/fa";
/* ─── Types ─────────────────────────────────────────────── */

interface LineItem {
  key: string;
  productId: string;
  variantId?: string;
  title: string;
  image: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  category: string;
  isFree?: boolean;
  isPlan?: boolean;
  planCompareLabel?: string;
  planLabel?: string;
}

interface Props {
  products: Product[];
  increase: (productId: string, variantId?: string) => void;
  decrease: (productId: string, variantId?: string) => void;
  onSave: () => void;
}

/* ─── Constants ──────────────────────────────────────────── */

const CATEGORY_ORDER = ["camera", "sensor", "accessory", "plan"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  camera:    "Cameras",
  sensor:    "Sensors",
  accessory: "Accessories",
  plan:      "plan",
};

/* ─── Helpers ────────────────────────────────────────────── */

function buildLineItems(products: Product[]): LineItem[] {
  const items: LineItem[] = [];

  products.forEach((p) => {
    if (p.variants) {
      p.variants.forEach((v) => {
        if (v.quantity > 0) {
          items.push({
            key:        `${p.id}-${v.id}`,
            productId:  p.id,
            variantId:  v.id,
            title:      p.title,
            image:      v.image || p.image,
            price:      p.price,
            comparePrice: p.comparePrice,
            quantity:   v.quantity,
            category:   p.category,
            isFree:     p.isFree,
          });
        }
      });
    } else if ((p.quantity ?? 0) > 0) {
      items.push({
        key:              p.id,
        productId:        p.id,
        title:            p.title,
        image:            p.image,
        price:            p.price,
        comparePrice:     p.comparePrice,
        quantity:         p.quantity!,
        category:         p.category,
        isFree:           p.isFree,
        isPlan:           p.category === "plan",
        planCompareLabel: p.planLabel,
        planLabel:        p.planPrice,
      });
    }
  });

  return items;
}

/* ─── Sub-components ─────────────────────────────────────── */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-3 mt-5 first:mt-0 flex items-center">
      <div className="h-px flex-1 bg-gray-200" />

      <span className="mx-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
        {label}
      </span>

      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

function ReviewRow({
  item,
  onIncrease,
  onDecrease,
}: {
  item: LineItem;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  const lineActive = item.price * item.quantity;
  const lineCompare = (item.comparePrice ?? item.price) * item.quantity;

  return (
    <div className="flex items-start gap-4 rounded-xl py-4 transition hover:bg-gray-50">
      {/* Product Image */}
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
          {item.title}
        </h4>

        <div className="mt-3">
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            size="sm"
          />
        </div>
      </div>

      {/* Price */}
      <div className="flex min-w-[78px] flex-col items-end">
        {item.isPlan ? (
          <>
            <span className="text-xs text-gray-400 line-through">
              {item.planCompareLabel}
            </span>

            <span className="text-sm font-bold text-gray-900">
              {item.planLabel}
            </span>
          </>
        ) : item.isFree ? (
          <>
            <span className="text-xs text-gray-400 line-through">
              ${lineCompare.toFixed(2)}
            </span>

            <span className="text-sm font-bold text-[#5B3AFF]">
              FREE
            </span>
          </>
        ) : (
          <>
            {lineCompare > lineActive && (
              <span className="text-xs text-gray-400 line-through">
                ${lineCompare.toFixed(2)}
              </span>
            )}

  <span className="text-base font-bold text-[#5B3AFF]">
  ${lineActive.toFixed(2)}
</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */

export default function ReviewPanel({ products, increase, decrease, onSave }: Props) {
  const lineItems = buildLineItems(products);

  const grouped: Partial<Record<string, LineItem[]>> = {};
  lineItems.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category]!.push(item);
  });

  // Totals (exclude plan from monetary total; only physical items)
  const physicalItems = lineItems.filter((i) => !i.isPlan);
  const compareTotal = physicalItems.reduce(
    (s, i) => s + (i.comparePrice ?? i.price) * i.quantity, 0
  );
  const activeTotal = physicalItems.reduce(
    (s, i) => s + i.price * i.quantity, 0
  );
  const savings = compareTotal - activeTotal;

  const isEmpty = lineItems.length === 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-[9px] font-bold ml-[-11px] uppercase tracking-[0.14em] text-gray-400 ">
          Review
        </p>
        <h2 className="mt-0.5 text-[17px] font-extrabold text-gray-900 leading-snug">
          Your security system
        </h2>
        <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      <div className="mx-5 border-t border-gray-100" />

      {/* ── Line items ── */}
<div className="space-y-1 px-5 py-4">
          {isEmpty ? (
          <p className="py-4 text-center text-xs text-gray-400">
            No items selected yet.
          </p>
        ) : (
          CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat) => (
            <div key={cat}>
              <SectionLabel label={CATEGORY_LABELS[cat]} />
              {grouped[cat]!.map((item) => (
                <ReviewRow
                  key={item.key}
                  item={item}
                  onIncrease={() => increase(item.productId, item.variantId)}
                  onDecrease={() => decrease(item.productId, item.variantId)}
                />
              ))}
            </div>
          ))
        )}
      </div>

      <div className="mx-5 border-t border-gray-100" />

      {/* ── Footer ── */}
 
<div className="px-5 py-5">

  {/* Top */}
  <div className="flex justify-between items-start">

    {/* Left */}
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F5F8FF]">
          <FaTruck className="text-[#00A99D] text-xl" />
        </div>

        <span className="font-medium text-gray-500">
          Fast Shipping
        </span>
      </div>

      <img
        src="/images/Satisfaction Badge-05 1.png"
        className="w-20"
      />
    </div>

    {/* Right */}
    <div className="text-right">

      <div className="leading-none">
        <p className="text-sm text-gray-400 line-through">
          ${compareTotal.toFixed(2)}
        </p>

        <p className="text-l font-bold text-[#4E2FD2]">
          FREE
        </p>
      </div>

      <div className="mt-6">
        <span className="rounded bg-[#4E2FD2] px-1 py-1 text-sm text-white">
          as low as $19.19/mo
        </span>
      </div>

      <div className="mt-5">
        {savings > 0 && (
          <p className="text-gray-400 line-through text-xl">
            ${compareTotal.toFixed(2)}
          </p>
        )}

        <h2 className="text-2xl font-bold text-[#4E2FD2]">
          ${activeTotal.toFixed(2)}
        </h2>
      </div>

    </div>

  </div>

  {/* Savings */}

  {savings > 0 && (
    <p className="mt-3 text-center  text-[#00A99D] font-bold text-[12px]">
      Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
    </p>
  )}

  {/* Checkout */}

  <button className="mt-5 h-10 w-full rounded-md bg-[#4E2FD2] text-xl font-semibold text-white">
    Checkout
  </button>

  <button
    onClick={onSave}
    className=" w-full text-center italic underline text-gray-600"
  >
    Save my system for later
  </button>

</div>
    </div>
  );
}