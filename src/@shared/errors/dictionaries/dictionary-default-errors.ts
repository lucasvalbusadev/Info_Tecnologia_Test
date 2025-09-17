import { ErrorObject } from './dictionary-types';

export enum DefaultErrorsCode {
  INVALID_UUID = 'FLEET-MANAGER-00001',
}

export const defaultDictionaryErrors: Record<DefaultErrorsCode, ErrorObject> = {
  [DefaultErrorsCode.INVALID_UUID]: {
    status: '400',
    statusCode: 400,
    code: DefaultErrorsCode.INVALID_UUID,
    title: 'Invalid UUID',
    detail: 'The UUID provided is invalid.',
    source: {
      path: 'uuid-vo',
    },
    meta: {
      reason: 'The UUID provided is invalid.',
    },
    action: 'Check the UUID provided',
    children: [],
  },
};
