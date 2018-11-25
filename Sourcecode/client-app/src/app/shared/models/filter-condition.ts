import { OrderInfo } from './order-info';
import { SearchInfo } from './search-info';

export class FilterCondition {
  public Paging: boolean;
   public PageSize: number;
   public PageIndex: number;
   public SearchCondition: SearchInfo[];
   public Orders: OrderInfo[];
}
