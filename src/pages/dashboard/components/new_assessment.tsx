// @ts-nocheck

import {
  Box,
  Card,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import Form from "../../../components/m-and-e/components/form";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api_service";
import { useAuthUserContext } from "../../../context/authUser.context";
import { MIconButton } from "../../../components/@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import AlertDialog from "./confirmDialog";
import { levels } from "../../../constants";

interface BodyType {
  [key: string]: string;
}
const NewAssessmentForm = () => {
  const { themeStretch } = useSettings();
  const [quarter, setQuarter] = useState<any>("");
  const [selectedYear, setSelectedYear] = useState<any>("");
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [confirmationPayload, setConfirmationPayload] = useState(null);

  const {
    userState: { userProfile },
  } = useAuthUserContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [groupedQuestions, setGroupedQuestions] = useState<any>({});
  const [questions, setQuestions] = useState<any>([]);
  const [testGrouped,setTestGrouped] = useState([])
  const [userId,setUserId] = useState(null)
  const currentYear = new Date().getFullYear();
  const years = [];
  let {state} = useLocation()
  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(i);
  }
  useEffect(()=>{
    if(state){
        let id = userProfile?.level === levels.national ? state?.row?.location?.id : userProfile?.locationId
        setUserId(id)
        setQuarter(state?.rowNum)
        setSelectedYear(state?.row?.year)
    }else{
      setUserId(userProfile?.id)
    }
  },[state])


  
  const q = [1, 2, 3,4];
  let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(state){
      const data = JSON.parse(state?.row?.content);
      const groupedData = data.reduce((result, item) => {
        const section = item.section;
      
        // If the section is not in the result object, create an empty array for it
        if (!result[section]) {
          result[section] = [];
        }
      
        // Push the item into the array corresponding to its section
        result[section].push(item);
      
        return result;
      }, {});
      setTestGrouped(groupedData)
    }
    setLoading(false)
  }, [state]);

  useEffect(() => {
    axiosInstance
      .get("/state-questions")
      .then((res) => {
        setQuestions(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (questions) {
      const groupedData = questions.reduce((result, item) => {
        const { section } = item;
        if (!result[section]) {
          result[section] = [];
        }
        result[section].push(item);
        return result;
      }, {});
      setGroupedQuestions(groupedData)
  
    }
  }, [questions]);

 
 
  const handleSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: { [x: string]: any };
  }) => {
    e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const body: BodyType = {};


  formData.forEach((value, name) => {
    if (name === "otherValues") {
      const otherValues = value.toString().trim();
      if (otherValues !== "") {
        if (!body.checkboxArray) {
          body.checkboxArray = [];
        }
        body.checkboxArray.push(otherValues);
      }
    } else {
      // Check if it's not a checkbox and set the value as a string
      if (formData.getAll(name).length === 1) {
        body[name] = value.toString();
      } else {
        // If it's a checkbox, make sure it's an array
        if (!body[name]) {
          body[name] = [];
        }
        body[name].push(value);
      }
    }
  });
    
      for (let index = 0; index < questions.length; index++) {
        const element = questions[index];
        if(element.responseInputType === "checkbox"){
          if(body?.checkboxArray){
            let newVal = [...body[element.serial],...body?.checkboxArray]
            questions[index].response = `[${newVal}]`;
          }
         else{
          questions[index].response = `[${body[element.serial]}]`;
         }
        }else{
          questions[index].response = body[element.serial];
        }
      }
        const payload = {
          quarter: quarter,
          year: selectedYear,
          content: questions,
          locationId: userProfile?.level === levels.national ? state?.row?.location?.id : userProfile?.locationId,
          userId: userId,
        };
        // questions can be sent to API to persist assessment
        handleClickOpen();
    setConfirmationPayload(payload);
      
  };

  const handleSubmitAssessment = async() =>{
    setLoading(true)
    try {
      let url  = state ? `/state-assessments/${state?.rowQ}/update` : "/state-assessments"
      let text = state ? "Assessment updated!" : "Assessment added!"
     
          const res = state ?  await axiosInstance.put(`${url}`, confirmationPayload) : await axiosInstance.post(`${url}`, confirmationPayload);
          console.log(res);
          navigate(PATH_DASHBOARD.m_and_e.state);
          enqueueSnackbar(`${text}`, {
            variant: "success",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          });
        } catch (error) {
          enqueueSnackbar(error?.response?.data?.message, {
            variant: "error",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          });
        } finally{
          setLoading(false)
        }
  }
  return (
    <Page title="Data Entry Form: Create new assessment | BHCPF">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={"State M&E Data Entry Form"}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "State", href: PATH_DASHBOARD.m_and_e.state },
            { name: "New Data Entry Form" },
          ]}
        />
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item sm={12}>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Stack spacing={3}>
                  <Box>What Quarter and Year?</Box>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 3, sm: 2 }}
                  >
                    <TextField
                      name="quarter"
                      variant="outlined"
                      fullWidth
                      label="Quarter"
                      defaultValue={state?.rowNum}
                      select
                      type="text"
                      onChange={(e) => setQuarter(e.target.value)}
                    >
                      {q?.map((option: any, index: any) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      name="year"
                      variant="outlined"
                      fullWidth
                      label="Year"
                      defaultValue={state?.row?.year}
                      select
                      type="text"
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {years?.map((option: any, index: any) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <Grid>
            <Form
              questions={state === null ? groupedQuestions : testGrouped}
              type="state"
            />
          </Grid>
        </form>
        <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleSubmitAssessment} />

      </Container>
    </Page>
  );
};

export default NewAssessmentForm;
