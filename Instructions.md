# Week 3 TDD Class Activity: Implementing a basic Calculator

In this activity, you will implement the calculator you designed in previous classes using Test Driven Development. This activity is only designed to introduce you to TDD and demonstrate some key ideas behind it; we will cover testing in more detail (functional/black-box testing, structural/white-box testing, testing strategies) in subsequent lectures. Students are expected to work in pairs on this activity. Submission instructions can be found at the bottom of the document.

## Notes:
1. It takes months of practice to use TDD effectively in real world projects.
2. This activity is just a demonstration of TDD. You actual implementation might contain more complex data structures or patterns like stacks or state machines. The internals of the implementations as well as operators can vary significantly as long as the interface is respected. 
3. Use of `eval` and similar dynamic features is not allowed.

## Key Ideas

In this activity, we will follow 3 simple steps to implement Test Driven Development:
1. Write a test for some intended behavior.
   - Always start with simple things and then move on to complex cases once the simple cases have been exhausted.
2. Write the minimal amount of code to make the tests pass.
   - Drive tests and implementation in opposite directions: As the tests get more complex (specific), the solution should become more general. 
3. Refactor code to remove duplication/inefficiencies.

## Starter Code Overview

To enforce some consistency across implementations (and allow us to build on the same code in the next few activities), we have provided a scaffold.
The bulk of the implementation in this activity will be in 2 files, namely `src/models/calculator.model.ts` and `src/models/calculator.model.spec.ts`.
We have enforced high level constraints on the implementation through the `ICalculatorModel` interface at `src/interfaces/calculator-model.interface.ts`.
The interface requires the existence of 4 methods on the CalculatorModel as shown below:

```typescript
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';

export interface ICalculatorModel {
  // numeric key pressed <0, 1, 2, 3, 4, 5, 6, 7, 8, 9>
  pressNumericKey(key: NumericKeys): void;

  // operator key pressed <+, -, *, />
  pressOperatorKey(key: OperatorKeys): void;

  // action key pressed <C, =, .>
  pressActionKey(key: ActionKeys): void;

  // returns the contents of the calculator's display
  display(): string;

}

```

The interface assumes that there are handlers for 3 types of key presses: numeric (0 through 9), operators (+, -, *, /), actions (C, =, .).
Additionally, there is a display method which returns the current value on the calculator screen.
The values accepted by the different keys can be modified in `src/enums/*.enum.ts`

For simplicity, we have provided the class that implements this interface called CalculatorModel at `src/models/calculator.model.ts` as below:

```typescript
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
```

## Getting Started

To begin the TDD activity, run `npm install` in the root of the starter code (location where package.json is present).
Once the installation is complete, run the test commands `npm run test`. You should see the output as below:

```bash
> week-3-tdd-starter@1.0.0 test
> node scripts/jest.js

 PASS  src/models/calculator.model.spec.ts
  CalculatorModel
    ✓ should contain a CalculatorModel class that implements ICalculatorModel (7 ms)

 PASS  src/index.spec.ts
  week4-tdd
    CalculatorModel
      ✓ CalculatorModel exists (7 ms)

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.111 s
Ran all test suites.
```

As we can see, we have 2 passing tests. 
We have already done the first step of TDD for you (creating the class) `:)`
Let's do some TDD now.

## Going through the TDD cycle for our First Test

During this entire activity, we will write tests in `src/models/calculator.model.spec.ts` and implement the functionality in `src/models/calculator.model.ts`.
Let's get started with the very first and simplest test for the functionality of the calculator.

- On init, the display should be empty.

To create a test for this, go to `src/models/calculator.model.spec.ts` and add the test shown below:

```typescript
it('should have an empty display on init', (): void => {

  // Assemble
  const calculator: ICalculatorModel = new CalculatorModel();

  // Act
  const displayValue: string = calculator.display();

  // Assert
  expect(displayValue).toEqual('');

});
```

Notice that the tests we write have a pattern called AAA (Assemble, Act, Assert). 
You should aim to follow this pattern in all tests.

The file should now look like this:

```typescript
describe('CalculatorModel', (): void => {

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {

    const calculator: ICalculatorModel = new CalculatorModel();

    expect(calculator).toBeDefined();

  });

  it('should have an empty display on init', (): void => {

    // Assemble
    const calculator: ICalculatorModel = new CalculatorModel();

    // Act
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('');

  });

});
```

Now let's run the tests with `npm run test`.
You should see the below output:

