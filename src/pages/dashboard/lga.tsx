import  { FC, useEffect, useState } from "react";
import METable from "../../components/m-and-e/meTable";
import { useAuthUserContext } from "../../context/authUser.context";
import axiosInstance from "../../services/api_service";
import {  handleFormatData2 } from "../../utility/dataFormatter";
import { levels } from "../../constants";

const TABLE_HEAD = [
  { id: "stateLocation", label: "State", alignRight: false },
  { id: "fieldToSearch", label: "LGA", alignRight: false },
  { id: "q1", label: "Q1", alignRight: false },
  { id: "q2", label: "Q2", alignRight: false },
  { id: "q3", label: "Q3", alignRight: false },
  { id: "q4", label: "Q4", alignRight: false },
  { id: "year", label: "Year", alignRight: false },
  { id: "" },
];

 
const LGA: FC = () => {
  const [lgaAssessment, setLgaAssessment] = useState([]);
  const [loading,setLoading] = useState(true)

  const {
    userState: { userProfile },
  } = useAuthUserContext();
  let url = userProfile?.level === levels.national ? "lga-assessments" : userProfile?.level === levels.state ? `/lga-assessments/user/${userProfile?.locationId}` : `lga-assessments/user/${userProfile?.id}`

  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get(`${url}`)
      .then((res) => {
        setLgaAssessment(res?.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }, []);
  return (
    <METable
      dataList={handleFormatData2(lgaAssessment)}
      page_title="LGA"
      table_Head={TABLE_HEAD}
      loading={loading}
      show={userProfile?.level !== levels.ward}
    />
  );
};

export default LGA;
