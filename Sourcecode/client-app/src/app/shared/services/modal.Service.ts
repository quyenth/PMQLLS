import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ModalService {
   public popup: Subject<any> = new Subject<any>();

  constructor() {}
}