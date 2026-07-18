import type { Variant } from "./variant";

export type ProductCategory = "camera" | "sensor" | "accessory" | "plan";

export interface Product {
  id: string;
  step: number;
  category: ProductCategory;
  title: string;
  description: string;
  image: string;
  badge?: string;
  learnMore?: string;
  price: number;
  comparePrice?: number;
  quantity?: number;
  variants?: Variant[];
  selectedVariant?: string;
  isFree?: boolean;
  planLabel?: string;
  planPrice?: string;
}