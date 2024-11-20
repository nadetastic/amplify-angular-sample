import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { CfnApi } from 'aws-cdk-lib/aws-appsync';

defineBackend({
  auth,
  data,
});
