{
  //Array -> 2가지 표현 방법이 있다.
  const fruits: string[] = ["🍎", "🍐"];
  const scores: Array<number> = [1, 2, 3];
  function printArray(fruits: readonly string[]) {
    //readonly string[] -> O , readonly Array<string> -> X
    //readonly를 붙이면 전달된 변수를 함수 내부에서 변경할 수 없도록 타입으로 보장할 수 있음
    //일관성있는 코드 작성을 위해 string[] 방법을 추천
    //fruits.push('추가'); -> 에러
  }

  //Tuple 💩 -> interface, type alias, class로 대체해서 사용할 것을 권장
  //서로 다른 타입을 함께 가질 수 있는 배열
  //고정된 사이즈에 서로 다른 타입을 가질 때, class나 interface로 묶기가 애매하고 동적으로 관련 있는 다른 타입의 데이터를 묶어서 사용자가 이름을 정의해서 쓸 경우 사용
  let student: [string, number];
  student = ["name", 123];
  student[0]; //name
  student[1]; //123
  const [name, age] = student;
  //const [count,setCount]=useState(0);  -> useState이 반환하는 값도 Tuple
}
