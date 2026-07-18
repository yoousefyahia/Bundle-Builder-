import type { ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  HiOutlineVideoCamera,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { LuRadar, LuShieldPlus } from "react-icons/lu";

interface AccordionProps {
  title: string;
  step: number;
  totalSteps: number;
  selected: number;
  isOpen: boolean;
  icon?: string;
  children: ReactNode;
  onToggle: () => void;
}

function StepIcon({ icon }: { icon?: string }) {
  const cls = "h-6 w-6 shrink-0 text-gray-500";

  switch (icon) {
    case "camera":
      return <HiOutlineVideoCamera className={cls} />;

    case "plan":
      return <HiOutlineShieldCheck className={cls} />;

    case "sensor":
      return <LuRadar className={cls} />;

    case "shield":
      return <LuShieldPlus className={cls} />;

    default:
      return <HiOutlineShieldCheck className={cls} />;
  }
}

export default function Accordion({
  title,
  step,
  totalSteps,
  selected,
  isOpen,
  icon,
  children,
  onToggle,
}: AccordionProps) {
  return (
<div>
  <div className="px-4 pb-2">
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
      STEP {step} OF {totalSteps}
    </span>
  </div>

  {/* Card */}
  <div className="border border-gray-300 bg-white">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <StepIcon icon={icon} />

        <h3 className="text-[18px] font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <div className="flex items-center gap-2">
        {selected > 0 && (
          <span className="text-[15px] text-[#4F39F6]">
            {selected} selected
          </span>
        )}

        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </button>

    {isOpen && (
      <>
        <div className="border-t border-gray-300" />

        <div className="bg-[#EDF4FF] p-5">
          {children}
        </div>
      </>
    )}
  </div>
</div>
  );
}