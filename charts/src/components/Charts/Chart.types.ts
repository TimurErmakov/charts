import { FieldNames } from '../../enums/dataset';
import { DataModel } from '../../types/store';

export interface ChartProps {
  data: DataModel[];
  fieldName: FieldNames;
}
