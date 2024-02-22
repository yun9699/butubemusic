const {MongoClient} = require ('mongodb');
const Input = require ('./input')

const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);


async function read_top100() {
  try {
    await client.connect();
    const result = await client.db("butube").collection("MUSIC").find({ music_rank: { $exists: true } }).toArray();
    const formattedResults = result.map(item => {
      return {
        '순위': item.music_rank,
        '곡명': item.music_name,
        '가수': item.music_singer,
        '테마': item.music_theme
      };
    });

    // 수정된 결과를 테이블로 출력합니다.
    console.table(formattedResults);
    
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
}

read_top100();