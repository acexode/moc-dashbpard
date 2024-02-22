import React, { FC, useEffect, useState } from "react";
import { levels, roles } from "../../constants";
import { useAuthUserContext } from "../../context/authUser.context";
import axiosInstance from "../../services/api_service";
import {  handleFormatData3 } from "../../utility/dataFormatter";
import {Card, Pagination} from "@mui/material"
import { Container } from "@mui/system";
import HFTable from "../../components/m-and-e/hfTable";

const TABLE_HEAD = [
  { id: "stateLocation", label: "State", alignRight: false },
  { id: "lgaLocation", label: "LGA", alignRight: false },
  { id: "wardLocation", label: "Ward", alignRight: false },
  { id: "fieldToSearch", label: "HF", alignRight: false },
  { id: "quarter", label: "Quarter", alignRight: false },
  // { id: "q2", label: "Q2", alignRight: false },
  // { id: "q3", label: "Q3", alignRight: false },
  // { id: "q4", label: "Q4", alignRight: false },
  { id: "year", label: "Year", alignRight: false },
  { id: "" },
];
const today = new Date();
const quarter = Math.floor((today.getMonth() + 3) / 3) - 1; 
const HF: FC = () => {
  const [hfAssessment, setHfAssessment] = useState<any[]>([]);
  const [loading,setLoading] = useState(true)
  const [pageSize,setPageSize] = useState(25)
  const [totalPages, setTotalPages] = useState(0);
  const [needle,setNeedle] = useState("")
  const [page,setPage] = useState(1)
  const [totalDataCount,setTotalDataCount] = useState(0)
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  const [selectedState, setSelectedState] = useState({
    year: today.getFullYear(),
    quarter: quarter === 0 ? 1 : quarter,
  });
  let url = userProfile?.level === levels.national ? "assessments/m-and-e" : userProfile?.level === levels.state ? `/assessments/m-and-e/state/${userProfile?.locationId}` : `assessments/m-and-e/lga/${userProfile?.locationId}`
let showAdd = userProfile?.role !== roles.state_web || userProfile?.role !== roles.lga_web
  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get(`${url}`,{
        params:{
          page,
          pageSize,
          needle,
          year:selectedState.year,
          quarter:selectedState.quarter
        }
      })
      .then((res) => {
        setTotalPages(res?.data?.totalPages)
        // let newData = [...hfAssessment,...res?.data?.assessments]
        setHfAssessment(res?.data?.assessments);
        setTotalDataCount(res?.data?.totalCount);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
  }, [page,needle,selectedState]);
  const handlePageChange = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };
  const handleChange = (val: string, field: string) => {
    setSelectedState((prevState) => ({
      ...prevState,
      [field]: ['year', 'quarter'].includes(field) ? parseInt(val) : val,
    }));
  };
  return (
      <>
       <HFTable
      dataList={handleFormatData3(hfAssessment)}
      page_title="HF"
      table_Head={TABLE_HEAD}
      loading={loading}
      show={showAdd}
      setNeedle={setNeedle}
      totalDataCount={totalDataCount}
      handleChange={handleChange}
      selectedState={selectedState}
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
