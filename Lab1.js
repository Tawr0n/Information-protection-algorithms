const fs = require('fs');

// Українська абетка
const ukrainianAlphabet = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
const ukrainianText =  'ВєтьсяКрізьМістоЯкЖивописнийПотікСплітаючиМинулеТаСучасністьУВитканійТканиніАрхітектурнихШедеврівТаНезабутніхСпогадів'
const englishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-:; ';
const englishText = 'the city is like a picturesque stream that weaves the past and present into a canvas of architectural masterpieces and unforgettable memories.'

// Функція для шифрування тексту зсувом (українська абетка)
function encrypt(text, shift) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charIndex = alphabet.indexOf(char);
        if (charIndex !== -1) {
            charIndex = (charIndex + shift) % alphabet.length;
            char = alphabet[charIndex];
        }
        encryptedText += char;
    }
    return encryptedText;
}

// Функція для дешифрування тексту зсувом (українська абетка)
function decrypt(encryptedText, shift) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
        let char = encryptedText[i];
        let charIndex = alphabet.indexOf(char);
        if (charIndex !== -1) {
            charIndex = (charIndex - shift + alphabet.length) % alphabet.length;
            char = alphabet[charIndex];
        }
        decryptedText += char;
    }
    return decryptedText;
}


// Зчитуємо відкритий текст з файлу
fs.writeFileSync('openTextLab1.txt', ukrainianText);
const openText = fs.readFileSync('openTextLab1.txt', 'utf8');
const alphabet = ukrainianAlphabet.includes(openText.at(0).toUpperCase()) ? ukrainianAlphabet : englishAlphabet

// Зашифрувати та записати у файл
const shift = 14; // ключ (дата народження)
const encryptedText = encrypt(openText, shift);
console.log("Зашифрований текст:", encryptedText);
fs.writeFileSync('encryptedFileLab1.txt', encryptedText);

// Дешифрувати текст з файлу
const decryptedText = decrypt(encryptedText, shift);
console.log("Дешифрований текст:", decryptedText);
