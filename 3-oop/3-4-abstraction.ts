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
    //위 코드처럼 클래스에 인터페이스를 implements 하는 이유
    // - 인터페이스에서 요구하는 함수들을 다 구현했는지 문법적으로 체크받을 수 있음
    // - 특정 규격 사항(인터페이스)을 따라 간다고 선언함
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
  // const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  // maker.fillCoffeeBeans(32);
  // maker.makeCoffee(2);

  //CoffeeMachine이라는 것은 CoffeeMaker의 인터페이스를 구현하는 것이기 때문에 CoffeeMachine과 CoffeeMaker는 동일.
  //하지만 CoffeeMaker에는 makeCoffee라는 함수밖에 없기 때문에 그 외는 사용 불가.
  //그렇기 때문에 내가 얼마만큼의 행동을 약속할 건지 허용할 건지 결정할 수 있음
  //const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
  const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  maker2.fillCoffeeBeans(32);
  maker2.makeCoffee(2);
  maker2.clean();

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }
  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }
  //인터페이스에 규약된 제한된 함수만 쓸 수 있음
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  amateur.makeCoffee();
  pro.makeCoffee();

  /*동일한 클래스의 인스턴스일지라도 이 오브젝트는 두가지의 인터페이스를 구현하기 때문에
    아마추어와 프로 바리스타는 커피머신을 받아오는 것이 아니라 생성사자에서 각각 CoffeeMaker와 
    CommercialCoffeeMaker를 받아오기 때문에 이 인터페이스에서 규약된 함수들만 접근이 가능함
   */
}
