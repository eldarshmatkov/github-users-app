import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-show-records',
  templateUrl: './show-records.component.html',
  styleUrls: ['./show-records.component.scss']
})
export class ShowRecordsComponent implements OnInit {
  usersPerPage = 10;
  @Output() usersPerPageChange = new EventEmitter<number>();
  usersPerPageOptions: number[] = [10, 20, 40, 80];

  constructor() { }

  ngOnInit() {
    this.usersPerPageChange.emit(this.usersPerPage);
  }

  setUserPerPage($event) {
    this.usersPerPageChange.emit($event);
  }
}
