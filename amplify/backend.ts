import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { CfnApi, CfnApiKey } from 'aws-cdk-lib/aws-appsync';

const backend = defineBackend({
  auth,
  data,
});

const eventAPI = new CfnApi(backend.stack, 'CLGEventAPI', {
  name: 'CricketEvents',
  eventConfig: {
    authProviders: [
      {
        authType: 'API_KEY',
      },
      {
        authType: 'AWS_IAM',
      },
    ],
    connectionAuthModes: [
      {
        authType: 'AWS_IAM',
      },
      {
        authType: 'API_KEY',
      },
    ],
    defaultPublishAuthModes: [
      {
        authType: 'AWS_IAM',
      },
    ],
    defaultSubscribeAuthModes: [
      {
        authType: 'API_KEY',
      },
    ],
  },
});

const eventApiKey = new CfnApiKey(backend.stack, 'CLGEventAPIKey', {
  apiId: eventAPI.attrApiId,
});

backend.addOutput({
  custom: {
    eventEndpoint: `https://${eventAPI.attrDnsHttp}/event`,
    eventApiKey: eventApiKey.attrApiKey,
  },
});
