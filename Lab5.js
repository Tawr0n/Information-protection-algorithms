const fs = require('fs');

const playfairTable = [
    ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    ['Є', 'Ж', 'З', 'И', 'І', 'Й'],
    ['К', 'Л', 'М', 'Н', 'О', 'П'],
    ['Р', 'С', 'Т', 'У', 'Ф', 'Х'],
    ['Ц', 'Ч', 'Ш', 'Ь', 'Ю', 'Я']
];
console.log(playfairTable);

function playfairEncrypt(text, matrix) {
    text = text.toUpperCase().replace(/[^А-ЯІЇЬЄЮЯ]/g, '')
        .replace(/Ґ/g, 'Г')
        .replace(/Щ/g, 'Ш')
        .replace(/Ї/g, 'І') // Перетворюємо текст на великі літери та видаляємо пробіли
    text = text.length % 2 ? text.slice(0, -1) : text
    let encryptedText = '';
    console.log('Відкритий текст:', text)


    for (let i = 0; i < text.length; i += 2) {
        let char1 = text[i];
        let char2 = text[i + 1];

        let row1, col1, row2, col2;

        // Знаходимо рядок і колонку для кожного символу в матриці
        for (let row = 0; row < matrix.length; row++) {
            let col = matrix[row].indexOf(char1);
            if (col !== -1) {
                row1 = row;
                col1 = col;
            }
            col = matrix[row].indexOf(char2);
            if (col !== -1) {
                row2 = row;
                col2 = col;
            }
        }

        // Шифруємо символи за правилами шифру Плейфера
        if (row1 === row2) {
            // Якщо символи в одному рядку, замінюємо їх на символи справа від них в матриці, зациклюючи матрицю
            col1 = (col1 + 1) % matrix[row1].length;
            col2 = (col2 + 1) % matrix[row2].length;
            encryptedText += matrix[row1][col1] + matrix[row2][col2]
        } else if (col1 === col2) {
            // Якщо символи в одній колонці, замінюємо їх на символи нижче від них в матриці, зациклюючи матрицю
            row1 = (row1 + 1) % matrix.length;
            row2 = (row2 + 1) % matrix.length;
            encryptedText += matrix[row1][col1] + matrix[row2][col2]
        } else {
            // Якщо символи утворюють прямокутник
            encryptedText += matrix[row2][col1] + matrix[row1][col2]
        }
    }
    return encryptedText;
}
const plaintext = "Вода — це джерело життя на Землі.";
const encryptedText = playfairEncrypt(plaintext, playfairTable);
fs.writeFileSync('encryptedTextLab5.txt', encryptedText, 'utf-8');
console.log('Зашифрований текст:', encryptedText)
