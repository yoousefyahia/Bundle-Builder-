import { useState } from "react";
import Accordion from "../components/Accordion";
import ProductCard from "../components/ProductCard";
import ReviewPanel from "../components/ReviewPanel";
import { useBundle } from "../hooks/useBundle";
import bundleData from "../data/bundle.json";
import type { Step } from "../types/step";
import toast from "react-hot-toast";
export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { products, increase, decrease, selectVariant, saveSystem } = useBundle();

  const steps = bundleData.steps as Step[];

  const getProductsByStep = (step: number) =>
    products.filter((p) => p.step === step);

  const getSelectedCount = (step: number) =>
    getProductsByStep(step).filter((p) => {
      if (p.variants) return p.variants.some((v) => v.quantity > 0);
      return (p.quantity ?? 0) > 0;
    }).length;

  const handleToggle = (stepId: number) =>
    setCurrentStep((prev) => (prev === stepId ? -1 : stepId));

  const handleSave = () => {
    saveSystem();
    toast.success(" Your system has been saved! It will be restored on your next visit.");
  };

  return (
    <div className="min-h-screen" style={{ background: "#F4F5FA" }}>

      {/* ── Page header ── */}
      <header
        className="border-b border-gray-200 bg-white px-4 py-5 text-center"
        style={{ borderBottomColor: "#E5E7EB" }}
      >
        <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight">
          Let's get started!
        </h1>
      </header>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-[7xl] px-4 py-5 sm:px-6 lg:px-8">

        {/*
         * Layout:
         *   mobile  (< 768px) : single column, review below
         *   tablet  (768–1023): single column, review below (but 2-col product grid)
         *   desktop (≥ 1024px): 2-column side-by-side, review sticky
         */}
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-6 xl:grid-cols-[1fr_360px]">

          {/* ── LEFT: Builder accordion ── */}
          <section className="overflow-hidden  bg-white divide-y divide-gray-300">
            {steps.map((step) => {
              const stepProducts = getProductsByStep(step.id);
              const selectedCount = getSelectedCount(step.id);
              const isOpen = currentStep === step.id;

              return (
                <Accordion
                  key={step.id}
                  step={step.id}
                  totalSteps={steps.length}
                  title={step.title}
                  icon={step.icon}
                  selected={selectedCount}
                  isOpen={isOpen}
                  onToggle={() => handleToggle(step.id)}
                >
                  {/* Product grid — 2 cols on ≥ sm */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {stepProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onIncrease={() => increase(product.id)}
                        onDecrease={() => decrease(product.id)}
                        onSelectVariant={(variantId) =>
                          selectVariant(product.id, variantId)
                        }
                      />
                    ))}
                  </div>

                  {/* Next step button */}
                  {step.id < steps.length && (
                    <div className="mt-5 flex justify-center">
                      <button
                        onClick={() => setCurrentStep(step.id + 1)}
                        className="
                          rounded-full border-2 border-[#5B3AFF] bg-white
                          px-8 py-2 text-[13px] font-semibold text-[#5B3AFF]
                          transition hover:bg-[#5B3AFF] hover:text-white
                          active:scale-[0.97]
                        "
                      >
                        Next: {step.nextStep}
                      </button>
                    </div>
                  )}
                </Accordion>
              );
            })}
          </section>

          {/* ── RIGHT: Review panel ── */}
          {/* On mobile/tablet: shows below the builder */}
          {/* On desktop: sticky side panel */}
          <aside className="mt-4 lg:mt-0">
            <div className="lg:sticky lg:top-4">
              <ReviewPanel
                products={products}
                increase={increase}
                decrease={decrease}
                onSave={handleSave}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}