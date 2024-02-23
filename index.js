const { MongoClient } = require('mongodb');
const create = require('./functions/Create/Create');
const read = require('./functions/Read/Read');
const deletes = require('./functions/Delete/Delete');
const update = require('./functions/Update/Update');
const input = require('./input');

async function main() {

  // const uri = process.env.DB_LOCAL_URL;
  const uri = process.env.DB_ATLAS_URL;
  // console.log(uri);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const main_database = "butube";
    let main_database_doc = "TEST";


    // 새로운 컬렉션을 만드는 함수
    // await create.newcollection(client, main_database);

    // 테스트 코드 작성 (의미없음)
    let music_data;
    let a = 1;
    if (a === 0) {
      console.log("t")
      // 입력 받는 함수를 모듈화 하였음
      music_data = await input.uInput();
      let music_obj = {
        "ProductID": 1, "Name": "음악", "Price": 25000, "deep": { "music_id": 4, "music_artist": "iu" }
      };

      // 컬렉션 안에 문서를 넣는 함수
      await create.createdoc(client, main_database, main_database_doc, music_obj);

      // 여러건을 넣는 함수는 생략하겠음 createdocs...

      // 컬렉션 안에 문서를 읽고 검색을 하는 함수 limit적용을 하겠음
      await read.read_doc(client, main_database, main_database_doc);

      // 컬렉션 안에 음악파일을 정렬하는 함수
      let query = {};
      // value는 모르겠음
      let value = [];
      await update.update_music_docs(client, main_database, main_database_doc, query, value);

      // 음악 컬렉션의 문서를 삭제하는 함수
      await deletes.del_music_docs(client, main_database, main_database_doc, query);

    }

    // let option_number = await input.uInput();
    //     console.log(option_number);

    //     if (option_number === "3") {
    //       main_database_doc = "MUSIC";
    //       // 곡명이나 가수를 검색하면 그 목록이 전부나오도록 해야함
    //       console.log("원하는 곡명이나 가수명을 입력해 주세요")
    //     }


    console.log("test")
    await read.read_doc(client, main_database, "MUSIC", "1234", "너무 듣기 좋은 노래");

    while (true) {
      console.log("환영합니다 3번 커뮤니티 이동");
      let option_number = await input.uInput();
      let col_music = "MUSIC";

      // await wait(1000);
      // 커뮤니티 접속 (3번)
      if (option_number === "3") {
        console.log("1. 원하는 곡명이나 가수명을 입력해 주세요 2. 다른 플레이리스트 검색 (장르입력: 댄스, 발라드, 힙합, R&B, 록메탈, 트로트)");
        console.log("원하는 번호를 입력하고 엔터를 누른다음 정보를 입력해주세요");
        let commuinty_option = await input.uInput();

        let community_search_info = await input.uInput();
        
        await read.read_music(client, main_database, col_music, community_search_info, commuinty_option);
        break;
      }

    }

  } finally {
    await client.close();
    process.exit();
  }
};

main().catch(console.error);
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

