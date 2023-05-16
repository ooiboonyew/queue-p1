// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'new_app';
// }

import { Component, OnInit } from '@angular/core';
import { ExampleService } from './services/example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private service: ExampleService) {}
  title = 'my-app';
  name = '';

  // ngOnInit() {

  // }

  async ngOnInit(): Promise<void> {
    const doc$ = await this.service.getUserEventSummary();

    doc$.subscribe((data) => {
      var sd = JSON.parse(JSON.stringify(data.data()));

      this.name = sd.name;
      console.log('resul', sd);
    });
  }
}
