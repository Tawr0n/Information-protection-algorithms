const fs = require('fs');

// Таблиця пропорційної заміни з масивами для найбільш використовуваних літер
const substitutionTable = {
    'А': ['135', '249', '376', '418', '523', '647'],
    'Б': ['162', '294'],
    'В': ['217', '326', '438', '591'],
    'Г': ['725', '351'],
    'Ґ': ['371'],
    'Д': ['415', '637', '742'],
    'Е': ['428', '539', '641', '751'],
    'Є': ['461'],
    'Ж': ['518'],
    'З': ['633', '741'],
    'И': ['643', '722', '829', '915', '472'],
    'І': ['712', '822', '956', '499'],
    'Ї': ['820'],
    'Й': ['923'],
    'К': ['149', '267', '378', '498'],
    'Л': ['531', '652', '749'],
    'М': ['642', '754', '819'],
    'Н': ['723', '832', '947', '564', '627', '263', '894'],
    'О': ['139', '254', '379', '481', '592', '721', '843', '961'],
    'П': ['253', '367'],
    'Р': ['317', '429', '572', '649'],
    'С': ['421', '532', '674', '795'],
    'Т': ['538', '629', '714', '856'],
    'У': ['617', '729', '835'],
    'Ф': ['729'],
    'Х': ['834'],
    'Ц': ['917'],
    'Ч': ['497', '511'],
    'Ш': ['628'],
    'Щ': ['755'],
    'Ь': ['836', '948'],
    'Ю': ['916'],
    'Я': ['427', '548'],
    ' ': ['551', '392', '673', '154', '993', '276', '513', '826', '234', '341', '682', '365', '813', '831']
};


// Функція для дешифрування зашифрованого тексту
function decrypt(encryptedText) {
    // Розбиваємо зашифрований текст на трицифрові символи
    const encryptedChars = encryptedText.match(/\d{3}/g) || [];
    // Дешифруємо символи за таблицею пропорційної заміни
    return encryptedChars.map(encryptedChar => {
        // Пошук символу за його числовим еквівалентом у таблиці пропорційної заміни
        for (const char in substitutionTable) {
            if (substitutionTable[char].includes(encryptedChar)) {
                return char;
            }
        }
        // Якщо символ не знайдено, повертаємо той самий символ
        return encryptedChar;
    }).join('');
}

// Зчитуємо зашифрований текст з файлу
const encryptedText = fs.readFileSync('encryptedFileLab3.txt', 'utf-8').trim();
console.log('Зашифрований текст:', encryptedText, '\n');

// Дешифруємо зашифрований текст
const decryptedText = decrypt(encryptedText);
console.log('Дешифрований текст:', decryptedText);

////////////////////////////////////////////////////////////////////////////////////////////////
// Частота у процентах
const letterFrequency = {};

// Підраховуємо кількість кожної літери та пробілів
for (const char of decryptedText) {
    if (char !== ' ') {
        letterFrequency[char] = (letterFrequency[char] || 0) + 1;
    } else {
        letterFrequency['Space'] = (letterFrequency['Space'] || 0) + 1;
    }
}

// Переведення кількості кожної літери та пробілів у проценти
for (const char in letterFrequency) {
    letterFrequency[char] = ((letterFrequency[char] / decryptedText.length) * 100).toFixed(2) + '%';
}

// Сортуємо літери за алфавітом
const sortedLetterFrequency = Object.fromEntries(
    Object.entries(letterFrequency).sort((a, b) => a[0].localeCompare(b[0]))
);

// Виводимо частоту кожної літери та пробілів у процентах, відсортовану за алфавітом
console.log('\nЧастота літер у відкритому тексті (у відсотках):')
console.log(sortedLetterFrequency);

// Витягуємо всі трицифрові числа з криптограми
const encryptedNumbers = encryptedText.match(/\d{3}/g) || [];

// Загальна кількість трицифрових чисел у криптограмі
const totalNumbers = encryptedNumbers.length;

// Пораховуємо частоту входження кожного трицифрового числа та переводимо у відсотки
const frequencyInPercent = {};
encryptedNumbers.forEach(number => {
    if (frequencyInPercent[number]) {
        frequencyInPercent[number]++;
    } else {
        frequencyInPercent[number] = 1;
    }
});

// Переводимо частоту відсотків
for (const number in frequencyInPercent) {
    frequencyInPercent[number] = ((frequencyInPercent[number] / totalNumbers) * 100).toFixed(2) + '%';
}

// Виводимо частоту кожного трицифрового числа в процентах
console.log('Частота трицифрових чисел у криптограмі (у відсотках):');
console.log(frequencyInPercent);
