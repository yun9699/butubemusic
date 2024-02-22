

// sort예제 인데 의도와는 다르게 업데이트를 사용한다
async function update_music_docs(client, dbname, colname, query, value) {

  //  const result = await client.db(dbname).collection(colname).updateOne(qry, vals);

  const result = await client.db(dbname).collection(colname).updateMany(query, value);

  console.log(result)
  console.log("Documents updated");
};

module.exports= {update_music_docs};