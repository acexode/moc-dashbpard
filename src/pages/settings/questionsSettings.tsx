import  { useEffect, useState,lazy } from 'react'
import axiosInstance from '../../services/api_service';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const QuestionsTable = lazy(() => import("../../components/questions/questionsTable"))


const TABLE_HEAD = [
  { id: "question", label: "Question", alignRight: false },
  { id: "section", label: "Section", alignRight: false },
  { id: "sectionTitle", label: "Section Title", alignRight: false },
  { id: "serial", label: "Serial", alignRight: false },
  { id: "subSection", label: "Sub Section", alignRight: false },
  { id: "responseInputType", label: "Response Input Type", alignRight: false },
  { id: "responseOptions", label: "Response Options", alignRight: false },
  { id: "maximumDigits", label: "Maximum Digits", alignRight: false },
  { id: "" },
];
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const QuestionsSettings = () => {
  const [questions, setQuestions] = useState([]);
  const [loading,setLoading] = useState(true)
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchAllQuestions = () => {
    setLoading(true);
    let url = "";
  
    if (value === 0) {
      url = "/questions/m-and-e";
    } else if (value === 1) {
      url = "/lga-questions";
    } else if (value === 2) {
      url = "/state-questions";
    }
  
    axiosInstance
      .get(url)
      .then((res) => {
        if(res?.data?.name === "SequelizeAccessDeniedError"){
          setQuestions([])
        }
        else{
          setQuestions(res?.data);
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
    fetchAllQuestions()
  }, [value]);
  return (
    <>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' ,mx:10}}>
        <Tabs value={value} onChange={handleChange}  TabIndicatorProps={{
        style: {
          backgroundColor: 'hsl(150, 100%, 34%)', // Change this to the desired color
        },
      }}
 aria-label="basic tabs example">
          <Tab label="HF" {...a11yProps(0)} />
          <Tab label="LGA" {...a11yProps(1)} />
          <Tab label="State" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <QuestionsTable page_title='HF Questions' url='/questions/m-and-e' loading={loading} table_Head={TABLE_HEAD} dataList={questions} fetchAllData={fetchAllQuestions}  />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <QuestionsTable page_title='LGA Questions' url='/lga-questions' loading={loading} table_Head={TABLE_HEAD} dataList={questions} fetchAllData={fetchAllQuestions}  />

      </TabPanel>
      <TabPanel value={value} index={2}>
      <QuestionsTable page_title='State Questions' url='/state-questions' loading={loading} table_Head={TABLE_HEAD} dataList={questions} fetchAllData={fetchAllQuestions}  />

      </TabPanel>
    </Box>
    </>
  )
}

export default QuestionsSettings