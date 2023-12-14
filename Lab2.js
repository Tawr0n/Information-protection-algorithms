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



// Функція для випадкового вибору числа для літери
function getRandomNumber(letter) {
    const numbers = substitutionTable[letter];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}

// Функція для шифрування відкритого тексту за таблицею пропорційної заміни
function encrypt(text) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase(); // переконуємось, що літери у верхньому регістрі
        if (substitutionTable[char]) {
            const randomNumber = getRandomNumber(char);
            encryptedText += randomNumber;
        } else {
            encryptedText += char; // якщо символ не знайдено у таблиці, залишаємо його незмінним
        }
    }
    return encryptedText;
}

// Вхідний відкритий текст
const openText = 'Львів місто що розташоване на заході України Це одне з найстаріших та найкрасивіших міст країни Львів відомий своєю багатою історією архітектурними памятками та великою кількістю кавярень Вулиці міста вкриті камінням а будинки вражають своєю витонченістю Львів це місто яке завжди радісно вітає гостей і надихає їх на нові враження'
console.log('Відкритий текст:', openText, '\n')

// Шифруємо відкритий текст
const encryptedText = encrypt(openText);
fs.writeFileSync('encryptedFileLab3.txt', encryptedText);

// Виводимо зашифрований текст у консоль
console.log('Зашифрований текст: ' + encryptedText);
