import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private dataSource = new BehaviorSubject<Employee[]>([]);
  data = this.dataSource.asObservable();
  constructor() { }

  updateData(data: Employee[]){
    this.dataSource.next(data);
  }
}
