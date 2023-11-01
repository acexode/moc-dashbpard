import { useEffect, useState ,lazy} from 'react'
import axiosInstance from '../../services/api_service';

const CustomTable = lazy(() => import("../../components/users/userTable"))


const TABLE_HEAD = [
  { id: "firstName", label: "First Name", alignRight: false },
  { id: "lastName", label: "Last Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "access", label: "Access", alignRight: false },
  { id: "level", label: "Level", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "" },
];


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(true)

  const fetchAllUsers = () =>{
    setLoading(true)
    axiosInstance
      .get(`users`)
      .then((res) => {
        if(res?.data?.name === "SequelizeAccessDeniedError"){
          setUsers([])
        }
        else{
          setUsers(res?.data)
        }
   
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllUsers()
  }, []);
  return (
    <><CustomTable page_title='Users' loading={loading} table_Head={TABLE_HEAD} dataList={users} fetchAllUsers={fetchAllUsers} /></>
  )
}

export default UserManagement