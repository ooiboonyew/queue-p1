import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { RSVP, User } from "src/models/rsvp.model";
import { Router } from "@angular/router";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-queue',
  templateUrl: './admin-queue.component.html',
  styleUrls: ['./admin-queue.component.css']
})
export class AdminQueueComponent implements OnInit {
  rsvp: RSVP;

  counter(i: number) {
    return new Array(i);
}

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
    this.rSVPService.AddRunningQueue().subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.ngOnInit();
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
