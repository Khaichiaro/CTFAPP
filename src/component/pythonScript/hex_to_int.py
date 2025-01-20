cipher_text_hex = [
    "275", "545", "11C", "92B", "158", "7E5", "143", "819", "1C4", "C9", 
    "73F", "937", "545", "545", "1FD", "25B", "92B", "4A6", "1C4", "92B", 
    "2B4", "4A6", "11C", "140", "1C4", "73F", "937", "C9", "214", "4A6", 
    "2B4", "99D", "29D"
]

# แปลงจากฐาน 16 เป็นฐาน 10
cipher_text_decimal = [int(hex_value, 16) for hex_value in cipher_text_hex]
print(cipher_text_decimal)
