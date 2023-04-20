{
  //Readonly: 기존 타입의 모든 속성들이 불변성을 가지도록 하기
  type ToDo = {
    title: string;
    description: string;
  };
  // function display(todo:ToDo){ -> 변경이 가능함
  //   todo.title='jaja';
  // }

  //🌟 항상 불변성을 보장하는 것이 좋음
  //9-3-conditional.ts에서 직접 구현한 Readonly 같은 것들은 이미 정의되어져 있어 가져다 쓰면 됨
  function display(todo: Readonly<ToDo>) {
    // todo.title='jaja';
  }
}
