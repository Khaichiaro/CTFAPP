import { useState } from "react";
import { message } from "antd"; // Import message จาก Ant Design
import "./App.css";
import door4 from "../src/assets/maxresdefault.jpg";

function App() {
  const [ciphertext, setCiphertext] = useState(
    "6179c05f82f2d9804e34dc9421f8d7a3608196fad705b0f80ca77c0bbd6f2eae" // ตัวอย่างข้อความเข้ารหัส
  );
  const [decryptedText, setDecryptedText] = useState(""); // ข้อความถอดรหัสที่ผู้ใช้กรอก
  const [error, setError] = useState(""); // ข้อความแสดงข้อผิดพลาด

  // ฟังก์ชันจัดการเมื่อผู้ใช้กรอกข้อความที่ถอดรหัสแล้ว
  const handleSubmit = () => {
    setError("");
    if (decryptedText === "flag{hmudengdengdeng}") {
      message.success("ถูกต้อง! คุณถอดรหัสได้"); // ใช้ message.success() จาก Ant Design
    } else {
      setError("ข้อความที่กรอกไม่ถูกต้อง");
      message.error("ข้อความที่กรอกไม่ถูกต้อง"); // ใช้ message.error() จาก Ant Design
    }
  };

  return (
    <div className="App">
      <h1>CTF Challenge: Decrypt the Flag</h1>
      <div className="card">
        <p><img src={door4} style={{ width: "500px" }} /></p>
        <p>Cyphertext:</p>
        <pre style={{ color: "white", cursor: "default" }}>{ciphertext}</pre>
        <input
          type="text"
          placeholder="Enter decrypted text (flag)"
          value={decryptedText}
          onChange={(e) => setDecryptedText(e.target.value)} // ให้ผู้ใช้กรอกข้อความที่ถอดรหัสมา
        />
        <button onClick={handleSubmit}>ยืนยันคำตอบ</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
