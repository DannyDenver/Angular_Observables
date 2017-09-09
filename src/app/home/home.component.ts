import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumber = Observable.interval(1000);   /// creating new observable, wait every second
    this.numbersObsSubscription = myNumber.subscribe( 
      (number: number) => {
        console.log(number); // memory leak 
      } 
    ); 
      const myObservable = Observable.create((observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package')}, //pushes next data package
          2000);
           setTimeout(() => {
          observer.next('second package')}, 
          4000);
           setTimeout(() => {
          //observer.error('this does not work!')}, 
          observer.complete()},
          5000);
          setTimeout(() => {
          observer.next('third package')}, 
          6000);
      }); 
      this.customObsSubscription = myObservable.subscribe(
      (data: string) => {console.log(data)},
      (error: string) => {console.log(error)},
      () => { console.log('completed'); }
    )
  }

  ngOnDestroy(){
      this.numbersObsSubscription.unsubscribe(); // prevents memory leak 
      this.customObsSubscription.unsubscribe(); 
  }

}
