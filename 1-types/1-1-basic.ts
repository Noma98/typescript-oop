{
  /*
   * JavaScript
   * Primitive: number, string, boolean,bigint, symbol, null, undefined
   * Object: function, array
   */

  //number
  const num: number = 0.1;

  //string
  const str: string = "hello";

  //boolean
  const bool: boolean = false;

  //null < undefined 더 자주 씀

  //undefined -> 값이 있는지 없는지 결정되지 않은 상태
  //optional 타입일 때 사용
  let name: undefined; //💩 단독으로 쓰자 X
  let age: number | undefined;
  age = undefined;
  age = 123;
  //뭔가 있거나 없을 때 undefined을 자주 씀
  function find(): number | undefined {
    // 찾았으면 숫자, 못찾으면 undefined을 리턴하는 함수
    return 1;
    //return undefined;
  }

  //null 💩
  //명확하게 빈 상태
  let person: null; //단독으로 쓰자 X
  let person2: string | null;

  //unknown 💩
  //어떤 데이터든 담을 수 있는 타입
  //존재 이유: 타입이 없는 자바스크립트와 연동해서 사용할 수 있기 때문
  //타입스크립트에서 자바스크립트의 라이브러리를 사용하는 경우 리턴하는 타입을 모를 수 있음. 그런 상황에서 사용
  let notSure: unknown = 0;
  notSure = "he";
  notSure = true;

  //any 💩
  let anything: any = 0;
  anything = "hello";

  //void
  //아무것도 리턴하지 않으면 void
  //회사나 프로젝트 스타일 가이드에 맞춰서 따라가는 것이 좋음
  function print(): void {
    console.log("hello");
    return;
  }
  let unusuable: void = undefined; //💩 변수에 선언하는 경우 극히 드물고, 이럴 경우 undefined 밖에 할당할 수 없음

  //never
  //함수에서 절대 리턴되지 않은 경우에 이를 명시하기 위해 쓰임
  function throwError(message: string): never {
    //message -> server에 보내서

    throw new Error(message); //에러를 던지거나
    while (true) {
      // 무한루프를 돌 때 사용
    }
  }
  let neverEnding: never; //💩

  //Object 💩
  //원시 타입을 제외한 모든 object 타입을 할당할 수가 있음. 배열도 O
  let obj: object = [1, 4];
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" });
  acceptSomeObject({ animal: "dog" });
}
