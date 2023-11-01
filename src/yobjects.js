import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const doc = new Y.Doc();
const provider = new WebsocketProvider("ws://localhost:1234", " mousa", doc);
const awareness = provider.awareness;
provider.connect();
export const docMap = doc.getMap("documentData");
provider.on("status", (event) => {
  console.log(event.status); // logs "connected" or "disconnected"
});

provider.on("status", (event) => {
  if (event.status === "connected") {
    const bodyEl = document.getElementsByTagName("body")[0];
    bodyEl.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      awareness.setLocalState("cursor", {
        y: mouseY,
        x: mouseX,
      });
    });
    if (docMap.size === 0) {
      blocks.map((b) => {
        const blockMap = new Y.Map();
        const positionYMap = new Y.Map();
        positionYMap.set("x", b.position.x);
        positionYMap.set("y", b.position.y);
        blockMap.set("content", b.content);
        blockMap.set("position", positionYMap);
        blockMap.set("id", b.id);
        docMap.set(b.id, blockMap);
      });
    }

    // const canvasCon = document.getElementById("canvas");
    // renderCards(docMap.toJSON(), canvasCon);

    docMap.observeDeep((ymapEvent) => {
      const affectedBlocks = [];
      ymapEvent.forEach((yEvent) => {
        const parentId = yEvent.target.parent.toJSON()["id"];
        const objectId = yEvent.target.toJSON()["id"];
        if (parentId) {
          affectedBlocks.push(parentId);
        } else {
          affectedBlocks.push(objectId);
        }
      });
      ymapEvent[0].changes.keys.forEach((change, key) => {
        // if (change.action === 'update') {
        //   console.log(
        //     `Property "${key}" was updated. New value: "${docMap.get(key)}". Previous value: "${change.oldValue
        //     }".`
        //   )
        // }
      });
      runInAction(() => {
        state.sync(affectedBlocks);
      });
    });
  }
});
