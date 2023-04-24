console.log(this); //Window

function simpleFunc() {
  console.log(this);
}
simpleFunc();

class Counter {
  count = 0;
  // increase = function () {
  //   console.log(this);
  // };
  increase = () => {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase();

const caller = counter.increase;
caller(); //Counter

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
//const caller=counter.increase; //정보를 잃어버리지 않으려면 아래처럼 bind
//const caller = counter.increase.bind(counter);

bob.run(); //-> Counter
