import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { DataShareService } from 'src/app/services/data-share.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnChanges {

  @Output()
  updatedDataEmitter = new EventEmitter<boolean>();

  @Output()
  updateEmployeeEmitter = new EventEmitter<boolean>();

  @Input()
  employeeToEdit!: Employee;

  @Input()
  updateEmployeeSwitch!: boolean;

  @Input()
  updateDataSwitch!: boolean;

  constructor(private employeesService: EmployeesService) { }

  ngOnChanges(): void {
    console.log('updateDataSwitch in employee form changes: ' + this.updateDataSwitch);
    console.log('updateEmployeeSwitch in employee form changes:' + this.updateEmployeeSwitch);
  }

  ngOnInit(): void {
    console.log('updateDataSwitch in employee form init: ' + this.updateDataSwitch);
    console.log('updateEmployeeSwitch in employee form init:' + this.updateEmployeeSwitch);
  }

  saveEmployee(form: NgForm) {
    console.log(form);
    this.employeesService.createEmployee(form.value);
    this.setUpdateDataSwitch()
    form.reset();
  }

  updateEmployee(form: NgForm, id: number) {
    this.employeeToEdit = form.value;
    this.employeeToEdit.id = id;
    console.log(this.employeeToEdit);
    this.employeesService.updateEmployee(this.employeeToEdit);
    this.setUpdateEmployeeSwitch();
    form.reset();
  }

  setUpdateDataSwitch() {
    this.updateDataSwitch = true;
    this.updatedDataEmitter.emit(this.updateDataSwitch);
  }

  setUpdateEmployeeSwitch() {
    this.updateEmployeeSwitch = false;
    this.updateEmployeeEmitter.emit(this.updateEmployeeSwitch);
  }
}
