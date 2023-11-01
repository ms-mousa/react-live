import { observer } from "mobx-react-lite";
import interact from "interactjs";
import { useEffect, useRef } from "react";

export const Card = observer(() => {
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
            x: 0 + event.dx,
            y: 0 + event.dy,
          };
          // state.move(newLocation, targetFromState.id);

          el.style.transform = `translate(${newLocation.x}px, ${newLocation.y}px)`;
        },
      },
    });
  }, []);

  return (
    <div className="draggable" ref={cardRef}>
      mahmoud
    </div>
  );
});
