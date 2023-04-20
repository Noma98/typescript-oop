{
  /**
   * Indexed access type
   * 인덱스[] 문법을 이용해 오브젝트의 타입을 컴파일 타임때 동적으로 결정하는 것
   */
  const obj={
    name:'noma'
  };
  obj.name; //noma
  obj['name']; //noma

  type Animal{
    name:string;
    age:number;
    gender:'M'|'F';
  }
  type Name=Animal['name']; //string
  const text:Name='hello';

  type Gender=Animal['gender']; //'M'|'F'
  type Keys=keyof Animal; //'name'|'age'|'gender' => Animal에 있는 모든 키의 타입을 할당
  const key:Keys='age';

  type Person={
    name:string;
    gender:Animal['gender'];
  }
  const person:Person={
    name:'noma',
    gender:'F'
  }
}