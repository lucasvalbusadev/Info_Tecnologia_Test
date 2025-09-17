import { ErrorObject } from '../dictionaries/dictionary-types';
import { handleErrorMessage } from './app-error.error';

export function generateErrorMessage<T = any>(
  code: string,
  errorsSchema: Record<string, ErrorObject>,
  meta?: T,
  path?: string,
) {
  const error = errorsSchema[code];

  if (error && error.source && error.source.path) {
    error.source.path = path ?? error.source.path;
  }

  if (error.meta) {
    for (const key in meta) {
      error.meta[key] = meta[key];
    }
  }

  return handleErrorMessage(error);
}
