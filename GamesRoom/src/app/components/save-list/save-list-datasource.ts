import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatButton } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SaveGamesService } from 'src/app/shared/services/save-games-service/save-games.service';

// TODO: Replace this with your own data model type
export interface SaveListItem { 
  id: string;
  nivel:string;
  name: string;
  keyEliminar: string;
  player1: string;
  player2: string;
 
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: SaveListItem[] = [
  { id: "1", nivel:"0", name: 'Hydrogen', "keyEliminar":"4", player1: 'Daniel', player2: 'Royland' },
];

/**
 * Data source for the SaveList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SaveListDataSource extends DataSource<SaveListItem> {
  data: SaveListItem[] = EXAMPLE_DATA;
  

  constructor(private paginator: MatPaginator, private sort: MatSort,public gamesSaved: SaveGamesService,
    public authService: AuthService) { 
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SaveListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
 
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SaveListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SaveListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'player1':
          return compare(+a.player1, +b.player1, isAsc);
        case 'player2':
          return compare(+a.player2, +b.player2, isAsc);
        default:
          return 0;
      }
    });
  }

  // setNewTable(){
  //   var jugador= this.authService.userData.uid;
  //   var nombre = this.authService.userData.displayName;
  //   this.gamesSaved.getPartidasGuardadas(jugador, nombre).subscribe(
  //     data => {
  //        var resultado: SaveListItem[];
  //        resultado= data  
  //        this.data= resultado
  //     },
  //     error => {
  //       console.log('error de consulta ' + error);
  //     }
  //   );
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
