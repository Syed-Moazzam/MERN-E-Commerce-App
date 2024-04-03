import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"
import { getAllUsersAdmin } from "../../../../api";
import { useEffect, useState } from "react";

const List = () => {
  const [users, setUsers] = useState({
    tableHeader: [],
    tableBody: []
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllUsersAdmin()
      .then((res) => {
        setLoading(false);

        if (res.data && res.data.data && res.data.data.length > 0) {
          let fetchData = res.data.data.map(({ createdAt, updatedAt, password, gender, role, username, authType, __v, ...rest }) => { return rest })
          if (fetchData.length > 0) {
            let tableHeader = Object.keys(fetchData[0])
            let tableBody = fetchData.map((dat) => { return { _id: dat._id, name: dat.name, email: dat.email, phone: dat.phone, addr: dat.address } })
            setUsers({
              tableHeader, tableBody
            })
          }
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        {/* <Navbar/> */}
        <Datatable tableTitle="Users" tableData={users} loading={loading} />
      </div>
    </div>
  );
};

export default List;
