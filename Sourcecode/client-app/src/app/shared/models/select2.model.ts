export class Select2Model {
  id: any;
  text: any;
  children: Select2Model[];

  constructor(id: any , text: any) {
    this.id = id;
    this.text = text;
  }
}
