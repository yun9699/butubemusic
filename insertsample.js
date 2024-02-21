const { MongoClient } = require('mongodb');
const fs = require('fs').promises;

const uri = process.env.DB_ATLAS_URL;
console.log(uri);

const dbName = 'butube';
const collectionName = 'MUSIC';
const jsonFilePath = './발라드50.json';

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('데이터베이스에 연결되었습니다.');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // JSON 파일 읽기
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data = JSON.parse(jsonData);

        // 데이터 삽입
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount}개의 문서가 삽입되었습니다.`);
    } catch (e) {
        console.error(`에러: ${e.message}`);
    } finally {
        await client.close();
        console.log('데이터베이스 연결이 닫혔습니다.');
    }
}

main();