```bash
> week-3-tdd-starter@1.0.0 test
> node scripts/jest.js

 PASS  src/index.spec.ts
  week4-tdd
    CalculatorModel
      ✓ CalculatorModel exists (2 ms)

 FAIL  src/models/calculator.model.spec.ts
  CalculatorModel
    ✓ should contain a CalculatorModel class that implements ICalculatorModel (1 ms)
    ✕ should have an empty display on init (1 ms)

  ● CalculatorModel › should have an empty display on init

    Method not implemented.

      20 |
      21 |   public display(): string {
    > 22 |     throw new Error('Method not implemented.');
         |           ^
      23 |   }
      24 |
      25 | }

      at CalculatorModel.display (src/models/calculator.model.ts:22:11)
      at Object.display (src/models/calculator.model.spec.ts:20:43)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        0.565 s, estimated 1 s
Ran all test suites.
```

And as expected, the test we wrote fails because we never actually wrote the code for it.
Let us write the minimal amount of code to make the test pass:

Go to `src/models/calculator.model.ts` and update the `display()` method to return an empty string.
The file should now look as below:

```typescript
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
    return '';
  }

}
```

Let's run the tests again and see if the pass.

`npm run test`:

```bash

> week-4-tdd-starter@1.0.0 test
> node scripts/jest.js

 PASS  src/models/calculator.model.spec.ts
  CalculatorModel
    √ should contain a CalculatorModel class that implements ICalculatorModel (1 ms)
    √ should have an empty display on init (1 ms)

 PASS  src/index.spec.ts
  week4-tdd
    CalculatorModel
      √ CalculatorModel exists (2 ms)

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.614 s, estimated 1 s
Ran all test suites.
```

WooHoo!! It works. We are masters of TDD!
Let's keep going.

## Going through the TDD cycle for our Second Test

Let us add another test for something slightly more interesting.
The calculator should display 1 when we press the 1 key.

Add the below test to our suite and run the test using `npm run test`.
```typescript
it('should display `1` when the `1` key is pressed', (): void => {

  // Assemble
  const calculator: ICalculatorModel = new CalculatorModel();

  // Act
  calculator.pressNumericKey(NumericKeys.ONE);
  const displayValue: string = calculator.display();

  // Assert
  expect(displayValue).toEqual('1');

});
```
As expected, the test should fail as below:

```bash

> week-3-tdd-starter@1.0.0 test
> node scripts/jest.js

 FAIL  src/models/calculator.model.spec.ts
  CalculatorModel
    ✓ should contain a CalculatorModel class that implements ICalculatorModel (2 ms)
    ✓ should have an empty display on init (1 ms)
    ✕ should display `1` when the `1` key is pressed (1 ms)

  ● CalculatorModel › should display `1` when the `1` key is pressed

    Method not implemented.

       8 |
       9 |   public pressNumericKey(key: NumericKeys): void {
    > 10 |     throw new Error('Method not implemented.');
         |           ^
      11 |   }
      12 |
      13 |   public pressOperatorKey(key: OperatorKeys): void {

      at CalculatorModel.pressNumericKey (src/models/calculator.model.ts:10:11)
      at Object.pressNumericKey (src/models/calculator.model.spec.ts:33:14)

 PASS  src/index.spec.ts
  week4-tdd
    CalculatorModel
      ✓ CalculatorModel exists (1 ms)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        0.548 s, estimated 1 s
Ran all test suites.
```

### The tests serve as a Regression Suite

Let us to something stupid to make the new test pass.
Let us update the display function to return '1' instead of '', change the body of pressNumericKey to have an empty return.
The code should now look as below and run the tests again.

```typescript
export class CalculatorModel implements ICalculatorModel {

  public pressNumericKey(key: NumericKeys): void {
    return;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    throw new Error('Method not implemented.');
  }

  public pressActionKey(key: ActionKeys): void {
    throw new Error('Method not implemented.');
  }

  public display(): string {
    return '1';
  }

}
```

Now, the new test will pass, but the old test will fail.
When doing TDD, only the latest test can fail at any given time.
Old tests failing indicates an incorrect implementation of the new behavior which should be fixed.
Existing tests in TDD serve as a regression suite that fails if we violate previously established behaviors.
This ensures that as we implement more complex ideas or refactor code, the intended behavior is always preserved.  

```bash

> week-3-tdd-starter@1.0.0 test
> node scripts/jest.js

 FAIL  src/models/calculator.model.spec.ts
  CalculatorModel
    ✓ should contain a CalculatorModel class that implements ICalculatorModel (2 ms)
    ✕ should have an empty display on init (2 ms)
    ✓ should display `1` when the `1` key is pressed

  ● CalculatorModel › should have an empty display on init

    expect(received).toEqual(expected) // deep equality

    Expected: ""
    Received: "1"

      22 |
      23 |   // Assert
    > 24 |   expect(displayValue).toEqual('');
         |                        ^
      25 |
      26 | });
      27 | it('should display `1` when the `1` key is pressed', (): void => {

      at Object.toEqual (src/models/calculator.model.spec.ts:24:24)

 PASS  src/index.spec.ts
  week4-tdd
    CalculatorModel
      ✓ CalculatorModel exists (2 ms)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        0.56 s, estimated 1 s
Ran all test suites.
```

