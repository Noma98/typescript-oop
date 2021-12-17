{
  // * Union Types: OR와 비슷 -> 활용도 굉장이 높음
  // 발생할 수 있는 다양한 케이스 중에 하나만 할당하고 싶을 때 사용
  type Direction = "left" | "right" | "up" | "down";
  function move(direction: Direction) {
    console.log(direction);
  }
  move("down"); // 자동완성이 뜸

  type TileSize = 8 | 16 | 24;
  const tile: TileSize = 8; // 8, 16, 24 외 다른 숫자는 정의할 수 없음.

  //function :login -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  //function login(id:string,password:string):Promise<LoginState> { => 활용 예시
  function login(): LoginState {
    //SuccessState | FailState 이런식으로 바로 넣기 보단 loginState로 분리
    return {
      response: {
        body: "logged in!",
      },
    };
  }

  //Quiz ____ 로그인하고 받은 state 출력
  //printLoginState(state)
  //success -> 🎉 body
  //fail => 🥲 reason
  function printLoginState(state: LoginState): void {
    // void는 생략 가능
    // 코드를 작성하는 시점에서는 FailState인지 SuccessState인지 알 수 없음
    if ("response" in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`🥲 ${state.reason}`); //loginState에 두 가지 밖에 없으니깐 typeScript가 똑똑하게 알아내고 추천까지 해줌
    }
    //하지만 이런 방식은 좋지 않음
  }
}
