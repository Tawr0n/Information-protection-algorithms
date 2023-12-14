const fs = require('fs');

const playfairTable = [
    ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    ['Є', 'Ж', 'З', 'И', 'І', 'Й'],
    ['К', 'Л', 'М', 'Н', 'О', 'П'],
    ['Р', 'С', 'Т', 'У', 'Ф', 'Х'],
    ['Ц', 'Ч', 'Ш', 'Ь', 'Ю', 'Я']
];
console.log(playfairTable);

function playfairDecrypt(encryptedText, matrix) {
    let decryptedText = '';

    for (let i = 0; i < encryptedText.length; i += 2) {
        let char1 = encryptedText[i];
        let char2 = encryptedText[i + 1];

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

        // Дешифруємо символи за правилами шифру Плейфера
        if (row1 === row2) {
            // Якщо символи в одному рядку, замінюємо їх на символи зліва від них в матриці, зациклюючи матрицю
            col1 = (col1 - 1 + matrix[row1].length) % matrix[row1].length;
            col2 = (col2 - 1 + matrix[row2].length) % matrix[row2].length;
            decryptedText += matrix[row1][col1] + matrix[row2][col2];
        } else if (col1 === col2) {
            // Якщо символи в одній колонці, замінюємо їх на символи вище від них в матриці, зациклюючи матрицю
            row1 = (row1 - 1 + matrix.length) % matrix.length;
            row2 = (row2 - 1 + matrix.length) % matrix.length;
            decryptedText += matrix[row1][col1] + matrix[row2][col2];
        } else {
            // Якщо символи утворюють прямокутник
            decryptedText += matrix[row2][col1] + matrix[row1][col2];
        }
    }
    return decryptedText;
}

const encryptedText = fs.readFileSync('encryptedTextLab5.txt', 'utf8');
console.log('Зашифрований текст:', encryptedText)
const decryptedText = playfairDecrypt(encryptedText, playfairTable);
console.log('Дешифрований текст:', decryptedText);
