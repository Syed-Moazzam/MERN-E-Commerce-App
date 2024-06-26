import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './remainingAppointments.scss';
import Datatable from '../../components/datatable/Datatable';
import { getRemainingAppointments } from '../../../../api';

const RemainingAppointments = () => {
    const [remAppointments, setRemAppointments] = useState({
        tableHeader: [],
        tableBody: [],
    });

    const [loading, setLoading] = useState(false);

    const doctor = JSON.parse(localStorage.getItem("jwt"));
    const doctorId = doctor?._id;

    useEffect(() => {
        setLoading(true);
        getRemainingAppointments(doctorId).then((res) => {
            setLoading(false);
            let tableBody = [];
            let tableHeader = ["Name", "Email", "Phone", "Address", "Gender", "Status"];
            tableBody = res?.data?.data;
            setRemAppointments({ tableHeader, tableBody });
        }).catch((error) => console.log(error));
    }, []);

    return (
        <div className="CompletedAppointments">
            <Sidebar />
            <div className="CompletedAppointmentsContainer">
                <div className="top">
                    <h1>My Remaining Appointments</h1>
                </div>

                <div className="right">
                    <Datatable tableData={remAppointments} loading={loading} />
                </div>
            </div>
        </div>
    )
}

export default RemainingAppointments;