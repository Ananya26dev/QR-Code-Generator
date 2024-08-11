import React, { useState } from "react";
import "./App.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import QRCode from "qrcode";
import { Card } from "primereact/card";
const App = () => {
  const [query, setQuery] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const generatorQrCode = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(query);
      setQrUrl(dataUrl);
    } catch (e) {
      console.error(e);
    }
  };
  const downloadQrCode = () => {
    try {
      const link = document.createElement("a");
      link.href = qrUrl;
      link.download = encodeURIComponent(query.substring(0, 6));
      document.body.appendChild(link);
      link.style.display = "none";
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <InputTextarea
        autoResize
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={5}
        cols={30}
      />
      <br />
      <Button label="Generate QRCode" onClick={generatorQrCode} />
      {qrUrl.length ? (
        <>
          <Card
            title="QR Code"
            style={{
              textAlign: "center",
              margin: "5vh auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img src={qrUrl} alt="qrcode" width={250} />
            <br />
            <Button label="Download" onClick={downloadQrCode} />
          </Card>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
