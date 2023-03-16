import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"

type Props = {
  image: string
  setEmptyImage: () => void
}

export default function PreviewImage({ image, setEmptyImage }: Props) {
  const [existImage, setExistImage] = useState(false)
  useEffect(() => {
    if (image) {
      const img = new Image()
      img.src = image
      img.onload = () => setExistImage(true)
      img.onerror = () => setExistImage(false)
    }
  }, [image])
  //   const divRef = useRef<HTMLDivElement>(null)
  //   useEffect(() => {
  //     if (divRef.current) {
  //       const current = divRef.current
  //       current.style.backgroundImage = `url(${image})`
  //       //   console.log(current)
  //       const backgroundImage = current.style.backgroundImage
  //       console.log(
  //         "🚀 ~ file: PreviewImage.tsx:25 ~ useEffect ~ backgroundImage:",
  //         backgroundImage
  //       )
  //     }
  //   }, [image, divRef])
  return (
    <Modal isOpen={true} onClose={setEmptyImage}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Box
            width="400px"
            height={"400px"}
            bgSize="contain"
            bgRepeat={"no-repeat"}
            style={{
              backgroundImage: existImage
                ? `url(${image})`
                : "url(https://demofree.sirv.com/nope-not-here.jpg?w=400)",
            }}
          ></Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
