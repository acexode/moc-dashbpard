// @ts-nocheck

import { Box, Container, Card, Grid} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import Page from '../../../components/Page'
import useSettings from '../../../hooks/useSettings'
import { PATH_DASHBOARD } from '../../../routes/paths'
import axiosInstance from '../../../services/api_service'
import { Link, useParams } from 'react-router-dom'
 import TabComponent from './components/table'
import { formatData, formatLGAData } from '../../../utility/dataFormatter'
import SelectInput from '../../../components/SelectInput'
 
const columns =[
    {
      accessorKey: "state",
      header: "State",
      size: 150,
      Cell: ({ renderedCellValue, row }:any) => (
        <>
          <Box>
            <Link style={{color:"#2f3842"}} to={`${PATH_DASHBOARD.m_and_e.viewProgressReport}/${renderedCellValue}`}>{renderedCellValue ?? "Not Available"}</Link>
          </Box>
        </>
       
      ),
    },
    {
      accessorKey: "assessed_facilities",
      header: "HF Assessed",
      size: 150,
    },
    {
      accessorKey: "not_assessed",
      header: "HF Not Assessed",
      size: 150,
    },
    {
      accessorKey: "all_facilities",
      header: "Total Facilities",
      size: 150,
    },
    {
      accessorKey: "progress_percentage",
      header: "Progress",
      size: 150,
      Cell: ({ renderedCellValue, row }:any) => (
        <>
          <Box>
            {renderedCellValue}%
          </Box>
        </>
       
      ),
    },
    {
      accessorKey: "quarter",
      header: "Quarter",
      size: 150,
      
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 150,
      
    },
  ]
const lgaColumns =[
  {
    accessorKey: "lga",
    header: "LGA",
    size: 150,
    Cell: ({ renderedCellValue, row }:any) => (
      <>
        <Box>
          <Link style={{color:"#2f3842"}} to={`${PATH_DASHBOARD.m_and_e.viewProgressReport}/${row?.original?.state}/${row?.original?.lga}`}>{renderedCellValue ?? "Not Available"}</Link>
        </Box>
      </>
     
    ),
  },
    {
      accessorKey: "state",
      header: "State",
      size: 150,
      Cell: ({ renderedCellValue, row }:any) => (
        <>
          <Box>
            <Link style={{color:"#2f3842"}} to={`${PATH_DASHBOARD.m_and_e.viewProgressReport}/${renderedCellValue}`}>{renderedCellValue ?? "Not Available"}</Link>
          </Box>
        </>
       
      ),
    },
   
    {
      accessorKey: "assessed_facilities",
      header: "HF Assessed",
      size: 150,
    },
    {
      accessorKey: "not_assessed",
      header: "HF Not Assessed",
      size: 150,
    },
    {
      accessorKey: "all_facilities",
      header: "Total Facilities",
      size: 150,
    },
    {
      accessorKey: "progress_percentage",
      header: "Progress",
      size: 150,
      Cell: ({ renderedCellValue, row }:any) => (
        <>
          <Box>
            {renderedCellValue}%
          </Box>
        </>
       
      ),
     
    },
    {
      accessorKey: "quarter",
      header: "Quarter",
      size: 150,
      
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 150,
      
    },
  ]
// const hfColumns =[
//   {
//     accessorKey: "lga",
//     header: "LGA",
//     size: 150,
//     Cell: ({ renderedCellValue, row }:any) => (
//       <>
//         <Box>
//           <Link style={{color:"#2f3842"}} to={`${PATH_DASHBOARD.m_and_e.viewProgressReport}/${row?.original?.state}/${row?.original?.lga}`}>{renderedCellValue ?? "Not Available"}</Link>
//         </Box>
//       </>
     
//     ),
//   },
//     {
//       accessorKey: "state",
//       header: "State",
//       size: 150,
//       Cell: ({ renderedCellValue, row }:any) => (
//         <>
//           <Box>
//             <Link style={{color:"#2f3842"}} to={`${PATH_DASHBOARD.m_and_e.viewProgressReport}/${renderedCellValue}`}>{renderedCellValue ?? "Not Available"}</Link>
//           </Box>
//         </>
       
//       ),
//     },
   
//     {
//       accessorKey: "assessed_facilities",
//       header: "HF Assessed",
//       size: 150,
//     },
//     // {
//     //   accessorKey: "not_assessed",
//     //   header: "HF Not Assessed",
//     //   size: 150,
//     // },
//     {
//       accessorKey: "all_facilities",
//       header: "Total Facilities",
//       size: 150,
//     },
//     {
//       accessorKey: "progress_percentage",
//       header: "Progress",
//       size: 150,
//       Cell: ({ renderedCellValue, row }:any) => (
//         <>
//           <Box>
//             {renderedCellValue}%
//           </Box>
//         </>
       
