// @ts-nocheck

import {
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
    Skeleton
  } from "@mui/material";
  import { FC, useEffect, useState } from "react";
  import {  useLocation } from "react-router-dom";
  
  import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
  import Page from "../../components/Page";
  import { PATH_DASHBOARD } from "../../routes/paths";
  import useSettings from "../../hooks/useSettings";
  
  const ViewHFQuarter: FC = () => {
    const { themeStretch } = useSettings();
    const [content, SetContent] = useState([]);
    const [groupData, setGrouped] = useState([]);
    const [loading,setLoading] = useState(true)

    const {
      state: { row, rowQ, page_title,rowTitle },
    } = useLocation();
    useEffect(() => {
      if(row){
        const data = JSON.parse(row?.content);
        SetContent(data);
      }
      setLoading(false)
    }, [row]);
  
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
              { name: `${page_title}`, href: PATH_DASHBOARD.m_and_e.hf },
              { name: "List" },
            ]}
          />
          <Typography variant="h6" component="div">
            {`${row?.facility || "Not Available"} M&E Assessment for ${rowTitle} ${row?.year}`}
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
  
  export default ViewHFQuarter;
  