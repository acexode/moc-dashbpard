import { useEffect, useState, lazy } from 'react'
import axiosInstance from '../../services/api_service';
const WardTable = lazy(() => import("../../components/wards/wardTable"))

const TABLE_HEAD = [
  { id: "name", label: "Ward Name", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "" },
];


const WardsManagement = () => {
  const [wards, setWards] = useState([]);
  const [loading,setLoading] = useState(true)
  const [locations,setLocations] = useState([])
  useEffect(()=>{
    axiosInstance.get('locations').then(res =>{
      const options = res?.data?.map((dt:any) =>{
        return {
          label: dt?.name,
          id: dt?.id
        }
      })
      setLocations(options)
    }).catch(error =>{
      console.log(error)
    })
},[])

  const fetchAllWards = () =>{
    setLoading(true)
    axiosInstance
      .get(`locations/wards`)
      .then((res) => {
        if(res?.data?.name === "SequelizeAccessDeniedError"){
          setWards([])
        }
        else{
          setWards(res?.data)
        }
        })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllWards()
  }, []);
  return (
    <>
      <WardTable page_title='Wards' loading={loading} table_Head={TABLE_HEAD} dataList={wards} fetchAllData={fetchAllWards} locations={locations}  />
    </>
  )
}

export default WardsManagement