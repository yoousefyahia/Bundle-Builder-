import { create } from "zustand";
import bundleData from "../data/bundle.json";
import type { Product } from "../types/product";

const STORAGE_KEY = "wyze-bundle-config";

function loadFromStorage(): Product[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Product[];
  } catch {
    return null;
  }
}

function saveToStorage(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    /* ignore */
  }
}

interface BundleStore {
  products: Product[];
  increase: (productId: string, variantId?: string) => void;
  decrease: (productId: string, variantId?: string) => void;
  selectVariant: (productId: string, variantId: string) => void;
  saveSystem: () => void;
}

const initialProducts =
  loadFromStorage() ?? (bundleData.products as Product[]);

export const useBundleStore = create<BundleStore>((set, get) => ({
  products: initialProducts,

  selectVariant: (productId, variantId) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, selectedVariant: variantId } : p
      ),
    })),

  increase: (productId, variantId) =>
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id !== productId) return p;

        if (p.variants?.length) {
          const targetVariant = variantId ?? p.selectedVariant;
          return {
            ...p,
            variants: p.variants.map((v) =>
              v.id === targetVariant ? { ...v, quantity: v.quantity + 1 } : v
            ),
          };
        }

        return { ...p, quantity: (p.quantity ?? 0) + 1 };
      }),
    })),

  decrease: (productId, variantId) =>
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id !== productId) return p;

        if (p.variants?.length) {
          const targetVariant = variantId ?? p.selectedVariant;
          return {
            ...p,
            variants: p.variants.map((v) =>
              v.id === targetVariant
                ? { ...v, quantity: Math.max(0, v.quantity - 1) }
                : v
            ),
          };
        }

        return { ...p, quantity: Math.max(0, (p.quantity ?? 0) - 1) };
      }),
    })),

  saveSystem: () => {
    saveToStorage(get().products);
  },
}));