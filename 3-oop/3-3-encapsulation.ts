{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public : 외부에서 접근 O
  // private : 내부에서만 접근 O
  // protected : 외부에서는 접근할 수 없지만, 해당 클래스를 상속한 자식 클래스에서는 접근이 가능
  // 지정하지 않으면 기본은 public
  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    // 이런식으로 static을 붙여서 object를 만들 수 있는 함수를 제공한다면, 이는 생성자를 통해 만드는 것을 금지하기 위해 쓴다.
    // 따라서 constructor 함수를 private으로 만들어서 이 함수를 쓰도록 권장하도록 만드는 것이 좋다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater then 0");
      }
      this.coffeeBeans += beans;
    }
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }
  // const maker = new CoffeeMaker(32);
  const maker = CoffeeMaker.makeMachine(32);

  // class User {
  //   private firstName: string;
  //   private lastName: string;
  //   get fullName(): string {
  //     // fullName에 접근할 때마다 새로운 데이터를 만들고 계산함
  //     // 접근할 때는 함수가 아니라 일반 멤버 변수처럼 사용
  //     return `${this.firstName} ${this.lastName}`;
  //   }
  //   constructor(firstName: string, lastName: string) {
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //   }
  // }
  /* 좀더 간결하게 사용하고 싶으면, constructor에서 바로 private 설정 */
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        // setter를 쓰면 유효성 검사를 할 수 있음
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, private lastName: string) {}
  }
  const user = new User("Steve", "Jobs");
  user.age = 6; //setter를 써서 업데이트
  console.log(user.fullName);
}
