import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { FrontSession, FrontSessionConfig } from './services/front-session.service';
import { EntityResource } from './services/entity-resource.service';

@NgModule({
  imports: [ ],
  declarations: [],
  providers: [ FrontSession, EntityResource ]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule)
      throw new Error('Attemp to duplicate the load of CoreModule' );
  }

  static forRoot( config : FrontSessionConfig ) : ModuleWithProviders
  {
    return {
      ngModule: CoreModule,
      providers: [ { provide: FrontSessionConfig, useValue: config }]
    };
  }

 }
