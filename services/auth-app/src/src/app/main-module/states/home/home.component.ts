import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Component( { 
    templateUrl: './home.html',
    styleUrls: ['./home.css'] 
})
export class Home 
{
    //#region Properties

    // users : Array<User>;

    // displayedColumns = ['select', 'name', 'password'];
    // dataSource = new MatTableDataSource<User>();
    // selection = new SelectionModel<User>(true, []);

    //showFiller = false;

    //#region Methods

    //constructor ( ) {}

    // loadUsers() : void
    // {
    //     // this.entityResource.getCollection<User>(User.prototype.entityInfo).subscribe( usersRetrived => { 
            
    //     //     this.dataSource.data = usersRetrived;

    //     // });

    //     var u1 = new User();
    //     u1._id = '1';
    //     u1.name = 'user 1';
    //     u1.password = 'pass 1';

    //     var u2 = new User();
    //     u2._id = '2';
    //     u2.name = 'user 2';
    //     u2.password = 'pass 2';

    //     var u3 = new User();
    //     u3._id = '3';
    //     u3.name = 'user 3';
    //     u3.password = 'pass 3';
    
    //     this.dataSource.data = [u1, u2, u3];
    // }

    // isAllSelected() {
    //     const numSelected = this.selection.selected.length;
    //     const numRows = this.dataSource.data.length;
    //     return numSelected === numRows;
    // }
    
    // masterToggle() {
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.dataSource.data.forEach(row => this.selection.select(row));
    // }    

    //#endregion

    //#region Accessors

    //#endregion



    mobileQuery: MediaQueryList;
    
      
      private _mobileQueryListener: () => void;
    
      constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
      }
    
      ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
      }
    
      shouldRun = true;

}
