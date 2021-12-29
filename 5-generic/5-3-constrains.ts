interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log(`full time!!`);
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log(`part time!!`);
  }
  workPartTime() {}
}

//세부적인 타입을 인자로 받아서 추상적인 타입으로 다시 리턴하는 함수는 💩
function payBad(employee: Employee): Employee { //풀타임 받은 걸 잃어 버리고 employee만 반환
  employee.pay();
  return employee;
}

//제네릭이긴 제네릭인데 이 타입은 Employee를 확장한 타입만 돼!
//이런 조건을 걸어둠으로서 도금 더 제한적인 범위내에서 일반화된 제네릭을 사용할 수 있음
function pay<T extends Employee>(employee:T):T{
  employee.pay();
  return employee;
}

const ellie=new FullTimeEmployee();
const bob=new PartTimeEmployee();

const ellieAfterPay=pay(ellie);
// const ellieAfterPay=pay(ellie) as FullTimeEmployee; 이렇게 쓰면 .workFullTime() 사용할 수 있지만 좋지 않음
const bobAfterPay=pay(bob);
ellieAfterPay.
