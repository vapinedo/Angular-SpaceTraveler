import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Aeronave } from '@core/interfaces/aeronave.interface';
import { AeronaveService } from '@core/services/aeronave.service';

@Component({
  selector: 'app-aeronave-detail',
  templateUrl: './aeronave-detail.component.html',
  styleUrls: ['./aeronave-detail.component.scss']
})
export class AeronaveDetailComponent implements OnInit {

  public title = 'Aeronave Detalles';
  public aeronave$!: Observable<Aeronave | undefined>;

  constructor(
    private aeronaveSvc: AeronaveService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.aeronave$ = this.aeronaveSvc.readOne(id);
  }
}