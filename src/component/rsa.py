from sympy import mod_inverse

# ค่าที่ได้รับจากโจทย์
n = 2533
e = 65537

# หาค่า p และ q (ตัวประกอบของ n)
p = 17
q = 149

# คำนวณค่า φ(n)
phi_n = (p - 1) * (q - 1)

# คำนวณค่า d (การผกผันของ e โมดูล φ(n))
d = mod_inverse(e, phi_n)

# ข้อความที่เข้ารหัสในรูปแบบฐานสิบ (Decimal) โดยมีช่องว่างระหว่างตัวเลข
ciphertext_decimal = "289 56 2352 749 81 502 1496 424 1669 639 1470 888 56 56 1478 1107 749 1564 1669 749 2488 1564 2352 61 1669 1470 888 639 589 1564 2488 2146 1688"

# แยกข้อความที่เข้ารหัสเป็นส่วนๆ ตามช่องว่าง
ciphertext_parts = ciphertext_decimal.split()

# ถอดรหัสแต่ละส่วน
decoded_parts = []
for part in ciphertext_parts:
    # แปลงแต่ละส่วนจากฐานสิบเป็นจำนวนเต็ม
    c = int(part, 10)  # ใช้ฐาน 10
    print(f"Ciphertext part (decimal): {c}")
    
    # ถอดรหัสข้อความ
    m = pow(c, d, n)
    
    # แปลงกลับเป็นข้อความ (ถ้าเป็น ASCII)
    try:
        m_bytes = m.to_bytes((m.bit_length() + 7) // 8, 'big')
        decoded_message = m_bytes.decode('utf-8', errors='ignore')
        decoded_parts.append(decoded_message)
    except Exception as e:
        decoded_parts.append(f"Error decoding: {e}")

# รวมข้อความที่ถอดรหัสทั้งหมด
decoded_message = ''.join(decoded_parts)

# แสดงผลลัพธ์รวมกัน
print(f"Decoded message (combined): {decoded_message}")

# แสดงค่า private key (d)
print(f"Private key (d): {d},{phi_n}")
