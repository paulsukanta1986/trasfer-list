import { useState } from "react";
import { list } from "./model/list-type";
import TransferList from "./Scenes/TranferList";
import { listData } from "./Scenes/Data/ListData";

function App() {
  const [selectedList, setSelectedList] = useState<list[]>([]);

  const handleSave = (data: list[]) => {
    setSelectedList(data);
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
      <div className="font-bold text-3xl capitalize text-white mb-5">TRANSFER LIST</div>
      <div className="w-[800px]">
        <TransferList
          srcList={listData}
          selectedList={selectedList}
          onChangeSelectedList={handleSave}
          title="List"
          selectedTitle="Selected List"
        />
      </div>
    </div>
  );
}

export default App;
