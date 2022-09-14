# สามารถอ่านคำอธิบายได้จาก Blog ต่อไปนี้
- [EP.1 เริ่มต้นใช้งาน](https://medium.com/@chawalit.s/ep-1-nestjs-%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-448e6721c704)


*** คำสั่งสร้าง Private/Public Key
```sh
openssl genrsa -out ./key/private.pem 1024
openssl rsa -in ./key/private.pem -pubout > ./key/public.pub
```