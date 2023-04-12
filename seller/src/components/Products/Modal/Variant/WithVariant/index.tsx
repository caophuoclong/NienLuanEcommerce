import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
import Variants from "./Variants"
import VariantList from "./VariantList"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { updateProduct } from "../../../../../features/product"

type Props = {}

export default function WithVariant({}: Props) {
  const variants = useAppSelector(
    (state) => state.productSlice.product.variants
  )

  return (
    <React.Fragment>
      <Variants />
      <VariantList />
    </React.Fragment>
  )
}
