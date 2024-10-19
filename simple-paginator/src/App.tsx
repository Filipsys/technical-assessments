import { useState } from "react";
import {
  LeftArrow,
  FullLeftArrow,
  RightArrow,
  FullRightArrow,
  PlusIcon,
  MinusIcon,
} from "./components/icons";
import "./index.css";

const data = [
  { name: "Page 1" },
  { name: "Page 2" },
  { name: "Page 3" },
  { name: "Page 4" },
  { name: "Page 5" },
  { name: "Page 6" },
  { name: "Page 7" },
  { name: "Page 8" },
  { name: "Page 9" },
  { name: "Page 10" },
  { name: "Page 11" },
  { name: "Page 12" },
  { name: "Page 13" },
  { name: "Page 14" },
  { name: "Page 15" },
  { name: "Page 16" },
  { name: "Page 17" },
  { name: "Page 18" },
  { name: "Page 19" },
  { name: "Page 20" },
];

const PageComponent = (props: { name: string }) => {
  return (
    <div className="flex w-full flex-col bg-slate-300 px-4 pt-1">
      <p className="text-2xl">{props.name}</p>
      <div>
        <p>Text here</p>
        <p>Text here</p>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-2/3 w-1/2 flex-col rounded-xl">
        <div className="flex h-full flex-col gap-4 overflow-auto bg-slate-200 p-4">
          {data.map((element, index) => (
            <PageComponent name={element.name} key={index} />
          ))}
        </div>

        <div className="flex h-16 w-full flex-row items-center justify-between bg-slate-200 p-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="flex size-8 items-center justify-center bg-slate-100">
              <FullLeftArrow />
            </div>
            <div className="flex size-8 items-center justify-center bg-slate-100">
              <LeftArrow />
            </div>
            <div className="flex size-8 items-center justify-center bg-slate-100">
              <RightArrow />
            </div>
            <div className="flex size-8 items-center justify-center bg-slate-100">
              <FullRightArrow />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div>Max per page: {dataPerPage}</div>

            <div className="flex size-8 items-center justify-center bg-slate-100">
              <MinusIcon />
            </div>
            <div className="flex size-8 items-center justify-center bg-slate-100">
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
