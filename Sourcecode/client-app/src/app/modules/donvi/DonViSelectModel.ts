export class DonViSelectModel {
  id: number;
  text: string;
  maDonVi: string;
  maDonViCha: string;
  children: DonViSelectModel[] = [];
}
