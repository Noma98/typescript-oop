{
  //< 디커플링 전 버전 💩 >
  /**
   * 상속의 문제점
   - 상속이 깊어질수록 서로의 관계가 복잡해짐
   - 부모 클래스의 행동을 수정하면 그것을 상속하는 모든 자식 클래스도 영향을 받게 됨
   - 타입스크립트에서는 두 개 이상의 부모를 상속할 수 없음

   => 이럴땐 composition을 활용하자!
   */
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

  //싸구려 우유 거품기
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('Steaming some milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //설탕 제조기
  class CandySugarMixer {
    private getSugar() {
      console.log('Getting some sugar from candy🍬');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer //private으로 지정해 클래스 멤버변수로 만들어, 내부적으로 steamMilk를 이용하는 것이 아니라 milkFrother에 있는 makeMilk라는 함수를 사용해 우유를 추가
    ) {
      super(beans);
    }

    // private steamMilk(): void {
    //   console.log('Steaming some milk...🥛💭');
    // }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // this.steamMilk();
      // return { ...coffee, hasMilk: true };
      return this.milkFrother.makeMilk(coffee);
    }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    //설탕이 필요한 클래스마다 설탕과 관련된 로직들을 작성해야함
    //우유를 만들거나 설탕을 공급해주는 공통적인 클래스가 있으면 필요한 곳에서 가져와 컴포지션 해주면 이를 방지할 수 있음 (우유 거품기, 설탕 제조기)
    //-> 우유와 설탕이 필요한 곳에서 매번 로직을 반복해서 작성하지 않고 외부에서 필요한 것들을 주입받아 가져오면 됨 (dependency injection)
    // getSugar() {
    //   console.log('Getting some sugar..🍬');
    // }
    constructor(private beans: number, private sugar: CandySugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // this.getSugar();
      // return {
      //   ...coffee,
      //   hasSugar: true,
      // };
      return this.sugar.addSugar(coffee);
    }
  }
  //각각의 기능을 따로 클래스로 만들어 둚으로써 필요한 곳에서 가져다 씀 => composition함
  class SweetCaffeLatteMachine extends CoffeeMachine {
    //이 클래스는 우유를 어떻게 만드는지, 설탕을 어떻게 가져오는지 알지 못함
    //그저 필요한 것을 주입 받아 composition을 이용해 재사용할 수 있음

    //단점: CaffeLatteMachine, SweetCoffeMaker, SweetCaffeLatteMachine은 CheapMilkSteamer와 CandySugarMixer에 타이트하게 커플링 되어 있음(클래스들끼리 서로 잘 알고 지내는 건 좋지 않음)
    //항상 이 스티머와 설탕 믹서를 사용해야함. 나중에 다른 스티머나 설탕 믹서를 만들어지면 이 세가지 클래스는 모두 업데이트 되어져야함
    constructor(
      private beans: number,
      private milk: CheapMilkSteamer,
      private sugar: CandySugarMixer
    ) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milk.makeMilk(this.sugar.addSugar(coffee));
    }
  }
  const cheapMilkMaker = new CheapMilkSteamer();
  const candySugar = new CandySugarMixer();
  const latteMachine = new CaffeLatteMachine(12, 'SERIAL1234', cheapMilkMaker);
  const sweetMachine = new SweetCoffeeMaker(12, candySugar);
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    12,
    cheapMilkMaker,
    candySugar
  );
  //재사용성이 완전히 떨어짐 ex)커피기계를 샀는데 이 기계엔 "서울우유만" 사용할 수 있는 것과 같음. 나중에 흑설탕이나 고급 거품기를 사도 이 기계에는 사용할 수 없음
}
{
  // <디커플링 후/불필요한 상속 제거 전 버전👍>
  //클래스들끼리 서로 상호작용한다면 클래스 자체를 노출시키는 것이 아니라 계약서(인터페이스)를 통해서 의사소통해야함 => 디커플링의 원칙

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
  //🌟 인터페이스 생성
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }
  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  //싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    //🌟 인터페이스를 구현하도록함
    private steamMilk(): void {
      console.log('Steaming some milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //고급 우유 거품기
  class FancyMilkSteamer implements MilkFrother {
    //🌟 인터페이스를 구현하도록함
    private steamMilk(): void {
      console.log('Fancy steaming some milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //저온 우유 거품기
  class ColdMilkSteamer implements MilkFrother {
    //🌟 인터페이스를 구현하도록함
    private steamMilk(): void {
      console.log('Steaming some cold milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //설탕 제조기
  class CandySugarMixer implements SugarProvider {
    //🌟 인터페이스를 구현하도록함
    private getSugar() {
      console.log('Getting some sugar from candy🍬');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  //설탕 제조기
  class SugarMixer implements SugarProvider {
    //🌟 인터페이스를 구현하도록함
    private getSugar() {
      console.log('Getting some sugar from jar');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: MilkFrother // 🌟 인터페이스 사용
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkFrother.makeMilk(coffee);
    }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: SugarProvider) {
      //🌟 인터페이스를 받아오도록 함
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: MilkFrother, //🌟 인터페이스
      private sugar: SugarProvider //🌟 인터페이스
    ) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milk.makeMilk(this.sugar.addSugar(coffee));
    }
  }
  //Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  //Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  //
  const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
  const sweetMachine = new SweetCoffeeMaker(12, sugar); //동일한 SweetCoffeeMaker 클래스 코드를 재사용하면서 내가 원하는 부품을 가져다 서로 다른 객체를 만들 수 있음

  const latteMachine = new CaffeLatteMachine(12, 'SERIAL1234', cheapMilkMaker);
  const coldLatteMachine = new CaffeLatteMachine(
    12,
    'SERIAL1234',
    coldMilkMaker
  );
  // 좀더 원하는 기능을 조립해서 커피기계를 만들 수 있게 됨
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    12,
    cheapMilkMaker,
    candySugar
  );
}
{
  // <디커플링 후/불필요한 상속 제거한 버전🔥 👍 👍>
  //이제 원하는 밀크메이커와 슈가메이커를 전달할 수 있기 때문에 많은 종류의 커피 머신이 필요하지 않음
  //각각의 필요한 기능을 하는 클래스들과 인터페이스 그리고 CoffeeMachine 하나면 됨

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

    constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      this.coffeeBeans = coffeeBeans;
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
      const coffee = this.extract(shots);
      return this.milk.makeMilk(this.sugar.addSugar(coffee));
    }
  }
  //🌟 인터페이스 생성
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }
  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  //싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    //🌟 인터페이스를 구현하도록함
    private steamMilk(): void {
      console.log('Steaming some milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //고급 우유 거품기
  class FancyMilkSteamer implements MilkFrother {
    //🌟 인터페이스를 구현하도록함
    private steamMilk(): void {
      console.log('Fancy steaming some milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //저온 우유 거품기
  class ColdMilkSteamer implements MilkFrother {
    //🌟 인터페이스를 구현하도록함
    private steamMilk(): void {
      console.log('Steaming some cold milk...🥛💭');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //노 밀크
  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }
  //설탕 제조기
  class CandySugarMixer implements SugarProvider {
    //🌟 인터페이스를 구현하도록함
    private getSugar() {
      console.log('Getting some sugar from candy🍬');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  //설탕 제조기
  class SugarMixer implements SugarProvider {
    //🌟 인터페이스를 구현하도록함
    private getSugar() {
      console.log('Getting some sugar from jar');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  //노 슈가
  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  //Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  //Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();
  //
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);
  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
}
