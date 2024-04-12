// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";
import { hr_menu, qa_menu } from "../../constants";
// import

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  dashboard: getIcon("dash"),
  booking: getIcon("ic_booking"),
  reports: getIcon("ic_analytics"),
  finances: getIcon("dff2"),
  settings: getIcon("ic_settings"),
  exit: getIcon("ic_exit"),
  m_e: getIcon("m&e"),
  qa: getIcon("qa"),
  baseline: getIcon("baseline"),
  hrh: getIcon("hrh"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "General",
    items: [
      {
        title: "Dashboard",

        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },

    
      {
        title: "NPHCDA",
        path: PATH_DASHBOARD.general.nphcda,
        // icon: ICONS.finances,
      },
      {
        title: "NHIA",
        path: PATH_DASHBOARD.general.nhia,
      },
      {
        title: "EMT",
        path: PATH_DASHBOARD.general.emt,
        // icon: ICONS.hrh,
        // path:hr_menu,
        // isExternal:true
        
      },
     
    ],
  },

  // Misc
  // ----------------------------------------------------------------------
  // {
  //   subheader: "Admin",
  //   items: [
  //     {
  //       title: "Settings",

  //       path: PATH_DASHBOARD.settings.root,
  //       icon: ICONS.settings,
  //       children: [
  //         { title: "Users", path: PATH_DASHBOARD.settings.userManagement },
  //         { title: "Facility", path: PATH_DASHBOARD.settings.facilityManagement },
  //         { title: "Questions", path: PATH_DASHBOARD.settings.questionsManagement },
  //         { title: "Wards", path: PATH_DASHBOARD.settings.wardsSettings },
  //       ],
  //     },
  //     { title: "Log Out", path: PATH_AUTH.login, icon: ICONS.exit },
  //   ],
  // },
];

export const StateConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Dashboard",

        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },

      // {
      //   title: "M&E",
      //   path: PATH_DASHBOARD.m_and_e.root,
      //   icon: ICONS.reports,
      //   children: [
      //     { title: "State", path: PATH_DASHBOARD.m_and_e.state },
      //     { title: "LGA", path: PATH_DASHBOARD.m_and_e.lga },
      //     { title: "HF", path: PATH_DASHBOARD.m_and_e.hf },
      //     // { title: "Progress Report", path: PATH_DASHBOARD.m_and_e.viewProgressReport },
      //   ],
      // },
      // {
      //   title: "Financial Management",
      //   path: PATH_DASHBOARD.financial_management.root,
      //   icon: ICONS.finances,
      //   children: [
      //     { title: "Dashboard", path: PATH_DASHBOARD.financial_management.dashboard },
      //     { title: "Business Plan", path: PATH_DASHBOARD.financial_management.business_plan },
      //     { title: "Retirement", path: PATH_DASHBOARD.financial_management.retirement },
      //   ],
      // },
    ],
  },


];

export const LGAConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Dashboard",

        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },

      {
        title: "M&E",
        path: PATH_DASHBOARD.m_and_e.root,
        icon: ICONS.reports,
        children: [
          { title: "LGA", path: PATH_DASHBOARD.m_and_e.lga },
          { title: "HF", path: PATH_DASHBOARD.m_and_e.hf },
        ],
      },
      {
        title: "Financial Management",
        path: PATH_DASHBOARD.financial_management.root,
        icon: ICONS.finances,
        children: [
          { title: "Dashboard", path: PATH_DASHBOARD.financial_management.dashboard },
          { title: "Business Plan", path: PATH_DASHBOARD.financial_management.business_plan },
          { title: "Retirement", path: PATH_DASHBOARD.financial_management.retirement },
        ],
      },
    ],
  },


];
export default sidebarConfig;
