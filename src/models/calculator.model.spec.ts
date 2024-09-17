
import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

describe('CalculatorModel', (): void => {

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {

    const calculator: ICalculatorModel = new CalculatorModel();

    expect(calculator).toBeDefined();

  });

});
