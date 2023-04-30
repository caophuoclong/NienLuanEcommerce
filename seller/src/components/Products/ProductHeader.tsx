import { Box, IconButton, Input, Text, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { FaFilter } from "react-icons/fa"
import { HiSearch } from "react-icons/hi"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri"
import ModalProduct from "./Modal"
import { useAppDispatch } from "../../app/hooks"
import { setProductStatus } from "../../features/product"
import { ProductStatus } from "../../types/product"

type Props = {}

export default function ProductHeader({}: Props) {
  const [isFilter, setIsFilter] = useState(false)
  const dispatch = useAppDispatch()
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
          <Input variant={"unstyled"} placeholder="Tìm kiếm..." />
        </Box>
      </Box>

      {/* Last */}
      <Box ml="auto" display={"flex"} alignItems="center" gap="1rem">
        <Box
          onClick={() => dispatch(setProductStatus(ProductStatus.CREATE))}
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
          <Text>Thêm sản phẩm</Text>
        </Box>
        <Box position="relative">
          <IconButton
            disabled
            title="Feature is under development!"
            aria-label="filter products"
            variant={"unstyled"}
            icon={
              isFilter ? (
                <RiFilterFill size="24px" />
              ) : (
                <RiFilterOffFill size="24px" />
              )
            }
          />
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
            1-10 của 1000 <Text as="span">Sản phẩm</Text>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
