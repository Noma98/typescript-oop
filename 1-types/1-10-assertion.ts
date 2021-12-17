{
  /**
   * Type Assertions 💩
   * 타입을 100% 장담할 수 있을 때만 사용. 잘못 쓰면 런타임 환경에서 에러가 남
   -> 자바스크립트와 연동되기 때문에 불가피하게 써야하는 경우가 있음 
   */
  function jsStrFunc(): any {
    //자바스크립트는 타입이 없기 때문에 어떤 값 리턴하는지 모름
    // return "hello"; //-> 하지만 이 함수는 분명히 string을 리턴
    return 2;
  }
  const result = jsStrFunc();
  //result.length -> any 타입이기 때문에 문자열 api 사용 불가..

  console.log((result as string).length);
  // 하지만 이 함수가 string을 반환한다고 확신하면 Type Assertion을 사용할 수 있다.
  // result라는 변수를 문자열처럼 사용할거야!하고 as를 이용해 캐스팅 할 수 있음. 그러면 타입스크립트는 문자열에서 사용가능한 모든 api를 보여줌.

  // 하지만, string이라고 확신해 놓고 jsStrFunc에서 숫자를 리턴하면 코드를 작성하는 시점에서는
  // 에러나 경고 메시지가 나지 않지만, 실행하는 순간 undefined가 된다.

  console.log((<string>result).length);
  //아니면 이런식으로 변수 앞에 괄호로 해당 타입을 작성해도 동일

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); //😱

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers(); //findNumbers()!;
  numbers!.push(2); //😱
  //numbers가 무조건 숫자 배열일 거라고 확신하면 변수 뒤에 느낌표(!), 혹은 함수 호출 뒤에 느낌표 작성하면 경고 메시지가 사라진다.

  const button = document.querySelector("class")!;
  //button.nodeValue -> button이 null일 수도 있다는 경고가 뜨는데,
  //이 버튼이 정말 있다고 확신하면 함수 호출 뒤에 !느낌표를 붙여서 없애줄 수 있다.
}
