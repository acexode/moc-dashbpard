import React, { FC, useEffect, useState } from "react";
import METable from "../../components/m-and-e/meTable";
import { levels, roles } from "../../constants";
import { useAuthUserContext } from "../../context/authUser.context";
import axiosInstance from "../../services/api_service";
import {  handleFormatData3 } from "../../utility/dataFormatter";
import {Card, Pagination} from "@mui/material"
import { Container } from "@mui/system";

const TABLE_HEAD = [
  { id: "stateLocation", label: "State", alignRight: false },
  { id: "lgaLocation", label: "LGA", alignRight: false },
  { id: "wardLocation", label: "Ward", alignRight: false },
  { id: "fieldToSearch", label: "HF", alignRight: false },
  { id: "q1", label: "Q1", alignRight: false },
  { id: "q2", label: "Q2", alignRight: false },
  { id: "q3", label: "Q3", alignRight: false },
  { id: "q4", label: "Q4", alignRight: false },
  { id: "year", label: "Year", alignRight: false },
  { id: "" },
];

const HF: FC = () => {
  const [hfAssessment, setHfAssessment] = useState([]);
  const [loading,setLoading] = useState(true)
  const [pageSize,setPageSize] = useState(25)
  const [totalPages, setTotalPages] = useState(0);
  const [needle,setNeedle] = useState("")
  const [page,setPage] = useState(1)
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  let url = userProfile?.level === levels.national ? "assessments/m-and-e" : userProfile?.level === levels.state ? `/assessments/m-and-e/state/${userProfile?.locationId}` : `assessments/m-and-e/lga/${userProfile?.locationId}`
let showAdd = userProfile?.role !== roles.state_web || userProfile?.role !== roles.lga_web
  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get(`${url}`,{
        params:{
          page,
          pageSize,
          needle
        }
      })
      .then((res) => {
        setTotalPages(res?.data?.totalPages)
        setHfAssessment(res?.data?.assessments);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }, [page,needle]);
  const handlePageChange = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };
  return (
      <>
       <METable
      dataList={handleFormatData3(hfAssessment)}
      page_title="HF"
      table_Head={TABLE_HEAD}
      loading={loading}
      show={showAdd}
      setNeedle={setNeedle}
    />
    <Container>
    <Card sx={{p:2}}>
     <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        showFirstButton showLastButton
      />
     </Card>
     
    </Container>
      </>
   
  );
};

export default HF;
