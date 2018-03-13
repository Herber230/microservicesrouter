import { Component, OnInit } from '@angular/core';

import { EntityResource } from '../../../core-module/services/entity-resource.service';
import { User } from '../../entities/user';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
    templateUrl: './user-list.html',
    styleUrls: ['./user-list.css'],
    selector: 'user-list',
    providers: [ EntityResource ]
})
class UserList implements OnInit
{
    //#region Properties

    users : Array<User>;

    displayedColumns = ['select', 'name', 'password'];
    dataSource = new MatTableDataSource<User>();
    selection = new SelectionModel<User>(true, []);


    //#endregion


    //#region Methods

    constructor(private entityResource : EntityResource, private router : Router) { }

    ngOnInit(): void
    {
        this.loadEntities();
    }

    loadEntities() : void
    {
        this.entityResource.getCollection<User>(User.prototype.entityInfo).subscribe( 
            results => this.dataSource.data = results
        );
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    
    masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }    

    canAdd() : boolean
    {
        return this.selection.isEmpty();
    }

    canDelete() : boolean
    {
        return !this.selection.isEmpty();
    }

    canEdit() : boolean
    {
        return this.selection.selected.length == 1;
    }

    add() : void
    {
        this.router.navigate(['home/user', -1]);
    }

    edit() : void
    {
        this.router.navigate(['home/user', this.selection.selected[0].id]);
    }

    delete() : void
    {
        let totalDeletions = this.selection.selected.length;
        let count = 0;
        this.selection.selected.forEach( u => u.delete().subscribe ( () => { 
            count++;
            if (count >= totalDeletions)
            {
                this.selection.clear();
                this.loadEntities();
            }
         }))
    }





    //#endregion


    //#region Accessors

    //#endregion
}

export { UserList }