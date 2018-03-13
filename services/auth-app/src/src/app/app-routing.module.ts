
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './main-module/states/home/home.component';
import { Login } from './main-module/states/login/login.component';
import { Signin } from './main-module/states/signin/signin.component';

import { UserEdit } from './main-module/components/user-edit/user-edit.component';
import { UserList } from './main-module/components/user-list/user-list.component';
import { patch } from 'webdriver-js-extender';

const routes : Routes = [
    { path: 'login', component: Login },
    { path: 'signin', component: Signin },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}