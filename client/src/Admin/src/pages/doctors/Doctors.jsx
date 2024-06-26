import React, { useEffect, useState } from "react";
import "./doctors.scss";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import { getAllDoctorsAdmin } from "../../../../api";

const Doctors = () => {
  const [doctors, setDoctors] = useState({
    tableHeader: [],
    tableBody: [],
  });

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllDoctorsAdmin()
      .then((res) => {
        setLoading(false);

        let tableBody = res?.data?.data;
        const tableHeader = [
          "Name",
          "Email Address",
          "Designation",
          "Timings",
          "Phone",
          "Address",
        ];
        let reducedArr = [];
        tableBody?.forEach((obj) => {
          if (
            obj?.appointments?.length === 0 &&
            obj?.completedAppointments?.length === 0
          ) {
            const { appointments, completedAppointments, ...remainingObj } =
              obj;
            const { _id, name, email, designation, timings, phone, address } =
              remainingObj;
            reducedArr.push({
              _id,
              name,
              email,
              designation,
              timings,
              phone,
              address,
            });
            tableBody = reducedArr;
          } else if (obj?.appointments?.length === 0) {
            const { appointments, ...remainingObj } = obj;
            const { _id, name, email, designation, timings, phone, address } =
              remainingObj;
            reducedArr.push({
              _id,
              name,
              email,
              designation,
              timings,
              phone,
              address,
            });
            tableBody = reducedArr;
          } else if (obj?.completedAppointments?.length === 0) {
            const { completedAppointments, ...remainingObj } = obj;
            const { _id, name, email, designation, timings, phone, address } =
              remainingObj;
            reducedArr.push({
              _id,
              name,
              email,
              designation,
              timings,
              phone,
              address,
            });
            tableBody = reducedArr;
          } else {
            console.log("original array not modified");
          }
        });

        setDoctors({ tableHeader, tableBody });
      }).catch((error) => console.log(error));
  }, [isDataUpdated]);

  return (
    <div className="doctors">
      <Sidebar />
      <div className="doctorsContainer">
        <Datatable tableTitle="Doctors" tableData={doctors} setIsDataUpdated={setIsDataUpdated} loading={loading} />
      </div>
    </div>
  )
}

export default Doctors;
