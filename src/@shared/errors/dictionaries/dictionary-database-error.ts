import { ErrorObject } from './dictionary-types';

export enum DefaultDatabaseErrorCode {
  DB_NOT_FOUND_SCHEMA = 'FLEET-MANAGER-00010',
  DB_INVALID_ARGUMENT = 'FLEET-MANAGER-00011',
  DB_CANNOT_INSERT = 'FLEET-MANAGER-00012',
  DB_CANNOT_UPDATE = 'FLEET-MANAGER-00013',
  DB_INTERNAL_ERROR = 'FLEET-MANAGER-00014',
}

export const databaseDictionaryErrors: Record<
  DefaultDatabaseErrorCode,
  ErrorObject
> = {
  [DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA]: {
    status: '404',
    statusCode: 404,
    code: DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
    title: 'Schema not found',
    detail: 'The schema requested was not found.',
    source: {
      path: '',
    },
    meta: {
      reason: 'The schema requested was not found.',
    },
    action: 'Check the data or id provided',
    children: [],
  },
  [DefaultDatabaseErrorCode.DB_INVALID_ARGUMENT]: {
    status: '400',
    statusCode: 400,
    code: DefaultDatabaseErrorCode.DB_INVALID_ARGUMENT,
    title: 'Invalid argument',
    detail: 'The argument provided is invalid.',
    source: {
      path: '',
    },
    meta: {
      reason: 'The argument provided is invalid.',
    },
    action: 'Check the argument provided',
    children: [],
  },
  [DefaultDatabaseErrorCode.DB_CANNOT_INSERT]: {
    status: '500',
    statusCode: 500,
    code: DefaultDatabaseErrorCode.DB_CANNOT_INSERT,
    title: 'Cannot insert',
    detail: 'Cannot insert the entity in the database.',
    source: {
      path: '',
    },
    meta: {
      reason: 'Cannot insert the entity in the database.',
    },
    action: 'Check the entity provided',
    children: [],
  },
  [DefaultDatabaseErrorCode.DB_CANNOT_UPDATE]: {
    status: '500',
    statusCode: 500,
    code: DefaultDatabaseErrorCode.DB_CANNOT_UPDATE,
    title: 'Cannot update',
    detail: 'Cannot update the entity in the database.',
    source: {
      path: '',
    },
    meta: {
      reason: 'Cannot update the entity in the database.',
    },
    action: 'Check the entity provided',
    children: [],
  },
  [DefaultDatabaseErrorCode.DB_INTERNAL_ERROR]: {
    status: '500',
    statusCode: 500,
    code: DefaultDatabaseErrorCode.DB_INTERNAL_ERROR,
    title: 'Internal error',
    detail: 'An internal error occurred.',
    source: {
      path: '',
    },
    meta: {
      reason: 'An internal error occurred.',
    },
    action: 'Check the logs',
    children: [],
  },
};
