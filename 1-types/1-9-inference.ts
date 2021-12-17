/**
 * Type Inference (타입 추론) 💩
  -> 되도록 함수에서는 타입을 명확하게 정의하자.(리턴 타입은 void라면 생략 가능)
*/

let text = "hello"; //선언함과 동시에 문자열을 할당해서 타입스크립트가 알아서 string이라고 타입을 추론함
//let text:string='hello'; // 선언하면서 타입을 직접 정의해도 좋지만 너무 뻔한 경우는 생략해도 됨

// 인자의 타입을 명시하지 않으면 any가 할당됨
function print(message = "hello") {
  // 따로 타입을 명시하지 않아도 기본값을 할당하면 타입 추론이 일어남
  console.log(message);
}

function add(x: number, y: number) {
  return x + y;
}

const result = add(1, 2);
