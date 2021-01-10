import { Charts, FieldNames } from '../../enums/dataset';
import { StoreModel, DataModel } from '../../types/store';

export const selectIsDataLoaded = (state: StoreModel): boolean => state.isDataLoaded;

export const selectData = (state: StoreModel): DataModel[] | null => state.data;

export const selectFieldName = (state: StoreModel): FieldNames | null => state.fieldName;

export const selectChartType = (state: StoreModel): Charts | null => state.chartType;
