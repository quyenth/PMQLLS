import { OperationType } from '../commons/operation-type';

export class SearchInfo {
  FieldName: string;

  OperationType: number;

  Value: any;


  constructor (FieldName: string, OperationType: number , Value: any) {
      this.FieldName = FieldName;
      this.OperationType = OperationType;
      this.Value = Value;
  }
}
