import { Avatar, Box, Button, IconButton, Image, Input } from "@chakra-ui/react"
import React from "react"
import { HiMenuAlt1, HiSearch } from "react-icons/hi"
import { BiBell } from "react-icons/bi"
import { useAppDispatch } from "../../app/hooks"
import { toggleNavBar } from "../../features/home"
type Props = {}

export default function Header({}: Props) {
  const dispatch = useAppDispatch()
  return (
    <Box
      display={"flex"}
      borderBottom={"1px solid #eaeaee"}
      padding=".5rem"
      gap="1rem"
      alignItems={"center"}
      height="7%"
    >
      <Image src="https://picsum.photos/300" boxSize={"40px"} rounded="xl" />
      <IconButton
        aria-label="expand nav bar"
        icon={<HiMenuAlt1 size="40px" />}
        variant="unstyled"
        onClick={() => dispatch(toggleNavBar())}
      />
      <Box
        display={"flex"}
        padding=".5rem"
        border={"1px solid #eaeaee"}
        rounded="xl"
        gap=".5rem"
        w={"25%"}
        _focusWithin={{
          border: "1px solid #1e90ff",
        }}
      >
        <HiSearch size="24px" />
        <Input variant={"unstyled"} placeholder="Search something" />
      </Box>
      <Box position={"relative"} display="flex" alignItems={"center"} ml="auto">
        <IconButton
          aria-label="notification"
          variant={"unstyled"}
          icon={<BiBell size="24px" />}
        />
      </Box>
      <Avatar size={"sm"} src="https://picsum.photos/200" />
    </Box>
  )
}
