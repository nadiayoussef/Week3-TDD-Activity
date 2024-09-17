
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {

  public pressNumericKey(key: NumericKeys): void {
    throw new Error('Method not implemented.');
  }

  public pressOperatorKey(key: OperatorKeys): void {
    throw new Error('Method not implemented.');
  }

  public pressActionKey(key: ActionKeys): void {
    throw new Error('Method not implemented.');
  }

  public display(): string {
    throw new Error('Method not implemented.');
  }

}
