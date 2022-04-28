import { Draggable } from "@piatoss/draggable-test";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import { useRef } from "react";

export const Memo = ({ item, Delete, Edit, SetPosition, SetWidthHeight }) => {
  const handleRef = useRef(null);
  return (
    <Draggable handleRef={handleRef} onMove={(x, y) => console.log(x, y)}>
      <div
        className="memo-container"
        style={{ width: `${250}px`, height: `${300}px` }}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: "move", fontSize: "25px" }}
          />
          <CloseIcon
            sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
          />
        </div>
        <textarea
          className="memo-text-area"
          defaultValue={"Enter memo here"}
          name="txt"
          placeholder="Enter memo here"
        ></textarea>
      </div>
    </Draggable>
  );
};
