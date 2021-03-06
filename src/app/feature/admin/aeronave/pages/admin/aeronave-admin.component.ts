import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Aeronave } from '@core/interfaces/aeronave.interface';
import { MessageService } from '@core/services/message.service';
import { AeronaveService } from 'src/app/core/services/aeronave.service';

@Component({
  selector: 'app-aeronave-admin',
  templateUrl: './aeronave-admin.component.html',
  styleUrls: ['./aeronave-admin.component.scss']
})
export class AeronaveAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public aeronaves: Aeronave[] = [];
  public showSpinner: boolean = false;
  public title = 'Listado de Aeronaves';

  constructor(
    private messageSvc: MessageService,
    private aeronaveSvc: AeronaveService
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.subscriptions.add(
      this.aeronaveSvc.read()
        .subscribe({
          next: data => {
            this.aeronaves = data;
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
            this.aeronaveSvc.delete(id) 
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