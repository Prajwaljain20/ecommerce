import { Component } from '@angular/core';
import { ConnectionService } from 'angular-connection-service';
import { ErrorHandlingService } from './services/error-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  count = 0;

  constructor(
    private connectionService: ConnectionService,
    private notify: ErrorHandlingService
  ) {
    this.connectionService.monitor().subscribe((currentState) => {
      this.count++;
      if (currentState.hasNetworkConnection && currentState.hasInternetAccess) {
      } else {
        this.count > 1
          ? this.notify.showError('Please connect to internet', 'Offline')
          : {};
      }
    });
  }
}
