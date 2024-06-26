import { Img } from "@chakra-ui/image";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <Box bg="#EEF4FF" p="4rem 1rem">
        <Accordion
          display={{ sm: "block", md: "block", lg: "none" }}
          defaultIndex={[0]}
          mb={5}
          allowMultiple
          fontFamily="Inter,sans-serif"
        >
          <AccordionItem>
            <AccordionButton pb={4}>
              <Box flex="1" textAlign="left">
                <Text fontWeight="600" color="#30363C">
                  Company
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>
                <Link>
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    About Us
                  </Text>
                </Link>
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pb={4}>
              <Box flex="1" textAlign="left">
                <Text fontWeight="600" color="#30363C">
                  Our Services
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>
                <Link to="/Medicine">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Order Medicine
                  </Text>
                </Link>
                <Link to="/healthcare">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Healthcare Products
                  </Text>
                </Link>

                <Link to="/offers">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Our Offers
                  </Text>
                </Link>
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pb={4}>
              <Box flex="1" textAlign="left">
                <Text fontWeight="600" color="#30363C">
                  Featured Categories
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>
                <Link to="/healthcare/products/Covid%20Essentials">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Covid Essentials
                  </Text>
                </Link>
                <Link to="/healthcare/products/Personal%20Care">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Personal Care
                  </Text>
                </Link>
                <Link to="/healthcare/products/Skin%20Care">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Skin Care
                  </Text>
                </Link>

                <Link to="/healthcare/products/Ayush">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Ayurvedic Care
                  </Text>
                </Link>
                <Link to="/Fitness">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Fitness Supplements
                  </Text>
                </Link>
                <Link to="/healthcare/products/Mom%20&%20Baby">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Mother and Baby Care
                  </Text>
                </Link>
                <Link to="/healthcare/products/Devices">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Healthcare Devices
                  </Text>
                </Link>
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pb={4}>
              <Box flex="1" textAlign="left">
                <Text fontWeight="600" color="#30363C">
                  Need Help
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>
                <Link to="/Medicine">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Browse All Medicines
                  </Text>
                </Link>
                <Link to="/healthcare">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Browse All Healthcare
                  </Text>
                </Link>
                <Link to="/offers">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Browse All Offers
                  </Text>
                </Link>
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pb={4}>
              <Box flex="1" textAlign="left">
                <Text fontWeight="600" color="#30363C">
                  Policy Info
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <hr></hr>
            <AccordionPanel pb={4}>
              <Box>
                <Link to="privacy-policy">
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Privacy Policy
                  </Text>
                </Link>

                <Link>
                  <Text color="#30363C" fontSize="14px" mb={3}>
                    Terms and Conditions
                  </Text>
                </Link>
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <Box ml="2.5%" mb={10} mt={10}>
            <Heading m="15px 0 15px 0" fontSize="16px" fontWeight="600">
              Follow us on
            </Heading>
            <Flex gap={4} flexWrap="wrap">
              <Link to="https://github.com/Syed-Moazzam/MERN-E-Commerce-App">
                <Box h="30px" w="30px" mr="20px">
                  <Img src="/images/github.svg" w="100%" h="100%" alt=""></Img>
                </Box>
              </Link>
              <Link
                to="https://www.linkedin.com/company/94789507/
                "
              >
                <Box h="30px" w="30px">
                  <Img
                    src="/images/linkedin.svg"
                    w="100%"
                    h="100%"
                    alt=""
                  ></Img>
                </Box>
              </Link>
            </Flex>
          </Box>
        </Accordion>
        {/* // for big screen code */}
        <Grid
          textAlign="start"
          gridTemplateColumns="repeat(11,1fr)"
          fontFamily="Inter,sans-serif"
          w="95%"
          m="auto"
          display={{ base: "none", md: "none", lg: "grid" }}
        >
          <GridItem colSpan={3} mr={3}>
            <Box>
              <Box>
                <Heading m="15px 0" fontSize="16px" fontWeight="600">
                  Company
                </Heading>
                <Link>
                  <Text color="#30363C" fontSize="14px" mb={2}>
                    About Us
                  </Text>
                </Link>
              </Box>
              <Box mt={6}>
                <Heading m="15px 0" fontSize="16px" fontWeight="600">
                  Our Services
                </Heading>
                <Link to="/Medicine">
                  <Text color="#30363C" fontSize="14px" mb={2}>
                    Order Medicine
                  </Text>
                </Link>
                <Link to="/healthcare">
                  <Text color="#30363C" fontSize="14px" mb={2}>
                    Healthcare Products
                  </Text>
                </Link>
                <Link to="/offers">
                  <Text color="#30363C" fontSize="14px" mb={2}>
                    Our Offers
                  </Text>
                </Link>
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={3} mr={3}>
            <Box>
              <Heading m="15px 0" fontSize="16px" fontWeight="600">
                Featured Categories
              </Heading>
              <Link to="/healthcare/products/Covid%20Essentials">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Covid Essentials
                </Text>
              </Link>
              <Link to="/healthcare/products/Personal%20Care">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Personal Care
                </Text>
              </Link>
              <Link to="/healthcare/products/Skin%20Care">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Skin Care
                </Text>
              </Link>

              <Link to="/healthcare/products/Ayush">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Ayurvedic Care
                </Text>
              </Link>
              <Link to="/Fitness">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Fitness Supplements
                </Text>
              </Link>
              <Link to="/healthcare/products/Mom%20&%20Baby">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Mother and Baby Care
                </Text>
              </Link>
              <Link to="/healthcare/products/Devices">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Healthcare Devices
                </Text>
              </Link>
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Box>
              <Heading m="15px 0" fontSize="16px" fontWeight="600">
                Need Help
              </Heading>
              <Link to="/Medicine">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Browse All Medicines
                </Text>
              </Link>
              <Link to="/healthcare">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Browse All Healthcare
                </Text>
              </Link>
              <Link to="/offers">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Browse All Offers
                </Text>
              </Link>
            </Box>
            <Box mt={6}>
              <Heading m="15px 0" fontSize="16px" fontWeight="600">
                Policy Info
              </Heading>

              <Link to="privacy-policy">
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Privacy Policy
                </Text>
              </Link>

              <Link>
                <Text color="#30363C" fontSize="14px" mb={2}>
                  Terms and Conditions
                </Text>
              </Link>
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box>
              <Heading m="15px 0 15px 0" fontSize="16px" fontWeight="600">
                Follow us on
              </Heading>
              <Flex justify="flex-start" pr="20px" flexWrap="wrap">
                <Link to="https://github.com/Syed-Moazzam/MERN-E-Commerce-App">
                  <Box h="30px" w="30px" mr="20px">
                    <Img
                      src="/images/github.svg"
                      w="100%"
                      h="100%"
                      alt=""
                    ></Img>
                  </Box>
                </Link>
                <Link
                  to="https://www.linkedin.com/company/94789507/
                "
                >
                  <Box h="30px" w="30px">
                    <Img
                      src="/images/linkedin.svg"
                      w="100%"
                      h="100%"
                      alt=""
                    ></Img>
                  </Box>
                </Link>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
        <Box w="95%" m="auto">
          <Flex
            justify="center"
            flexDirection={{ base: "column", md: "column", lg: "row" }}
          >
            <Box>
              <Link>
                <Text
                  fontWeight="500"
                  m="65px 0 15px 0"
                  color="#30363C"
                  fontSize="16px"
                >
                  © {new Date().getFullYear()} Fit Fables. All Rights Reserved
                </Text>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
