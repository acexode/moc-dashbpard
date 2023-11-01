import { useEffect, useState, lazy } from 'react'
import axiosInstance from '../../services/api_service';
const FacilityTable = lazy(() => import("../../components/facility/facilityTable"))

const TABLE_HEAD = [
  { id: "name", label: "Facility Name", alignRight: false },
  { id: "name", label: "Facility Type", alignRight: false },
  { id: "location", label: "Ward", alignRight: false },
  { id: "" },
];


const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);
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

  const fetchAllFacilities = () =>{
    setLoading(true)
    axiosInstance
      .get(`facilities`)
      .then((res) => {
        if(res?.data?.name === "SequelizeAccessDeniedError"){
          setFacilities([])
        }
        else{
          setFacilities(res?.data)
        }
        })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllFacilities()
  }, []);
  return (
    <>
      <FacilityTable page_title='Facilities' loading={loading} table_Head={TABLE_HEAD} dataList={facilities} fetchAllData={fetchAllFacilities} locations={locations}  />
    </>
  )
}

export default FacilityManagement