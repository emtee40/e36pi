import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { AppService }  from './app.service';
import { routing } from './app.routing';

@NgModule({
  imports:      [
		BrowserModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		BrowserAnimationsModule,
		routing
	],
  declarations: [
		AppComponent,
	],
	providers: [
		AppService,
		/*{
			provide: APP_INITIALIZER,
			useFactory: setup,
			deps: [LoginService, DevicesService],
			multi: true,
		}*/
	],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
