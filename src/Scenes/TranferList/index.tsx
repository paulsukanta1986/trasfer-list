import { Button } from "@/components/ui/button";
import { list } from "@/model/list-type";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaGreaterThan, FaLessThan, FaAngleDoubleLeft } from "react-icons/fa";


type Props = {
  srcList: list[];
  selectedList: list[];
  onChangeSelectedList: (data: list[]) => void;
  title: string;
  selectedTitle: string;
};

const TransferList = ({ srcList, selectedList, onChangeSelectedList, title, selectedTitle }: Props) => {
  const [leftList, setLeftList] = useState<list[]>([]);
  const [rightList, setRightList] = useState<list[]>([]);

  const [selectedLeftList, setSelectedLeftList] = useState<list[]>([]);
  const [selectedRightList, setSelectedRightList] = useState<list[]>([]);

  const [leftFilter, setLeftFilter] = useState("");
  const [rightFilter, setRightFilter] = useState("");

  const prepareList = () => {
    if (selectedList.length > 0) {
      let srcLeftList = srcList;
      selectedList.forEach((sl) => {
        let sll = srcLeftList.filter((i) => i.id !== sl.id);
        srcLeftList = [...sll];
      });

      setLeftList(srcLeftList);
      setRightList(selectedList);
    } else {
      setLeftList(srcList);
      setRightList(selectedList);
    }
  };

  useEffect(() => {
    prepareList();
  }, [srcList, selectedList]);

  const handleChangeLeftList = (e: any) => {
    if (e.target.checked == true) {
      let value = parseInt(e.target.value);
      let item = leftList.find((i) => i.id == value);
      setSelectedLeftList([...selectedLeftList, item!]);
    } else {
      let value = parseInt(e.target.value);
      let items = selectedLeftList.filter((i) => i.id !== value);
      setSelectedLeftList([...items]);
    }
  };

  const handleChangeRightList = (e: any) => {
    if (e.target.checked == true) {
      let value = parseInt(e.target.value);
      let item = rightList.find((i) => i.id == value);
      setSelectedRightList([...selectedRightList, item!]);
    } else {
      let value = parseInt(e.target.value);
      let items = selectedRightList.filter((i) => i.id !== value);
      setSelectedRightList([...items]);
    }
  };

  const sendToRight = (e: any) => {
    e.preventDefault();
    let selectedlList = selectedLeftList;
    setRightList([...rightList, ...selectedlList]);
    let existingLeftList = leftList;
    selectedlList.forEach((sl) => {
      let ls = existingLeftList.filter((i) => i.id !== sl.id);
      existingLeftList = [...ls];
    });

    setLeftList(existingLeftList);
    onChangeSelectedList([...rightList, ...selectedlList]);
    setSelectedLeftList([]);
  };

  const sendToLeft = (e: any) => {
    e.preventDefault();
    let selectedlList = selectedRightList;
    setLeftList([...leftList, ...selectedlList]);

    let existingRightList = rightList;

    selectedlList.forEach((sl) => {
      let llist = existingRightList.filter((i) => i.id !== sl.id);
      existingRightList = [...llist];
    });
    setRightList(existingRightList);
    onChangeSelectedList(existingRightList);
    setSelectedRightList([]);
  };

  const sendAllRight = (e: any) => {
    e.preventDefault();
    setRightList([...rightList, ...leftList]);
    onChangeSelectedList([...rightList, ...leftList]);
    setLeftList([]);
  };

  const sendAllLeft = (e: any) => {
    e.preventDefault();
    setLeftList([...leftList, ...rightList]);
    setRightList([]);
    onChangeSelectedList([]);
  };

  return (
    <div className="relative w-full grid grid-cols-11 gap-2 text-sm ">
      <div className="col-span-5 border bg-slate-100">
        <div className="flex gap-2 justify-between w-full bg-blue-900 text-white font-semibold p-2">
          <div>{title}</div>
          <div>
            {selectedLeftList.length > 0
              ? `Selected ${selectedLeftList.length} of ${leftList.length} Item(s)`
              : `${leftList.length} Item(s)`}
          </div>
        </div>
        <div className="h-48 overflow-y-auto">
          <div className="px-2 my-1">
            <input
              type="text"
              className="w-full border p-2"
              autoComplete="off"
              name="leftFilter"
              placeholder="Enter Keyword"
              value={leftFilter}
              onChange={(e) => setLeftFilter(e.target.value)}
            />
          </div>
          {leftList
            .filter((i) => i.text?.toLowerCase().includes(leftFilter))
            .map((l, index) => (
              <div key={l.id} className="px-2 py-1">
                <input
                  name={`lch-${index}`}
                  type="checkbox"
                  value={l.id}
                  onChange={handleChangeLeftList}
                  className={`mr-1 dark:accent-gray-500 }`}
                />
                {l.text}
              </div>
            ))}
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center gap-2 bg-blue-200">
        <Button
          className="text-xs"
          size={"icon"}
          disabled={leftList.length <= 0 || selectedLeftList.length > 0 || selectedRightList.length > 0 ? true : false}
          onClick={sendAllRight}
        >
          <FaAngleDoubleRight />
        </Button>
        <Button
          onClick={sendToRight}
          className="text-xs"
          size={"icon"}
          disabled={selectedLeftList.length > 0 ? false : true}
        >
          <FaGreaterThan />
        </Button>
        <Button
          onClick={sendToLeft}
          className="text-xs"
          size={"icon"}
          disabled={selectedRightList.length > 0 ? false : true}
        >
          <FaLessThan />
        </Button>
        <Button
          className="text-xs"
          size={"icon"}
          disabled={rightList.length <= 0 || selectedRightList.length > 0 || selectedLeftList.length > 0 ? true : false}
          onClick={sendAllLeft}
        >
          <FaAngleDoubleLeft />
        </Button>
      </div>

      <div className="col-span-5 border bg-slate-100">
        <div className="flex justify-between w-full bg-blue-900 text-white font-semibold p-2">
          <div>{selectedTitle}</div>
          <div>
            {selectedRightList.length > 0
              ? `Selected ${selectedRightList.length} of ${rightList.length} Item(s)`
              : `${rightList.length} Item(s)`}
          </div>
        </div>
        <div className="h-48 overflow-y-auto">
          <div className="px-2 my-1">
            <input
              type="text"
              className="w-full border p-2"
              autoComplete="off"
              name="rightFilter"
              placeholder="Enter Keyword"
              value={rightFilter}
              onChange={(e) => setRightFilter(e.target.value)}
            />
          </div>
          {rightList
            .filter((i) => i.text?.toLowerCase().includes(rightFilter))
            .map((l, index) => (
              <div key={l.id} className="px-2 py-1">
                <input
                  name={`rch-${index}`}
                  type="checkbox"
                  value={l.id}
                  onChange={handleChangeRightList}
                  className={`mr-1 dark:accent-gray-500 }`}
                />
                {l.text}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TransferList;
