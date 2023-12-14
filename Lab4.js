const fs = require('fs');
// Українська абетка та відповідні числові значення
const alphabet = "КЕТВАМПОИІДРФЗУЯШГЛҐНСЬЇЧХЦЖБЄЙЮЩ";
const alphabetLength = alphabet.length;

// Функція для перетворення літер у числа
function charToNumber(char) {
    return alphabet.indexOf(char.toUpperCase());
}

// Функція для перетворення чисел у літери
function numberToChar(number) {
    return alphabet[number];
}

// Функція для шифрування тексту за допомогою модульного гамування
function encrypt(text, key) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charNumber = charToNumber(char);
        const keyChar = key[i % key.length];
        const keyNumber = charToNumber(keyChar);
        const encryptedCharNumber = (charNumber + keyNumber) % alphabetLength;
        encryptedText += numberToChar(encryptedCharNumber);
    }
    return encryptedText;
}

// Функція для дешифрування тексту
function decrypt(encryptedText, key) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
        const char = encryptedText[i];
        const charNumber = charToNumber(char);
        const keyChar = key[i % key.length];
        const keyNumber = charToNumber(keyChar);
        let decryptedCharNumber = (charNumber - keyNumber) % alphabetLength;
        if (decryptedCharNumber < 0) {
            decryptedCharNumber = alphabetLength + decryptedCharNumber;
        }
        decryptedText += numberToChar(decryptedCharNumber);
    }
    return decryptedText;
}

// Текст для шифрування та запису у файл
const plaintext = 'КафедраПрикладноїМатематикиВідзначаєтьсяВисокимРівнемНауковоїДіяльності'; // Ваш текст тут
const password = 'кубикрубика'; // Ваше хобі тут
fs.writeFileSync('openTextLab4.txt', plaintext);
console.log('Відкритий текст:', plaintext)

// Шифруємо текст
const encryptedText = encrypt(plaintext, password);
console.log('Зашифрований текст:',encryptedText)

// Записуємо зашифрований текст у файл
fs.writeFileSync('encryptedTextLab4.txt', encryptedText, 'utf-8');

// Дешифруємо текст з файлу
const decryptedText = decrypt(encryptedText, password);

// Перевіряємо, чи отримали початковий відкритий текст
console.log('Дешифрований текст:', decryptedText);
