// @ts-nocheck

import { Card, Grid, Stack, TextField, Autocomplete } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { levels } from "../../../../constants";
import { useAuthUserContext } from "../../../../context/authUser.context";
import { AllStates } from "../../../../db/states";
import axiosInstance from "../../../../services/api_service";

const year = new Date().getFullYear();
const years = Array.from(new Array(10), (val, index) => index + year);
const q = [1, 2, 3, 4];

interface IState {
  national: string;
  state: string;
  lga: string;
  year: number;
  quarter: number;
}
interface DropDown {
  selectedState?: IState;
  setSelectedState?: any;
}
const dummyStates = AllStates;

const SelectDropDown: FC<DropDown> = ({
  selectedState,
  setSelectedState,
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
        (state: { id: any; }) => state?.id === userProfile?.id
      );
      setStateId(userProfile?.id);
      setDefaultState(getState[0]);
      setSelectedState((prevState: any) => {
        return {
          ...prevState,
          state: getState[0]?.label,
        };
      });
    } else if (userProfile?.level === levels?.lga) {
      const getLga = lgas?.filter((lga:any) => lga?.id === userProfile?.id);
      setSelectedState((prevState: any) => {
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
      .then((res: { data: any[]; }) => {
        const options = res?.data?.map((dt: any) => {
          return {
            label: dt?.name,
            id: dt?.id,
          };
        });
        setLgas(options);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [stateId]);
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 1 }} elevation={1}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
          >
            
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
                  setSelectedState((prevState: any) => ({
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
            <Autocomplete
              fullWidth
              placeholder="LGA"
              size="small"
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
            />
            <Autocomplete
              fullWidth
              placeholder="Year"
              options={years}
              size="small"
              value={selectedState.year}
              disabled
              disableClearable={true}
              onChange={(event, newValue) => {
                setSelectedState((prevState: { quarter: any; }) => ({
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
                setSelectedState((prevState: any) => ({
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
       
      </Card>
    </Grid>
  );
};

export default SelectDropDown;
