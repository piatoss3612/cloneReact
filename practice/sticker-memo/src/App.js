import { observer } from "mobx-react";
import { Memo } from "./components/Memo";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";

const App = ({ store }) => {
  const addMemo = useCallback(() => store.addMemo(), [store]);

  const editMemo = useCallback(
    (id, content) => store.editMemo(id, content),
    [store]
  );

  const setWidthHeight = useCallback(
    (id, width, height) => {
      store.setWidthHeight(id, width, height);
    },
    [store]
  );

  const setPosition = useCallback(
    (id, x, y) => {
      store.setPosition(id, x, y);
    },
    [store]
  );

  return (
    <>
      {store.memos.map((memo) => (
        <Memo
          key={memo.id}
          item={memo}
          Edit={editMemo}
          SetPosition={setPosition}
          SetWidthHeight={setWidthHeight}
        />
      ))}
      <AddIcon
        sx={{
          float: "right",
          backgroundColor: "#e4e4e4",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "30px",
          border: "1px solid black",
        }}
        onClick={addMemo}
      />
    </>
  );
};

export default observer(App);
