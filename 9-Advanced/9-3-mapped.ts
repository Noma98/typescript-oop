{
  /**
   * Map type
   * 기존에 있는 타입들을 이용하면서 조금 다른 형태로 변환할 수 있는 것을 말함
   * 재사용성이 높음
   */
  type Video = {
    title: string;
    author: string;
  };

  type Optional<T> = {
    [P in keyof T]?: T[P];
    //for...in 과 비슷 : 오브젝트에 있는 모든 키들을 하나씩 도는 연산자
    //타입 안에서 [] 기호를 쓰면 키를 반복해서 순회할 수 있음
    //T타입의 모든 키들은 순차적으로 P가 되고, P에는 T오브젝트의 P라는 키에 해당하는 타입을 맵핑함
  };
  type VideoOptional = Optional<Video>;

  // 아래와 같이 일일이 정의 하지 않고도 기존 Video 타입을 변형해서 쓸 수 있음
  // type VideoOptional={
  //   title?:string;
  //   author?:string;
  // }

  const videoOp: VideoOptional = {
    title: 'Frozen',
  };
  videoOp.title = 'jinhee'; //변경가능함
  //--------------------------------------------

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };
  const video: ReadOnly<Video> = {
    title: 'Frozen',
    author: 'noma',
  };
  // video.author='' -> 변경 불가

  // 아래와 같이 일일이 정의 하지 않고도 기존 Video 타입을 변형해서 쓸 수 있음
  // type VideoReadOnly={
  //   readonly title:string;
  //   readonly author:string;
  // }
  //---------------------------------------------

  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };
  const obj2: Nullable<Video> = {
    title: null,
    author: null,
  };
  //---------------------------------------------

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>; //Proxy라는 타입으로 한단계 감쌈
  };
}
