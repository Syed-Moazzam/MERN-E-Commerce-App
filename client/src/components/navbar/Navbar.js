import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  useDisclosure,
  Center,
  Divider,
  Text,
  Avatar,
  VStack,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { TbDiscount2 } from "react-icons/tb";
import { GiMedicines, GiDoctorFace } from "react-icons/gi";
import { AiOutlineQuestionCircle, AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiHandSanitizerLine, RiMenuFoldFill } from "react-icons/ri";
import { IoBagOutline, IoWalletOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import NavSearch from "./NavSearch";
import Tabs from "./Tabs";
import { LoginIndividualSlider } from "../loginPages/QuickLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../../redux/Cart/action";
import { isAuthenticated, isTokenValid } from "../../api";

function Navbar() {
  const role = isAuthenticated().role;
  const token = localStorage.getItem("token");
  const auth = useSelector((state) => state.auth);

  const { cartItems, totalCount } = useSelector((state) => state.cart);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    dispatch(getCartTotal());

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cartItems, auth]);

  const tabs = [
    {
      title: "Home",
      path: "/",
      logo: <HiOutlineHome />,
    },
    {
      title: "Order Medicine",
      path: "/medicines",
      logo: <GiMedicines />,
    },
    {
      title: "HealthCare Products",
      path: "/healthcare",
      logo: <RiHandSanitizerLine />,
    },
    {
      title: "Consultation",
      path: "/consultation",
      logo: <GiDoctorFace />,
    },
    {
      title: "Offers",
      path: "/offers",
      logo: <TbDiscount2 />,
    },
    {
      title: "My Account",
      path: "/user",
      logo: <AiOutlineUser />,
    },
    {
      title: "Orders",
      path: "/cart",
      logo: <IoBagOutline />,
    },
    {
      title: "Wallet",
      path: "/wallet",
      logo: <IoWalletOutline />,
    },
    {
      title: "Need Help?",
      path: "/help",
      logo: <AiOutlineQuestionCircle />,
    },
  ];

  return (
    <Box position={"relative"}>
      {scrollPosition > 200 && role !== "admin" && role !== "doctor" && (
        <Tabs />
      )}
      <Box
        p="12px 40px 10px 40px"
        position="fixed"
        zIndex="4"
        bg="white"
        top="0"
        left="0"
        width="100%"
        boxShadow="rgb(0 0 0 / 12%) 0px -1px 0px inset"
        display="flex"
        justifyContent="space-between"
        height="65px"
      >
        <Flex>
          {windowWidth < 1024 && (
            <Box w="30px" display="flex" alignItems="center">
              <RiMenuFoldFill
                fontSize="20px"
                className="menuHover"
                onClick={onOpen}
              />
            </Box>
          )}
          {windowWidth < 1024 && scrollPosition < 101 && (
            <Box margin="auto">
              <Flex h="100%" w="100%" justify="start" align="end" mt="27px">
                <Image
                  _hover={{ cursor: "pointer" }}
                  onClick={() =>
                    role === "admin" || role === "doctor"
                      ? navigate(`/${role}`)
                      : navigate("/")
                  }
                  h="100px"
                  src="/images/512x512.png"
                />
              </Flex>
            </Box>
          )}
          {windowWidth > 1024 && (
            <Box>
              <Flex h="100%" w="100%" justify="start" align="end" mt="27px">
                <Image
                  _hover={{ cursor: "pointer" }}
                  onClick={() =>
                    role === "admin" || role === "doctor"
                      ? navigate(`/${role}`)
                      : navigate("/")
                  }
                  h="100px"
                  src="/images/512x512.png"
                />
              </Flex>
            </Box>
          )}
          {role !== "admin" && role !== "doctor" && windowWidth > 1024 && (
            <Center pl="30px" pr="30px">
              <Divider orientation="vertical" />
            </Center>
          )}

          {role !== "admin" && role !== "doctor" && windowWidth > 1024 && (
            <Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="2px"
              >
                <Box>
                  <Image src="/images/express-delivery.svg" />
                </Box>
                <Box>
                  <Text fontSize="13px" mb="2px">
                    {" "}
                    Express delivery to
                  </Text>
                </Box>
              </Box>

              <Text fontSize="14px" align="center" pb="0" fontWeight="600">
                74600 Karachi
              </Text>
            </Box>
          )}
        </Flex>

        <Flex align="center">
          {scrollPosition > 100 && role !== "admin" && role !== "doctor" && (
            <NavSearch />
          )}
        </Flex>
        <Flex alignItems={'center'} gap={"20px"}>
          {windowWidth > 1024 && role !== "admin" && role !== "doctor" && (
            <Link className="hover_green" style={{ outline: 'none' }}>
              <Box display="flex" fontSize="14px">
                <Box display="flex" alignItems="center" mr="10px">
                  <AiOutlineUser fontSize="20px" />
                </Box>
                {windowWidth > 1104 && (
                  <Box mt="2px" fontWeight="600">
                    <LoginIndividualSlider />
                  </Box>
                )}
              </Box>
            </Link>
          )}
          {role !== "admin" && role !== "doctor" && isTokenValid() && (
            <Link className="hover_green" to={"/orders"}>
              <Box display="flex" fontSize="14px">
                <Box display="flex" alignItems="center" mr="5px">
                  <TbDiscount2 fontSize="20px" />
                </Box>
                {window.innerWidth > 1104 && (
                  <Box mt="2px" fontWeight="600">
                    My Orders
                  </Box>
                )}
                {window.innerWidth < 1024 && window.innerWidth > 650 && (
                  <Box mt="2px" fontWeight="600">
                    My Orders
                  </Box>
                )}
              </Box>
            </Link>
          )}
          {role !== "admin" && role !== "doctor" && isTokenValid() && (
            <Link className="hover_green" to={"/cart"}>
              <Box display="flex" fontSize="14px" pos={"relative"}>
                {
                  <Box display="flex" alignItems="center" mr="8px">
                    <FiShoppingCart fontSize="20px" />
                    <Center
                      border={"1px solid black"}
                      color="white"
                      fontSize={"10px"}
                      borderRadius="50%"
                      borderColor={"teal"}
                      bg="teal"
                      height={"16px"}
                      top={"-10px"}
                      left="10px"
                      pos={"absolute"}
                      paddingX="5px"
                    >
                      {token ? totalCount : 0}
                    </Center>
                  </Box>
                }
                {window.innerWidth > 1104 && (
                  <Box mt="2px" fontWeight="600">
                    Cart
                  </Box>
                )}
                {window.innerWidth < 1024 && window.innerWidth > 650 && (
                  <Box fontWeight="600" mt="2px">
                    Cart
                  </Box>
                )}
              </Box>
            </Link>
          )}
        </Flex>

        {/* left side menu DrawerContent */}

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth="1px"
              bg="linear-gradient(106.34deg, rgb(112, 179, 171) 0%, rgb(54, 119, 114) 96.21%)"
            >
              <Box display="flex">
                <Box display="flex" alignItems="center">
                  <Avatar
                    bg="white"
                    icon={<AiOutlineUser color="#10847E" fontSize="1.5rem" />}
                  />
                </Box>
                <Box
                  fontSize="13px"
                  ml="15px"
                  display="flex"
                  flexDir="column"
                  justifyContent="space-between"
                  color="white"
                >
                  <Box fontSize="15px">Hi, there !</Box>
                  <Box>
                    <LoginIndividualSlider />
                  </Box>
                </Box>
              </Box>
            </DrawerHeader>
            <DrawerBody padding="0">
              <VStack align="left">
                {tabs.map((tab) => (
                  <Link
                    onClick={onClose}
                    className="link"
                    key={tab.path}
                    to={tab.path}
                  >
                    <HStack
                      padding="12px 24px"
                      cursor="pointer"
                      _hover={{ color: "#10847E" }}
                      spacing="20px"
                    >
                      {tab.logo}
                      <Text>{tab.title}</Text>
                    </HStack>
                    <Divider />
                  </Link>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box height="65px" width="100%"></Box>
    </Box>
  );
}

export default Navbar;
