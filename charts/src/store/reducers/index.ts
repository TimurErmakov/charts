import {
  Action,
  SET_IS_DATA_LOADED,
  SET_DATA,
  StoreModel,
  SET_FIELD_NAME,
  SET_CHART_TYPE,
} from '../../types/store';

const initialState: StoreModel = {
  isDataLoaded: false,
  data: null,
  fieldName: null,
  chartType: null,
};

const reducer = (state = initialState, action: Action): StoreModel => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case SET_IS_DATA_LOADED:
      return {
        ...state,
        isDataLoaded: action.payload,
      };

    case SET_FIELD_NAME:
      return {
        ...state,
        fieldName: action.payload,
      };

    case SET_CHART_TYPE:
      return {
        ...state,
        chartType: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
