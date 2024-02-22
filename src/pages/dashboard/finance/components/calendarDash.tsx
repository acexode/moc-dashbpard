// material
import { Card, CardHeader, Box, Typography,Button,Grid } from "@mui/material";
//
import { FC } from "react";
 // -------------------------------------------------------------------
interface IHumanResources {

}
const CalendarComponent: FC<IHumanResources> = ({

}) => {
 

  return (
    <Card style={{ height: "300px", overflow: 'visible' }} className="card">
      <CardHeader
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
           
            <Typography
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "#212B36" }}
            >
             Calendar
            </Typography>
          </div>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
         
        <Grid container spacing={3} p={3}>
            <Grid item sm={12} md={12} lg={12} sx={{display:"flex", justifyContent:"space-between",}}>
                <div>
                    <Typography variant="subtitle1">Next Due Date</Typography>
                    <Typography variant="subtitle2">17/09/2022</Typography>
                </div>
                <Button>View</Button>
            </Grid>
            <Grid item sm={12} md={12} lg={12} sx={{display:"flex", justifyContent:"space-between",}}>
                <div>
                    <Typography variant="subtitle1">Submit Business Plan</Typography>
                    <Typography variant="subtitle2">17/09/2022</Typography>
                </div>
                <Button>View</Button>
            </Grid>
            <Grid item sm={12} md={12} lg={12} sx={{display:"flex", justifyContent:"space-between",}}>
                <div>
                    <Typography variant="subtitle1">Update Business Plan</Typography>
                    <Typography variant="subtitle2">17/09/2022</Typography>
                </div>
                <Button size="small">View</Button>
            </Grid>
        </Grid>
         
       
      </Box>
    </Card>
  );
};

export default CalendarComponent;
