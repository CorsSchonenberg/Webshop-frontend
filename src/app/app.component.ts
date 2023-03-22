import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  //to-do:
  //promocode in kunnen vullen bij betaling
  // promocodes veilig maken in backend en wellicht nieuwe manier
  // order updaten met een bedrag field zodat de promocode opgeslagen wordt
  constructor() {
  }
}
