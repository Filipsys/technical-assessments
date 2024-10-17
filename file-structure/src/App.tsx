import {
  DocumentIcon,
  FolderIcon,
  // DropdownArrowIcon,
} from "./components/icons";
import { useEffect, useState, useRef } from "react";
import "./index.css";

interface File {
  name: string;
  type: "file";
}

interface Folder {
  name: string;
  type: "folder";
  content?: FolderOrFileProp[];
}

type FolderOrFileProp = File | Folder;

const FileComponent = (props: { name: string }) => {
  return (
    <div className="inline-flex w-full items-center gap-2 bg-slate-200 px-4 py-1">
      <DocumentIcon />
      <p>{props.name}</p>
    </div>
  );
};

const FolderComponent = (props: FolderOrFileProp) => {
  let folderContent;
  if (props.type === "folder") folderContent = props.content;

  return (
    <div className="inline-flex w-full bg-slate-200 px-4 py-1">
      <div className="inline-flex w-full items-center gap-2">
        <details className="w-full cursor-pointer">
          <summary className="list-none">
            <div className="flex items-center gap-2">
              <FolderIcon />

              <p>{props.name}</p>
            </div>
          </summary>

          {props.type === "file" ? <FileComponent name={props.name} /> : null}

          {props.type === "folder" && folderContent ? (
            <>
              {folderContent.map((item: FolderOrFileProp, index) => {
                return (
                  <>
                    {item.type === "file" ? (
                      <FileComponent
                        name={item.name}
                        key={`${item.name}-${index}`}
                      />
                    ) : null}

                    {item.type === "folder" && item.content ? (
                      <FolderComponent
                        name={item.name}
                        type="folder"
                        content={item.content}
                        key={`${item.name}-${index}`}
                      />
                    ) : null}

                    {item.type === "folder" && !item.content ? (
                      <FolderComponent
                        name={item.name}
                        type="folder"
                        key={`${item.name}-${index}`}
                      />
                    ) : null}
                  </>
                );
              })}
            </>
          ) : null}
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

      const data = result.map((item: FolderOrFileProp, index) => {
        if (item.type === "file") {
          return (
            <FileComponent name={item.name} key={`${item.name}-${index}`} />
          );
        } else if (item.type === "folder") {
          if (!item.content)
            return (
              <FolderComponent
                name={item.name}
                type="folder"
                key={`${item.name}-${index}`}
              />
            );

          return (
            <FolderComponent
              name={item.name}
              type="folder"
              content={item.content}
              key={`${item.name}-${index}`}
            />
          );
        }
      });

      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="flex h-screen w-full select-none items-center justify-center">
      <div
        className="flex h-2/3 w-1/2 flex-col overflow-hidden rounded-xl bg-slate-100"
        ref={dataRef}
      >
        {data}
      </div>
    </div>
  );
}

export default App;
