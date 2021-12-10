{
  //JavaScript 💩
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  //TypeScript ✨
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  //JavaScript 💩
  function jsFetchNum(id) {
    //code ...
    //code ...
    //code ...
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  //TypeScript ✨
  //Promise<number> -> generic 맛보기
  function fetchNum(id: string): Promise<number> {
    //code ...
    //code ...
    //code ...
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  //JavaScript => TypeScript ✨
  //Optional parameter -> 전달하지 않으면 undefined
  //?: -> 해당 인자는 전달 받아도 O, 안받아도 O
  //lastName?:string 말고 lastName:string|undefined로 해도 동일하지만, 이 경우 해당 함수 호출시 전달하지 않을 인자는 undefined로 명시해서 호출해야 함
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName("Ha", "jinhee");
  printName("Ellie");
  printName("Anna", undefined);

  //Default parameter
  function printMessage(message: string = "default message") {
    console.log(message);
  }
  printMessage();

  //Rest parameter
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }

  console.log(addNumbers(1, 2, 4, 5));
}
