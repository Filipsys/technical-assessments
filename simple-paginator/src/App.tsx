import { useState, useEffect, useRef } from "react";
import {
  LeftArrow,
  FullLeftArrow,
  RightArrow,
  FullRightArrow,
  PlusIcon,
  MinusIcon,
} from "./components/icons";
import "./index.css";

interface dataElement {
  name: string;
  description: string;
}

const PageComponent = (props: { name: string; description: string }) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-slate-300 p-2 px-4">
      <p className="text-2xl">{props.name}</p>
      <p className="text-sm">{props.description}</p>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(2);
  const [data, setData] = useState<dataElement[]>([]);
  const maxPerPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (maxPerPageRef.current) {
      maxPerPageRef.current.innerHTML = `Max per page: ${dataPerPage}`;
    }
  }, [dataPerPage]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("./data.json");
      const responseData = await response.json();

      setData(responseData);
    };

    getData();
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-2/3 w-1/2 flex-col">
        <div className="relative h-full rounded-t-xl bg-slate-200 p-4">
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-slate-200" />

          <div className="flex h-full flex-col gap-4 overflow-auto">
            {data.map((element, index) => {
              return (
                <>
                  {index < dataPerPage * currentPage &&
                    index >= dataPerPage * (currentPage - 1) && (
                      <PageComponent
                        name={element.name}
                        description={element.description}
                        key={index}
                      />
                    )}
                </>
              );
            })}
          </div>
        </div>

        <div className="flex h-16 w-full flex-row items-center justify-between rounded-b-xl bg-slate-200 p-4">
          <div className="flex flex-row items-center justify-center gap-1">
            <button
              className="flex size-8 items-center justify-center rounded-md bg-slate-100 active:bg-slate-300"
              onClick={() => setCurrentPage(1)}
            >
              <FullLeftArrow />
            </button>
            <button
              className="flex size-8 items-center justify-center rounded-md bg-slate-100 active:bg-slate-300"
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              <LeftArrow />
            </button>

            <div className="select-none px-2">
              <p>Page {currentPage}</p>
            </div>

            <button
              className="flex size-8 items-center justify-center rounded-md bg-slate-100 active:bg-slate-300"
              onClick={() =>
                currentPage < data.length / dataPerPage &&
                setCurrentPage(currentPage + 1)
              }
            >
              <RightArrow />
            </button>
            <button
              className="flex size-8 items-center justify-center rounded-md bg-slate-100 active:bg-slate-300"
              onClick={() =>
                setCurrentPage(Math.ceil(data.length / dataPerPage))
              }
            >
              <FullRightArrow />
            </button>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div ref={maxPerPageRef} className="select-none px-2">
              Max per page: {dataPerPage}
            </div>

            <button
              className="box-border flex size-8 items-center justify-center rounded-md bg-slate-100 active:bg-slate-300"
              onClick={() => (
                console.log(dataPerPage),
                dataPerPage > 1 && setDataPerPage(dataPerPage - 1)
              )}
            >
              <MinusIcon />
            </button>
            <button
              className="flex size-8 items-center justify-center rounded-md bg-slate-100 active:bg-slate-300"
              onClick={() => (
                console.log(dataPerPage),
                dataPerPage < data.length && setDataPerPage(dataPerPage + 1)
              )}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
