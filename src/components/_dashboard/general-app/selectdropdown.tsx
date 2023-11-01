// @ts-nocheck

import { Card, Grid, Stack, TextField, Autocomplete, Tabs, Tab } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { levels } from "../../../constants";
import { useAuthUserContext } from "../../../context/authUser.context";
import axiosInstance from "../../../services/api_service";
import { AllStates } from "../../../db/states";
import { getColor } from "../../../utility";

const year = new Date().getFullYear();
const years = Array.from(new Array(10), (val, index) => index + year);
const q = [1, 2, 3, 4];
function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface IState {
  national: string;
  state: string;
  lga: string;
  year: number;
  quarter: number;
}
interface DropDown {
  selectedState: IState;
  setSelectedState: any;
  tab: any;
  setTab: any
}
const dummyStates = AllStates;

const SelectDropDownCard: FC<DropDown> = ({
  selectedState,
  setSelectedState,
  tab,
  setTab
}) => {
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [stateId, setStateId] = useState("");
  const [lgaId, setLgaId] = useState("");
  const [defaultState, setDefaultState] = useState<any>(null);
  const {
    userState: { userProfile },
  } = useAuthUserContext();

  useEffect(() => {
    if (userProfile?.level === levels?.state) {
      const getState = dummyStates?.filter(
        (state) => state?.id === userProfile?.id
      );
      setStateId(userProfile?.id);
      setDefaultState(getState[0]);
      setSelectedState((prevState) => {
        return {
          ...prevState,
          state: getState[0]?.label,
        };
      });
    } else if (userProfile?.level === levels?.lga) {
      const getLga = lgas?.filter((lga) => lga?.id === userProfile?.id);
      setSelectedState((prevState) => {
        return {
          ...prevState,
          lga: getLga[0]?.label,
        };
      });
    }
  }, [userProfile, lgas]);

  //   useEffect(()=>{
  //     axiosInstance.get(`/locations/states`).then(res =>{
  //       const options = res?.data?.map((dt:any) =>{
  //         return {
  //           label: dt?.name,
  //           id: dt?.id
  //         }
  //       })
  //       setStates(options)
  //     }).catch(error =>{
  //       console.log(error)
  //     })
  // },[])

  useEffect(() => {
    axiosInstance
      .get(`/locations/states/${stateId}`)
      .then((res) => {
        const options = res?.data?.map((dt: any) => {
          return {
            label: dt?.name,
            id: dt?.id,
          };
        });
        setLgas(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stateId]);
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 1 }} elevation={1}>
        <Stack sx={{ pt: "0px", pb: '14px' }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            // spacing={{ xs: 3, sm: 2 }}
          >
            <Tabs
            style={{width: '100%'}}
          value={tab}
          onChange={setTab}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'hsl(150, 100%, 34%)', 
                overflowX:"auto"
            },
          }}
        >
          <Tab style={{width: '20%'}} label="Overall" {...a11yProps(0)} />
          <Tab style={{width: '20%'}} label="NPHCDA" {...a11yProps(1)} />
          <Tab style={{width: '20%'}} label="NHIA" {...a11yProps(2)} />
          <Tab style={{width: '20%'}} label="EMT" {...a11yProps(3)} />
        </Tabs>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
          >
            <Autocomplete
              fullWidth
              defaultValue={"National"}
              placeholder="National"
              options={["National"]}
              size="small"
              value={selectedState.national}
              disabled={userProfile?.level === levels.state}
              onChange={(event, newValue) => {
                setSelectedState((prevState) => ({
                  ...prevState,
                  national: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="National" />
              )}
            />
            {/* <Autocomplete
              // select
              fullWidth
              // label="Role"

              placeholder="Year"
              // {...getFieldProps('access.role')}
              // SelectProps={{ native: true }}
              options={years}
              renderInput={(params) => <TextField {...params} label="Year" />}
            /> */}
            {userProfile?.level === levels?.state ? (
              <TextField
                variant="outlined"
                fullWidth
                disabled
                size="small"
                value={defaultState?.label}
                type={"text"}
              />
            ) : (
              <Autocomplete
                fullWidth
                placeholder="State"
                options={dummyStates}
                size="small"
                disabled={userProfile?.level !== levels.national}
                getOptionLabel={(option) => option?.label}
                onChange={(e, value) => {
                  setSelectedState((prevState) => ({
                    ...prevState,
                    state: value?.label,
                  }));
                  return setStateId(value?.id);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="State" />
                )}
              />
            )}
            {/* <Autocomplete
              fullWidth
              placeholder="LGA"
              options={lgas}
              disabled={userProfile?.level === levels.lga}
              getOptionLabel={(option) => option.label}
              onChange={(e,value) => {
                setSelectedState((prevState) => ({
                  ...prevState,
                  lga: value?.label,
                }));
                return  setLgaId(value?.id)
              }}
              renderInput={(params) => <TextField {...params} label="LGA" />}
            /> */}
            <Autocomplete
              fullWidth
              placeholder="Year"
              options={years}
              size="small"
              value={selectedState.year}
              disableClearable={true}
              onChange={(event, newValue) => {
                setSelectedState((prevState) => ({
                  ...prevState,
                  year: newValue,
                  quarter: prevState.quarter,
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />

            <Autocomplete
              fullWidth
              placeholder="Quarter"
              options={q}
              size="small"
              value={selectedState.quarter}
              disableClearable={true}
              onChange={(event, newValue) => {
                setSelectedState((prevState) => ({
                  ...prevState,
                  quarter: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Quarter" />
              )}
            />
          </Stack>
        </Stack>
        <Stack  spacing={3} sx={{ pt: "10px" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 6, sm:25 }}
          >
            <Grid item xs={12} md={6} sm={12} lg={4}>
              <div style={{ display: "flex" }}>
                <div
                  className="labelBg"
                  style={{ background: `${getColor(0)}` }}
                ></div>
                0 -50
              </div>
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={4}>
              <div style={{ display: "flex" }}>
                <div
                  className="labelBg"
                  style={{ background: `${getColor(51)}` }}
                ></div>
                51 - 79
              </div>
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={4}>
              <div style={{ display: "flex" }}>
                <div
                  className="labelBg"
                  style={{ background: `${getColor(81)}` }}
                ></div>
                80 and above
              </div>
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={3}>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                Feedback Date: &nbsp;
                <span style={{ fontWeight: 700 }}>
                  Q{selectedState.quarter}, {year}
                </span>{" "}
              </div>
            </Grid>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};

export default SelectDropDownCard;
