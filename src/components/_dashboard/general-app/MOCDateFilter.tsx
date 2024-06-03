// @ts-nocheck

import { Card, Grid, Stack, TextField, Autocomplete, Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { levels } from "../../../constants";
import { useAuthUserContext } from "../../../context/authUser.context";
import axiosInstance from "../../../services/api_service";
import { AllStates } from "../../../db/states";
import { getColor } from "../../../utility";
import SelectInput from "../../SelectInput";

const year = new Date().getFullYear();
const years = Array.from(new Array(10), (val, index) => year - index);
const q = [1, 2, 3, 4];

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
}
const dummyStates = AllStates;

const MOCDateFilter: FC<DropDown> = ({ selectedState, setSelectedState }) => {
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
  const handleChange = (val, field) => {
    setSelectedState((prevState) => ({
      ...prevState,
      [field]: ["year", "quarter"].includes(field) ? parseInt(val) : val,
    }));
  };
  return (
    <Grid item sx={{marginTop: '-20px'}} xs={12} md={12}>
  
        <Grid container>
          <Grid item xs={6}>
            <Stack spacing={{ xs: 1, sm: 1 }}>
            <label
              style={{
                fontSize: 10,
                marginRight: 8,
              }}
            >
              Year
            </label>
              <SelectInput
                name="year"
                defaultValue={selectedState.year}
                handleChange={handleChange}
                options={years}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={{ xs: 1, sm: 1 }}>
            <label
              style={{
                fontSize: 10,
                marginRight: 8,
              }}
            >
              Quarter
            </label>
              <SelectInput
                name="quarter"
                defaultValue={selectedState.quarter}
                handleChange={handleChange}
                options={q}
              />
            </Stack>
          </Grid>
        </Grid>
    </Grid>
  );
};

export default MOCDateFilter;
