from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

# โหลดไฟล์ Public Key
with open("public_key.pem", "rb") as f:
    public_key = serialization.load_pem_public_key(f.read())

# ตรวจสอบว่าเป็น RSA Key หรือไม่
if isinstance(public_key, rsa.RSAPublicKey):
    public_numbers = public_key.public_numbers()
    modulus = public_numbers.n  # ค่า n
    exponent = public_numbers.e  # ค่า e

    print(f"Modulus (n): {modulus}")
    print(f"Public Exponent (e): {exponent}")
else:
    print("This is not an RSA Public Key.")