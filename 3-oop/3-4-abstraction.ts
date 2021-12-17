{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // * 인터페이스
  // 일반적으로 타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용 가능
  // 1. 인터페이스 이름에 I prefix를 붙이기도 함 (비추)
  // 2. 아니면 구현하는 클래스 이름 제일 뒤에 implementation이라고 붙이기도 함
  interface CoffeeMaker {
    //ICoffeeMaker
    makeCoffee(shots: number): CoffeeCup;
  }
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    //이 클래스는 CoffeeMaker, CommercialCoffeeMaker 인터페이스의 규격을 따라감
    //인터페이스에 적혀 있는 모든 함수를 구현해줘야함
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater then 0");
      }
      this.coffeeBeans += beans;
    }
    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }
    private preheat(): void {
      console.log("heating up...🔥");
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
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);

  //CoffeeMachine이라는 것은 CoffeeMaker의 인터페이스를 구현하는 것이기 때문에 CoffeeMachine과 CoffeeMaker는 동일.
  //하지만 CoffeeMaker에는 makeCoffee라는 함수밖에 없기 때문에 그 외는 사용 불가.
  //그렇기 때문에 내가 얼마만큼의 행동을 약속할 건지 허용할 건지 결정할 수 있음
  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  // maker2.filCoffeeBeans(32); //-> 사용 불가
  maker2.makeCoffee(2);
}
