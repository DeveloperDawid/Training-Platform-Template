/**
 * Application Configuration
 *
 * This file contains the central configuration for products and platforms.
 * Modify these values to customize the application for your domain.
 *
 * IMPORTANT: After changing these values, you must also update:
 * 1. app/supabase/migrations/20250901000001_enums.sql - Update the SQL enums
 * 2. app/supabase/migrations/*_statistics.sql - Update column names
 * 3. Regenerate database types
 */

// =============================================================================
// PRODUCT CONFIGURATION
// =============================================================================

/**
 * Define your products here.
 * These should match the values in your SQL enum (product_type).
 */
export const PRODUCTS = {
  PRODUCT_A: {
    id: "product_a",
    label: "Product A",
    description: "Description for Product A",
  },
  PRODUCT_B: {
    id: "product_b",
    label: "Product B",
    description: "Description for Product B",
  },
  OTHER: {
    id: "other",
    label: "Other",
    description: "Other products",
  },
} as const;

/**
 * Define your platforms here.
 * These should match the values in your SQL enum (platform_type).
 */
export const PLATFORMS = {
  PLATFORM_A: {
    id: "platform_a",
    label: "Platform A",
    description: "Description for Platform A",
  },
  PLATFORM_B: {
    id: "platform_b",
    label: "Platform B",
    description: "Description for Platform B",
  },
  OTHER: {
    id: "other",
    label: "Other",
    description: "Other platforms",
  },
} as const;

// =============================================================================
// DERIVED TYPES AND ARRAYS
// =============================================================================

export type ProductId = (typeof PRODUCTS)[keyof typeof PRODUCTS]["id"];
export type PlatformId = (typeof PLATFORMS)[keyof typeof PLATFORMS]["id"];

export const PRODUCT_LIST = Object.values(PRODUCTS);
export const PLATFORM_LIST = Object.values(PLATFORMS);

export const PRODUCT_IDS = PRODUCT_LIST.map((p) => p.id) as ProductId[];
export const PLATFORM_IDS = PLATFORM_LIST.map((p) => p.id) as PlatformId[];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getProductLabel(productId: string): string {
  const product = PRODUCT_LIST.find((p) => p.id === productId);
  return product?.label ?? productId;
}

export function getPlatformLabel(platformId: string): string {
  const platform = PLATFORM_LIST.find((p) => p.id === platformId);
  return platform?.label ?? platformId;
}

export function getProductById(productId: string) {
  return PRODUCT_LIST.find((p) => p.id === productId);
}

export function getPlatformById(platformId: string) {
  return PLATFORM_LIST.find((p) => p.id === platformId);
}

// =============================================================================
// DIFFICULTY LEVELS (Usually don't need to change)
// =============================================================================

export const DIFFICULTY_LEVELS = {
  EASY: { id: "easy", label: "Easy", color: "green" },
  MEDIUM: { id: "medium", label: "Medium", color: "yellow" },
  HARD: { id: "hard", label: "Hard", color: "red" },
} as const;

export type DifficultyId =
  (typeof DIFFICULTY_LEVELS)[keyof typeof DIFFICULTY_LEVELS]["id"];
export const DIFFICULTY_LIST = Object.values(DIFFICULTY_LEVELS);
export const DIFFICULTY_IDS = DIFFICULTY_LIST.map(
  (d) => d.id
) as DifficultyId[];
