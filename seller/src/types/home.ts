export enum itemId {
  HOME = "HOME",
  SALES = "SALES",
  REPORTS = "REPORTS",
  RATING = "RATING",
  PROFILE = "PROFILE",
}
export enum SalesSubItemId {
  PRODUCTS = "PRODUCTS",
  CATEGORIES = "CATEGORIES",
  ORDERS = "ORDERS",
  COUPON = "COUPON",
}
export enum RatingSubItemId {
  REVIEWS = "REVIEWS",
  RATINGS = "RATINGS",
}
export type subItemId = SalesSubItemId | RatingSubItemId
export type selectedPage =
  | "home"
  | "products"
  | "categories"
  | "orders"
  | "reviews"
  | "ratings"
  | "profile"
  | "coupon"
