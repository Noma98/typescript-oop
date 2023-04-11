/**
 <Abstract>
 * 어떤 특정한 기능만 상속받는 클래스마다 행동이 달라져야 한다면 abstract 클래스를 만들어 볼 수 있음
 * abstract 클래스는 오브젝트를 생성할 수 없는 클래스이고, 추상적인 클래스임
 * 공통적인 기능들은 추상클래스에 구현하고, 상속받는 클래스마다 달라져야하는 내용을
 * abstract 클래스 안에 abstract 메소드로 함수 이름, 인자, 리턴값만 정의할 수 있고,
 * 상속받는 클래스 내에서 상세 구현사항을 정의할 수 있다. -> 그리고 이는 구현이 강제되기 때문에 구현을 안했을 경우 에러 발생함
 * [주의] abstract 클래스를 상속할때는 abstract 클래스에서 의도한 대로 최대한 "abstract으로 지정된 함수들만" 오버라이딩 해야 함
 */
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  abstract class CoffeeMachine implements CoffeeMaker {
    //앞에 abstract이란 키워드 붙이면 이 클래스는 이 자체로는 오브젝트를 만들 수 없게됨.
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    // static makeMachine(coffeeBeans: number): CoffeeMachine {
    //   return new CoffeeMachine(coffeeBeans); //에러
    // }
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
    //자식 클래스마다 달라질 수 있는 행동이 있다면 그 함수 앞에 abstract 키워드를 붙일 수 있음. -> 이 함수는 자식클래스에서 각각 다르게 구현해야하기 때문에 private을 쓸 수 없고 protected를 써야함
    protected abstract extract(shots: number): CoffeeCup;
    // 추상적인 함수이기 때문에 구현사항을 작성하면 안됨.
    //abstract 클래스로 인스턴스를 생성할때 따로 구현해야함.
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    private steamMilk(): void {
      console.log('Steaming some milk...🥛💭');
    }
    //*오버라이딩 해줄 필요 없음
    // makeCoffee(shots: number): CoffeeCup {
    //   //🌟 자식 클래스에서 super를 안불러오는 실수를 할 경우, 부모 makeCoffee에 있는 일련의 grindBeans, preheact, extract과 같은 절차가 놓쳐질 수 있음
    //   //🌟 이를 더 안전하게 쓰기 위해선 추상화 클래스를 만들어 볼 수 있음
    //   const coffee = super.makeCoffee(shots);
    //   this.steamMilk();
    //   return { ...coffee, hasMilk: true };
    // }
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    //오버라이딩 해줄 필요 없음
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(3);
    //   return {
    //     ...coffee,
    //     hasSugar: true,
    //   };
    // }
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }
  //
  const machines: CoffeeMaker[] = [
    // new CoffeeMachine(16), -> CoffeeMachine은 추상클래스가 되었기 때문에 이를 상속한 클래스만 만들 수 있음
    new CaffeLatteMachine(16, 'SERIAL111'),
    new SweetCoffeeMaker(16),
  ];
}
