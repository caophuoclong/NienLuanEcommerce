import {
  Box,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
import { updateProduct } from "../../../../features/product"
import { useAppSelector, useAppDispatch } from "../../../../app/hooks"
import Image from "./Image"
type Props = {}

export default function WithoutVariant({}: Props) {
  const defaultVariant: ["price", "stock"] = ["price", "stock"]
  const product = useAppSelector((state) => state.productSlice.product)
  const dispatch = useAppDispatch()
  return (
    <Box>
      {/* Images */}
      <Image />
      <Table>
        <Thead>
          <Tr>
            {defaultVariant.map((variant, index) => (
              <Th key={index}>
                {variant.charAt(0).toLocaleUpperCase() + variant.slice(1)}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {defaultVariant.map((variant, index) => (
              <Td key={index}>
                <Input
                  type="number"
                  value={product[variant] ? (product[variant] as number) : 0}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      updateProduct({
                        [variant]: e.target.value,
                      })
                    )
                  }}
                />
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}
