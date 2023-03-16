import { Box, Button, Text } from "@chakra-ui/react"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { ICategory } from "../../../types/category"

type Props = {
  categories: Array<ICategory>
  onSelectCategory: (category: ICategory) => void
}

export default function RenderCategoryResult({
  categories,
  onSelectCategory,
}: Props) {
  const lang = useAppSelector((state) => state.homeSlice.lang)
  return (
    <>
      {categories.map((category) => (
        <Button
          onClick={() => onSelectCategory(category)}
          key={category._id}
          variant="ghost"
          textAlign={"start"}
          justifyContent="start"
          w={"70%"}
          p="1rem"
        >
          <Text>{category[`name_${lang}`]}</Text>
        </Button>
      ))}
    </>
  )
}
