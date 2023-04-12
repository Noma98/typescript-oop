//4-oop-project에서 구현한 stack은 string밖에 다룰 수 없어 활용도가 떨어짐
//제네릭을 사용해 StackImpl을 사용하는 시점에서 타입을 지정할 수 있도록 구현
{
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  };
  class StackImpl<T> implements Stack<T> {
    private head?: StackNode<T>;
    private _size: number = 0;

    constructor(private capacity: number) {}
    get size() {
      return this._size;
    }
    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }
      // const node: StackNode<T> = {
      const node = {
        //아래에서 this.head에 node를 넣게 되고 head는 위에서 StackNode<T>라고 지정해뒀기 때문에 타입 추론을 활용해볼 수 있음
        value,
        next: this.head,
      };
      this.head = node;
      this._size++;
    }
    pop(): T {
      if (this.head == null) {
        throw new Error('Stack is empty!');
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }
  const stack = new StackImpl<string>(10); //따로 타입을 명시 해주지 않으면 unknown으로 되어있음
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

  const stack2 = new StackImpl<number>(10);
  stack2.push(123);
  stack2.push(456);
  stack2.push(789);
  while (stack.size !== 0) {
    console.log(stack.pop());
  }
  //789
  //456
  //123
  stack2.pop(); //ERROR
}
