const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, '../data');
const outputFile = path.join(__dirname, '../data.json');

// data 폴더 안의 사진 파일들만 읽어오기
const files = fs.readdirSync(dataFolder).filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
);

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
console.log(`✅ 성공! 총 ${files.length}장의 사진 명단을 만들었습니다.`);