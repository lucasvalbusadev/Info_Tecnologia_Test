import { v4 as uuidv4, validate } from 'uuid';
import { generateErrorMessage } from '../../errors/handlers/generate-error';
import {
  defaultDictionaryErrors,
  DefaultErrorsCode,
} from '../../errors/dictionaries/dictionary-default-errors';

export class Uuid {
  readonly id: string;
  private field: string;

  constructor(id?: string, field?: string) {
    this.id = id || uuidv4();
    this.field = field || '';
    this.validate();
  }

  private validate() {
    if (!validate(this.id)) {
      generateErrorMessage(
        DefaultErrorsCode.INVALID_UUID,
        defaultDictionaryErrors,
        {
          field: this.id,
        },
      );
    }
  }
}
