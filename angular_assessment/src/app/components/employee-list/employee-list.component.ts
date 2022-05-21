import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { DataShareService } from 'src/app/services/data-share.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {

  employees!: Employee[];

  @Output()
  updateEmployeeEmitter = new EventEmitter<boolean>();

  @Output()
  employeeEmitter = new EventEmitter<Employee>();

  @Output()
  updatedDataEmitter = new EventEmitter<boolean>();

  @Input()
  updateDataSwitch!: boolean;

  @Input()
  updateEmployeeSwitch!: boolean;


  constructor(private employeesService: EmployeesService, private dataService: DataShareService) { }

  ngOnChanges(): void {
    console.log('updateDataSwitch in employee list changes: ' + this.updateDataSwitch);
    console.log('updateEmployeeSwitch in employee list changes:' + this.updateEmployeeSwitch);
    this.dataService.data.subscribe(
      data => this.employees = data
    );
  }

  ngOnInit(): void {
    console.log('updateDataSwitch in employee list init: ' + this.updateDataSwitch);
    console.log('updateEmployeeSwitch in employee list init:' + this.updateEmployeeSwitch);
    this.dataService.data.subscribe(
      data => this.employees = data
    )
  }

  deleteEmployee(id: number) {
    console.log('delete employee: ', id);
    console.log(this.employeesService.deleteEmployee(id));
    this.getEmployees();
    this.dataService.data.subscribe(
      data => this.employees = data
    )
  }

  editEmployee(employee: Employee) {
    this.employeeEmitter.emit(employee);
    this.updateEmployeeSwitch = true;
    this.updateEmployeeEmitter.emit(this.updateEmployeeSwitch);
  }

  getEmployees() {
    this.employeesService.getEmployees();
    this.updateDataSwitch = false;
    this.updatedDataEmitter.emit(this.updateDataSwitch);
  }

  employeeTracker(index: number, employee: Employee) {
    return employee.id;
  }

}
