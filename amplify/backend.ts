import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { createEventApi } from './event/resource';

const backend = defineBackend({
  auth,
  data,
});

const { eventAPI, eventApiKey } = createEventApi({
  stack: backend.stack,
  props: {
    name: 'CricketEvents',
  },
});

backend.addOutput({
  custom: {
    eventAPIEndpoint: eventAPI.attrDnsHttp,
    eventApiKey,
  },
});
