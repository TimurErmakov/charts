import { FieldNames } from '../enums/dataset';
import { DataModel } from '../types/store';

export const getEnterpriseFlagData = (data: DataModel[]) => {
  const countObj = data.reduce(
    ({ fannieMae, freddieMac }, { EnterpriseFlag }) => {
      switch (EnterpriseFlag) {
        case '1':
          return {
            fannieMae: fannieMae + 1,
            freddieMac,
          };

        case '2':
          return {
            fannieMae,
            freddieMac: freddieMac + 1,
          };

        default:
          return { fannieMae, freddieMac };
      }
    },
    { fannieMae: 0, freddieMac: 0 },
  );

  return [
    {
      value: countObj.freddieMac,
      category: 'Freddie Mac',
    },
    {
      value: countObj.fannieMae,
      category: 'Fannie Mae',
    },
  ];
};

export const parseData = (fieldName: FieldNames, data: DataModel[]) => {
  switch (fieldName) {
    case FieldNames.EnterpriseFlag:
      return getEnterpriseFlagData(data);

    default:
      return data;
  }
};
