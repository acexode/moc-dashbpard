import { FC, useEffect, useState } from "react";
import METable from "../../components/m-and-e/meTable";
import axiosInstance from "../../services/api_service";
import { useAuthUserContext } from "../../context/authUser.context";
import { handleFormatData } from "../../utility/dataFormatter";
import { levels, roles } from "../../constants";

const TABLE_HEAD = [
  { id: "fieldToSearch", label: "State", alignRight: false },
  { id: "q1", label: "Q1", alignRight: false },
  { id: "q2", label: "Q2", alignRight: false },
  { id: "q3", label: "Q3", alignRight: false },
  { id: "q4", label: "Q4", alignRight: false },
  { id: "year", label: "Year", alignRight: false },
  { id: "" },
];

const State: FC = () => {
  const [stateAssessment, setStateAssessment] = useState([]);
  const [loading,setLoading] = useState(true)

  const {
    userState: { userProfile },
  } = useAuthUserContext();
  let url = userProfile?.level === levels.national ? "state-assessments" : userProfile?.level === levels.state ? `/state-assessments/location/${userProfile?.locationId}` : `state-assessments/user/${userProfile?.id}`
  let showAdd = userProfile?.level === levels.state

  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get(`${url}`)
      .then((res) => {
        setStateAssessment(res?.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }, []);

  return (
    <METable
      dataList={handleFormatData(stateAssessment)}
      page_title="State"
      table_Head={TABLE_HEAD}
      loading={loading}
      show={showAdd}

    />
  );
};

export default State;
