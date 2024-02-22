import { Container, Grid } from "@mui/material";
import  { FC, useState } from "react";
import Page from "../../../components/Page";
import { ServicesCard } from "../../../components/_dashboard/general-app";
import Trend from "../../../components/_dashboard/general-app/Trend";
import { IServiceCard } from "../../../db/types";
import useSettings from "../../../hooks/useSettings";
import BarComponent from "./components/barDash";
import CalendarComponent from "./components/calendarDash";
import PieComponent from "./components/pieDash";
import SelectDropDown from "./components/selectComponent";

const today = new Date();
const quarter = Math.floor((today.getMonth() + 3) / 3) - 1
const FinanceDashboard:FC = () =>{
    const { themeStretch } = useSettings();
    const [selectedState, setSelectedState] = useState({
        national: "National",
        state: "",
        lga: "",
        year: today.getFullYear(),
        quarter: quarter === 0 ? 1 : quarter,
      });
      const assessmentData: IServiceCard[] = [
        {
          color: "#004b50",
          title: "TOTAL BUDGET",
          value: 13002303,
          classname: "card-greenish",
          showFCT: false,
          show: false,
          isString: true,
          isMoney: true,
        },
        {
          color: "#7a4100",
          title: "EXPENDITURE",
          value: 3456210,
          classname: "card-goldish",
          showFCT: false,
          show: false,
          isString: true,
          isMoney: true,
          
        },
        {
          color: "#003768",
          title: "BALANCE",
          value: 9348321,
          classname: "card-blueish",
          showFCT: false,
          show: false,
          isString: true,
          isMoney: true,

         
        },
      ];
    return (
        <Page title={`Financial Management Dashboard`}>
            <Container maxWidth={themeStretch ? false : "xl"}>
                <Grid container spacing={2}>
                    <SelectDropDown  
                    selectedState={selectedState}
                    setSelectedState={setSelectedState} />
                    {assessmentData?.map((dt, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <ServicesCard
                            color={dt?.color}
                            title={dt?.title}
                            value={dt?.value}
                            classname={dt?.classname}
                            sub={dt?.sub}
                            subTitle={dt?.subTitle}
                            show={dt?.show}
                            showFCT= {dt?.showFCT}
                            isString={dt?.isString}
                            path={dt?.path}
                            loading={false}
                            isMoney={dt?.isMoney}
                        />
                    </Grid>
                ))}
                  <Grid item xs={12} md={4} sm={4} lg={4}>
                        <BarComponent />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} lg={4}>
                        <PieComponent />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} lg={4}>
                        <CalendarComponent />
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Trend title="Expense Trend" />
                  </Grid>
                
                </Grid>
            </Container>
        </Page>
    )
}

export default FinanceDashboard