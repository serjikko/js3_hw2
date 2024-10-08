const fs = require('fs');
const path = require('path');

const tree = (dirPath, depth) => {
    if (depth < 0) return;

    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Ошибка чтения каталога: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dirPath, file.name);
            console.log(' '.repeat(depth * 2) + file.name);

            if (file.isDirectory()) {
                tree(filePath, depth - 1);
            }
        });
    });
};

const main = () => {
    const args = process.argv.slice(2);
    const dirPath = args[0] || '.';
    const depth = args.includes('--depth') ? parseInt(args[args.indexOf('--depth') + 1]) : Infinity;

    tree(dirPath, depth);
};

main();

