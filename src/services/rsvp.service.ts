import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../models/api.response";
import { environment } from "../environments/environment";
import { RSVP, Summary, User, Setting } from "../models/rsvp.model";

@Injectable()
export class RSVPService {
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.Service_URL + "/rsvp";

  AddRunningQueue(): Observable<RSVP> {
    return this.http.post<RSVP>(this.baseUrl + "/AddRunningQueue",{});
  }

  AddIssuedQueue(): Observable<RSVP> {
    return this.http.post<RSVP>(this.baseUrl + "/AddIssuedQueue",{});
  }

  GetRunningQueue(): Observable<RSVP> {
    return this.http.get<RSVP>(this.baseUrl + "/GetQueue/");
  }

  // GetIssuedQueue(): Observable<string> {
  //   return this.http.get<string>(this.baseUrl + "/GetIssuedQueue/");
  // }

  printRSVP(id: string): Observable<RSVP> {
    return this.http.get<RSVP>(this.baseUrl + "/printRSVP/" + id);
  }

  getSetting(id: string): Observable<Setting> {
    return this.http.get<Setting>(this.baseUrl + "/getSetting/" + id);
  }

  AddRSVP(rsvp: RSVP): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Add", rsvp);
  }

  GetRsvp(id: string): Observable<RSVP> {
    return this.http.get<RSVP>(this.baseUrl + "/getrsvp/" + id);
  }

  UpdateRSVP(rsvp: RSVP): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Update", rsvp);
  }

  EmailRSVP(id: string): Observable<{}> {
    return this.http.get<ApiResponse>(this.baseUrl + "/email/" + id);
  }

  FilterUsers(filtertType, filterText): Observable<[]> {
    return this.http.get<[]>(
      this.baseUrl + "/filterUsers/" + filtertType + "/" + filterText
    );
  }
  

  listRSVP(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/listRSVP");
  }

  Getuser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/getuser/" + id);
  }

  GetRSVPByQR(qr: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/GetRSVPByQR/" + qr);
  }

  CheckIn(rsvp: RSVP): Observable<RSVP> {
    return this.http.post<RSVP>(this.baseUrl + "/checkin", rsvp);
  }

  ImportRSVP(formdata: FormData): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + '/Import', formdata);
  }

  Summary(): Observable<Summary> {
    return this.http.get<Summary>(this.baseUrl + "/summary");
  }




  // UpdateRSVP(rsvp: RSVP): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.baseUrl + '/Update', rsvp);
  // }
}
