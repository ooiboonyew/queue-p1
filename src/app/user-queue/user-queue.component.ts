import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RSVPService } from "../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { RSVP, User } from "src/models/rsvp.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-queue',
  templateUrl: './user-queue.component.html',
  styleUrls: ['./user-queue.component.css'],
})
export class UserQueueComponent implements OnInit {
  // currentQueue: string = 'F001';
  // issuedQueue: string = 'F002';
  rsvp: RSVP;
  myQueue: RSVP;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.GetRunningQueue().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.rsvp = data;
        this.myQueue =  localStorage.getItem("myQueue") ? JSON.parse(localStorage.getItem("myQueue")) : {};

      },
      (err) => {
        var errorstr = JSON.stringify(err.error);
        console.log(err.error);
        alert(errorstr.replace(new RegExp('"', "g"), ""));
        setTimeout(() => (this.appComponent.isLoading = false), 0);
      }
    );
  }

  refresh(){
    this.ngOnInit();
  }

  AddQueue(){
    this.appComponent.isLoading = true;
    this.rSVPService.AddIssuedQueue().subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        // alert("Check-in Successfully.");
        console.log(data);
        this.myQueue = data;
        localStorage.setItem("myQueue",JSON.stringify(data));
      },
      (err) => {
        var errorstr = JSON.stringify(err.error);
        console.log(err.error);
        alert(errorstr.replace(new RegExp('"', "g"), ""));
        this.appComponent.isLoading = false;
      }
    );

  }
}
