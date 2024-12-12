import { Stack } from 'aws-cdk-lib';
import { CfnApi, CfnApiKey } from 'aws-cdk-lib/aws-appsync';

interface CreateEventAPIProps {
  stack: Stack;
  props: {
    name: string;
  };
}

export const createEventApi = ({ stack, props }: CreateEventAPIProps) => {
  const eventAPI = new CfnApi(stack, 'CLGEventAPI', {
    name: props.name,
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

  const eventApiKey = new CfnApiKey(stack, 'CLGEventAPIKey', {
    apiId: eventAPI.attrApiId,
  });

  return {
    eventAPI,
    eventApiKey,
  };
};
