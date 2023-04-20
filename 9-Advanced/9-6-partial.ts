{
  //Partial: 기존 타입의 모든 속성을 옵셔널하게 만들기
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }
  const todo: ToDo = {
    title: 'learn typeScript',
    description: 'study hard',
    label: 'study',
    priority: 'high',
  };
  const updated = updateTodo(todo, { priority: 'low' });
  console.log(updated);

  /*
  {
    title:'learn typeScript',
    description:'study hard',
    label:'study',
    priority:'low'
  }
  */
}
