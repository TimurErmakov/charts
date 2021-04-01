import { Charts, FieldNames } from '../enums/dataset';

export const chartOptions = [
  {
    label: 'Pie Chart',
    value: Charts.PieChart,
  },
  {
    label: 'XY Chart',
    value: Charts.XYChart,
  },
  {
    label: 'Radar Chart',
    value: Charts.RadarChart,
  },
];

export const fieldNameOptions = [
  {
    label: 'Enterprise Flag',
    value: FieldNames.EnterpriseFlag,
  },
  {
    label: 'Metropolitan Statistical Area Code',
    value: FieldNames.MSACode,
  },
  {
    label: 'Census Tract',
    value: FieldNames.CensusTract,
  },
  {
    label: 'Tract Income Ratio',
    value: FieldNames.TractIncomeRatio,
  },
  {
    label: 'Borrower Income Ratio',
    value: FieldNames.BorrowerIncomeRatio,
  },
  {
    label: 'Loan-to-Value Ratio',
    value: FieldNames.LTV,
  },
  {
    label: 'Purpose Of Loan',
    value: FieldNames.PurposeOfLoan,
  },
  {
    label: 'Federal Guarantee',
    value: FieldNames.FederalGuarantee,
  },
  {
    label: 'Borrower Race',
    value: FieldNames.BorrowerRace,
  },
  {
    label: 'Co-Borrower Race',
    value: FieldNames.CoBorrowerRace,
  },
  {
    label: 'Borrower Gender',
    value: FieldNames.BorrowerGender,
  },
  {
    label: 'Co-Borrower Gender',
    value: FieldNames.CoBorrowerGender,
  },
  {
    label: 'Number Of Units',
    value: FieldNames.NumberOfUnits,
  },
  {
    label: 'Unit Affordability Category',
    value: FieldNames.UnitAffordabilityCategory,
  },
];
