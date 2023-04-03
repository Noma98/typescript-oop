{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
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
  class CaffeLatteMachine extends CoffeeMachine {
    //상속하려는 클래스의 constructor가 private이면 상속 불가능 -> protected 또는 public으로 바꿔줘야함
    //오버라이팅: 자식 클래스에서 부모 클래스에 있는 함수를 덮어 씌움

    constructor(beans: number, public readonly serialNumber: string) {
      //readonly : 한번 설정되고 바뀌지 않는다면 사용
      super(beans);
    }

    //자식 클래스에서만 있는 함수를 만들고 싶다면 여기에 새롭게 정의
    private steamMilk(): void {
      console.log('Steaming some milk...🥛💭');
    }
    makeCoffee(shots: number): CoffeeCup {
      //부모에서 정의했던 함수들을 이용하고 싶다면 super를 사용하라
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return { ...coffee, hasMilk: true };
    }
  }
  const machine = new CoffeeMachine(23);
  const latteMachine = new CaffeLatteMachine(23, 'SEJCU13331');
  const coffee = latteMachine.makeCoffee(1);
  console.log(latteMachine.serialNumber);
}
