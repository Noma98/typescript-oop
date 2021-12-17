{
  /*
   * Intersection Types: & 같은 개념
     => 다양한 타입들을 하나로 묶어서 선언할 수 있다.
   */
  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    employeeId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.work()); //모든 것에 접근 가능
  }
  // 모든 것을 작성해줘야 에러가 나지 않음
  internWork({
    name: "ellie",
    score: 5,
    employeeId: 1412,
    work: () => {},
  });
}
