import { IProduct, IProductMeta, IProductDetail } from "../../types/product"
import { ICategory } from "../../types/category"

const initial: IProduct = {
  name: "",
  category: {} as ICategory,
  detail: [],
  meta: [],
  _id: undefined,
  description: undefined,
  updatedAt: "",
  createdAt: "",
}
enum ActionEnum {
  SET_NAME = "SET_NAME",
  SET_ID = "SET_ID",
  SET_META = "SET_META",
  SET_DESCRIPTION = "SET_DESCRIPTION",
  SET_DETAIL = "SET_DETAIL",
  UPDATE_DETAIL = "UPDATE_DETAIL",
  ADD_NEW_DEATIL = "ADD_NEW_DETAIL",
  SET_CATEGORY = "SET_CATEGORY",
  SET_DELETED_DETAIL = "SET_DELETED_DETAIL",
  UNDO_DELETED_DETAIL = "UNDO_DELETED_DETAIL",
  MAKE_DEFAULT = "MAKE_DEFAULT",
}
interface ActionReturn {
  type: ActionEnum
  payload?: any
}
type ActionType<T> = (value: T) => ActionReturn
const reducer: (state: IProduct, actinon: ActionReturn) => IProduct = (
  state: IProduct,
  action: ActionReturn
) => {
  switch (action.type) {
    case ActionEnum.SET_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case ActionEnum.SET_META:
      return {
        ...state,
        meta: action.payload,
      }
    case ActionEnum.SET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      }
    case ActionEnum.SET_ID:
      return {
        ...state,
        _id: action.payload,
      }
    case ActionEnum.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
    case ActionEnum.ADD_NEW_DEATIL:
      return {
        ...state,
        detail: [
          ...state.detail,
          {
            key: action.payload.key,
            value: action.payload.value,
          },
        ],
      }
    case ActionEnum.UPDATE_DETAIL:
      const x = state.detail.map((d) => {
        if (action.payload._id) {
          if (d._id === action.payload._id) {
            return {
              ...d,
              value: action.payload.value,
            }
          } else {
            return d
          }
        } else {
          if (d.key === action.payload.key) {
            return {
              ...d,
              value: action.payload.value,
            }
          } else {
            return {
              ...d,
            }
          }
        }
      })

      return {
        ...state,
        detail: x,
      }
    case ActionEnum.SET_DELETED_DETAIL:
      return {
        ...state,
        detail: state.detail.map((d) => {
          if (d.key === action.payload) d.deleted = true
          return d
        }),
      }
    case ActionEnum.UNDO_DELETED_DETAIL:
      return {
        ...state,
        detail: state.detail.map((d) => {
          if (d.key === action.payload) d.deleted = false
          return d
        }),
      }
    case ActionEnum.MAKE_DEFAULT:
      return {
        _id: undefined,
        name: "",
        category: {},
        detail: [],
        meta: [],
        description: undefined,
        createdAt: "",
        updatedAt: "",
      }
    default:
      return state
  }
}
export const setProductName: ActionType<string> = (name: string) => ({
  type: ActionEnum.SET_NAME,
  payload: name,
})
export const setProductId: ActionType<string | undefined> = (_id?: string) => ({
  type: ActionEnum.SET_ID,
  payload: _id,
})
export const setProductMeta: ActionType<Array<IProductMeta>> = (
  meta: Array<IProductMeta>
) => ({
  type: ActionEnum.SET_META,
  payload: meta,
})
export const setProductCategory: ActionType<ICategory> = (
  value: ICategory
) => ({
  type: ActionEnum.SET_CATEGORY,
  payload: value,
})
export const setProductDetail: ActionType<Array<IProductDetail>> = (
  detail: Array<IProductDetail>
) => ({
  type: ActionEnum.SET_DETAIL,
  payload: detail,
})
export const setProductDescription: ActionType<string | undefined> = (
  des?: string
) => ({
  type: ActionEnum.SET_DESCRIPTION,
  payload: des,
})
export const addNewDetail: ActionType<{ key: string; value: any }> = (d) => ({
  type: ActionEnum.ADD_NEW_DEATIL,
  payload: d,
})
export const setDeletedDetail: ActionType<string> = (key) => ({
  type: ActionEnum.SET_DELETED_DETAIL,
  payload: key,
})
export const undeoDeletedDetail: ActionType<string> = (key) => ({
  type: ActionEnum.UNDO_DELETED_DETAIL,
  payload: key,
})
export const makeDefault: ActionType<undefined> = () => ({
  type: ActionEnum.MAKE_DEFAULT,
})
export const updateDetail: ActionType<{
  _id?: number
  key: string
  value: any
}> = (d) => ({
  type: ActionEnum.UPDATE_DETAIL,
  payload: d,
})

export { reducer, initial }
