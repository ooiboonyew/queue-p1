import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./admin/login/login.component";
import { HomeComponent } from "./admin/home/home.component";
import { AdminQueueComponent } from "./admin/admin-queue/admin-queue.component";
import { UserQueueComponent } from "./user-queue/user-queue.component";

const routes: Routes = [
  // { path: 'checkin', component: GuestCheckinComponent },
  // { path: 'checkedin', component: GuestCheckedinComponent },
  // { path: 'admin', component: LoginComponent },
    { path: '', component: UserQueueComponent },
  { path: "admin/login", component: LoginComponent },
  { path: "admin/queue", component: AdminQueueComponent },
  { path: "admin", component: HomeComponent },
  // { path: 'admin/booth-setup', component: BoothSetupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
