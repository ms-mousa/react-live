import "./App.css";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { Card } from "./Card";

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export const myTimer = new Timer();

const App = observer(({ timer }: { timer: Timer }) => (
  <>
    <Card />
    <span>seconds past: {timer.secondsPassed}</span>
  </>
));

export default App;

setInterval(() => {
  myTimer.increaseTimer();
}, 1000);
