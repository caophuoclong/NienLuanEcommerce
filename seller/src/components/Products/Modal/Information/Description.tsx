import { Box, Text, Textarea } from "@chakra-ui/react"
import React from "react"

type Props = {
  description?: string
  onChange: (str: string) => void
}

export default function Description({ description, onChange }: Props) {
  return (
    <Box>
      <Text
        borderBottom={"1px solid black"}
        position="sticky"
        top="0"
        bg="white"
        zIndex="docked"
        fontWeight={"bold"}
        marginBottom="1rem"
      >
        Description
      </Text>
      <Textarea
        value={description}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Product description"
        resize={"none"}
      />
    </Box>
  )
}
