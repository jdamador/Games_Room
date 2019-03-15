import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SaveListDataSource } from './save-list-datasource';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.css']
})
export class SaveListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SaveListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'player1', 'player2', 'delete', 'charge'];

  ngOnInit() {
    this.dataSource = new SaveListDataSource(this.paginator, this.sort);
  }
}