### Coming back to a more reasonable implementation

Clearly, we need some form of state on the calculator that we can update on key presses.
Let us implement that as below.

```typescript
export class CalculatorModel implements ICalculatorModel {

  private _buffer: string = '';

  public pressNumericKey(key: NumericKeys): void {
    if (key === NumericKeys.ONE) {
      this._buffer = '1';
    }
  }

  public pressOperatorKey(key: OperatorKeys): void {
    throw new Error('Method not implemented.');
  }

  public pressActionKey(key: ActionKeys): void {
    throw new Error('Method not implemented.');
  }

  public display(): string {
    return this._buffer;
  }

}
```

Now, all the tests should pass:

```bash

> week-3-tdd-starter@1.0.0 test
> node scripts/jest.js

 PASS  src/models/calculator.model.spec.ts
  CalculatorModel
    ✓ should contain a CalculatorModel class that implements ICalculatorModel (2 ms)
    ✓ should have an empty display on init (1 ms)
    ✓ should display `1` when the `1` key is pressed

 PASS  src/index.spec.ts
  week4-tdd
    CalculatorModel
      ✓ CalculatorModel exists (1 ms)

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.595 s, estimated 1 s
Ran all test suites.
```

## When do we Refactor?

Well let's add another test, this time for the number 2 key being pressed.
We can have a test as shown below:

```typescript
it('should display `2` when the `2` key is pressed', (): void => {

  const calculator: ICalculatorModel = new CalculatorModel();

  calculator.pressNumericKey(NumericKeys.TWO);
  const displayValue: string = calculator.display();

  expect(displayValue).toEqual('2');

});
```

To make the test pass, we can update the `pressNumbericKey` method as below:

```typescript
public pressNumericKey(key: NumericKeys): void {
  if (key === NumericKeys.ONE) {
    this._buffer = '1';
  }

  if (key === NumericKeys.TWO) {
    this._buffer = '2';
  }
}
```

Well this approach doesn't seem very scalable. 
Do we just keep adding for more if statements for each number and similarly operator?

If you notice something, we have a direct mapping of Enum values to numeric values (NumericKeys.ONE === '1').
Lucky for us, TypeScript/JavaScript allows us to assign string values to enums.

Thus, we can refactor the above code to a single line as below:

```typescript
public pressNumericKey(key: NumericKeys): void {
  this._buffer = key;
}
```

If we run the tests again, they all still pass! Hooray!!

If you look at the tests, you will notice that we have some redundancancy there.
We create a new calculator in each test. We can extract this code out as below:

```typescript
import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';

describe('CalculatorModel', (): void => {

  let calculator: ICalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {

    expect(calculator).toBeDefined();

  });

  it('should have an empty display on init', (): void => {

    // Act
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('');

  });

  it('should display `1` when the `1` key is pressed', (): void => {

    // Act
    calculator.pressNumericKey(NumericKeys.ONE);
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('1');

  });

  it('should display `2` when the `2` key is pressed', (): void => {

    calculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');

  });

});

```

All the tests should still run and pass.


## Let us continue adding another test

If we press the keys `9` and `8`, the calculator should display `98`.

The test would look as below:

```typescript
it('should display `98` when the `9` key is pressed followed by the `8` key', (): void => {

  calculator.pressNumericKey(NumericKeys.NINE);
  calculator.pressNumericKey(NumericKeys.EIGHT);
  const displayValue: string = calculator.display();

  expect(displayValue).toEqual('98');

});
```

Now, to make the test pass, we can update the `pressNumericKey` method as below:

```typescript
public pressNumericKey(key: NumericKeys): void {
  this._buffer += key;
}
```

And the tests all pass again!!


## Next Steps

Now that we have a basic idea of how TDD works, continue working on developing the calulator.
- Use TDD to implement basic arithmetic operations with 2 operands, such as `2 + 3 === 5`.
- Use TDD to support arithmetic operations with more than 1 operator, such as `2 + 3 -1 === 4`.
- Use TDD to support operator precedence, such as `2 + 3 * 4 === 14`.

*Note*: Implementing operator precedence can be tricky. Do not worry if you can't get working in-time for the submission. You can submit basic operations to receive full credit. In the coming weeks, we will use design patterns to implement operator precedence for the calculator.

## Submission

In the root directory, run the command `npm run zip`. This command will generate a zip file called `submission.zip`. Upload the `submission.zip` file to Gradescope and tag your partner on Gradescope on the submission.
