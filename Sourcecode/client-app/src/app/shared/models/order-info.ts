export class OrderInfo {
  FieldName: string;
  OrderDesc: Boolean;
  constructor(fieldName: string, orderDes: boolean ) {
    this.FieldName = fieldName;
    this.OrderDesc = orderDes;
  }
}
