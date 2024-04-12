// @ts-nocheck
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Autocomplete,
  Select,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../services/api_service";
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { levels } from "../../../constants";
import MocAxiosInstance from "../../../services/moc_service";

interface IAddEditUser {
  edit?: boolean;
  modal: boolean;
  toggle: any;
  formData?: any;
  fetchAllUsers?: any;
  locations?: any;
}

const schema = yup.object().shape({
  firstName: yup.string().required("*First Name  is required"),
  lastName: yup.string().required("*Last Name  is required"),
  email: yup.string().email().required("Email Address is required"),
  // password: yup.string().required("*Password is required").min(8),
  // role: yup.string().required("*Role is required"),
  access: yup.string().required("*Access is required"),
  // level: yup.string().required("*Level is required"),
});
const access = [
  {
    access: "Admin",
    id: "admin",
  },
  {
    access: "Viewer",
    id: "viewer",
  },
  {
    access: "Super Admin",
    id: "super-admin",
  },
];

export const AddEditUser: FC<IAddEditUser> = ({
  edit,
  formData,
  modal,
  toggle,
  fetchAllUsers,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onTouched",
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [locations, setLocations] = useState([]);
  const [defaultLocation, setdefaultLocation] = useState(null);

  useEffect(() => {
    if (edit) {
      const { password, ...others } = formData;
      console.log(formData);
      if (locations.length > 0) {
        const defaultLoc = locations.filter(
          (opt) => opt.id === formData.locationId
        );
        console.log(defaultLoc);
        if (defaultLoc.length > 0) {
          setValue("locationId", formData.locationId);
          setdefaultLocation(defaultLoc[0]);
        }
      }
      console.log(others);
      reset(others);
    } else {
      console.log(formData);
      reset({
        email: "",
        lastName: "",
        firstName: "",
        locationId: "",
        access: "",
      });
      setdefaultLocation(locations[0]);
    }
  }, [edit, locations, formData]);

  useEffect(() => {
    axiosInstance
      .get(`/locations/states`)
      .then((res) => {
        const options = res?.data?.map((dt: any) => {
          return {
            label: dt?.name,
            id: dt?.id.toString(),
          };
        });
        setLocations(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToggle = () => toggle();

  const onSubmit = async (data: any) => {
    let newData = {
      ...data,
    };
    delete newData?.id;
    setLoading(true);
    let text = edit ? "User Updated" : "User Added";
    try {
      let res;
      if (edit) {
        res = await MocAxiosInstance.put(`/users/${formData?.id}`, newData);
      } else {
        res = await MocAxiosInstance.post(`/users`, newData);
      }
      enqueueSnackbar(`${text}`, {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      reset();
      handleToggle();
      fetchAllUsers();
    } catch (error: any) {
      enqueueSnackbar("Error!", {
        variant: "error",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAutocompleteChange = (event, value) => {
    setValue("locationId", value?.id || ""); // Set the value of 'locationId' field
  };

  return (
    <Dialog
      open={modal}
      onClose={handleToggle}
      maxWidth="md"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {edit ? "Edit User" : "Add User"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
              <label>First Name</label>
              <TextField
                defaultValue={formData?.firstName}
                variant="outlined"
                fullWidth
                {...register("firstName")}
                type="text"
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.firstName?.message?.toString()}
              </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <label>Last Name</label>
              <TextField
                defaultValue={formData?.lastName}
                variant="outlined"
                fullWidth
                {...register("lastName")}
                type="text"
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.lastName?.message?.toString()}
              </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <label>Email</label>
              <TextField
                defaultValue={formData?.email}
                variant="outlined"
                fullWidth
                {...register("email")}
                disabled={edit}
                type="email"
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.email?.message?.toString()}
              </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <label>Password</label>
              <TextField
                // defaultValue={formData?.password}
                variant="outlined"
                fullWidth
                {...register("password")}
                defaultValue={""}
                disabled={edit}
                type="text"
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <label>Select Access</label>
              <TextField
                variant="outlined"
                fullWidth
                select
                type="number"
                defaultValue={formData?.access || ""}
                {...register("access")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {access?.map((access) => (
                  <MenuItem value={access?.id}>{access?.access}</MenuItem>
                ))}
              </TextField>
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.access?.message?.toString()}
              </p>
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <label>Select Location</label>
              <Autocomplete
                key={Math.random()}
                options={locations}
                freeSolo
                getOptionLabel={(option) => option.label}
                onChange={handleAutocompleteChange}
                defaultValue={defaultLocation}
                loading={locationsLoading}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleToggle}
            sx={{
              background: "grey",
              "&:hover": {
                // Define the hover styles here
                backgroundColor: "lightgray",
              },
            }}
            color="info"
          >
            Close
          </Button>
          <LoadingButton
            size="medium"
            type="submit"
            variant="contained"
            loading={loading}
            // onClick={onSubmit}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
