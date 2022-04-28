import { Draggable } from "@piatoss/draggable-test";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import { useEffect, useMemo, useRef } from "react";
import { debounce } from "underscore";

export const Memo = ({ item, Delete, Edit, SetPosition, SetWidthHeight }) => {
  const handleRef = useRef(null);

  const onChangeMemo = useMemo(
    () => debounce((e) => Edit(item.id, e.target.value), 500),
    [item.id, Edit]
  );

  useEffect(() => {
    return () => {
      onChangeMemo.cancel();
    };
  }, [onChangeMemo]);

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
          defaultValue={item.content}
          name="txt"
          placeholder="Enter memo here"
          onChange={onChangeMemo}
        ></textarea>
      </div>
    </Draggable>
  );
};
