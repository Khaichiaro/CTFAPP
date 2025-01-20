import { randomBytes } from "crypto";
import { generatePrimeSync, modInverse, powMod } from "bigint-crypto-utils";

// ฟังก์ชันสำหรับสร้างโจทย์ RSA
export const generateRSAChallenge = (message) => {
  // สร้าง p และ q
  const p = generatePrimeSync(512);
  const q = generatePrimeSync(512);
  const n = p * q; // n = p * q
  const phi = (p - 1n) * (q - 1n); // φ(n)

  const e = 65537n; // ค่า public exponent
  const d = modInverse(e, phi); // คำนวณค่า d

  // เข้ารหัสข้อความ
  const m = BigInt("0x" + Buffer.from(message).toString("hex")); // แปลงข้อความเป็นเลข
  const c = powMod(m, e, n); // c = m^e % n

  return {
    n: n.toString(), // แปลง n เป็น string เพื่อแสดงผล
    e: e.toString(),
    c: c.toString(),
    decrypted: powMod(c, d, n).toString() // สำหรับตรวจสอบ (ไม่แสดงผลในโจทย์)
  };
};
