import { Box, Button, Checkbox, Image, Input, Text } from "@chakra-ui/react"
import React from "react"

type Props = {}

export default function Signin({}: Props) {
  const [rememberMe, setRememberMe] = React.useState(false)
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    console.log(email, password, rememberMe)
  }
  return (
    <Box position={"relative"} width={"100vw"} height={"100vh"}>
      <Box
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        width={"60%"}
        height={"70%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={"1rem"}
        gap={"1rem"}
        shadow={"lg"}
        rounded="md"
      >
        <Image
          boxSize="500px"
          objectFit="cover"
          src="https://picsum.photos/300/"
          alt="Dan Abramov"
          flex={1}
          fallbackSrc="https://via.placeholder.com/500"
        />
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            SignIn
          </Text>
          <form onSubmit={onFormSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <label htmlFor="emails">
                  <Text fontWeight={"semibold"}>Your email</Text>
                </label>
                <Input
                  rounded="lg"
                  id="emails"
                  placeholder="abc123@gmail.com"
                  name="email"
                />
              </Box>
              <Box>
                <label htmlFor="password">
                  <Text fontWeight={"semibold"}>Your password</Text>
                </label>
                <Input
                  rounded="lg"
                  id="password"
                  type={"password"}
                  placeholder="*********"
                  name="password"
                />
              </Box>
              <Box display={"flex"} gap={1}>
                <Checkbox
                  id="rememberme"
                  name="rememberme"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberme">
                  <Text
                    fontWeight={"semibold"}
                    cursor="pointer"
                    color="#818793"
                  >
                    Remember me
                  </Text>
                </label>
              </Box>
              <Button
                type="submit"
                background={"blue.400"}
                _hover={{
                  backgroundColor: "blue.600",
                }}
              >
                Signin
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
