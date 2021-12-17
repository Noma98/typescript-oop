{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  // 클래스 안에서는 const/let/function 같은 키워드 사용X
  class CoffeeMaker {
    //멤버 변수(함수): 오브젝트마다 새로 만들어줘야 하는 데이터가 있을 경우 사용. 해당 클래스를 이용한 오브젝트 사이에서 공유될 수 있는 것을 멤버변수로 두면 오브젝트를 만들 때마다 중복적으로 데이터가 생성되어 메모리 낭비가 발생한다.
    //static: 🌟 class level. 클래스 레벨에서 함께 공유되어 질 수 있는 거라면 static 사용. this가 아니라 클래스 이름으로 접근해 사용.멤버 변수뿐만 아니라 멤버 함수에도 사용 가능.

    static BEANS_GRAM_PER_SHOT = 7; // 타입 추론
    coffeeBeans: number = 0; //instance (object) level

    // 클래스로 오브젝트 인스턴스를 만들 때 처음 호출되는 함수
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    //constructor를 호출하지 않고 새로운 커피 기계를 만들고 싶다면,
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
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
  const maker = new CoffeeMaker(32);
  console.log(maker);
  const maker2 = new CoffeeMaker(12);
  console.log(maker2);

  const maker3 = CoffeeMaker.makeMachine(3);
}
