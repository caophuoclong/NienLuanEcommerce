import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { IProduct, ProductStatus } from "../../types/product"
import { emptyCategory } from "../..//types/category"
import { ProductService } from "../../service/api/product"
interface ProductSlice {
  product: IProduct
  products: IProduct[]
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
  variants: [],
  detail: [],
  name: "",
  updatedAt: "",
  description: "",
  hasVariant: false,
  price: 0,
  stock: 0,
  sold: 0,
  images: {
    type: "link",
    images: [],
  },
  status: ProductStatus.HIDE,
}
const initialState: ProductSlice = {
  product: emptyProduct,
  products: [],
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
} = ProductSlice.actions
export default ProductSlice.reducer
