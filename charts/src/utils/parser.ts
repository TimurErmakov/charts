import { FieldNames } from '../enums/dataset';

type DataEntity = {
  [key in FieldNames]: string;
};

interface ParserProps {
  text: string;
  headers: string[];
}

export const parser = ({ text, headers }: ParserProps): DataEntity[] => {
  const data = text.split('\n').reduce((accArr: DataEntity[], record: string) => {
    const values = record.split(/\s+/);
    values.pop();

    const dataObj: DataEntity = values.reduce(
      (accObj, value: string, index: number) => ({
        ...accObj,
        [headers[index]]: value,
      }),
      {} as DataEntity,
    );

    accArr.push(dataObj);

    return accArr;
  }, []);

  return data;
};
