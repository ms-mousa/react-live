import { docMap } from "./yobjects";
import { action, makeObservable, observable } from "mobx";

class ApplicationState {
  canvasData;

  constructor(map: any) {
    makeObservable(this, {
      canvasData: observable,
      updateContent: action,
      move: action,
    });
    this.canvasData = map.toJSON();
  }

  updateContent(content: any, targetId: any) {
    const target = this.canvasData[targetId];
    target.content = content;

    const blockMapObj = docMap.get(targetId);
    blockMapObj.set("content", content);
  }

  move(position: { x: number; y: number }, targetId: string) {
    const target = this.canvasData[targetId];
    // Update state
    target.position = position;

    const blockMapObj = docMap.get(targetId);
    const blockPositionMap = blockMapObj.get("position");
    blockPositionMap.set("y", position.y);
    blockPositionMap.set("x", position.x);
  }

  // sync(affectedArr) {

  //   affectedArr.map((e) => {
  //     this.canvasData[e] = docMap.get(e).toJSON();
  //     const editingCard = document.getElementById(e);
  //     editingCard.style.transform = `translate(${this.canvasData[e].position.x}px, ${this.canvasData[e].position.y}px)`;
  //     const textInput = editingCard.getElementsByTagName("input")[0];
  //     textInput.value = this.canvasData[e].content;
  //   });
  // }
}

export const applicationState = new ApplicationState(docMap);
