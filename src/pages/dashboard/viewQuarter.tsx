// @ts-nocheck

import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Skeleton,
  Button
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import editOutline from '@iconify/icons-eva/edit-outline';

import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import { PATH_DASHBOARD } from "../../routes/paths";
import useSettings from "../../hooks/useSettings";
import { Icon } from "@iconify/react";
import axiosInstance from "../../services/api_service";
import { levels } from "../../constants";
import { useAuthUserContext } from "../../context/authUser.context";

const ViewQuarter: FC = () => {
  const { themeStretch } = useSettings();
  const [content, SetContent] = useState([]);
  const [groupData, setGrouped] = useState([]);
  const [loading,setLoading] = useState(true)
  const [dataToEdit,setDataToEdit] = useState(null)

  const {
    state: { row, rowQ, page_title,rowTitle,rowNum },
  } = useLocation();
  let navigate = useNavigate()
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  const handleMoveToEdit = (dataToEdit:any) =>{
    navigate(PATH_DASHBOARD.m_and_e.newAssessmentLga,{
      state:{row:dataToEdit,rowNum,rowQ}
    })
  }
  useEffect(()=>{
    if(content){
      let newObject = {
        location: row?.location,
        quarters: row?.quarters,
        year: row?.year,
        content:JSON.stringify(content)
      }
      setDataToEdit(newObject)
   
    }
  },[content])
 
  useEffect(() => {
   try {
    if(rowQ){
      axiosInstance
      .get(`lga-assessments/${rowQ}`)
      .then((res) => {
        const data = JSON.parse(res?.data?.content);
      SetContent(data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoading(false)
      })
    }
   
   } catch (error) {
    console.log(error);
   }
  }, [rowQ]);

  useEffect(() => {
    if (content) {
      const groupedData = Object.values(
        content.reduce((result, item) => {
          const { sectionTitle, ...rest } = item;

          if (!result[sectionTitle]) {
            result[sectionTitle] = {
              name: sectionTitle,
              value: sectionTitle,
              items: [],
            };
          }

          result[sectionTitle].items.push(rest);

          return result;
        }, {})
      );
      setGrouped(groupedData);
    }
  }, [content]);

  let dummyData = [...Array(4)]
  return (
    <Page title={`Quarter based Data: List | BHCFP`}>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={`${page_title}`}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: `${page_title}`, href: PATH_DASHBOARD.m_and_e.lga },
            { name: "List" },
          ]}
          action={
            userProfile?.level === levels.national ? <Button
             variant="contained"
             onClick={() =>handleMoveToEdit(dataToEdit)}
             startIcon={<Icon icon={editOutline} />}
           >
             Edit Assessment
           </Button> :null
         }
        />
        <Typography variant="h6" component="div">
          {`${row?.location?.name || "Not Available"} ${
            page_title === "LGA" ? "LGA" : "State"
          } M&E Assessment for ${rowTitle} ${row?.year}`}
        </Typography>
       {loading ? <Grid container spacing={3} mt={1}>
          {dummyData?.map((cont: any, index: number) => (
            <Grid item xs={12} md={12} key={index}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                 <Skeleton variant="rectangular" width={150} height={30} />                               
              </Typography>
              <List>
                <Stack>
                  {dummyData?.map((item, index) => (
                    <ListItem secondaryAction={ <Skeleton variant="rectangular" width={80} height={30} /> } key={index}>
                      <ListItemText primary={ <Skeleton variant="rectangular" width={700} height={30} />  } />
                    </ListItem>
                   
                  ))}
                </Stack>
              </List>
            </Grid>
          ))}
        </Grid> :
        <Grid container spacing={3} mt={1}>
          {groupData?.map((cont: any, index: number) => (
            <Grid item xs={12} md={12} key={index}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                  {cont?.name}
              </Typography>
              <List>
                <Stack>
                  {cont?.items?.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={<Typography>
                        {`${item?.serial}  ${item?.question}`}
                      </Typography>} 
                      secondary={
                        <Typography sx={{color:"#7b939c"}} >Response: {item?.response || "Not Available"}</Typography>
                      } />
                    </ListItem>
                  ))}
                </Stack>
              </List>
            </Grid>
          ))}
        </Grid> }
      </Container>
    </Page>
  );
};

export default ViewQuarter;
