// @ts-nocheck

import {
  Card,
  Grid,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { levels } from "../../../constants";
import { useAuthUserContext } from "../../../context/authUser.context";
import axiosInstance from "../../../services/api_service";
import { AllStates } from "../../../db/states";
import { getColor } from "../../../utility";
import { Icon } from "@iconify/react";
import exportOutline from "@iconify/icons-eva/upload-outline";
import { MIconButton } from "../../@material-extend";
import { handleDownloadPdf } from "../../../utility/handleDownloadPDF";

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
  printDocRef: any;
}
const dummyStates = AllStates;

const MOCDateFilter: FC<DropDown> = ({
  selectedState,
  setSelectedState,
  printDocRef,
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
    console.log(val, field);
    setSelectedState((prevState) => ({
      ...prevState,
      [field]: ["year", "quarter"].includes(field) ? parseInt(val) : val,
    }));
  };
  return (
    <Grid item xs={12} md={12}>
      <Grid container justifyContent="space-between">
        <Grid
          sx={{ display: "flex", justifyContent: "space-between" }}
          item
          xs={6}
        >
          <FormControl fullWidth sx={{ margin: "0 10px" }}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedState.year}
              label="Year"
              onChange={(ev) => handleChange(ev.target.value, "year")}
            >
              {years.map((e) => (
                <MenuItem value={e}>{e}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quarter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedState.quarter}
              label="Quarter"
              onChange={(ev) => handleChange(ev.target.value, "quarter")}
            >
              {q.map((e) => (
                <MenuItem value={e}>{e}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }} xs={6}>
          <MIconButton
            style={{
              width: "170px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              color: "#222736",
              marginBottom: "10px",
            }}
            onClick={() => handleDownloadPdf(printDocRef)}
          >
            Export{" "}
            <Icon
              icon={exportOutline}
              width={30}
              height={30}
              style={{ marginLeft: "5px" }}
            />
          </MIconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MOCDateFilter;
