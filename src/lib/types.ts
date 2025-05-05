export type SessionPayload = {
  authToken: string;
  expiresAt: Date;
};

// Type definitions for data coming in from Saruk Database

export type Store = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  store: Store;
  role: string;
  permissions: string[];
};

export interface Banner {
  id: string;
  name: string;
  directLink: string;
  imageUrl: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  seoDescription: string;
  menuPosition: number;
  imageUrl: string;
  subCategories: SubCategory[];
  termsAndConditions: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesOnBrand {
  id: string;
  categoryName: string;
  categorySlug: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  seoDescription: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  seoDescription: string;
  imageUrl: string;
  isFeatured: boolean;
  isTopBrand: boolean;
  relatedCategories: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoriesOnProducts {
  id: string;
  subCategoryName: string;
  subCategorySlug: string;
}

export interface Product {
  sku: number;
  id: string;
  categorySlug: string;
  category: Category;
  subCategories: SubCategoriesOnProducts[];
  brandSlug: string;
  brand: Brand;
  condition: Condition;
  name: string;
  slug: string;
  conditionSlug: string;
  specifications: string;
  noVatPrice: string;
  offerPrice: string;
  isFeatured: boolean;
  onSale: boolean;
  limitedTimeOffers: boolean;
  discounted: boolean;
  outOfStock: boolean;
  stockStatus: string;
  newArrival: boolean;
  addOns: string[];
  images: Image[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderNumber: number;
  type: string;
  totalPrice: string;
  vatAmount: string;
  shippingCost: string;
  grandTotal: string;
  status: string;
  orderItems: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Colour {
  id: string;
  name: string;
  value: string;
}

export interface Warranty {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Condition {
  id: string;
  name: string;
  slug: string;
}

export interface StockStatus {
  id: string;
  name: string;
  slug: string;
}

export interface PriceRange {
  id: string;
  name: string;
  slug: string;
  minValue: number;
}

export interface OtherFilter {
  id: string;
  filterGroupName: string;
  filterValue: string;
  filterSlug: string;
  categorySlug: string;
}

export interface DeliveryData {
  id: string;
  name: string;
  addresses: {
    id: string;
    address: string;
    shippingCost: string;
  }[];
}

export interface County {
  id: string;
  name: string;
  countyNumber: string;
}

export interface Region {
  id: string;
  name: string;
  countyId: string;
  county: County;
}

export interface Address {
  id: string;
  name: string;
  countyId: string;
  county: County;
  regionId: string;
  region: Region;
  shippingCost: string;
}

export interface TermsAndConditions {
  id: string;
  relatedCategory: string;
  content: string;
}

export interface Policy {
  id: string;
  type: string;
  content: string;
}

export interface Contact {
  id: string;
  name: string;
  value: string;
  label: string;
}

export interface Procedure {
  id: string;
  name: string;
  content: string;
}

export interface TargetDate {
  id: string;
  name: string;
  date: string;
}

export interface FilterOption {
  id: string;
  slug: string;
  name: string;
}

interface FilterOptions {
  [filterOption: string]: FilterOption[];
}

interface SubCategoryFilters {
  [filterOptions: string]: FilterOptions;
}

interface CategoryFilters {
  [subCategory: string]: SubCategoryFilters;
}

export interface ProductFilters {
  [category: string]: CategoryFilters;
}
