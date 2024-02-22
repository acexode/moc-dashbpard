import React, {FC} from 'react';
import MedicinePreviewCard from './medinceCard';
import CommunityPreview from './Community';
import GovernmentStructurePreview from './SettlementReportTable';
import HumanResourcesCardPreview from './TotalOfficerCard';
import HealthInfoPreview from './HealthInfo';
import FinancialPreviewCard from './financialCard';
import QualityAssessmentPreview from './QualityAssessment';
import SupervisoryPreview from './Supervisory';

// Import other components as needed

const PreviewRenderer: FC<{groupKey: string}> = ({ groupKey }): JSX.Element => {
  let componentToRender;

  switch (groupKey) {
    case 'essentialMed':
      componentToRender = <MedicinePreviewCard />;
      break;
    case 'governance':
      componentToRender = <GovernmentStructurePreview />;
      break;
    case 'hr':
      componentToRender = <HumanResourcesCardPreview />;
      break;
    case 'cl':
      componentToRender = <CommunityPreview />;
      break;
    case 'his':
      componentToRender = <HealthInfoPreview />;
      break;
    case 'finance':
      componentToRender = <FinancialPreviewCard />;
      break;
    case 'qa':
      componentToRender = <QualityAssessmentPreview />;
      break;
    case 'supervision':
      componentToRender = <SupervisoryPreview />;
      break;

    default:

      componentToRender = <div>No matching component for the condition</div>;
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
};

export default PreviewRenderer;
