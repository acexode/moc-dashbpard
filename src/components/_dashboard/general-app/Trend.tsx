// @ts-nocheck

import { Box, Card, CardHeader, Typography } from '@mui/material';
import { FC } from 'react'
import LineChart from './LineChart';

const Trend:FC<{title?:string}> = ({title="Service Utilisation (Coming Soon)"}) => {
  
  return (
    <Card>
      <CardHeader
        title={
          <Typography style={{ fontSize: '0.9rem', fontWeight:500, color:"#212B36" }}>
            {title}
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