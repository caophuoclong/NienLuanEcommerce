import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import React, { useState } from "react"

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks"
import { updateProduct } from "../../../../../features/product"
import File from "./File"
import Link from "./Link"
import PreviewImage from "./PreviewImage"

type Props = {}
export interface MyFile {
  file: string
  name: string
  type: string
}
export default function Image({}: Props) {
  const [show, setShow] = useState(true)
  const [image, setImage] = useState<string>("")
  const product = useAppSelector((state) => state.productSlice.product)
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Button
        onClick={() => setShow(!show)}
        variant={"unstyled"}
        display="flex"
        alignItems={"center"}
      >
        <Text>Images</Text>
        {!show ? (
          <RiArrowDropUpLine size="24px" />
        ) : (
          <RiArrowDropDownLine size="24px" />
        )}
      </Button>
      {show && (
        <React.Fragment>
          <RadioGroup
            onChange={(e) =>
              dispatch(
                updateProduct({
                  images: {
                    type: e as "file" | "link",
                    images: [],
                  },
                })
              )
            }
            value={product.images.type}
          >
            <Stack direction="row" spacing="24px">
              <Radio value="link">Link</Radio>
              <Radio value="file">Upload</Radio>
            </Stack>
          </RadioGroup>

          {product.images.type === "file" && (
            <File onPreview={(str) => setImage(str)} />
          )}
          {product.images.type === "link" && (
            <Link onPreview={(str) => setImage(str)} />
          )}
          {image && (
            <PreviewImage image={image} setEmptyImage={() => setImage("")} />
          )}
        </React.Fragment>
      )}
    </Box>
  )
}
