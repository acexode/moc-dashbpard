import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Grid } from '@mui/material';

export default function PerformanceIndicators() {
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      {/* <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" textAlign={"center"}>BHCPF Performance Indicators</Typography>
        <Grid container spacing={3} sx={{ mt: 1, mb: 1 , display:"flex", justifyContent:"space-between"}}>
            <Grid item sm={3} md={3}>
                <Box sx={{border: "1px solid grey",  width:"100%",height:"50px", borderRadius:1,display:"flex",justifyContent:"space-between"}}>
                <Typography variant="subtitle2" p={1} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>80% and above</Typography>
                <Box sx={{bgcolor:"green", width:"50%"}}></Box>
                </Box>
            </Grid>
            <Grid item sm={3} md={3}>
            <Box sx={{border: "1px solid grey",  width:"100%",height:"50px", borderRadius:1,display:"flex",justifyContent:"space-between"}}>
                <Typography variant="subtitle2" p={1} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>50% - 79%</Typography>
                <Box sx={{bgcolor:"#FFAB00", width:"50%"}} />
            </Box>
            </Grid>
            <Grid item sm={3} md={3}>
            <Box sx={{border: "1px solid grey",  width:"100%",height:"50px", borderRadius:1,display:"flex", justifyContent:"space-between"}}>
                <Typography variant="subtitle2" p={1} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>49% and below</Typography>
                <Box sx={{bgcolor:"#c64b57", width:"50%"}}></Box>
                </Box>
            </Grid>
        </Grid>
      </Box> */}
    </Card>
  );
}
