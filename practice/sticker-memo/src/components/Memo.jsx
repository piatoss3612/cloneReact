import { Draggable } from "@piatoss/draggable-test";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { debounce } from "underscore";
import { observer } from "mobx-react";

export const Memo = observer(
  ({ item, Delete, Edit, SetPosition, SetWidthHeight }) => {
    const handleRef = useRef(null);
    const memoContainer = useRef(null);

    const onChangeMemo = useMemo(
      () => debounce((e) => Edit(item.id, e.target.value), 500),
      [item.id, Edit]
    );

    const onChangeSize = useMemo(
      () =>
        debounce((entry) => {
          const { width, height } = entry[0].contentRect;
          SetWidthHeight(item.id, width, height);
        }, 100),
      [item.id, SetWidthHeight]
    );

    useEffect(() => {
      return () => {
        onChangeMemo.cancel();
        onChangeSize.cancel();
      };
    }, [onChangeMemo, onChangeSize]);

    useLayoutEffect(() => {
      let RO = new ResizeObserver(onChangeSize);
      RO.observe(memoContainer.current);
      return () => {
        RO.disconnect();
        RO = null;
      };
    }, []);

    const onChangePosition = useCallback(
      (x, y) => {
        SetPosition(item.id, x, y);
      },
      [item.id, SetPosition]
    );

    const deleteMemo = useCallback(() => {
      Delete(item.id);
    }, [Delete, item.id]);

    return (
      <Draggable
        handleRef={handleRef}
        onMove={onChangePosition}
        x={item.x}
        y={item.y}
      >
        <div
          ref={memoContainer}
          className="memo-container"
          style={{ width: `${item.width}px`, height: `${item.height}px` }}
        >
          <div className="menu">
            <DragHandleIcon
              ref={handleRef}
              sx={{ cursor: "move", fontSize: "25px" }}
            />
            <CloseIcon
              sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
              onClick={deleteMemo}
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
  }
);
