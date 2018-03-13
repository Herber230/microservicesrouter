
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './states/home/home.component';
import { UserEdit } from './components/user-edit/user-edit.component';
import { UserList } from './components/user-list/user-list.component';
import { PermissionEdit } from './components/permission-edit/permission-edit.component';
import { PermissionList } from './components/permission-list/permission-list.component';
import { ModuleEdit } from './components/module-edit/module-edit.component';
import { ModuleList } from './components/module-list/module-list.component';
import { Dashboard } from './states/home/dashboard/dashboard.component';

const routes : Routes = [
    { 
        path: 'home', 
        component: Home, 
        children: [
            { path: '', component: Dashboard },
            { path: 'users', component: UserList},
            { path: 'user/:id', component: UserEdit },
            { path: 'permissions', component: PermissionList },
            { path: 'permission/:id', component: PermissionEdit },
            { path: 'modules', component: ModuleList },
            { path: 'module/:id', component: ModuleEdit }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule{}