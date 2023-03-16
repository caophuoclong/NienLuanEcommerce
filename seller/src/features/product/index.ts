import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { IProduct } from "../../types/product"
import { emptyCategory } from "../..//types/category"
import { ProductService } from "../../service/api/product"
interface ProductSlice {
  product: IProduct
  products: IProduct[]
}
const initialState: ProductSlice = {
  product: {
    _id: "",
    createdAt: "",
    category: {
      _id: -999,
      createdAt: -99999,
      name_en: "",
      name_vi: "",
      requireDetail: "",
    },
    detail: [],
    name: "",
    variant: [],
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
  },
  products: [],
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
        product: {
          _id: "",
          createdAt: "",
          category: {
            _id: -999,
            createdAt: -99999,
            name_en: "",
            name_vi: "",
            requireDetail: "",
          },
          detail: [],
          name: "",
          variant: [],
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
        },
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
  },
})

export const {
  updateProduct,
  addProductToProducts,
  updateProductInProducts,
  setEmptyNewProduct,
} = ProductSlice.actions
export default ProductSlice.reducer
