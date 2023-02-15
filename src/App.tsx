import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { decompressLZW, compressLZW } from "./utils";
import "./styles.css";

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
      <SyntaxHighlighter>
        {decompressed ? JSON.stringify(JSON.parse(decompressed), null, 3) : ""}
      </SyntaxHighlighter>

      <div>
        <h1>Compress data</h1>
        <textarea
          rows={20}
          value={toCompress}
          onChange={(event) => setToCompress(event.target.value)}
        ></textarea>
      </div>
      <SyntaxHighlighter>{compressed ? compressed : ""}</SyntaxHighlighter>
    </>
  );
}
