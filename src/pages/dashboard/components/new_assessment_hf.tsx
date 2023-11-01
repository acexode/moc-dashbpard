// @ts-nocheck
import {
    Box,
    Card,
    Container,
    Grid,
    Stack,
    TextField,
    MenuItem,
    FormControl
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
  import Page from "../../../components/Page";
  import { PATH_DASHBOARD } from "../../../routes/paths";
  import { useSnackbar } from "notistack";
  import { useNavigate } from "react-router-dom";
  
  import useSettings from "../../../hooks/useSettings";
  import Form from "../../../components/m-and-e/components/form";
  import axiosInstance from "../../../services/api_service";
  import { useAuthUserContext } from "../../../context/authUser.context";
  import { MIconButton } from "../../../components/@material-extend";
  import closeFill from "@iconify/icons-eva/close-fill";
  import { Icon } from "@mui/material";
import AlertDialog from "./confirmDialog";
  interface BodyType {
    [key: string]: string;
  }
  const NewAssessmentFormHF = () => {
    const { themeStretch } = useSettings();
    const [questions, setQuestions] = useState([]);
    const {
      userState: { userProfile },
    } = useAuthUserContext();
    const [groupedQuestions, setGroupedQuestions] = useState<any>({});
    const [quarter, setQuarter] = useState<any>("");
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [confirmationPayload, setConfirmationPayload] = useState(null);


    const [selectedYear, setSelectedYear] = useState<any>("");
    const [facilityId,setFacilityId] = useState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [facilties,setFacilities] = useState([])
  
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(i);
    }
    const q = [1, 2, 3,4];
    let navigate = useNavigate();
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    useEffect(() => {
      axiosInstance
        .get(`/locations/lgas/${userProfile?.locationId}`)
        .then((res) => {
         
          setFacilities(res?.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    useEffect(() => {
      axiosInstance
        .get("/questions/m-and-e")
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
      const body: BodyType = {};
      for (const key in e.currentTarget) {
        if (Object.hasOwnProperty.call(e.currentTarget, key)) {
          const element = e.currentTarget[key];
    
          // Handle checkbox inputs
          if (element.type === "checkbox") {
            if (element.checked) {
              if (!body[element.name]) {
                body[element.name] = [];
              }
              body[element.name].push(element.value);
            }
          } else {
            body[element.name] = element.value;
          }
        }
      }
      for (let index = 0; index < questions.length; index++) {
        const element = questions[index];
        // @ts-ignore
        questions[index]["response"] = body[element.serial];
      }
      const payload = {
        quarter: quarter,
        year: selectedYear,
        content: questions,
        locationId: userProfile?.locationId,
        facilityId: facilityId,
        userId: userProfile?.id,
      };
      // questions can be sent to API to persist assessment
      handleClickOpen();
      setConfirmationPayload(payload);
     
    };
    const handleSubmitAssessment = async() =>{
      setLoading(true)
      try {
        const res = await axiosInstance.post("/assessments/m-and-e", confirmationPayload);
        console.log(res);
        navigate(PATH_DASHBOARD.m_and_e.hf);
        enqueueSnackbar("Assessment added!", {
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
      <Page title="HF Level Checklist: Create new assessment | BHCPF">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={"HF Level Checklist"}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "HF", href: PATH_DASHBOARD.m_and_e.hf },
              { name: "New HF Level Checklist" },
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
                        label="Year"
                        fullWidth
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
                      <TextField
                        name="facilityId"
                        variant="outlined"
                        fullWidth
                        label="Facility"
                        select
                        type="text"
                        onChange={(e) => setFacilityId(e.target.value)}
                      >
                        {facilties?.map((option: any, index: any) => (
                          <MenuItem key={index} value={option?.id}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
            <Grid>
              <Form questions={groupedQuestions} />
            </Grid>
          </form>
          <AlertDialog open={open} handleClose={handleClose} loading={loading} handleSubmit={handleSubmitAssessment} />

        </Container>
      </Page>
    );
  };
  
  export default NewAssessmentFormHF;
  