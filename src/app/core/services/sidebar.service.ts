import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

	private readonly MILISECONDS_TO_RESPONSE = 0;

	private readonly menu: any[] = [
		{
			path: '/admin',
			icon: 'bx bx-grid-alt',
			linkName: 'Dashboard',
		},
		{
			icon: 'bx bx-home-smile',
			linkName: 'Propiedades',
			submenu: [
				{ title: 'Listado', path: '/admin/propiedades' },
				{ title: 'Propietarios', path: '/admin/propietarios' },
				{ title: 'Barrios', path: '/admin/barrios' },
				{ title: 'Categorías', path: '/admin/propiedad-categorias' }
			]
		}
	];

    read(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.menu);
                observer.complete();
            }, this.MILISECONDS_TO_RESPONSE)
        });
    }

	constructor() {}
}
