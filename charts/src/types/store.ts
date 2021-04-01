import { Charts, FieldNames } from '../enums/dataset';

export const SET_IS_DATA_LOADED = 'SET_IS_DATA_LOADED';
export const SET_DATA = 'SET_DATA';
export const SET_FIELD_NAME = 'SET_FIELD_NAME';
export const SET_CHART_TYPE = 'SET_CHART_TYPE';

export interface StoreModel {
  isDataLoaded: boolean;
  data: DataModel[] | null;
  fieldName: FieldNames | null;
  chartType: Charts | null;
}

export interface DataModel {
  EnterpriseFlag: string;
  RecordNumber: string;
  MSACode: string;
  CensusTract: string;
  TractIncomeRatio: string;
  BorrowerIncomeRatio: string;
  LTV: string;
  PurposeOfLoan: string;
  FederalGuarantee: string;
  BorrowerRace: string;
  CoBorrowerRace: string;
  BorrowerGender: string;
  CoBorrowerGender: string;
  NumberOfUnits: string;
  UnitAffordabilityCategory: string;
}

interface SetIsDataLoaded {
  type: typeof SET_IS_DATA_LOADED;
  payload: boolean;
}

interface SetData {
  type: typeof SET_DATA;
  payload: DataModel[];
}

interface SetFieldName {
  type: typeof SET_FIELD_NAME;
  payload: FieldNames;
}

interface SetChartType {
  type: typeof SET_CHART_TYPE;
  payload: Charts;
}

export type Action = SetIsDataLoaded | SetData | SetFieldName | SetChartType;
