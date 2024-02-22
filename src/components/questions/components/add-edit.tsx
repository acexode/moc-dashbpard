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
  Typography,
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
import MocAxiosInstance from "../../../services/moc_service";
import tokenService from "../../../services/tokenService";

interface IAddEdit {
  edit?: boolean;
  modal: boolean;
  toggle: any;
  setFormData: any;
  formData?: any;
  fetchAllData?: any;
  url?: string;
}
const inputTypes: string[] = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "textarea",
  "time",
  "url",
  "week",
];
const years = [...Array(15).keys()].map((_, i) => 2022 + i)
console.log(years);
const schema = yup.object().shape({
  totalBuget: yup.number().required("*required"),
  budgetPercentInc: yup.number().required("*required"),
  coveragePercenttInc: yup.number().required("*required"),
  year: yup.number().required("required"),
});

export const AddEdit: FC<IAddEdit> = ({
  edit,
  formData,
  modal,
  setFormData,
  toggle,
  fetchAllData,
  url,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(edit);
    if (edit) {
      reset(formData);
    } else {
      reset({});
    }
  }, [edit, false]);

  const handleToggle = () => {
    toggle()
    setFormData(null)
    reset({totalBuget: null, budgetPercentInc: null, coveragePercenttInc: null, year: null})
  };

  const onSubmit = async (data: any) => {
    const user = tokenService.getMOCUser()
    const {id, ...newData} = data
    setLoading(true);
    let text = edit ? "Question Updated" : "Question Added";
    try {
      let res;
      if (edit) {
        newData.updatedBy = user.id
        res = await MocAxiosInstance.put(`${url}/${formData?.id}`, newData);
      } else {
        newData.createdBy = user.id
        res = await MocAxiosInstance.post(`${url}`, newData);
      }
      enqueueSnackbar(`${text}`, {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      reset({});
      handleToggle();
      fetchAllData();
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error?.response?.data?.message || "Request Failed", {
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

  return (
    <Dialog
      open={modal}
      onClose={handleToggle}
      maxWidth="sm"
      fullWidth
      aria-Typographyledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {edit ? "Edit KPI" : "Add KPI"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={12}>
              <Typography sx={{fontSize: '13px'}} >Enter total amount budgeted for BHCPF (1% of CRF)</Typography>
              <TextField
                defaultValue={formData?.totalBuget}
                variant="outlined"
                fullWidth
                {...register("totalBuget")}
                type="text"
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.totalBuget?.message?.toString()}
              </p>
            </Grid>

            <Grid item xs={12} sm={12} lg={12}>
              <Typography sx={{fontSize: '13px'}}>Enter percentage of annual BHCPF budget released</Typography>
              <TextField
                defaultValue={formData?.budgetPercentInc}
                variant="outlined"
                fullWidth
                {...register("budgetPercentInc", { valueAsNumber: true })}
                type="number"
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.budgetPercentInc?.message?.toString()}
              </p>
            </Grid>

            <Grid item xs={12} sm={12} lg={12}>
              <Typography sx={{fontSize: '13px'}}>
                Enter percentage annual increase in national BHCPF population
                coverage
              </Typography>
              <TextField
                defaultValue={formData?.coveragePercenttInc}
                variant="outlined"
                fullWidth
                {...register("coveragePercenttInc")}
                type="text"
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.coveragePercenttInc?.message?.toString()}
              </p>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Typography sx={{fontSize: '13px'}}>Year</Typography>

              <TextField
                variant="outlined"
                fullWidth
                select
                type="text"
                defaultValue={formData?.year}
                {...register("year")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {years?.map((input) => (
                  <MenuItem value={input}>{input}</MenuItem>
                ))}
              </TextField>
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.year?.message?.toString()}
              </p>
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
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
