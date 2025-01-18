import React, { useState } from "react";
import { Button, message } from "antd";
import "./App.css";
import door4 from "../src/assets/maxresdefault.jpg";

// สมมุติว่าเราใช้ public key และ private key แบบนี้
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz9ey1kXlmgtblKnkTn7YZv0fh7QqLHGon78E6Fg8hYbWxUpmYkcdV8AWbxJpnqVo2fXShOjrQw1wdUbcO2sGMCNRiHg3XndA9qmfFhw0fzyhZtZmCuv1AlIGmcwErgzf4s9XYFPWqH9EvZxMgy16YV4AJ5l1ylJfMN7FrIBF1Ns4cXVKdH9uFtm7L1kbiLM6qf9s
-----END PUBLIC KEY-----
`;

const privateKeyPartial = `
-----BEGIN PRIVATE KEY-----
MIIBOwIBAAJBALM4+hl0pCE2ZRMKekG5fwzndCZFdmmAqkBQxG1WbC61HY+5MCzH2BrsSDehxzw0tmOevGwA7fWB4KwL7KcFfP9YZWUqTPrjmtgpx3lQcIUbkHZLvVRXET2AKJkS1dvoeFzSHXqZ8fFsAq1mItmj9bp5T5HFu62yxwssO4tdEdF5pqH2ccqFgf8giKMHfhz6ynPKq2qZnFzY8m8YPV6KNzF5XMhGnKQgzZwUyFSad6g
-----END PRIVATE KEY-----
`;

const App = () => {
  const [ciphertext, setCiphertext] = useState(
    "6179c05f82f2d9804e34dc9421f8d7a3608196fad705b0f80ca77c0bbd6f2eae"
  );
  const [decryptedText, setDecryptedText] = useState(""); // ข้อความที่ผู้ใช้กรอก
  const [error, setError] = useState(""); // ข้อความแสดงข้อผิดพลาด
  const [privateKey, setPrivateKey] = useState(""); // คีย์ส่วนตัว RSA ที่ผู้ใช้กรอก
  const [aesSubmitting, setAesSubmitting] = useState(""); //

  const handleSubmit = () => {
    setError("");
    if (decryptedText === "flag{hmudengdengdeng}") {
      message.success("Not Bad.");
      setAesSubmitting("true"); // เปิดใช้งาน AES ในส่วนนี้
    } else {
      setError("Nope~");
      message.error("Nope~");
    }
  };

  const handleRsaSubmit = () => {
    if (privateKey === "private_key_12345") {
      message.success("Good Job!");
    } else {
      setError("Nope~");
      message.error("Nope~");
    }
  };

  const downloadFiles = () => {
    const blobPublicKey = new Blob([publicKey], { type: "application/x-pem-file" });
    const blobPrivateKey = new Blob([privateKeyPartial], { type: "application/x-pem-file" });

    // สร้างลิงค์สำหรับดาวน์โหลด
    const linkPublicKey = document.createElement("a");
    const linkPrivateKey = document.createElement("a");

    linkPublicKey.href = URL.createObjectURL(blobPublicKey);
    linkPrivateKey.href = URL.createObjectURL(blobPrivateKey);

    linkPublicKey.download = "public_key.pem";
    linkPrivateKey.download = "private_key.pem";

    // คลิกเพื่อดาวน์โหลดทั้งสองไฟล์
    linkPublicKey.click();
    linkPrivateKey.click();
  };


  return (
    <div className="App">
      <h1>CTF Challenge: Decrypt the Flag</h1>
      <div className="card">
        <p>
          <img src={door4} style={{ width: "500px" }} />
        </p>
        <pre style={{ color: "white", cursor: "default" }}>{ciphertext}</pre>
        <input
          type="text"
          placeholder="Enter decrypted text (flag)"
          value={decryptedText}
          onChange={(e) => setDecryptedText(e.target.value)}
        />
        <button onClick={handleSubmit}>ยืนยันคำตอบ AES</button>
        {error && <p className="error">{error}</p>}

        {/* หลังจากถอดรหัส AES จะให้ดาวน์โหลด publicKey และ privateKey */}
        {aesSubmitting === "true" && (
          <div>
          {/* <h2>ขั้นตอนที่ 2: RSA Decryption</h2> */}
          <input
            type="text"
            placeholder="Enter your private key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <button onClick={handleRsaSubmit}>ยืนยันคำตอบ RSA</button>
          <Button
            onClick={downloadFiles}
            type="primary"
            style={{marginLeft: '20px'}}
          >
            Download
          </Button>
        </div>
        )}
      </div>
    </div>
  );
};

export default App;
