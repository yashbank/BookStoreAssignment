import {
  Text,
  Flex,
  Box,
  HStack,
  useDisclosure,
  Stack,
  IconButton,
  Container,
  Button,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../Redux/Auth/Auth.action";
import { Searchbar } from "./Searchbar";
import FilterComponent from "./FilterComponent";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const dispatch = useDispatch();
  const { authData } = useSelector((store) => store.auth);
  const { isAuthenticated, token } = authData;

  const Links = [
    { element: "Home", to: "/" },
    { element: "Cart", to: "/cart" },
    { element: "Order", to: "/order" },
  ];

  const LinksTwo = [
    { element: "Login", to: "/login" },
    { element: "Sign Up", to: "/signup" },
  ];

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container
      px={4}
      shadow={"rgba(43, 64, 70, 0.14) 0px 12px 32px"}
      maxW={"100%"}
      position="fixed"
      backdropFilter={"blur(10px)"}
      color="rgb(1, 75, 97)"
      padding={"20px 30px"}
      top="0px"
      margin={"auto"}
      left="0px"
      zIndex={"10"}
    >
      <Flex h={8} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack
            as={"nav"}
            spacing={6}
            justifyContent={"space-between"}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link.element} to={link.to}>
                <Text
                  fontSize={"20px"}
                  fontWeight="500"
                  borderBottom={
                    location.pathname === `${link.to}` ? "5px solid" : undefined
                  }
                  _hover={{ borderBottom: "5px solid", cursor: "pointer" }}
                >
                  {link.element}
                </Text>
              </NavLink>
            ))}
            {isAuthenticated || token ? (
              <Button onClick={handleLogout}>Logut</Button>
            ) : null}
          </HStack>
        </HStack>
        {location.pathname === "/" ? (
          <Box>
            <FilterComponent />
          </Box>
        ) : null}

        <Box>
          <Searchbar />
        </Box>
      </Flex>

      {isOpen ? (
        <Box pb={4} mt={2} display={{ md: "none" }}>
          {isAuthenticated || token ? (
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.element} to={link.to}>
                  <Text
                    fontSize={"md"}
                    fontWeight="semibold"
                    _hover={{ fontSize: "lg", cursor: "pointer" }}
                  >
                    {link.element}
                  </Text>
                </NavLink>
              ))}
              <Button onClick={handleLogout}>Logut</Button>
            </Stack>
          ) : (
            <Stack as={"nav"} spacing={4}>
              {LinksTwo.map((link) => (
                <NavLink key={link.element} to={link.to}>
                  <Text
                    fontSize={"md"}
                    fontWeight="semibold"
                    _hover={{ fontSize: "lg", cursor: "pointer" }}
                  >
                    {link.element}
                  </Text>
                </NavLink>
              ))}
            </Stack>
          )}
        </Box>
      ) : null}
    </Container>
  );
};

export default Navbar;