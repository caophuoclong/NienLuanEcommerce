import { Box, Button, Checkbox, Image, Input, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../service/api/auth"

type Props = {}

export default function Signin({}: Props) {
  const [rememberMe, setRememberMe] = React.useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Signin"
    const access_token = window.localStorage.getItem("access_token")
    if (access_token) {
      navigate("/")
    }
  }, [])
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    try {
      const response = await AuthService.login({
        username,
        password,
        rememberMe,
      })
      if (response) {
        window.localStorage.setItem("access_token", response.data)
        navigate("/")
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        alert(error.response.data.message)
      }
    }
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
                <label htmlFor="username">
                  <Text fontWeight={"semibold"}>Username</Text>
                </label>
                <Input
                  rounded="lg"
                  id="username"
                  placeholder="abc123"
                  name="username"
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
