{
  //Java : Exception
  //JavaScript: Error
  const array = new Array(10000000000000000);
  //RangeError: Invalid array length > RangeError는 Error 클래스를 상속한 좀더 세부적인 에러 클래스

  //Error(Exception) Handling: try => catch => finally
  function readFile(fileName: string): string {
    if (fileName === "not exist!") {
      throw new Error(`file not exist! ${fileName}`);
    }
    return "file contents";
  }
  function closeFile(fileName: string) {
    //
  }
  const fileName = "not exist!";
  try {
    //try안에서는 이것저것 하지 말고 에러가 발생할 수 있는 코드만을 작성하자
    console.log(readFile(fileName));
  } catch (error) {
    console.log(`caught!`);
  } finally {
    //finally를 안쓰고 밑에 이어서 코드를 작성해도 되긴 하지만,
    //catch 문 안에서 에러가 발생한다던가 리턴이 된다던가 하면
    //아래 코드는 실행되지 않기 때문에 try와 관련된 후속 로직은 finally에 작성하는 것이 좋다.
    closeFile(fileName);
    console.log("finally!!");
  }
  console.log("!!!");

  //catched!!
  //!!!

  //2-types-projects/game.ts
  type Position = {
    x: number;
    y: number;
  };
  type Direction = "up" | "down" | "left" | "right";

  const position: Position = { x: 0, y: 0 };

  function move(direction: Direction): void {
    switch (direction) {
      case "up":
        position.y += 1;
        break;
      case "down":
        position.y -= 1;
        break;
      case "left":
        position.x -= 1;
        break;
      case "right":
        position.x += 1;
        break;
      default:
        const invalid: never = direction;
        //모든 direction을 case로 다뤄주면 그 나머지는 never가 됨
        //다루지 않았다면 컴파일 에러가 발생
        throw new Error(`Unknown direction: ${invalid}`);
    }
  }
}
