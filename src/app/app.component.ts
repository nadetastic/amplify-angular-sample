import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';
import * as queries from '../graphql/queries';

Amplify.configure(outputs);

const latestConfig = Amplify.getConfig();

Amplify.configure({
  ...latestConfig,
  API: {
    ...latestConfig.API,
    Events: {
      endpoint: '',
      apiKey: '',
      defaultAuthMode: 'apiKey',
    },
  },
});

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, TodosComponent],
})
export class AppComponent {
  title = 'amplify-angular-template';
  client: ReturnType<typeof generateClient> = generateClient();

  async getAll() {
    await this.client.graphql({
      query: queries.listTodos,
      authMode: 'userPool',
    });
  }
}
