interface Stack {
  readonly size: number; //값을 변경할 수 없고 내부적으로 정해짐
  push(value: string): void;
  pop(): string;
}

//사용자로부터 받은 string을 바로 저장하지 않고 node라는 데이터 타입으로 감쌈
//사용자로부터 데이터를 받아 한단계 감싸진 무언가를 만들게 된다면, 불변성을 유지하는 것이 좋음 -> 한번 만들어지면 절대 내용물이 변경되지 않도록 readonly를 붙이면 됨
type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};
class StackImpl implements Stack {
  private head?: StackNode;
  private _size: number = 0; //여기서 readonly를 붙이면 내부에서도 변경 불가. 그래서 private으로 두고 getter를 정의하면, 내부에서 변경이 가능하고 외부에서는 해당 정보를 읽을 수 있게됨(setter가 없어 변경은 불가)
  //내부/외부에서 쓰는 이름이 같으면 size를 그대로 쓰되 내부변수는 앞에 _(underscore)를 써주면 됨. 그러면 _size를 보고 내부에서만 쓰는 변수구나! 동일한 변수 이름이 또 있겠구나! 알 수 있음.

  //보통의 경우에는 자료구조를 만들때 사이즈를 무제한으로 하진 않고 생성자로부터 얼만큼 만들건지 받음.
  constructor(private capacity: number) {}
  get size() {
    return this._size;
  }
  push(value: string) {
    if (this.size === this.capacity) {
      throw new Error('Stack is full!');
    }
    const node: StackNode = {
      value,
      next: this.head,
    };
    this.head = node;
    this._size++;
  }
  pop(): string {
    //여기서 리턴값을 string|undefined 하면 사용하는 곳에서 널체크를 해줘야함(불편)
    //대신 api에서는 string을 리턴할 것을 보장하고 내부에서 null일 경우를 확인해 에러를 리턴해주는 것이 좋음
    if (this.head == null) {
      //=== undefined를 안하는 이유: 타스 코드는 strict null check라는 옵션을 이용해서 엄격하게 코딩할 수 있게 만들어 두었지만, 자스 코드와 연동을 하게 되면 변수에 null 또는 undefined를 할당 받을 수 있음
      throw new Error('Stack is empty!');
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}
const stack = new StackImpl(10);
stack.push('bob 1');
stack.push('steve 2');
stack.push('noma 3');
while (stack.size !== 0) {
  console.log(stack.pop());
}
//noma 3
//steve 2
//bob 1
stack.pop(); //ERROR
