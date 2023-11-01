import { observer } from "mobx-react-lite";
import interact from "interactjs";
import { useEffect, useRef } from "react";
import { state } from "./App";

export const Card = observer<{ position: any; id: any; content: any }>(
  ({ position, id, content }) => {
    const cardRef = useRef();
    useEffect(() => {
      const el = cardRef.current;
      if (!el) return;

      interact(".draggable").draggable({
        listeners: {
          move(event) {
            // const targetFromState = toJS(state.canvasData)[
            //   event.currentTarget.dataset.id
            // ];

            const newLocation = {
              x: position.x + event.dx,
              y: position.y + event.dy,
            };
            state.move(newLocation, id);

            el.style.transform = `translate(${newLocation.x}px, ${newLocation.y}px)`;
          },
        },
      });
    }, []);

    return (
      <div id={id} className="draggable" ref={cardRef}>
        {content}
      </div>
    );
  },
);
