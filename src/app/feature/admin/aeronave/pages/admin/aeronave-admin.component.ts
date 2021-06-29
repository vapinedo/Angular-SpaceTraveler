import { SubSink } from 'subsink';
import { MessageService } from '@core/services/message.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AeronaveService } from 'src/app/core/services/aeronave.service';

@Component({
  selector: 'app-aeronave-admin',
  templateUrl: './aeronave-admin.component.html',
  styleUrls: ['./aeronave-admin.component.scss']
})
export class AeronaveAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public dataSource: any;
  public title = 'Listado de Aeronaves';

  constructor(
    private messageSvc: MessageService,
    private _aeronaveSvc: AeronaveService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this._aeronaveSvc.read()
        .subscribe({
          next: data => {
            this.dataSource = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  onDelete(id: string): void {
    this.messageSvc.confirm()
      .then((result) => {
        if (result.isConfirmed) {
          this._aeronaveSvc.delete(id) 
            .then(() => {
              this.messageSvc.success()
            })
            .catch(err => this.messageSvc.error(err))
        }
      })
      .catch(error => this.messageSvc.error(error));
  }
      
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}