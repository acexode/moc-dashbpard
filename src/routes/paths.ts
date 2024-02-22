function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_AUTH = '/auth';
  const ROOTS_DASHBOARD = '/dashboard';
  
  // ----------------------------------------------------------------------
  
  export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    register: path(ROOTS_AUTH, '/register'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    verify: path(ROOTS_AUTH, '/verify')
  };

  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      app: path(ROOTS_DASHBOARD, '/app'),
      nphcda: path(ROOTS_DASHBOARD, '/nphcda'),
      
    },
    m_and_e: {
      root: path(ROOTS_DASHBOARD, '/m-and-e'),
      state: path(ROOTS_DASHBOARD, '/m-and-e/state'),
      lga: path(ROOTS_DASHBOARD, '/m-and-e/lga'),
      hf: path(ROOTS_DASHBOARD, '/m-and-e/hf'),
      newAssessment: path(ROOTS_DASHBOARD, '/m-and-e/new-assessment'),
      newAssessmentLga: path(ROOTS_DASHBOARD, '/m-and-e/new-assessment-lga'),
      newAssessmentHF: path(ROOTS_DASHBOARD, '/m-and-e/new-assessment-hf'),
      viewAssessment: path(ROOTS_DASHBOARD, '/m-and-e/view-assessment'),
      viewStateAssessment: path(ROOTS_DASHBOARD, '/m-and-e/view-state-assessment'),
      viewHFAssessment: path(ROOTS_DASHBOARD, '/m-and-e/view-hf-assessment'),
      viewProgressReport:path(ROOTS_DASHBOARD, '/m-and-e/progress-report'),
    },
    financial_management: {
      root: path(ROOTS_DASHBOARD, '/financial_management'),
      dashboard: path(ROOTS_DASHBOARD, '/financial_management/dashboard'),
      business_plan: path(ROOTS_DASHBOARD, '/financial_management/business_plan'),
      retirement: path(ROOTS_DASHBOARD, '/financial_management/retirement'),
      viewLgaPlan: path(ROOTS_DASHBOARD, '/financial_management/viewLgaPlan'),
      viewRetirement: path(ROOTS_DASHBOARD, '/financial_management/viewRetirement'),
    },
    settings: {
      root: path(ROOTS_DASHBOARD, '/settings'),
      userManagement: path(ROOTS_DASHBOARD, '/settings/user'),
      facilityManagement: path(ROOTS_DASHBOARD, '/settings/facility'),
      questionsManagement: path(ROOTS_DASHBOARD, '/settings/questions'),
      MocKPIManagement: path(ROOTS_DASHBOARD, '/settings/moc-kpi'),
      wardsSettings: path(ROOTS_DASHBOARD, '/settings/wards'),
    },
   
  };

  export const PATH_PAGE = {
    page404: '/404',
    page500: '/500',
   };
