import { IconButton } from "@chakra-ui/react"
import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks"
import { updateProduct } from "../../../../../features/product"

type Props = {
  onPreview: (img: string) => void
}

export default function Link({ onPreview }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const product = useAppSelector((state) => state.productSlice.product)
  const links = product.images.images
  // const [links, setLinks] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState("")
  const [edit, setEdit] = useState<number | null>()
  return (
    <Box my="2">
      <Button onClick={onOpen}>AddLink</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AddImageLink</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              type="text"
              placeholder="InsertLinkHere!PressEnterToSubmit"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  const lst = [...links]
                  if (!lst.map((l) => l.link).includes(inputValue)) {
                    lst.push({
                      link: inputValue,
                    })
                    dispatch(
                      updateProduct({
                        images: {
                          type: "link",
                          images: lst,
                        },
                      })
                    )
                  } else {
                    alert("LinkExisted")
                  }
                  setInputValue("")
                }
              }}
            />
            <VStack noOfLines={4} overflowY="auto" my="2">
              {links.map((link, index) => (
                <HStack role="group">
                  {edit !== null && edit === index ? (
                    <Input
                      value={link.link}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const tmp = [...links]
                        console.log(tmp[index])
                        tmp[index] = {
                          ...tmp[index],
                          link: e.target.value,
                        }
                        dispatch(
                          updateProduct({
                            images: {
                              type: "link",
                              images: tmp,
                            },
                          })
                        )
                      }}
                    />
                  ) : (
                    <Button onClick={() => onPreview(link.link)}>
                      Image {index + 1}
                    </Button>
                  )}
                  <HStack
                    visibility={"hidden"}
                    _groupHover={{
                      visibility: "visible",
                    }}
                  >
                    {edit !== null && edit === index ? (
                      <IconButton
                        onClick={() => setEdit(null)}
                        size="sm"
                        aria-label="confirm"
                        icon={<FaCheck size="24px" />}
                      />
                    ) : (
                      <IconButton
                        onClick={() => setEdit(index)}
                        size="sm"
                        aria-label="editLink"
                        icon={<MdEdit size="24px" />}
                      />
                    )}
                    <IconButton
                      onClick={() => {
                        const lst = [...links]
                        lst.splice(index, 1)
                        dispatch(
                          updateProduct({
                            images: {
                              type: "link",
                              images: lst,
                            },
                          })
                        )
                      }}
                      size="sm"
                      aria-label="delLink"
                      icon={<FaTimes size="24px" />}
                    />
                  </HStack>
                </HStack>
                // <HStack>
                //   <Text>{index + 1}</Text>
                //   <Input
                //     value={link}
                //     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                //       const lst = [...links]
                //       // const i = lst.indexOf()
                //       lst[index] = e.target.value
                //       dispatch(updateProduct(lst))
                //     }}
                //   />
                // </HStack>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
