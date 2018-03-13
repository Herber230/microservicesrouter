import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule } from '@angular/material'; 
const matModules = [  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule ];

import { Home } from './states/home/home.component';
import { Login } from './states/login/login.component';
import { Signin } from './states/signin/signin.component';
import { Dashboard } from './states/home/dashboard/dashboard.component';

import { UserEdit } from './components/user-edit/user-edit.component';
import { UserList } from './components/user-list/user-list.component';
import { PermissionEdit } from './components/permission-edit/permission-edit.component';
import { PermissionList } from './components/permission-list/permission-list.component';
import { ModuleEdit } from './components/module-edit/module-edit.component';
import { ModuleList } from './components/module-list/module-list.component';



@NgModule({
  imports: [
    FormsModule,
    LayoutModule,
    FlexLayoutModule,
    CommonModule,
    MainRoutingModule,
    matModules
  ],
  declarations: [ Home, Login, Signin, UserEdit, UserList, PermissionEdit, PermissionList, ModuleEdit, ModuleList, Dashboard ]
})

export class MainModule { }
