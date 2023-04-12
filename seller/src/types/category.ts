export interface ICategory {
  _id: number
  name_vi: string
  name_en: string
  requireDetail: string
  createdAt: number
}
export const emptyCategory: ICategory = {
  _id: -9999,
  name_en: "",
  name_vi: "",
  createdAt: -999999,
  requireDetail: "",
}
