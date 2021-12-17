{
  // 1-5와 비교 **
  // union 타입을 사용할 때 discriminated-union을 사용하면 어떤 케이스든 공통적인 프로퍼티를 가지고 있음으로서
  // 좀 더 직관적이고 구분하기 쉽게 짤 수 있다.

  // 동일한 result 키를 가지고 있지만 어떤 state인지에 따라 다른 값(타입)이 지정된다.
  type SuccessState = {
    result: "success";
    response: {
      body: string;
    };
  };
  type FailState = {
    result: "fail";
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  //function login(id:string,password:string):Promise<LoginState> { => 활용 예시
  function login(): LoginState {
    //SuccessState | FailState 이런식으로 바로 넣기 보단 loginState로 분리
    return {
      result: "success",
      response: {
        body: "logged in!",
      },
    };
    // return {
    //   result: "fail",
    //   reason: "fail...."
    // };
  }

  //Quiz ____ 로그인하고 받은 state 출력
  //printLoginState(state)
  //success -> 🎉 body
  //fail => 🥲 reason
  function printLoginState(state: LoginState): void {
    // void는 생략 가능
    // 코드를 작성하는 시점에서는 FailState인지 SuccessState인지 알 수 없음
    if (state.result === "success") {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`🥲 ${state.reason}`); //loginState에 두 가지 밖에 없으니깐 typeScript가 똑똑하게 알아내고 추천까지 해줌
    }
  }
}
