import { FieldNames } from '../enums/dataset';

type Config = {
  [key in FieldNames]: {
    [key: string]: string;
  };
};

export const config: Config = {
  EnterpriseFlag: {
    '1': 'Fannie Mae',
    '2': 'Freddie Mac',
  },
  RecordNumber: {},
  PurposeOfLoan: {
    '1': 'Purchase',
    '8': 'Other',
    '9': 'Not applicable',
  },
  FederalGuarantee: {
    '1': 'FHA/VA',
    '2': 'Rural Housing Service',
    '3': 'Home Equity Conversion Mortgage',
    '4': 'No Federal guarantee',
    '5': 'FHA',
  },
  BorrowerRace: {
    '1': 'American Indian or Alaska Native',
    '2': 'Asian',
    '3': 'Black or African American',
    '4': 'Native Hawaiian or Other Pacific Islander',
    '5': 'White',
    '6': 'Two or more races',
    '7': 'Hispanic or Latino',
    '9': 'Not available',
  },
  CoBorrowerRace: {
    '1': 'American Indian or Alaska Native',
    '2': 'Asian',
    '3': 'Black or African American',
    '4': 'Native Hawaiian or Other Pacific Islander',
    '5': 'White',
    '6': 'Two or more races',
    '7': 'Hispanic or Latino',
    '9': 'Not available',
  },
  BorrowerGender: {
    '1': 'Male',
    '2': 'Female',
    '3': 'Information is not provided',
    '4': 'Not applicable',
    '9': 'Missing',
  },
  CoBorrowerGender: {
    '1': 'Male',
    '2': 'Female',
    '3': 'Information is not provided',
    '4': 'Not applicable',
    '5': 'No co-borrower',
    '9': 'Missing',
  },
  NumberOfUnits: {},
  UnitAffordabilityCategory: {
    '1': 'Low-income family in a low-income area',
    '2': 'Very low-income family in a low-income area',
    '3': 'Very low-income family not in a low-income area',
    '4': 'Other',
    '9': 'Not available',
    '0': 'Missing',
  },
  MSACode: {
    '1': 'Metropolitan area',
    '0': 'Non-metropolitan area',
  },
  CensusTract: {
    '1': '>=0, <10%',
    '2': '>=10, <30%',
    '3': '>=30, <=100%',
    '9': 'Missing',
  },
  TractIncomeRatio: {
    '1': '>0, <=80%',
    '2': '>80, <=120%',
    '3': '>120%',
    '9': 'Missing',
  },
  BorrowerIncomeRatio: {
    '1': '>=0,<=50%',
    '2': '>50, <=80%',
    '3': '>80%',
    '9': 'Not applicable',
  },
  LTV: {
    '1': '>0, <=60%',
    '2': '>60, <=80%',
    '3': '>80, <=90%',
    '4': '>90, <=95%',
    '5': '>95%',
    '9': 'Missing',
  },
};
