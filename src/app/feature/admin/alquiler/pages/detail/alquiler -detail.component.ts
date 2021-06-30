import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-alquiler-detail',
  templateUrl: './alquiler-detail.component.html',
  styleUrls: ['./alquiler-detail.component.scss']
})
export class AlquilerDetailComponent implements OnInit {

  public title = 'Usuario Detalles';
  public user$!: Observable<User | undefined>;

  constructor(
    private userSvc: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.user$ = this.userSvc.readOne(id);
  }
}