import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { decompressLZW, compressLZW } from "./utils";
import "./App.css";

export default function App() {
  const [toDecompres, setToDecompress] = useState<string>("");
  const [decompressed, setDecompressed] = useState<string>("");

  const [toCompress, setToCompress] = useState<string>("");
  const [compressed, setCompressed] = useState<string>("");

  useEffect(() => {
    //@ts-ignore
    setDecompressed(decompressLZW(decodeURIComponent(toDecompres)));
  }, [toDecompres]);

  useEffect(() => {
    let obj;
    try {
      obj = JSON.parse(toCompress);
      setCompressed(compressLZW(obj));
    } catch (e) {}
  }, [toCompress]);

  const handleCopy = async (data: string) => {
    await window.navigator.clipboard.writeText(data);
  };
  return (
    <>
      <div>
        <h1>Decompress data</h1>
        <textarea
          rows={3}
          value={toDecompres}
          onChange={(event) => setToDecompress(event.target.value)}
        ></textarea>
      </div>
      {decompressed && (
        <div className="json-container">
          <button onClick={() => handleCopy(decompressed)}>Copy</button>
          <SyntaxHighlighter>
            {decompressed
              ? JSON.stringify(JSON.parse(decompressed), null, 3)
              : ""}
          </SyntaxHighlighter>
        </div>
      )}
      <div>
        <h1>Compress data</h1>
        <textarea
          rows={20}
          value={toCompress}
          onChange={(event) => setToCompress(event.target.value)}
        ></textarea>
      </div>
      {compressed && (
        <div className="json-container">
          <button onClick={() => handleCopy(compressed)}>Copy</button>
          <SyntaxHighlighter>{compressed}</SyntaxHighlighter>
        </div>
      )}
    </>
  );
}
