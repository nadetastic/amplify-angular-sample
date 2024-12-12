import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

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
}

// npx ampx generate graphql-client-code --app-id d86ff4rs16sgr	--branch main
