import React, { useState } from "react";
import { Button, message } from "antd";
import "./App.css";
import door4 from "../src/assets/maxresdefault.jpg";

// สมมุติว่าเราใช้ public key และ private key แบบนี้
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmlyHkl7qTaEr33cTG4bdFKhbLnatYb/Ahb2pJleEAOhgj1+urSnNhLzy5hGpaolpctmEy/3SxFTxF6/nEo9yHnyOYGtguSWD3VEQOvaEg3woE0JRqW1PvXazhzq57uKygWayVcYNBdkZ9uEuC1VIBuVN61w/Utyyy1AIg1Y2056wAIVliX3CrRQL7FtgbA015qtONPePlmGw/siRiDnPfbVLeVXeYnsNJjbvT59M2WpuDewUVlqy1E8t9gOrCehhRdazNDjb2edw755tiUoWBhXvRvOpADvTjRhxpb1Hwu2lUnvXVBLROiNDWpVgrcwyAQz0Ep7HVgezeZzdo+/uBwIDAQAB
-----END PUBLIC KEY-----
`;

const privateKeyPartial = `
-----BEGIN RSA PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaXIeSXupNoSvfdxMbht0UqFsudq1hv8CFvakmV4QA6GCPX66tKc2EvPLmEalqiWly2YTL/dLEVPEXr+cSj3IefI5ga2C5JYPdURA69oSDfCgTQlGpbU+9drOHOrnu4rKBZrJVxg0F2Rn24S4LVUgG5U3rXD9S3LLLUAiDVjbTnrAAhWWJfcKtFAvsW2BsDTXmq04094+WYbD+yJGIOc99tUt5Vd5iew0mNu9Pn0zZam4N7BRWWrLUTy32A6sJ6GFF1rM0ONvZ53Dvnm2JShYGFe9G86kAO9ONGHGlvUfC7aVSe9dUEtE6I0NalWCtzDIBDPQSnsdWB7N5nN2j7+4HAgMBAAECggEAMsU3VBXC49iceQoNr1Ka2aYMI4qmOU3b8UEx5uoHAVNtGwsiBVOIBN4u2Cw7+E4M8FkJ/BxWm/vCNoPFMU4b/1oBbEY1EIB90CfO+k3FxQdrmPYJrPvGq+7kWpieuis3Aie4hUy4UNGY4CItRk38/EOkbsKvEz6C0itXOXd8XfrDWPchnCskVZ7L+52UNhIF4GGdh0eOSjg+4kNLfv1H5ni5ceDAvIRtYWH3AqzCsA6ZUPnMsfuWrH82yLM0zNyv8GB249RA48IFyyZkyqOe+lZHPV/AeXDZmYGuaIeO/2OKEgnGem8o5r7ar0PmDrROJYCRTur/Xk2RgTHRYc7BGQKBgQDN3/dsp7DHTcoUggF6QcfpHl5Fyqe6m58gUz9VcixQuTvI4ysEgWsb967Rmz01nb5Q8MXX++xbhAlP7p//yptANbGbrYwvfHafnDJilgshltZLvRIlna9l+lVW8lF3Ldld8f8uB+xZqMLrPQM3Ya/ReR7BTX5h+B94lus7IcQBWQKBgQC/8cSgSX1nlIdmxNMBBAUuKRTFFvT3JPlWZJKsXg+9ug7BPq2aITpjqOzJc81uOS5KpA6Zj6nKxKf/fEg5BqU8adkOeQtzHXVDxqHKLSTd+hj39y3EVZHfcfTWX7eddJXNbIsSsoK35CIpHpdgi3LqZ8vp5CNO5jHRZyKAIAMeXwKBgF/aJAe5t4vDww9zTB7Q27PFCN1zsk4mwJq7R6SPyOQ4qgYpBlFNtEHMOt+qaIA7Fm32/BZIW85sFi3aCzJ78XaeyTeTQM6nI0/C2I6gD0SvRszyla1f0lcni2402gskFK0xy75xv/Aqq738pS+20rYzr0cOvoX8kSKDGbhpSynZAoGBAKBFvXxlwOvzjtgWM2ZeuACiVvB3SdbwLa6gzgRVimlO6bEcqBLR+hJrZESWiIun/Wpf8Lzyw8FHUkw3t4q+bMy0SYUXN6NIjrkoK8JIzcb4ZU7wO2v8U5Czc9BpHkXAqrFcGAhlvFbWjFuvapE3/52RTCih0YW5GxISPzGjCVebAoGAP6b4Okld1EfTq0B1p6e0j1smxK7mM0uXEgCkmozkW8pGQDwtvjQJeFPAgVZ6uRKVp7IJ8LX3S/c2Ud5wubzMxPxdXoCgxKKjHQuQC9rJZDvLsqSxFvH3/mMjc9ugkz3C9Mpwy1WcJG1LGJ1VXasA164tKQneMiuOqerG9rOt2Vw=
-----END RSA PRIVATE KEY-----
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
