// import { Component, OnInit } from '@angular/core';
// import { ExampleService } from './services/example.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit {
//   constructor(private service: ExampleService) {}
//   title = 'my-app';
//   name = '';

//   // ngOnInit() {

//   // }

//   async ngOnInit(): Promise<void> {
//     const doc$ = await this.service.getUserEventSummary();

//     doc$.subscribe((data) => {
//       var sd = JSON.parse(JSON.stringify(data.data()));

//       this.name = sd.name;
//       console.log('resul', sd);
//     });
//   }
// }

import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Admin, Setting, User } from "src/models/rsvp.model";
// import { MatSidenav } from "@angular/material";
import { environment } from "../environments/environment";
import { RSVPService } from "../services/rsvp.service";
import { interval } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "rsvp-web";
  isLoading: boolean = false;
  isAdminPage: boolean = false;
  isAdminLoggedIn: boolean = false;
  admin: Admin;
  setting: Setting;

  isEventPage: boolean = false;
  user: User;
  isUserLoggedIn: boolean = false;

  // @ViewChild("sidenav", { static: false }) sidenav: MatSidenav;

  constructor(
    public router: Router,
    private rsvpService: RSVPService,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.location.path().startsWith("/admin", 0)) {
      this.isAdminPage = true;
    } else {
      this.isAdminPage = false;
    }

    if (this.isAdminPage) {
      this.admin = JSON.parse(sessionStorage.getItem("admintoken"));
      if (this.admin == null) {
        this.isAdminLoggedIn = false;
        this.router.navigate(["/admin/login"]);
      } else {
        this.isAdminLoggedIn = true;
      }
    }

    // console.log(this.location.path());

    if (this.location.path().startsWith("/event", 0)) {
      this.isEventPage = true;
    } else {
      this.isEventPage = false;
    }

    // console.log(this.isEventPage);

    if (this.isEventPage) {
      this.user = JSON.parse(sessionStorage.getItem("usertoken"));

      // console.log(this.isEventPage);
      // console.log(this.user);

      if (this.user == null) {
        this.isUserLoggedIn = false;
        this.router.navigate(["/login"]);
      } else {
        this.isUserLoggedIn = true;
      }

      // this.rsvpService.getSetting("setting").subscribe(
      //   (data) => {
      //     // setTimeout(() => (this.isLoading = false), 0);
      //     this.setting = data;
      //     console.log(this.setting);
      //   },
      //   (err) => {
      //     // setTimeout(() => (this.isLoading = false), 0);
      //     alert(err.error);
      //   }
      // );
    }
  }

  logoutuser() {
    let cfm = confirm("Are you sure you want to log out?");

    if (cfm) {
      if (sessionStorage.getItem("usertoken") !== null) {
        sessionStorage.clear();
        this.isUserLoggedIn = false;
        this.router.navigate(["login"]);
      }
    }
  }

  logoutadmin() {
    let cfm = confirm("Are you sure you want to log out?");

    if (cfm) {
      if (sessionStorage.getItem("admintoken") !== null) {
        sessionStorage.clear();
        this.isAdminLoggedIn = false;
        this.router.navigate(["admin/login"]);
      }
    }
  }
}

