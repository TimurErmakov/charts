import { FieldNames } from '../enums/dataset';
import { DataModel } from '../types/store';

interface Counter {
  [key: string]: number;
}

export const getEnterpriseFlagData = (data: DataModel[]) => {
  const countObj: Counter = data.reduce(
    (counter: Counter, { EnterpriseFlag }) => {
      return {
        ...counter,
        [EnterpriseFlag]: counter[EnterpriseFlag] + 1,
      };
    },
    { '1': 0, '2': 0 },
  );

  return [
    {
      value: countObj['1'],
      category: 'Freddie Mac',
    },
    {
      value: countObj['2'],
      category: 'Fannie Mae',
    },
  ];
};

export const getMSACodeData = (data: DataModel[]) => {
  const countObj: Counter = data.reduce(
    (counter: Counter, { MSACode }) => {
      return {
        ...counter,
        [MSACode]: counter[MSACode] + 1,
      };
    },
    { '1': 0, '0': 0 },
  );

  return [
    {
      value: countObj['1'],
      category: 'Metropolitan area',
    },
    {
      value: countObj['0'],
      category: 'Non-metropolitan area',
    },
  ];
};

export const getCensusTractData = (data: DataModel[]) => {
  const countObj: Counter = data.reduce(
    (counter: Counter, { CensusTract }) => {
      return {
        ...counter,
        [CensusTract]: counter[CensusTract] + 1,
      };
    },
    { '1': 0, '2': 0, '3': 0, '9': 0 },
  );

  return [
    {
      value: countObj['1'],
      category: '>=0, <10%',
    },
    {
      value: countObj['2'],
      category: '>=10, <30%',
    },
    {
      value: countObj['3'],
      category: '>=30, <=100%',
    },
    {
      value: countObj['9'],
      category: 'Missing',
    },
  ];
};

export const getTractIncomeRatioData = (data: DataModel[]) => {
  const countObj: Counter = data.reduce(
    (counter: Counter, { TractIncomeRatio }) => {
      return {
        ...counter,
        [TractIncomeRatio]: counter[TractIncomeRatio] + 1,
      };
    },
    { '1': 0, '2': 0, '3': 0, '9': 0 },
  );

  return [
    {
      value: countObj['1'],
      category: '>0, <=80%',
    },
    {
      value: countObj['2'],
      category: '>80, <=120%',
    },
    {
      value: countObj['3'],
      category: '>120%',
    },
    {
      value: countObj['9'],
      category: 'Missing',
    },
  ];
};

export const getBorrowerIncomeRatioData = (data: DataModel[]) => {
  const countObj: Counter = data.reduce(
    (counter: Counter, { BorrowerIncomeRatio }) => {
      return {
        ...counter,
        [BorrowerIncomeRatio]: counter[BorrowerIncomeRatio] + 1,
      };
    },
    { '1': 0, '2': 0, '3': 0, '9': 0 },
  );

  return [
    {
      value: countObj['1'],
      category: '>=0,<=50%',
    },
    {
      value: countObj['2'],
      category: '>50, <=80%',
    },
    {
      value: countObj['3'],
      category: '>80%',
    },
    {
      value: countObj['9'],
      category: 'Not applicable',
    },
  ];
};

export const getLTVData = (data: DataModel[]) => {
  const countObj: Counter = data.reduce(
    (counter: Counter, { LTV }) => {
      return {
        ...counter,
        [LTV]: counter[LTV] + 1,
      };
    },
    { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '9': 0 },
  );

  return [
    {
      value: countObj['1'],
      category: '>0, <=60%',
    },
    {
      value: countObj['2'],
      category: '>60, <=80%',
    },
    {
      value: countObj['3'],
      category: '>80, <=90%',
    },
    {
      value: countObj['4'],
      category: '>90, <=95%',
    },
    {
      value: countObj['5'],
      category: '>95%',
    },
    {
      value: countObj['9'],
      category: 'Missing',
    },
  ];
};

export const parseData = (fieldName: FieldNames, data: DataModel[]) => {
  switch (fieldName) {
    case FieldNames.EnterpriseFlag:
      return getEnterpriseFlagData(data);

    case FieldNames.MSACode:
      return getMSACodeData(data);

    case FieldNames.CensusTract:
      return getCensusTractData(data);

    case FieldNames.TractIncomeRatio:
      return getTractIncomeRatioData(data);

    case FieldNames.BorrowerIncomeRatio:
      return getBorrowerIncomeRatioData(data);

    case FieldNames.LTV:
      return getLTVData(data);

    default:
      return data;
  }
};
