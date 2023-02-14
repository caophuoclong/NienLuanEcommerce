export enum itemId {
  HOME = "HOME",
  SALES = "SALES",
  REPORTS = "REPORTS",
  RATING = "RATING"
}
export enum SalesSubItemId {
  PRODUCTS = "PRODUCTS",
  CATEGORIES = "CATEGORIES",
  INVOICES = "INVOICES",
}
export enum RatingSubItemId{
    REVIEWS = "REVIEWS",
    RATINGS = "RATINGS"
}
export type subItemId = SalesSubItemId  | RatingSubItemId;
export type selectedPage = "home" | "products" | "categories" | "invoices" | "reviews" | "ratings";
