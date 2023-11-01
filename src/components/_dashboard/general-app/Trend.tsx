// @ts-nocheck

import { Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { FC } from 'react'
import LineChart from './LineChart';

const Trend:FC= () => {
  
  return (
    <Card>
      <CardHeader
        title={
          <Typography style={{ fontSize: '0.9rem', fontWeight:500, color:"#212B36" }}>
            Service Utilisation (Coming Soon)
        </Typography>}
      />
      <Box sx={{display:"flex", justifyContent:"center" }}>
       <div style={{width:"49%"}}>
       <LineChart />
       </div>
      </Box>
    </Card>
  )
}

export default Trend