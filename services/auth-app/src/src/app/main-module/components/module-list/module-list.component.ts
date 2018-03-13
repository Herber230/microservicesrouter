import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { EntityResource } from '../../../core-module/services/entity-resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Module } from '../../entities/module';

@Component({
    templateUrl: './module-list.html',
    styleUrls: ['./module-list.css'],
    selector: 'module-list'
})
class ModuleList
{
    //#region Properties

    modules : Array<Module>;

    displayedColumns = ['select', 'name', 'displayName', 'url'];
    dataSource = new MatTableDataSource<Module>();
    selection = new SelectionModel<Module>(true, []);


    //#endregion


    //#region Methods

    constructor(private entityResource : EntityResource, private router : Router) { }

    ngOnInit(): void
    {
        this.loadEntities();
    }

    loadEntities() : void
    {
        this.entityResource.getCollection<Module>(Module.prototype.entityInfo).subscribe( 
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
        this.router.navigate(['home/module', -1]);
    }

    edit() : void
    {
        this.router.navigate(['home/module', this.selection.selected[0].id]);
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

export { ModuleList }
