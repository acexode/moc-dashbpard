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

const SelectDropDownCard: FC<DropDown> = ({
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
      [field]: ['year', 'quarter'].includes(field) ? parseInt(val) : val,
    }));
  };
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 1, height: "140px" }} elevation={1}>
        <Grid spacing={3} container>
          <Grid item xs={7}>
            <Stack spacing={{ xs: 1, sm: 1 }}>
              {/* <SelectInput
                disabled={userProfile?.level === levels.state}
                options={["National"]}
                defaultValue={selectedState.national}
                name="national"
                handleChange={handleChange}
              /> */}
              {userProfile?.level !== levels?.state ? (
                <SelectInput
                  name="state"
                  handleChange={handleChange}
                  isObject
                  options={dummyStates}
                />
              ) : (
                <Box
                  sx={{
                    border: "1px solid #eee",
                    padding: "0px",
                    display: "block",
                    height: "25px",
                    paddingLeft: '5px',
                    paddingTop: '5px',
                    fontSize: '12px',
                    borderRadius: "8px",
                  }}
                >
                 
                  {selectedState?.state}
                </Box>
              )}
              <SelectInput
                name="year"
                defaultValue={selectedState.year}
                handleChange={handleChange}
                options={years}
              />
              <SelectInput
                name="quarter"
                defaultValue={selectedState.quarter}
                handleChange={handleChange}
                options={q}
              />

            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Stack
              direction={{ xs: "column", sm: "column" }}
              // spacing={{ xs: 3, sm: 2 }}
            >
              <div style={{ display: "flex", fontSize: "12px",  marginBottom: '20px', position: 'relative' }}>
                <div
                  className="labelBg"
                  style={{ background: `${getColor(0)}` }}
                ></div>
                <span style={{transform: 'translateY(10)', position: 'relative', left: '0px', top: '3px'}}>0 - 50</span>
              </div>

              <div style={{ display: "flex", fontSize: "12px", marginBottom: '20px', position: 'relative'  }}>
                <div
                  className="labelBg"
                  style={{ background: `${getColor(51)}` }}
                ></div>
                <span style={{transform: 'translateY(10)', position: 'relative', left: '0px', top: '3px'}}>
                51 - 79

                </span>
              </div>
              <div style={{ display: "flex", fontSize: "12px", position: 'relative'  }}>
                <div
                  className="labelBg"
                  style={{ background: `${getColor(81)}` }}
                ></div>
                <span style={{transform: 'translateY(10)', position: 'relative', left: '0px', top: '3px'}}>

                 {" >="} 80 
                </span>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default SelectDropDownCard;
