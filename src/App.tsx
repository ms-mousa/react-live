import "./App.css";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { Card } from "./Card";

const doc = new Y.Doc();

// const provider = new WebsocketProvider("ws://localhost:1234", " mousa", doc);
// provider.connect();
// const docMap = doc.getMap("documentData");
// provider.on("status", (event) => {
// console.log(event.status); // logs "connected" or "disconnected"
// });

class ApplicationState {
  canvasData = {
    "1": {
      id: 1,
      position: { x: 0, y: 0 },
      locked: false,
      content: "THIS IS draggable 03",
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  move(position: { x: number; y: number }, id: string) {
    // @ts-ignore
    this.canvasData[id].position = position;
  }
}

export const state = new ApplicationState();

const App = observer(({ state }: { state: ApplicationState }) => (
  <>
    {Object.values(state.canvasData).map((block) => (
      <Card
        key={block.id}
        position={block.position}
        id={block.id}
        content={block.content}
      />
    ))}
    <span>seconds past: </span>
  </>
));

export default App;
