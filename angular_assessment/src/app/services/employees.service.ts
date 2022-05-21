import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { lastValueFrom } from 'rxjs';
import { DataShareService } from './data-share.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  readonly BASE_URL = 'http://localhost:8081/api/v1/employees/';
  readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private dataService: DataShareService) { }


  getEmployees() {
    lastValueFrom(this.http.get<Employee[]>(this.BASE_URL, { headers: this.HEADERS })).then(
      (employees: Employee[]) => { console.log('Employees successfully found!'), this.dataService.updateData(employees) },
      (error: Error) => { console.log('Error: ' + error) }
    );
  }

  getEmployee(id: number): Promise<Employee> {
    return lastValueFrom(this.http.get<Employee>(this.BASE_URL + id, { headers: this.HEADERS }));
  }

  createEmployee(employee: Employee) {
    lastValueFrom(this.http.post<Employee>(this.BASE_URL, employee, { headers: this.HEADERS })).then(
      () => { console.log('Employee successfully created!'), this.getEmployees() },
      (error: Error) => { console.log('Error: ' + error) }
    );
  }

  updateEmployee(employee: Employee) {
    lastValueFrom(this.http.put<Employee>(this.BASE_URL + employee.id, employee, { headers: this.HEADERS })).then(
      () => { console.log('Employee successfully updated!'), this.getEmployees() },
      (error: Error) => { console.log('Error: ' + error) }
    );
  }

  deleteEmployee(id: number) {
    lastValueFrom(this.http.delete(this.BASE_URL + id, { headers: this.HEADERS })).then(
      () => { console.log('Employee successfully deleted!'), this.getEmployees() },
      (error: Error) => { console.log('Error: ' + error) }
    );
  }
}
