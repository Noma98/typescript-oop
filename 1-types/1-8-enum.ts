{
  /*
    * Enum 💩
    서로 연관된 상수값들을 한 곳에 모아서 정의할 수 있게 도와주는 타입 
    문제점: 타입이 정확하게 보장되지 않음
    -> 대부분의 케이스는 union 타입으로 대체해서 사용 가능 (권장)
    -> 단, 한가지! 네이티브 코드(kotlin, swift)에서는 다른 모바일 클라이언트와 소통할 때 union 타입을 표현할 수 있는 방법이 없어서 enum 사용
  */
  //JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.TUESDAY;

  //TypeScript 🌟 첫 글자만 대문자로!!
  type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday"; //이런식으로 union 타입으로 대체해서 쓰자.
  enum Days { //값을 정하지 않으면 자동으로 0부터 할당됨, Monday를 1부터 할당하고 싶으면 Monday=1, 하면 된다.
    Monday, //0
    Tuesday, //1
    Wednesday, //2
    Thursday, //3
    Friday, //4
    Saturday, //5
  }
  // enum Days { // 0부터 시작하고 싶지 않다면 따로 처음 값만 할당해주면 됨
  //   Monday=1, //1
  //   Tuesday, //2
  //   Wednesday, //3
  //   Thursday, //4
  //   Friday, //5
  //   Saturday, //6
  // }

  // enum Days { // 문자열도 할당할 수 있는데 이는 다음 값들도 다 할당해줘야 함.
  //   Monday='monday',
  //   Tuesday='',
  //   Wednesday='',
  //   Thursday='',
  //   Friday='',
  //   Saturday='',
  // }

  console.log(Days.Monday);
  let day: Days = Days.Saturday;
  day = Days.Monday; //문제점: enum으로 타입을 지정된 변수에 다른 숫자 할당 가능
  day = 10; //10으로 할당해도 컴파일 에러가 나지 않음
  console.log(day);

  let dayOfWeek: DaysOfWeek = "Monday";
  dayOfWeek = "Monday";
}
