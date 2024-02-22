




// 새로운 컬렉션 생성 (필요한지 모르겠음)
async function newcollection(client, dbname) {
  // collection 생성
  const collection = await client.db(dbname).createCollection("test");
  // console.log(collection);

}

async function createdoc(client, dbname, colname, doc) {

  // db안 컬렉션 이름 
  const col = await client.db(dbname).collection(colname);
  const result = await col.insertOne(doc);
  console.log(`New document created with the following id: ${result.insertedId}`);
};

module.exports= {newcollection, createdoc};