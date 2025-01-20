import { useState } from "react";
import { message } from "antd";
import "./App.css";
import door4 from "./assets/maxresdefault.jpg";
import Image2 from "./assets/96e 32b 319 3ec 66d 746 473 9d3 4c5 a0 d4 4dd 32b 32b 76f 497 3ec 3a7 4c5 3ec 8e0 3a7 319 238 4c5 d4 4dd a0 644 3a7 8e0 433 b6.jpg";
const aesAnswer = import.meta.env.VITE_AES_ANSWER;
const nAnswer = import.meta.env.VITE_N_ANSWER;
const rsaAnswer = import.meta.env.VITE_RSA_ANSWER;


const App = () => {
  const [ciphertext,] = useState(
    "c9dfd327699377f43853239164dd3e748387bb24653735b31454f25472e1dbfc"
  );
  const [decryptedText, setDecryptedText] = useState(""); 
  const [error, setError] = useState(""); 
  const [correct, setCorrect] = useState(""); //
  const [n, setN] = useState(""); 
  const [aesSubmitting, setAesSubmitting] = useState(""); //
  const [nSubmitting, setNSubmitting] = useState(""); //
  const [rsa, setRsa] = useState(""); //

  const [fileName, setFileName] = useState(""); 

  const handleMouseOver = (image: any) => {
    setFileName(image); 
  };

  const handleMouseOut = () => {
    setFileName(""); 
  };

  const handleSubmit = () => {
    setError("");
    if (decryptedText === aesAnswer) {
      message.success("Not Bad.");
      setAesSubmitting("true"); 
    } else {
      setError("Nope~");
      message.error("Nope~");
    }
  };

  const handleNSubmit = () => {
    setError("");
    if (n === nAnswer) {
      message.success("yeah.");
      setNSubmitting("true");
    } else {
      setError("Nope~");
      message.error("Nope~");
    }
  };

  const handleRsaSubmit = () => {
    if (rsa === rsaAnswer) {
      message.success("Good Job! 🎉", 10); // เพิ่มความยินดีใน popup
      // แสดง popup ข้อความใหญ่ๆ เมื่อคำตอบถูกต้อง
      message.info("🎉 Congratulations! You have completed the challenge!", 10); // ข้อความใหญ่ๆ
      setCorrect("Correct!");
    } else {
      setError("Nope~");
      message.error("Nope~");
    }
  };
 

  return (
    <div className="App">
      <h1>Kidchuemaiork</h1>
      <h1>CTF Challenge: Decrypt the Flag</h1>
      <div className="card">
        <p style={{fontSize: "12px"}}>
          H(<img src={door4} style={{ width: "500px" }} />)
        </p>
        {/* <div style={{backgroundColor: "white", zIndex: "0"}}> */}
          <pre style={{ color: "white", cursor: "default", fontSize: "12px"}}>{ciphertext}</pre>
        {/* </div> */}
        <input
          type="text"
          placeholder="Enter your answer"
          value={decryptedText}
          onChange={(e) => setDecryptedText(e.target.value)}
        />
        <button onClick={handleSubmit}>ยืนยันคำตอบ</button>
        {error && <p className="error">{error}</p>}

     
        {aesSubmitting === "true" && (
          <div>
          <p className="correct">Correct!</p>
          <hr/>
          <img 
              src={Image2} 
              style={{ width: "500px" }} 
              onMouseOver={() => handleMouseOver("96e 32b 319 3ec 66d 746 473 9d3 4c5 a0 d4 4dd 32b 32b 76f 497 3ec 3a7 4c5 3ec 8e0 3a7 319 238 4c5 d4 4dd a0 644 3a7 8e0 433 b6")} // เมื่อเมาส์มาที่ภาพ
              onMouseOut={handleMouseOut} // เมื่อเมาส์ออกจากภาพ
              title={fileName} // ใช้ title ในการแสดงชื่อไฟล์
          />
          <p style={{fontSize: "14px"}}><a style={{color: "red"}}>*Hint: </a>vxwklvwrub</p>
          <input
            type="text"
            placeholder="Enter your integer"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
          <button onClick={handleNSubmit}>ยืนยันคำตอบ</button>
          {error && <p className="error">{error}</p>}
        </div>
        )}


        
        {nSubmitting === "true" &&(
          <div>
            <p className="correct">Correct!</p>
          <hr/>
          <p>
            <p style={{fontSize: "14px"}}><a style={{color: "red"}}>*Hint: </a> "e = 3" and you can tranform HEX to DEC firt</p>
          </p>
          <input
            type="text"
            placeholder="Enter your answer"
            value={rsa}
            onChange={(e) => setRsa(e.target.value)}
          />
          <button onClick={handleRsaSubmit}>ยืนยันคำตอบ</button>
          {error && <p className="error">{error}</p>}
          {correct && <p className="correct">{correct}</p>}
        </div>
        )}
      </div>
    </div>
  );
};

export default App;
