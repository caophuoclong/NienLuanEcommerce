import { Box, Text } from "@chakra-ui/react"
import React from "react"
import {
  RiPieChartFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiAccountCircleFill,
} from "react-icons/ri"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { GiShoppingBag } from "react-icons/gi"
import { MdReport } from "react-icons/md"
import { VscPackage } from "react-icons/vsc"
import {
  itemId,
  RatingSubItemId,
  SalesSubItemId,
  selectedPage,
  subItemId,
} from "../../types/home"
import {
  changePage,
  changeSelectedPage,
  changeSubItemPage,
} from "../../features/home"
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

interface item {
  name: string
  id: itemId
  icon: React.ReactNode
  subIcon?: boolean
  pageName?: selectedPage
  subItem?: Array<
    Omit<item, "icon" | "subIcon" | "subItem" | "id"> & {
      id: subItemId
    }
  >
}
interface ItemProps {
  showNavBar: boolean
  page: itemId
  subItemId: {
    [key in itemId]?: subItemId
  }
}
const Item = ({
  icon,
  name,
  id,
  showNavBar,
  page,
  subIcon,
  subItem,
  subItemId,
  pageName,
}: ItemProps & item) => {
  const dispatch = useAppDispatch()
  return (
    <Box width="full">
      <Box
        p=".5rem"
        display={"flex"}
        gap="1rem"
        color={
          page === id && !showNavBar
            ? "#1b64f2"
            : page === id && !subIcon
            ? "#1b64f2"
            : "#000"
        }
        rounded="xl"
        background={showNavBar && page === id ? "#f3f4f6" : "transparent"}
        cursor="pointer"
        onClick={() => {
          if (pageName) {
            dispatch(changeSelectedPage(pageName))
          }
          if (subItemId[id]) {
            dispatch(
              changeSelectedPage(subItemId[id]?.toLocaleLowerCase() as any)
            )
          }
          dispatch(changePage(id))
        }}
      >
        {
          <Box flex={1} display="flex" gap="1rem">
            {icon}
            {showNavBar && <Text fontWeight={"semibold"}>{name}</Text>}
          </Box>
        }
        {showNavBar && subIcon && (
          <Box ml="auto">
            {!(page === id) ? (
              <RiArrowDownSLine size="24px" />
            ) : (
              <RiArrowUpSLine size="24px" />
            )}
          </Box>
        )}
      </Box>
      {showNavBar &&
        subItem &&
        page === id &&
        subItem.map((i, index) => (
          <Box
            key={index}
            onClick={() => {
              if (i.pageName) {
                dispatch(changeSelectedPage(i.pageName))
              }
              dispatch(
                changeSubItemPage({
                  page: id,
                  subItem: i.id,
                })
              )
            }}
            my=".5rem"
            ml="40px"
            paddingX=".5rem"
            rounded="xl"
            cursor={"pointer"}
            color={subItemId && subItemId[id] === i.id ? "#1b64f2" : "#000"}
          >
            <Text>{i ? i.name : null}</Text>
          </Box>
        ))}
    </Box>
  )
}
export default function NavBar() {
  const { showNavBar, page, subItem } = useAppSelector(
    (state) => state.homeSLice
  )
  const items: Array<item> = [
    {
      id: itemId.HOME,
      name: "Home",
      icon: <VscPackage size="24px" />,
      pageName: "home",
    },
    {
      id: itemId.SALES,
      name: "Sales",
      icon: <GiShoppingBag size="24px" />,
      subIcon: true,
      subItem: [
        {
          name: "Products",
          id: SalesSubItemId.PRODUCTS,
          pageName: "products",
        },
        {
          name: "Categories",
          id: SalesSubItemId.CATEGORIES,
          pageName: "categories",
        },
        {
          name: "Invoices",
          id: SalesSubItemId.INVOICES,
          pageName: "invoices",
        },
      ],
    },
    {
      id: itemId.RATING,
      name: "Rating",
      icon: <RiPieChartFill size="24px" />,
      subIcon: true,
      subItem: [
        {
          id: RatingSubItemId.REVIEWS,
          name: "Reviews",
          pageName: "reviews",
        },
        {
          id: RatingSubItemId.RATINGS,
          name: "Ratings",
          pageName: "ratings",
        },
      ],
    },
    {
      id: itemId.PROFILE,
      name: "Profile",
      pageName: "profile",
      icon: <RiAccountCircleFill size="24px" />,
    },
    {
      id: itemId.REPORTS,
      name: "Reports",
      icon: <MdReport size="24px" />,
    },
  ]
  const navigate = useNavigate()
  const onLogout = () => {
    window.localStorage.removeItem("access_token")
    alert("Logout success!")
    navigate("/signin")
  }
  return (
    <Box
      shadow={"xl"}
      h="100%"
      w={showNavBar ? "12%" : "40px"}
      boxSizing={showNavBar ? "border-box" : "content-box"}
      display={"flex"}
      flexDirection="column"
      pl=".5rem"
      borderRight={"1px solid #eaeaee"}
      alignItems={showNavBar ? "flex-start" : "center"}
      animation="ease-in-out 0.5s"
    >
      <Box
        overflowY={"auto"}
        w="full"
        display={"flex"}
        flexDirection="column"
        gap="1rem"
      >
        {items.map((i, index) => (
          <Item
            key={index}
            {...i}
            showNavBar={showNavBar}
            page={page}
            subItemId={subItem}
          />
        ))}
      </Box>
      <Box
        marginTop={"auto"}
        cursor="pointer"
        display={"flex"}
        gap="1rem"
        onClick={onLogout}
      >
        <Box marginTop={"auto"} cursor="pointer" display={"flex"} gap="1rem">
          <BiLogOut size="24px" />
          {showNavBar && <Text fontWeight={"semibold"}>Log out</Text>}
        </Box>
      </Box>
    </Box>
  )
}
