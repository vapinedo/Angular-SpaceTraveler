import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { MessageService } from './services/message.service';
import { AeronaveService } from './services/aeronave.service';
import { AlquilerService } from './services/alquiler.service';
import { DatetimeService } from './services/datetime.service';
import { ValidatorsService } from './services/validators.service';
import { FileuploaderService } from './services/fileuploader.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthService,
    StorageService,
    MessageService,
    DatetimeService,
    AlquilerService,
    AeronaveService,
    ValidatorsService,
    FileuploaderService
  ]
})
export class CoreModule { }
