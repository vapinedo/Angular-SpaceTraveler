import { SubSink } from 'subsink';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-alquiler-admin',
  templateUrl: './alquiler-admin.component.html',
  styleUrls: ['./alquiler-admin.component.scss']
})
export class AlquilerAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public users: User[] = [];
  public showSpinner: boolean = false;
  public title = 'Listado de Usuarios';

  constructor(
    private userSvc: UserService,
    private messageSvc: MessageService
  ) {}

  ngOnInit(): void {
    // this.showSpinner = true;
    this.subscriptions.add(
      this.userSvc.read()
        .subscribe({
          next: data => {
            this.users = data;
          },
          error: err => this.messageSvc.error(err),
          complete: () => this.showSpinner = false
        })
    );
  }

  onDelete(id: any): void {
    if(id) {
      this.messageSvc.confirm()
        .then((result) => {
          if (result.isConfirmed) {
            this.userSvc.delete(id) 
              .then(() => {
                this.messageSvc.success('Registro eliminado exitosamente')
              })
              .catch(err => this.messageSvc.error(err))
          }
        })
        .catch(error => this.messageSvc.error(error));
    }
    return;
  }
      
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}