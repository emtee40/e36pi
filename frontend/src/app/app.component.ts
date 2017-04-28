import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e36pi-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
	constructor(private router: Router) {
	  		/*router.events.subscribe((event: any) => {
				if (this.loginService.isLoggedIn && event.url === '/') {
				} else if (this.loginService.isLoggedIn && (event.url === '/login' || event.url === '/login/forgot')) {
					this.router.navigate(['/dashboard']);
				} else if (!this.loginService.isLoggedIn && event.url !== '/login' && event.url !== '/login/forgot') {
					this.router.navigate(['/login']);
				}
			});*/
		}
};
