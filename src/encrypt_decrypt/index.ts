import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

function encrypt(text: string) {

    const key = randomBytes(32);
    const iv = randomBytes(16);
  
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(key), iv);
  
    let encrypted = cipher.update(text);
  
    encrypted = Buffer.concat([encrypted, cipher.final()]);
  
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  
  }
  
  
  
  function decrypt(text: any) {
  
    let iv = Buffer.from(text.iv, 'hex');
  
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
  
    let decipher = createDecipheriv('aes-256-gcm', Buffer.from(randomBytes(32)), iv);
  
    let decrypted = decipher.update(encryptedText);
  
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  
    return decrypted.toString();
  
  }
  
  console.log(encrypt("hello word"));
  console.log(decrypt('5de993dbb2a0660fd03f'));