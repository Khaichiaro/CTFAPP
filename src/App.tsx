import React, { useState } from "react";
import { Button } from "antd";

// ฟังก์ชันสำหรับสร้างโจทย์ RSA จำลอง
const generateRSAChallenge = (plaintext: string): { n: string; e: string; c: string } => {
  // เลือกจำนวนเฉพาะให้ได้ n = 2533
  const p = 17; // prime number 1
  const q = 149; // prime number 2

  // คำนวณ n = p * q
  const n = BigInt(p * q); // n = 2533

  // กำหนดค่า e (Public Exponent) โดยใช้ค่า 65537
  const e = 3;

  // แปลงข้อความเป็นรหัส ASCII
  const message = plaintext.split("").map((char) => BigInt(char.charCodeAt(0)));

  // การเข้ารหัส: ใช้ modular exponentiation
  const encrypted = message.map((m) => modExp(m, BigInt(e), n));

  // แปลงค่าที่เข้ารหัสเป็นฐาน 10
  const c = encrypted.map((num) => num.toString(10)).join(" ");

  // ส่งโจทย์กลับ
  return { n: n.toString(), e: e.toString(), c };
};

// ฟังก์ชันสำหรับคำนวณ modular exponentiation
const modExp = (base: BigInt, exponent: BigInt, modulus: BigInt): BigInt => {
  let result = BigInt(1);
  base = base % modulus;

  while (exponent > 0) {
    if (exponent % BigInt(2) === BigInt(1)) {
      result = (result * base) % modulus;
    }
    exponent = exponent / BigInt(2);
    base = (base * base) % modulus;
  }

  return result;
};

const App: React.FC = () => {
  const [challenge, setChallenge] = useState<{ n: string; e: string; c: string } | null>(null);

  // ฟังก์ชันสำหรับสร้างโจทย์
  const handleGenerateChallenge = () => {
    const plaintext = "flag{SUT_ch@lleng3_gr3at_h@ck3rs}"; // ข้อความต้นฉบับ
    const newChallenge = generateRSAChallenge(plaintext);
    setChallenge(newChallenge);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>RSA CTF Challenge</h1>
      <p>
        ข้อความลับที่เกี่ยวข้องกับมหาวิทยาลัยเทคโนโลยีสุรนารีถูกเข้ารหัสด้วย RSA
      </p>
      <Button type="primary" onClick={handleGenerateChallenge}>
        สร้างโจทย์
      </Button>
      {challenge && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>โจทย์:</h2>
          <p>
            <strong>n:</strong> {challenge.n}
          </p>
          <p>
            <strong>e:</strong> {challenge.e}
          </p>
          <p>
            <strong>c:</strong> {challenge.c}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
