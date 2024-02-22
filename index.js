const { MongoClient } = require('mongodb');
const create = require('./functions/Create/Create');
const read = require('./functions/Read/Read');
const deletes = require('./functions/Delete/Delete');
const update = require('./functions/Update/Update');

const db = 'butube';


async function main() {
  const uri = process.env.DB_ATLAS_URL;   //연결할 DB 주소
  const client = new MongoClient(uri);    //클라이언트 -> uri 주소 입력
  await client.connect();                 //클라이언트를 통해 서버접속
  while

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
  if (a === 0)
    {
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



  
    while (true) {
      console.log("환영합니다 3번 커뮤니티 이동");
      let option_number = await input.uInput();
      let col_music = "MUSIC";
      
      // await wait(1000);
      // 커뮤니티 접속 (3번)
      if (option_number === "3") {
        console.log("원하는 곡명이나 가수명을 입력해 주세요")
        let community_search_info = await input.uInput();
        // await 때문에 변수선언 위에 하면 안 됨
        // 곡명이나 가수를 검색하면 그 목록이 전부나오도록 해야함
        // 함수에 정규표현식을 넣고 싶은데 모르겠음
        await read.read_community_music_doc(client, main_database, col_music, community_search_info);
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

// 컬렉션을 읽어주거나 검색해주는 함수
// async function read_doc(client, dbname, colname) {
//   const result = await client.db(dbname).collection(colname).find({}).toArray();
//   // const result = await client.db(dbname).collection(colname).find({"price":{$gt:10000}}).toArray();
//   // const result = await client.db(dbname).collection(colname).find({"Name":"TV"}).toArray();
//   // const result = await client.db(dbname).collection(colname).findOne({});
//   console.log(result);
//   result.forEach(info => {
//     console.table(info.music_id)
//   });

// };

// 새로운 컬렉션 생성 (필요한지 모르겠음)
// async function newcollection(client, dbname) {
//   // collection 생성
//   const collection = await client.db(dbname).createCollection("test");
//   // console.log(collection);

// }

// 컬렉션에서 문서를 넣는 함수 (필요함)
// async function createdoc(client, dbname, colname, doc) {
//   // 데이터베이스
//   const dbobj = await client.db(dbname);
//   // db안 컬렉션 이름
//   const col = dbobj.collection(colname);
//   const result = await col.insertOne(doc);
//   console.log(`New document created with the following id: ${result.insertedId}`);
// };

// async function update_music_docs(client, dbname, colname, query, value) {

//   //  const result = await client.db(dbname).collection(colname).updateOne(qry, vals);

//   let qry = { Name: /er$/ };
//   let vals = { $inc: { price: 125 } };
//   const result = await client.db(dbname).collection(colname).updateMany(qry, vals);

//   console.log(result)
//   console.log("Documents updated");
// };

// async function del_music_docs(client, dbname, colname) {
//   let myqry = { Name: "TV" };
//   const result = await client.db(dbname).collection(colname).deleteOne(myqry);
//   console.log("Document Deleted");

//   //  var myqry = {"price":{$gt:10000}};
//   //  const result = await client.db(dbname).collection(colname).deleteMany(myqry);
//   //  console.log("Documents Deleted");
// };
