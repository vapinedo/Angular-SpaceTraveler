import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { SidebarService } from './services/sidebar.service';
import { AeronaveService } from './services/aeronave.service';
import { DatetimeService } from './services/datetime.service';
import { ValidatorsService } from './services/validators.service';
import { FileuploaderService } from './services/fileuploader.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageService,
    SidebarService,
    DatetimeService,
    AeronaveService,
    ValidatorsService,
    FileuploaderService
  ]
})
export class CoreModule { }
