import { useEffect, useState, lazy } from "react";
import axiosInstance from "../../services/api_service";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MocAxiosInstance from "../../services/moc_service";

const MocKPIQuestionTable = lazy(
  () => import("../../components/questions/MocKPIQuestionTable")
);

const TABLE_HEAD = [
  { id: "id", label: "S/N", alignRight: true },
  { id: "totalBuget", label: "Total Amount Budgeted", alignRight: false },
  {
    id: "budgetPercentInc",
    label: "% of Annual BHCPF Budget",
    alignRight: false,
  },
  {
    id: "coveragePercenttInc",
    label: "% Annual increase in  pop Coverage",
    alignRight: false,
  },
  { id: "year", label: "Year", alignRight: false },
  { id: "", label: "", alignRight: false },
];

const MocKPI = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchAllQuestions = () => {
    setLoading(true);

    MocAxiosInstance.get("moc-kpis")
      .then((res) => {
        console.log(res.data.data);
        if (res?.data?.name === "SequelizeAccessDeniedError") {
          setQuestions([]);
        } else {
          setQuestions(res?.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAllQuestions();
  }, [value]);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <MocKPIQuestionTable
          page_title=""
          url="/moc-kpis"
          loading={loading}
          table_Head={TABLE_HEAD}
          dataList={questions}
          fetchAllData={fetchAllQuestions}
        />
      </Box>
    </>
  );
};

export default MocKPI;
