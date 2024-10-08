import { Box, useToast } from "@chakra-ui/react";
import Tabs from "../components/navbar/Tabs";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";
import { useEffect, useState } from "react";
import {
  bookAppointment,
  getAllDoctorsAdmin,
  updateAppointmentHistory,
  isAuthenticated,
} from "../api";
import {
  AiFillClockCircle,
  AiOutlineCalendar,
  AiOutlineMail,
  AiFillDollarCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Consultation = () => {
  const [doctors, setDoctors] = useState([]);
  const toast = useToast();
  const email = isAuthenticated().email;
  const navigate = useNavigate();

  const handlePayment = async (token, doctorId, price) => {
    try {
      const response = await axios({
        url: '/api/payment',
        method: "POST",
        data: {
          amount: price,
          token,
        },
      });
      if (response.status === 200) {
        bookAppointment(doctorId, userId)
          .then((res) => {
            console.log(res);
            toast({
              title: "Appointment Booked Successfully!",
              status: "success",
              duration: 3500,
              isClosable: true,
              position: "top",
            });
            navigate("/");
          })
          .catch((error) => console.log(error));

        updateAppointmentHistory(userId, doctorId)
          .then((res) => {
            console.log("history res", res);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      toast({
        title: "Payment Was Not Successful!",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctorsAdmin()
      .then((res) => {
        setDoctors(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("jwt"));
  const userId = loggedInUser?._id;
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.appointments.every((app) => app.email !== email)
  );

  return (
    <>
      <Tabs />
      <Box
        w={{ base: "90%", sm: "90%", lg: "90%", xl: "80%" }}
        margin="80px auto"
        color={"rgba(0,0,0,0.7)"}
      >
        <HealthCareBreadcrumb title="Consultation" />
        <section
          id="team"
          style={{ marginTop: "-60px" }}
          data-stellar-background-ratio="1"
        >
          <div className="col-md-6 col-sm-6" style={{ marginLeft: "15px" }}>
            <div className="about-info">
              <h2
                className="fadeInUp"
                style={{ color: "grey" }}
                data-wow-delay="0.1s"
              >
                Consult Our Doctors
              </h2>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {filteredDoctors?.length > 0 ? filteredDoctors.map((doctor, index) => (
                <div className="col-md-3 col-sm-4 mt-5 doctor-box" key={index}>
                  <div
                    className="team-thumb wow fadeInUp"
                    style={{ borderRadius: "10px" }}
                    data-wow-delay="0.2s"
                  >
                    <img
                      src={doctor.img1}
                      style={{
                        borderTopLeftRadius: "10px",
                        borderTopRadius: "10px",
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      className="img-responsive"
                      alt=""
                    />

                    <div
                      className="team-info"
                      style={{ paddingBottom: "10px" }}
                    >
                      <h4 style={{ color: "grey" }}>
                        {doctor.name.slice(0, 20)}
                      </h4>
                      <p style={{ fontWeight: "bold", color: "grey" }}>
                        {doctor.designation}
                      </p>
                      <div className="team-contact-info">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <AiFillDollarCircle
                            style={{
                              color: "rgba(66, 153, 225, 0.6)",
                              fontSize: "16px",
                              marginRight: "4px",
                            }}
                          />
                          <p>Rs. {doctor.price}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <AiOutlineCalendar
                            style={{
                              color: "rgba(66, 153, 225, 0.6)",
                              fontSize: "16px",
                              marginRight: "4px",
                            }}
                          />
                          <p>{doctor.days}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <AiFillClockCircle
                            style={{
                              color: "rgba(66, 153, 225, 0.6)",
                              fontSize: "16px",
                              marginRight: "4px",
                            }}
                          />
                          <p>{doctor.timings}</p>
                        </div>
                        <div
                          className="mt-3"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <AiOutlineMail
                            style={{
                              color: "rgba(66, 153, 225, 0.6)",
                              fontSize: "16px",
                              marginRight: "4px",
                            }}
                          />
                          <p>
                            <a href={`mailto:${doctor.email}`}>
                              {doctor.email}
                            </a>
                          </p>
                        </div>
                      </div>
                      {isAuthenticated() &&
                        isAuthenticated().role === "user" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <StripeCheckout
                              stripeKey={
                                "pk_test_51NHrzDESxeXqLxczuBm1MLWgFZZKFQj5zaH2HwXDmfluNP3mrR8gdh2z8l6ZVInWVoma6Gu4yP9nchi8JTWrNQan006l7Bdd1T"
                              }
                              label={
                                <span>
                                  Book Appointment
                                  <AiOutlineArrowRight
                                    style={{
                                      color: "rgba(66, 153, 225, 0.6)",
                                      marginLeft: "10px",
                                    }}
                                  />
                                </span>
                              }
                              name="Pay With Credit Card"
                              billingAddress
                              shippingAddress
                              amount={(doctor.price * 100) / 280}
                              description={`Your total is Rs. ${doctor.price}`}
                              token={(token) =>
                                handlePayment(token, doctor._id, doctor.price)
                              }
                              className="stripe-pay-btn-for-appointment"
                            />
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )) : <h3 style={{ color: 'grey', marginTop: '5rem', textAlign: 'center' }}>No Doctors Are Registered Currently! <br />You Will Be Able To Consult Our Doctors Once They Are Registered By The Admin.</h3>}
            </div>
          </div>
        </section>
      </Box>
    </>
  );
};

export default Consultation;
