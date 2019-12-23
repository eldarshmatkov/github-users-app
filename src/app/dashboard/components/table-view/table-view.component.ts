import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  url: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', url: 'H'},
  {position: 2, name: 'Helium', url: 'He'},
  {position: 3, name: 'Lithium', url: 'Li'},
  {position: 4, name: 'Beryllium', url: 'Be'},
  {position: 5, name: 'Boron', url: 'B'},
  {position: 6, name: 'Carbon', url: 'C'},
  {position: 7, name: 'Nitrogen', url: 'N'},
  {position: 8, name: 'Oxygen', url: 'O'},
  {position: 9, name: 'Fluorine', url: 'F'},
  {position: 10, name: 'Neon', url: 'Ne'},
];

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'url'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
