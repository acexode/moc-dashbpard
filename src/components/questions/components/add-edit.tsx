
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
  } from "@mui/material";
  import React, { FC, useEffect, useState } from "react";
  import {useForm} from "react-hook-form"
  import { useSnackbar } from "notistack";

  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../services/api_service";
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";


  interface IAddEdit {
    edit?: boolean,
    modal:boolean,
    toggle: any;
    formData?:any
    fetchAllData?:any;
    url?:string
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
    "week"
  ];
  const schema = yup.object().shape({
    section: yup.number().required("*Section is required"),
    subSection: yup.number().required("*Sub section is required"),
    serial: yup.string().required("*Serial is required"),
    sectionTitle: yup.string().required("*Section Title is required"),
    question: yup.string().required("*Question is required"),
    responseInputType: yup.string().required("*Response Input Type is required"),
  
  });

 

export  const AddEdit:FC<IAddEdit> = ({edit,formData,modal,toggle,fetchAllData,url}) =>{
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
      const [loading,setLoading] = useState(false)
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();

      useEffect(()=>{
          if(edit){
            reset(formData)
          }else{
            reset()
          }
      },[edit,false])

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,
           
          };
          delete newData?.id
          setLoading(true)
          let text = edit ? "Question Updated" : "Question Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `${url}/${formData?.id}/update`,
                newData
              );
            } else {
              res = await axiosInstance.post(`${url}/create`, newData);
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
            fetchAllData()
          } catch (error: any) {
            enqueueSnackbar("Error!", {
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
        <Dialog
        open={modal}
        onClose={handleToggle}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{edit ? "Edit Question": "Add Question"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
                <label>Question</label>
                <TextField
                    defaultValue={formData?.question}
                    variant="outlined"
                    fullWidth
                    {...register('question')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.question?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Section</label>
                <TextField
                    defaultValue={formData?.section}
                    variant="outlined"
                    fullWidth
                    {...register('section',{valueAsNumber:true})}
                    type="number"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.section?.message?.toString()}
                </p>
            </Grid>
           
            <Grid item xs={12} sm={6} lg={6}>
                <label>Sub Section</label>
                <TextField
                    defaultValue={formData?.subSection}
                    variant="outlined"
                    fullWidth
                    {...register('subSection',{valueAsNumber:true})}
                    type="number"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.subSection?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Serial</label>
                <TextField
                    defaultValue={formData?.serial}
                    variant="outlined"
                    fullWidth
                    {...register('serial')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.serial?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Section Title</label>
                <TextField
                    defaultValue={formData?.sectionTitle}
                    variant="outlined"
                    fullWidth
                    {...register('sectionTitle')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.sectionTitle?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
            <label>Response Input Type</label>

              <TextField
                 variant="outlined"
                fullWidth
                select
                 type="text"
                 defaultValue={formData?.responseInputType}
                {...register("responseInputType")}
               
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {inputTypes?.map((input) => (
                  <MenuItem value={input}>{input}</MenuItem>
                ))}
              </TextField>
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.responseInputType?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Response Options</label>
                <TextField
                    defaultValue={formData?.responseOptions}
                    variant="outlined"
                    fullWidth
                    {...register('responseOptions')}
                    type="text"
                />
                {/* <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.responseOptions?.message?.toString()}
                </p> */}
            </Grid>
          
            <Grid item xs={12} sm={6} lg={6}>
                <label>Maximum Digits</label>
                <TextField
                    defaultValue={formData?.maximumDigits}
                    variant="outlined"
                    fullWidth
                    {...register('maximumDigits')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.maximumDigits?.message?.toString()}
                </p>
            </Grid>
          
          
           
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} sx={{background:"grey",  '&:hover': {
          // Define the hover styles here
          backgroundColor: 'lightgray',
        
        },}} color="info" >
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
    )
  }