import {
  DocumentIcon,
  FolderIcon,
  // DropdownArrowIcon,
} from "./components/icons";
import { useEffect, useState, useRef } from "react";
import "./index.css";

interface FolderOrFileProp {
  name: string;
  type: "file" | "folder";
  content?: any;
}

const FileComponent = (props: { name: string }) => {
  return (
    <div className="inline-flex w-full items-center gap-2 bg-slate-200 p-4 py-1">
      <DocumentIcon />
      <p>{props.name}</p>
    </div>
  );
};

const FolderComponent = (props: FolderProps) => {
  return (
    <div className="block w-full bg-slate-200 p-4 py-1">
      <div className="inline-flex w-full items-center gap-2">
        <details className="w-full cursor-pointer">
          <summary className="list-none">
            <div className="flex items-center gap-2">
              <FolderIcon />

              <p>{props.name}</p>
            </div>
          </summary>
        </details>
      </div>
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);
  const dataRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/data.json");
      const result = await response.json();

      console.log(result);

      const data = result.map((item: FolderProps) => {
        if (item.type === "file") {
          return <FileComponent name={item.name} />;
        } else if (item.type === "folder") {
          if (!item.content) return <FolderComponent name={item.name} />;

          return <FolderComponent name={item.name} />;
        }
      });

      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        className="flex h-2/3 w-1/2 flex-col overflow-hidden rounded-xl bg-slate-100"
        ref={dataRef}
      >
        {/* <FileComponent name="File 5" />
        <FolderComponent
          name="Folder 1"
          children={[
            <FileComponent name="File 6" />,
            <FileComponent name="File 7" />,
            <FolderComponent
              name="Subfolder 1"
              children={[
                <FileComponent name="File 8" />,
                <FileComponent name="File 9" />,
                <FolderComponent name="Subfolder 2" />,
              ]}
            />,
          ]}
        /> */}

        {data}
      </div>
    </div>
  );
}

export default App;
