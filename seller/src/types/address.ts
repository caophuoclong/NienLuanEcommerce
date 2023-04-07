interface AdminstrativeUnit {
  id: number
  short_name: string
  short_name_en: string
}
export interface IAddress {
  _id: number
  detail: string
  createdAt: number
  name: string
  phone: string
  ward: {
    code: number
    name: string
    name_en: string
    administrativeUnit: AdminstrativeUnit
    district: {
      code: number
      name: string
      name_en: string
      administrativeUnit: AdminstrativeUnit
      province: {
        code: number
        name: string
        name_en: string
        administrativeUnit: AdminstrativeUnit
      }
    }
  }
}
