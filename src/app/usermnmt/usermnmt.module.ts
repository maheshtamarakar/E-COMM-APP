import { NgModule } from '@angular/core';

import { UsermnmtRoutingModule } from './usermnmt-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserAuthComponent } from './user-auth/user-auth.component';


@NgModule({
  declarations: [
    UserAuthComponent
  ],
  imports: [
    UsermnmtRoutingModule,
    SharedModule
  ]
})
export class UsermnmtModule { }