//       ),
     
//     },
//     {
//       accessorKey: "quarter",
//       header: "Quarter",
//       size: 150,
      
//     },
//     {
//       accessorKey: "year",
//       header: "Year",
//       size: 150,
      
//     },
//   ]
  const year = new Date().getFullYear();
  const years = Array.from(new Array(10), (val, index) => year - index);
  const q = [1, 2, 3, 4];

  const today = new Date();
  const quarter = Math.floor((today.getMonth() + 3) / 3) - 1;
const Progress:FC = () => {
    const { themeStretch } = useSettings();
    const {state}  = useParams()
    const [isLoading,setIsLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(25)
    const [totalPages,setTotalPages] = useState(0)
    const [progressReport,setProgressReport] = useState({
        total_assessed:0,
        total_not_assessed:0,
        progress:0
    })
    const [selectedState, setSelectedState] = useState({
      year: today.getFullYear(),
      quarter: quarter === 0 ? 1 : quarter,
    });
    const [formattedData,setFormattedData] = useState<any>([])
    const [mainData,setMainData] = useState<any>([])
    let url = state ?`/assessments/m-and-e/progress/report` : `/assessments/m-and-e/progress/report/state`
    useEffect(()=>{
      setIsLoading(true)
        axiosInstance.get(url,{params:{
          stateFilter:state,
          page,
          pageSize,
        }}).then(res =>{
            if(state){
              const formatted = formatLGAData(res?.data,state)
              const filteredData = formatted?.filter((data:any) => data?.quarter === selectedState.quarter && data?.year === selectedState.year)
              setFormattedData(filteredData)
              setMainData(formatted)
            }
            else{
             
              const formattedResult = formatData(res?.data);
              const filteredData = formattedResult?.filter((data:any) => data?.quarter === selectedState.quarter && data?.year === selectedState.year)
              setFormattedData(filteredData)
              setMainData(formattedResult)
              setTotalPages(res?.data?.totalPages)
              setProgressReport((prevProgressReport) => ({
                  ...prevProgressReport,
                  total_assessed: res?.data?.progress_report?.total_assessed,
                  total_not_assessed: res?.data?.progress_report?.total_not_assessed,
                  progress: parseInt((res?.data?.progress_report?.progress * 100).toFixed(1))
                }));
            }
          
            
        }).catch(error =>{
            console.log(error);
        }).finally(()=>{
          setIsLoading(false)
        })
    },[state,page,pageSize])
    const handleChange = (val: string, field: string) => {
      setSelectedState((prevState) => ({
        ...prevState,
        [field]: ['year', 'quarter'].includes(field) ? parseInt(val) : val,
      }));
    };

    useEffect(()=>{
      if(mainData){
        const filteredData = mainData?.filter((data:any) => data?.quarter === selectedState.quarter && data?.year === selectedState.year)
        setFormattedData(filteredData)
      }
    },[selectedState])


  return (
    <Page title={`Progress Report`}>
        <Container maxWidth={themeStretch ? false : "xl"}>
            <HeaderBreadcrumbs
                heading={`Progress Report`}
                links={[
                { name: "All", href: PATH_DASHBOARD.m_and_e.viewProgressReport },
                ...(state ? [{ name: `${state}`, href: `${PATH_DASHBOARD.m_and_e.viewProgressReport}/${state}` }] : []),
                { name: "List" },
                ]}
            />
            <Card >
              <Grid spacing={3} container px={3}>
                <Grid item xs={6}>
                  <label>Year</label>
                    <SelectInput
                      name="year"
                      defaultValue={selectedState.year}
                      handleChange={handleChange}
                      options={years}
            
                    />
                </Grid>
                <Grid item xs={6}>
                  <label>Quarter</label>
                <SelectInput
                      name="quarter"
                      defaultValue={selectedState.quarter}
                      handleChange={handleChange}
                      options={q}
                    />
                </Grid>
                
              </Grid>
            </Card>
            {!state ? 
            <TabComponent data={formattedData} columns={columns}  isLoading={isLoading} />
            :<TabComponent data={formattedData} columns={lgaColumns}  isLoading={isLoading} />
            }
           
        </Container>
    </Page>
  )
}

export default Progress