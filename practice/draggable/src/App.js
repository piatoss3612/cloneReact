import { useRef } from "react";
import { Draggable } from "./lib/Draggable";

function App() {
  const buttonRef = useRef(null);
  return (
    <>
      <Draggable handleRef={buttonRef} onMove={(x, y) => console.log(x, y)}>
        <div
          style={{ width: "100px", height: "100px", backgroundColor: "red" }}
        >
          <button ref={buttonRef}>Move</button>
        </div>
      </Draggable>
    </>
  );
}

export default App;
