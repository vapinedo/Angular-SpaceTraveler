import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { Aeronave } from '@core/interfaces/aeronave.interface';
import { AeronaveService } from 'src/app/core/services/aeronave.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public aeronaves: Aeronave[] = [];
  public showSpinner: boolean = false;

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}