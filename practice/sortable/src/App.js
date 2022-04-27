import SortableList from "./lib/SortableList";
import TestItem from "./TestItem/TestItem";
import { data } from "./TestItem/TestData";

function App() {
  const onDropItem = (newList) => {
    console.log(newList);
  };
  const onClickItem = (index) => {
    alert(index);
  };
  return (
    <SortableList
      data={data}
      renderItem={(item, index) => <TestItem data={item} index={index} />}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
    />
  );
}

export default App;
