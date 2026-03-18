const fs = require('fs');
const path = require('path');

// 폴더 경로 설정 (실행 위치에 따라 조정)
const dataDir = path.join(__dirname, '../data');
const outputFile = path.join(__dirname, '../data.json');

try {
    // 1. data 폴더 내 파일 읽기
    const files = fs.readdirSync(dataDir);

    // 2. 이미지 파일만 필터링하고 날짜 정보 추출
    const imageList = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => {
            const filePath = path.join(dataDir, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                mtime: stats.mtime.getTime() // 수정된 시간(밀리초)
            };
        });

    // 3. 최신순 정렬 (mtime이 큰 숫자가 위로 오게)
    imageList.sort((a, b) => b.mtime - a.mtime);

    // 4. 이름만 추출하여 JSON 저장
    const finalNames = imageList.map(item => item.name);
    fs.writeFileSync(outputFile, JSON.stringify(finalNames, null, 2));

    console.log(`✅ 정렬 완료: 총 ${finalNames.length}개의 사진을 최신순으로 배치했습니다.`);
} catch (err) {
    console.error('❌ 오류 발생:', err);
}