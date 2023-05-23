import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { connectFirestoreEmulator, getFirestore, provideFirestore, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { UserQueueComponent } from './user-queue/user-queue.component';
import { AdminQueueComponent } from './admin/admin-queue/admin-queue.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './admin/home/home.component';
import { AdminService } from 'src/services/admin.service';
import { RSVPService } from 'src/services/rsvp.service';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>(resolve => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    UserQueueComponent,
    AdminQueueComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      // if (environment.production == false) {
      //     connectFirestoreEmulator(firestore, 'localhost', 8080);
      // }
      enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestore;
    }),
    provideAuth(() => getAuth()),
  ],
  providers: [DatePipe, RSVPService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
