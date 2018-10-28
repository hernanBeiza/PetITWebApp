import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UsuarioLocalDBService } from './services/UsuarioLocalDB.service';
import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  public subscription: Subscription;

	constructor(public router: Router,
    private UsuarioLocalDBService:UsuarioLocalDBService,
    private MzToastService:MzToastService) {
		//console.log("AppComponent");
	}

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event:Event) => {      
  		if(event instanceof NavigationEnd){

        if(this.UsuarioLocalDBService.obtenerLocal()==null 
          && this.router.url!="/login" 
          && this.router.url!="/recuperar"){
          console.warn("No existe usuario, ir al login");

          let segundos = 1;
          setTimeout(()=> { 
            console.info("Enviando al login...");
            this.router.navigate(["/login"]);
            //this.myFunc();
          }, segundos * 1000);
        }          

      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
