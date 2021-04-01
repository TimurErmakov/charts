import { Charts, FieldNames } from '../../enums/dataset';
import {
  DataModel,
  Action,
  SET_IS_DATA_LOADED,
  SET_DATA,
  SET_FIELD_NAME,
  SET_CHART_TYPE,
} from '../../types/store';

export const setIsDataLoaded = (data: boolean): Action => ({
  type: SET_IS_DATA_LOADED,
  payload: data,
});

export const setData = (data: DataModel[]): Action => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const setFieldName = (data: FieldNames): Action => {
  return {
    type: SET_FIELD_NAME,
    payload: data,
  };
};

export const setChartType = (data: Charts): Action => {
  return {
    type: SET_CHART_TYPE,
    payload: data,
  };
};
