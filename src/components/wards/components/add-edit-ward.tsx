// @ts-nocheck

import {
  Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
    fetchAllData?:any
  }

  const schema = yup.object().shape({
    name: yup.string().required("* Name is required"),  
  });

 

export  const AddEdit:FC<IAddEdit> = ({edit,formData,modal,toggle,fetchAllData}) =>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
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
      const [states,setStates] = useState([])
      const [lgas,setLgas] = useState([])
      const [stateId,setStateId] = useState("")
      const [lgaId,setLgaId] = useState("")

      useEffect(()=>{
        axiosInstance.get(`/locations/states`).then(res =>{
          const options = res?.data?.map((dt:any) =>{
            return {
              label: dt?.name,
              id: dt?.id
            }
          })
          setStates(options)
        }).catch(error =>{
          console.log(error)
        })
    },[])

      useEffect(()=>{
        axiosInstance.get(`/locations/states/${stateId}`).then(res =>{
          const options = res?.data?.map((dt:any) =>{
            return {
              label: dt?.name,
              id: dt?.id
            }
          })
          setLgas(options)
        }).catch(error =>{
          console.log(error)
        })
    },[stateId])


      useEffect(()=>{
          if(edit){
            reset(formData)
          }else{
            reset()
          }
      },[edit])

    const handleToggle =() => toggle()

    const onSubmit = async(data:any) =>{
        let newData = {
            ...data,   
            type: "Ward",  
            parentId:lgaId     
          };
          delete newData?.id
          setLoading(true)
          let text = edit ? "Ward Updated" : "Ward Added";
          try {
            let res;
            if (edit) {
              res = await axiosInstance.put(
                `locations/${formData?.id}/update`,
                newData
              );
            } else {
              res = await axiosInstance.post(`locations/create`, newData);
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
        <DialogTitle id="alert-dialog-title">{edit ? "Edit Ward": "Add Ward"}</DialogTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Ward Name</label>
                <TextField
                    defaultValue={formData?.name}
                    variant="outlined"
                    fullWidth
                    {...register('name')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.name?.message?.toString()}
                </p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <label>Description</label>
                <TextField
                    defaultValue={formData?.description}
                    variant="outlined"
                    fullWidth
                    {...register('description')}
                    type="text"
                />
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors?.description?.message?.toString()}
                </p>
            </Grid>
           
             <Grid item xs={12} sm={6} lg={6}>
            <label>Select State</label>
            <Autocomplete
              options={states}
              getOptionLabel={(option) => option.label}
              onChange={(e,value) => setStateId(value.id)}
              renderInput={(params) => <TextField {...params} />}
            />
            
            </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <label>Select LGA</label>
            <Autocomplete
              options={lgas}
              getOptionLabel={(option) => option.label}
              onChange={(e,value) => setLgaId(value.id)}
              renderInput={(params) => <TextField {...params} />}
            />
            
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