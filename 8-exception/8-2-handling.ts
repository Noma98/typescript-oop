{
  class TimeoutError extends Error {}
  class OfflineError extends Error {}

  class NetworkClient {
    tryConnect(): void {
      //여러 에러가 발생하는 곳에선 세부적인 에러를 리턴
      throw new OfflineError("no network!");
    }
  }
  class UserService {
    //Dependency Injection, Composition
    //클래스 내부에서 직접 생성해서 쓰는 것이 아니라, 외부에서 만들어진 인스턴스를 생성자에서 인자로 주입 받아서 사용
    constructor(private client: NetworkClient) {}
    login() {
      this.client.tryConnect();
      //login...
    }
  }
  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {
        //catch가 받아온 error는 any 타입이어서 아래와 같이 구분 불가
        //그래서 에러는 정말 예상치 못하는 경우에만 쓰고, 세부적인 에러를 처리해주고 싶을 땐 error state를 쓰자
        if (error instanceof OfflineError) {
          // ...
        }
        //show dialog to user..
      }
    }
  }
  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();

  /*
Error: no network!
    at NetworkClient.tryConnect
    at UserService.login
    at App.run
*/
  //다양한 곳에서 사용하다가 에러가 나면 어디서 try catch를 하는 것이 좋을까?
  //UserService 안에서 잡아버리면 유의미한 처리를 해줄 수 없음. App에서는 어떤 일이 일어났는지 알 수 없음.
  //따라서 애매한 곳에서 catch하지 말고 유의미한 처리가 가능한 곳에서 하는 게 좋음
}
