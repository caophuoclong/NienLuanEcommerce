import { Box, IconButton, Input, Text, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { HiSearch } from "react-icons/hi"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import ModalProduct from "./Modal"

type Props = {
  onAddProduct: () => void
}

export default function ProductHeader({ onAddProduct }: Props) {
  return (
    <Box display={"flex"} p="1rem" h="8%">
      <Box>
        {/* first */}
        <Box
          display={"flex"}
          padding=".5rem"
          border={"1px solid #eaeaee"}
          rounded="xl"
          gap=".5rem"
          _focusWithin={{
            border: "1px solid #1e90ff",
          }}
        >
          <HiSearch size="24px" />
          <Input variant={"unstyled"} placeholder="Search something" />
        </Box>
      </Box>

      {/* Last */}
      <Box ml="auto" display={"flex"} alignItems="center">
        <Box
          onClick={onAddProduct}
          bg="#1f1e13"
          rounded="lg"
          p=".5rem"
          color="white"
          display={"flex"}
          alignItems="center"
          gap=".5rem"
          cursor={"pointer"}
        >
          <AiOutlinePlus size="24px" />
          <Text>Add Product</Text>
        </Box>
        <Box display={"flex"} alignItems="center">
          <IconButton
            size={"sm"}
            variant={"unstyled"}
            aria-label="previous page products"
            icon={<IoIosArrowBack size="24px" />}
          />
          <IconButton
            variant={"unstyled"}
            size={"sm"}
            aria-label="next page products"
            icon={<IoIosArrowForward size="24px" />}
          />
          <Text fontSize={"xs"}>
            1-10 of 1000 <Text as="span">Products</Text>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
