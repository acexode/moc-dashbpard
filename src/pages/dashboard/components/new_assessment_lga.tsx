// @ts-nocheck

import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";

import useSettings from "../../../hooks/useSettings";
// import { lgaQuestions, questions } from "../../../db";
import Form from "../../../components/m-and-e/components/form";
import axiosInstance from "../../../services/api_service";
import { useAuthUserContext } from "../../../context/authUser.context";
import { MIconButton } from "../../../components/@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import AlertDialog from "./confirmDialog";
import { levels, roles } from "../../../constants";
interface BodyType {
  [key: string]: string;
}
const NewAssessmentFormLGA = () => {
  const { themeStretch } = useSettings();
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmationPayload, setConfirmationPayload] = useState(null);

  const {
    userState: { userProfile },
  } = useAuthUserContext();
  const [groupedQuestions, setGroupedQuestions] = useState<any>({});
  const [quarter, setQuarter] = useState<any>("");
  const [loading,setLoading] = useState(false)
  const [location, setLocation] = useState<any>("");
  const [locations, setLocations] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState<any>("");
  const [testGrouped,setTestGrouped] = useState([])
  const [userId,setUserId] = useState(null)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let {state} = useLocation()

  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(i);
  }
  const q = [1, 2, 3,4];
  let navigate = useNavigate();

  useEffect(()=>{
    if(state){
        let id = userProfile?.level === levels.national ? state?.row?.location?.parent?.id : userProfile?.locationId
        setUserId(id)
        setQuarter(state?.rowNum)
      setSelectedYear(state?.row?.year)
      setLocation(state?.row?.location?.id)
    }else{
      setUserId(userProfile?.id)
    }
  },[state])

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
      .get("/lga-questions")
      .then((res) => {

        setQuestions(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let url = roles.super_admin === userProfile?.role ? "/locations/lgas" :`/locations/states/${userProfile?.locationId}`
    axiosInstance
      .get(`${url}`)
      .then((res) => {
        const options = res?.data?.map((dt) =>{
          return {
            label: dt?.name,
            value: dt?.id
          }
        })
        setLocations(options);
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
      // Handle checkbox inputs
      if (e.currentTarget[name].type === "checkbox") {
        if (e.currentTarget[name].checked) {
          if (!body[name]) {
            body[name] = [];
          }
          body[name].push(value);
        }
      } else {
        // Handle other form elements
        body[name] = value;
      }
    });
    
      for (let index = 0; index < questions.length; index++) {
        const element = questions[index];
        questions[index].response = body[element.serial];
      }
        const payload = {
          quarter: quarter,
          year: selectedYear,
          content: questions,
          locationId: location,
          userId: userId,
        };
    // questions can be sent to API to persist assessment
    handleClickOpen();
    setConfirmationPayload(payload);
  };

  const handleSubmitAssessment = async () =>{
    setLoading(true)
    try {
      let url  = state ? `/lga-assessments/${state?.rowQ}/update` : "/lga-assessments"
      let text = state ? "Assessment updated!" : "Assessment added!"
          const res = state ?  await axiosInstance.put(`${url}`, confirmationPayload) : await axiosInstance.post(`${url}`, confirmationPayload);
          console.log(res);
      navigate(PATH_DASHBOARD.m_and_e.lga);
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
      console.error("An unexpected error happened occurred:", error);
    } finally{
      setLoading(false)
    }
  }
  return (
    <Page title="LGA Level Checklist: Create new assessment | BHCPF">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={"LGA Level Checklist"}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "LGA", href: PATH_DASHBOARD.m_and_e.lga },
            { name: "New LGA Level Checklist" },
          ]}
        />
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item sm={12}>
              <Card sx={{ p: 3, pb: 10, mb: 5 }}>
                <Stack spacing={3}>
                  <Box>What Quarter, Year and Location?</Box>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 3, sm: 2 }}
                  >
                    <TextField
                      name="quarter"
                      variant="outlined"
                      fullWidth
                      select
                      label="Quarter"
                      defaultValue={state?.rowNum}
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
                      select
                      label="Year"
                      defaultValue={state?.row?.year}
                      type="text"
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {years?.map((option: any, index: any) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      name="locationId"
                      variant="outlined"
                      fullWidth
                      label="Location"
                      select
                      defaultValue={state?.row?.location?.id}
                      type="text"
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {locations?.map((option: any, index: any) => (
                        <MenuItem key={index} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <Grid>
            <Form  questions={state === null ? groupedQuestions : testGrouped} />
          </Grid>
        <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleSubmitAssessment} />
        </form>
      </Container>
    </Page>
  );
};

export default NewAssessmentFormLGA;
