{
  //   class TimeoutError extends Error {}
  //   class OfflineError extends Error {}
  type NetworkErrorState = {
    result: "fail";
    reason: "offline" | "down" | "timeout";
  };
  type SuccessState = {
    result: "success";
  };
  type ResultState = SuccessState | NetworkErrorState;

  class NetworkClient {
    tryConnect(): ResultState {
      //   throw new OfflineError("no network!"); -> 예상 가능한 에러는 ErrorState를 이용. throw Error 남용하면 안됨
      return { result: "fail", reason: "down" };
    }
  }
  class UserService {
    constructor(private client: NetworkClient) {}
    login(): ResultState {
      return this.client.tryConnect();
      //login...
    }
  }
  class App {
    constructor(private userService: UserService) {}
    run() {
      const returnData = this.userService.login();
      if (returnData.result === "success") {
        console.log("로그인 성공");
      } else {
        if (returnData.result === "fail") {
          console.log(`로그인 실패: ${returnData.reason}`);
        } else {
          console.error("네트워크가 아닌 다른 오류입니다.");
        }
      }
      //   try {
      //     this.userService.login();
      //   } catch (error) {
      //     // if (error instanceof OfflineError) {
      //     //   // ...
      //     // }
      //     //show dialog to user..
      //   }
    }
  }
  /**
   * <Ellie가 권고하는 방법:>
   * UserService에서 NetworkClient로 부터 발생할 수 있는 모든 네트워크 예외처리를 해주고,
   * 즉 try catch를 이용해 네트워크 통신에서 발생할 수 있는 모든 예외 처리를 해주고,
   * 최종적인 사용자인 App에게는 간략한 ErrorState를 주는게 좋음
   *
   * 예를들어, UserService에서 발생한 네트워크 예외 상황 중 timeout, socket 에러 등 네트워크 관련된 에러는 하나로 묶어서 ErrorState(네트워크불량상태)로 App에 알려줄 수 있고,
   * 아이디나 패스워드가 잘못들어간 건 ErrorState(로그인정보불일치상태)로,
   * 백엔드 서버에서 데이터베이스가 준비 안되었거나, 내부 서버문제는 ErrorState(서버문제)로 묶어 줄 수 있음
   *
   * 그럼 App에서는 예상되는 총 3개의 카테고리에 대해서만 각각 적절한 에러 처리를 해주면 됨!
   */
  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
