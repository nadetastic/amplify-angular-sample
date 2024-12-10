import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { events, EventsChannel } from 'aws-amplify/data';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

const latestConfig = Amplify.getConfig();

Amplify.configure({
  ...latestConfig,
  API: {
    ...latestConfig.API,
    Events: {
      endpoint: outputs.custom.eventEndpoint,
      apiKey: outputs.custom.eventApiKey,
      defaultAuthMode: 'apiKey',
    },
  },
});

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent],
})
export class AppComponent {
  title = 'amplify-angular-template';

  channel: EventsChannel | undefined;

  async connectAndSubscribe() {
    this.channel = await events.connect('default/channel');

    this.channel.subscribe({
      next: (data) => {
        console.log('received', data);
      },
      error: (err) => console.error('error', err),
    });
  }
}
