type PositionType = {
  x: number;
  y: number;
};
interface PositionInterface {
  x: number;
  y: number;
}

//Object (type O, interface O)
const obj1: PositionType = {
  x: 1,
  y: 1,
};
const obj2: PositionInterface = {
  x: 1,
  y: 1,
  z: 1,
};

//Class (type O, interface O)
class Pos1 implements PositionType {
  x: number;
  y: number;
}
class Pos2 implements PositionInterface {
  x: number;
  y: number;
  z: number;
}

//Extends (type O, interface O)
interface ZPositionInterface extends PositionInterface {
  z: number;
}
type ZPositionType = PositionType & { z: number };

//동일한 이름으로 인터페이스를 정의하면 타입이 병합됨(type X, interface O)
interface PositionInterface {
  z: number;
}

// type PositionType{
// }

//Computed properties(type O, interface X)
type Person = {
  name: string;
  age: number;
};
type Name = Person['name']; //string

//(type O, interface X)
type NumberType = number;
type Direction = 'left' | 'right';
