import React, { useCallback } from "react";
import { useState } from "react";
import SortableListItem from "./SortableListItem";
import "./SortableList.css";

const SortableList = ({ data, onDropItem, onClickItem, renderItem }) => {
  const [listData, setListData] = useState(data);
  const [startIndex, setStartIndex] = useState(null);

  const onDragStart = (index) => {
    setStartIndex(index);
  };

  const onDrop = useCallback(
    (dropIndex) => {
      const dragItem = listData[startIndex];
      const tempList = [...listData];
      tempList.splice(startIndex, 1);
      const newListData =
        startIndex < dropIndex
          ? [
              ...tempList.slice(0, dropIndex - 1),
              dragItem,
              ...tempList.slice(dropIndex - 1, tempList.length),
            ]
          : [
              ...tempList.slice(0, dropIndex),
              dragItem,
              ...tempList.slice(dropIndex, tempList.length),
            ];
      setListData(newListData);
      onDropItem(newListData);
    },
    [startIndex, listData, onDropItem]
  );

  return (
    <ul className="sortable-list">
      {listData.map((item, index) => (
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDragStart={onDragStart}
          onDropItem={onDrop}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDrop}
      />
    </ul>
  );
};

export default SortableList;
