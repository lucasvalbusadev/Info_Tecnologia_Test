import { ErrorObject } from '../dictionaries/dictionary-types';
import { ExceptionError } from '../exceptions/exception.error';

// prettier-ignore
export const handleErrorMessage = (errorData: ErrorObject) => {
  const {
    code,
    detail,
    status,
    statusCode,
    title,
    action,
    children,
    meta,
    source,
    resolution,
  } = errorData;
  throw new ExceptionError(
    code,
    title,
    detail,
    status,
    statusCode,
    meta,
    action,
    source,
    children,
    resolution,
  );
};
