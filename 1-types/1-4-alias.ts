{
  //✨Type Alias
  //기본적인 타입부터 복잡한 타입들까지 정의해 볼 수 있음
  //새로운 타입을 내가 정의할 수 있음
  //원시타입 뿐만 아니라 Object 타입도 가능

  type Text = string;
  const name: Text = "ellie";
  const address: Text = "korea";

  type Num = number;
  type Student = {
    name: string;
    age: number;
  };

  const student: Student = { name: "ellie", age: 123 };

  //✨String Literal Types
  //타입을 문자열로 지정
  type Name = "name";
  let ellieName: Name;
  ellieName = "name";

  type JSON = "json";
  const json: JSON = "json";

  type Boal = true;
  const isCat: Boal = true;
}
