import { useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js"; // Import ไลบรารี

function App() {
  // State สำหรับเก็บข้อมูล
  const [ciphertext, setCiphertext] = useState(
    "58d1ab7d7d63ea167c99ad4e5aaba2959128a4e1dd66d72d0c6cd3764d8c7262" // ตัวอย่างข้อความเข้ารหัสด้วย AES
  );
  const [key, setKey] = useState("d5136db9b22bfe6b378d371470b477bbf1d461c72b44b17b7b26c2d1ab37212e"); // กำหนดคีย์ที่แฮช
  const [decryptedText, setDecryptedText] = useState(""); // ข้อความถอดรหัส
  const [error, setError] = useState(""); // ข้อความแสดงข้อผิดพลาด

  // ฟังก์ชันถอดรหัส AES
  const decryptAES = (ciphertext: string, key: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
      console.log("Decrypted bytes:", bytes.toString(CryptoJS.enc.Base64)); // ตรวจสอบข้อมูลที่ถอดรหัสออกมา
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Plaintext:", plaintext);
      if (!plaintext) throw new Error("Invalid key or ciphertext");
      return plaintext;
    } catch (err) {
      setError((err as Error).message);
      return "";
    }
  };
  

  // ฟังก์ชันจัดการเมื่อผู้ใช้กดปุ่ม "ถอดรหัส"
  const handleDecrypt = () => {
    setError("");
    const result = decryptAES(ciphertext, key);
    setDecryptedText(result);
  };

  return (
    <div className="App">
      <h1>CTF Challenge: Decrypt the Flag</h1>
      <div className="card">
        <p>ข้อความเข้ารหัส:</p>
        <pre>{ciphertext}</pre>
        <input
          type="text"
          placeholder="Enter decryption key"
          value={key}
          onChange={(e) => setKey(e.target.value)} // ให้ผู้ใช้สามารถกรอกคีย์ได้
        />
        <button onClick={handleDecrypt}>ถอดรหัส</button>
        {decryptedText && (
          <p>
            <strong>ข้อความที่ถอดรหัสได้:</strong> {decryptedText}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
