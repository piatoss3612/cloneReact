import React from "react";
import { useRef } from "react";

const SortableListItem = ({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
}) => {
  const itemRef = useRef(null);

  const dragStartHandler = () => {
    itemRef.current.classList.add("dragstart");
    onDragStart(index);
  };

  const dragEndHandler = () => {
    itemRef.current.classList.remove("dragstart");
  };

  const dragEnterHandler = () => {
    itemRef.current.classList.add("dragover");
  };

  const dragLeaveHandler = () => {
    itemRef.current.classList.remove("dragover");
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  const dropItemHandler = () => {
    itemRef.current.classList.remove("dragover");
    onDropItem(index);
  };

  return (
    <li
      ref={itemRef}
      className="item"
      draggable={draggable ? draggable : false}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropItemHandler}
      onClick={() => {
        onClickItem(index);
      }}
    >
      {children}
    </li>
  );
};

export default SortableListItem;
