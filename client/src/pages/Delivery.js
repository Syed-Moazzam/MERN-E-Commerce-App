import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  Hide,
  useToast,
} from "@chakra-ui/react";
import { AiFillRightCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { createOrder, isAuthenticated } from "../api";
import { clearCart } from "../redux/Cart/action";

function Delivery() {
  const { totalAmount, totalOriginalAmount, cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const userId = isAuthenticated()._id;
  const toast = useToast();
  const navigate = useNavigate();

  const currentDate = new Date();

  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);

  const dollarPrice = 286;

  const startDate = new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000);
  const endDate = new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  const start = startDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
  const end = endDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });

  const handleChange = (e) => {
    if (cartItems?.length > 0) {
      setDeliveryAmount(e.target.value);
      setAmountToPay(totalAmount + parseInt(e.target.value));
    }
    else {
      toast({
        title: "Please Add Items In Cart First!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handlePayment = async (token) => {
    try {
      const response = await axios({
        url: '/api/payment',
        method: "POST",
        data: {
          amount: amountToPay,
          token,
        },
      });
      if (response.status === 200) {
        createOrder(userId, amountToPay)
          .then((res) => dispatch(clearCart()))
          .catch((err) => console.log(err))
          .finally((res) => {
            toast({
              title: "Order Placed Successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            navigate("/");
          });
      }
    } catch (error) {
      toast({
        title: "Payment Was Not Successfull!",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      w={{ base: "90%", sm: "90%", md: "90%", lg: "90%", xl: "70%" }}
      m="auto"
      justifyContent="space-between"
      mt="30px"
      mb="30px"
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row",
      }}
    >
      {/* Left */}
      <Box
        w={{ base: "90%", sm: "90%", md: "90%", lg: "90%", xl: "60%" }}
        mr="20px"
      >
        <Stack spacing={8} direction="column">
          <Flex
            alignItems="end"
            p={5}
            shadow="md"
            bg="#ecf2ff"
            borderRadius="7px"
          >
            <Box>
              <Heading fontSize="xl" color="#4f585e">
                Hey there!
              </Heading>
              <Text mb="0px" mt={4} fontSize="xl" color="#889dad">
                Choose Express delivery to get your order quicker!
              </Text>
            </Box>
          </Flex>
          <RadioGroup defaultValue="1">
            <Box
              p={5}
              borderRadius="7px"
              mt={4}
              _hover={{ border: "1px solid #159a94" }}
              border="1px solid #e4e7ea"
            >
              <Flex>
                <Radio
                  onChange={handleChange}
                  colorScheme="green"
                  value="200"
                ></Radio>
                <Box ml="20px">
                  <Heading fontSize="xl" color="#4f585e">
                    Tommorrow, before 10:00 pm{" "}
                  </Heading>
                  <Flex mt="6px">
                    <Image src="/images/express-delivery.svg" />
                    <Text mb="0px" fontSize="13px">
                      {" "}
                      Express Delivery | Rs 200{" "}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box
              p={5}
              borderRadius="7px"
              mt={4}
              _hover={{ border: "1px solid #159a94" }}
              border="1px solid #e4e7ea"
            >
              <Flex>
                <Radio
                  onChange={handleChange}
                  colorScheme="green"
                  value="100"
                ></Radio>
                <Box ml="20px">
                  <Heading fontSize="xl" color="#4f585e">
                    {start} - {end}
                  </Heading>
                  <Flex mt="6px">
                    <Text mb="0px" fontSize="13px">
                      {" "}
                      Standard Delivery | Rs 100{" "}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </RadioGroup>
        </Stack>
      </Box>
      {/* Right */}
      <Box
        w={{ base: "90%", sm: "90%", md: "90%", lg: "90%", xl: "30%" }}
        mt={{ base: "20px", sm: "20px", md: "20px", lg: "20px", xl: "1px" }}
      >
        <Box position={'relative'}>
          <StripeCheckout
            stripeKey={
              "pk_test_51NHrzDESxeXqLxczuBm1MLWgFZZKFQj5zaH2HwXDmfluNP3mrR8gdh2z8l6ZVInWVoma6Gu4yP9nchi8JTWrNQan006l7Bdd1T"
            }
            label="Proceed to Pay"
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            amount={(amountToPay * 100) / dollarPrice}
            description={`Your total is Rs. ${amountToPay}`}
            token={handlePayment}
            className="stripe-pay-btn"
            disabled={!deliveryAmount || !cartItems?.length}
          />
          {deliveryAmount > 0 && <AiFillRightCircle fill="#fff" style={{ position: 'absolute', top: '0.9rem', right: '4rem' }} />}
        </Box>
        <Hide below="lg">
          <Box>
            <Heading mb="0px" fontSize="xl" color="#889dad" p="10px">
              Order Summary
            </Heading>
            <Flex justifyContent="space-between" p="10px">
              <Text mb="0px" fontSize="l" color="#4f585e">
                Cart Value
              </Text>
              <Flex>
                <Heading fontSize="md" as="s" color="#8897a2" mr="5px">
                  Rs {totalOriginalAmount}
                </Heading>
                <Heading fontSize="md" color="#4f585e">
                  Rs {totalAmount}
                </Heading>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" p="10px">
              <Text mb="0px" fontSize="l" color="#4f585e">
                Delivery charges
              </Text>

              <Heading fontSize="md" color="#4f585e">
                {deliveryAmount}
              </Heading>
            </Flex>
            <Flex
              justifyContent="space-between"
              p="10px"
              borderTop="2px dotted #e4e7ea"
              borderBottom="2px dotted #e4e7ea"
            >
              <Text mb="0px" fontSize="l" color="#4f585e">
                Cart Value
              </Text>
              {deliveryAmount ? (
                <Heading fontSize="md" color="#4f585e">
                  Rs {totalAmount + parseInt(deliveryAmount)}
                </Heading>
              ) : (
                <Heading fontSize="md" color="#4f585e">
                  Rs {totalAmount}
                </Heading>
              )}
            </Flex>
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              border="2px dotted #3bb896"
              borderRadius="7px"
              bg="#f2fff8"
              p={2}
              mt="20px"
            >
              <AccordionItem border="1px solid #f2fff8">
                <h2>
                  <AccordionButton _hover={{ bg: "#f2fff8" }}>
                    <Box
                      flex="1"
                      textAlign="left"
                      justifyContent="space-around"
                      w="100%"
                    >
                      <Flex
                        color="#3bb896"
                        flexDirection={{
                          base: "row",
                          sm: "row",
                          md: "row",
                          lg: "row",
                          xl: "row",
                        }}
                      >
                        Total savings of{" "}
                        <Text mb="0px" fontWeight="bold" mr="5px" ml="5px">
                          {" "}
                          Rs {(totalOriginalAmount - totalAmount).toFixed(
                            2
                          )}{" "}
                        </Text>{" "}
                        on this order
                      </Flex>
                    </Box>
                  </AccordionButton>
                </h2>
              </AccordionItem>
            </Accordion>
          </Box>
        </Hide>
      </Box>
    </Box>
  );
}

export default Delivery;
