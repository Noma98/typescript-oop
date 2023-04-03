{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater then 0');
      }
      this.coffeeBeans += beans;
    }
    clean() {
      console.log('cleaning the machine...🧼');
    }
    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }
    private preheat(): void {
      console.log('heating up...🔥');
    }
    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }
  //다형성: 여러 가지 타입의 객체들이 같은 인터페이스를 구현할 수 있도록 하는 것을 말함
  class CaffeLatteMachine extends CoffeeMachine {
    //상속하려는 클래스의 constructor가 private이면 상속 불가능 -> protected 또는 public으로 바꿔줘야함
    //Overwriting: 자식 클래스에서 부모 클래스에 있는 함수를 덮어 씌움

    constructor(beans: number, public readonly serialNumber: string) {
      //readonly : 한번 설정되고 바뀌지 않는다면 사용
      super(beans);
    }

    //자식 클래스에서만 있는 함수를 만들고 싶다면 여기에 새롭게 정의
    private steamMilk(): void {
      console.log('Steaming some milk...🥛💭');
    }
    makeCoffee(shots: number): CoffeeCup {
      //부모에서 정의했던 함수들을 이용하고 싶다면 super를 사용
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return { ...coffee, hasMilk: true };
    }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(3);
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }
  //
  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, 'SERIAL111'),
    new SweetCoffeeMaker(16),
  ];
  /**
 * 다형성 장점
 - 객체의 타입을 명확하게 지정하지 않고, 하나의 인터페이스를 통해 여러 가지 객체를 다룰 수 있도록 하며, 이를 통해 코드의 재사용성과 유연성을 높일 수 있음
 - 내부적으로 구현된 다양한 클래스들이 한가지 인터페이스를 구현하거나, 동일한 부모 클래스를 상속했을 때 동일한 함수를 어떤 클래스인지 구분하지 않고 호출할 수 있다는 것
 */
  machines.forEach((machine) => {
    console.log('---------------');
    machine.makeCoffee(1); //CoffeeMaker에서 정의된 것만 호출 가능
  });
}
