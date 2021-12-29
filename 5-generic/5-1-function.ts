{
  // function checkNotNull(arg: number | null): number {
  //   if (arg == null) {
  //     throw new Error("not valid number!");
  //   }
  //   return arg;
  // }

  function checkNotNullAnyBad(arg: any | null): any {
    if (arg == null) {
      throw new Error("not valid number!");
    }
    return arg;
  }

  const result = checkNotNullAnyBad(123); //이렇게 하면 타입의 정보가 사라지므로 BAD 💩
  console.log(result);
  checkNotNull(null);

  // 제네릭을 이용하면 어떤 타입이든지 받을 수 있고, 제네릭을 사용할 때 타입이 결정되기 때문에 타입을 더 보장 받을 수 있다.
  // 무슨 타입인지는 지금은 모르나, 쓰는 사람이 결정할 수 있다.
  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error("not valid number!");
    }
    return arg;
  }
  const number = checkNotNull(123); //컴파일시 number 타입을 리턴한다고 결정됨
  const boal: boolean = checkNotNull(true);
}
