import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { IProduct, ProductStatus } from "../../types/product"
import { emptyCategory } from "../..//types/category"
import { ProductService } from "../../service/api/product"

interface ProductUpdate {
  infomation: {
    [key: string]: any
  }
  variants: Array<{
    [key: string]: any
  }>
  variantsDetails: Array<{
    [key: string]: any
  }>
  detail: Array<{
    [key: string]: any
  }>
}
interface ProductSlice {
  product: IProduct
  products: IProduct[]
  update: ProductUpdate
  updateVariantDetailList: Array<{
    sku: string
    price: number
    stock: number
  }>
}
export const createProduct = createAsyncThunk(
  "create product",
  (product: IProduct) => {
    return ProductService.addProduct(product)
  }
)
export const emptyProduct: IProduct = {
  _id: "",
  createdAt: "",
  category: {
    _id: -999,
    createdAt: -99999,
    name_en: "",
    name_vi: "",
    requireDetail: "",
  },
  variantDetails: [],
  variants: [
    {
      type: "",
      _id: 0,
      options: [],
    },
  ],
  detail: [],
  name: "",
  updatedAt: "",
  description: "",
  hasVariant: true,
  price: 0,
  stock: 0,
  sold: 0,
  images: {
    type: "link",
    images: [],
  },
  deleted: false,
  status: ProductStatus.HIDE,
}
const initialState: ProductSlice = {
  product: emptyProduct,
  products: [],
  update: {
    infomation: {},
    variants: [],
    variantsDetails: [],
    detail: [],
  },
  updateVariantDetailList: [],
}
export const getMyProduct = createAsyncThunk("Get my product", () => {
  return ProductService.getMyProducts()
})
export const ProductSlice = createSlice({
  name: "Product slice",
  initialState,
  reducers: {
    updateProduct(state, action: PayloadAction<Partial<IProduct>>) {
      return {
        ...state,
        product: {
          ...state.product,
          ...action.payload,
        },
      }
    },
    setEmptyNewProduct(state) {
      return {
        ...state,
        product: emptyProduct,
      }
    },
    addProductToProducts(state, action: PayloadAction<IProduct>) {
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    },
    updateProductInProducts(state, action: PayloadAction<Required<IProduct>>) {
      return {
        ...state,
        products: [
          action.payload,
          ...state.products.filter((x) => x._id !== action.payload._id),
          // {
          //   ...state.products.filter((x) => x._id === action.payload._id)[0],
          //   ...action.payload,
          // },
        ],
      }
    },
    setProductStatus(state, action: PayloadAction<ProductStatus>) {
      return {
        ...state,
        product: {
          ...state.product,
          status: action.payload,
        },
      }
    },
    updateVariantDetailProduct: (
      state,
      action: PayloadAction<{
        sku: string
        price: number
        stock: number
      }>
    ) => {
      const index = state.updateVariantDetailList.findIndex(
        (x) => x.sku === action.payload.sku
      )
      if (index !== -1) {
        state.updateVariantDetailList[index] = action.payload
      } else {
        state.updateVariantDetailList.push(action.payload)
      }
    },
    emptyListVariantDetail: (state) => {
      state.updateVariantDetailList = []
    },
    updateVariantDetailInProducts: (
      state,
      action: PayloadAction<
        {
          sku: string
          price: number
          stock: number
        }[]
      >
    ) => {
      return {
        ...state,
        products: state.products.map((x) => {
          return {
            ...x,
            variantDetails: x.variantDetails.map((y) => {
              const index = action.payload.findIndex((z) => z.sku === y.sku)
              if (index !== -1) {
                return {
                  ...y,
                  price: action.payload[index].price,
                  stock: action.payload[index].stock,
                }
              }
              return y
            }),
          }
        }),
      }
    },
    // setProduct(state, action: PayloadAction<IProduct>) {
    //   return {
    //     ...state,
    //     product: action.payload,
    //   }
    // },
    deleteProduct: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        products: state.products.map((x) => {
          // if equal set deleted = true
          if (x._id === action.payload) {
            return {
              ...x,
              deleted: true,
            }
          }
          return x
        }),
      }
    },
    restoreProduct: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        products: state.products.map((x) => {
          // if equal set deleted = true
          if (x._id === action.payload) {
            return {
              ...x,
              deleted: false,
            }
          }
          return x
        }),
      }
    },
    updateChange(state, action: PayloadAction<Partial<ProductUpdate>>) {
      return {
        ...state,
        update: {
          ...state.update,
          ...action.payload,
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMyProduct.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        return {
          ...state,
          products: [...action.payload],
        }
      }
    )
    builder.addCase(
      createProduct.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        return {
          ...state,
          products: [...state.products, action.payload],
        }
      }
    )
  },
})

export const {
  updateProduct,
  addProductToProducts,
  updateProductInProducts,
  setEmptyNewProduct,
  setProductStatus,
  updateVariantDetailProduct,
  emptyListVariantDetail,
  updateVariantDetailInProducts,
  deleteProduct,
  restoreProduct,
  updateChange,
} = ProductSlice.actions
export default ProductSlice.reducer
