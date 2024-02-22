





async function read_doc(client, dbname, colname) {
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  // const result = await client.db(dbname).collection(colname).find({"price":{$gt:10000}}).toArray();
  // const result = await client.db(dbname).collection(colname).find({"Name":"사용자입력"}).toArray();
  // const result = await client.db(dbname).collection(colname).findOne({});  
  console.log(result);
  result.forEach(info => {
    console.table(info.music_id)
  });

};

async function read_community_music_doc(client, dbname, colname, user_input) {
  console.log(`실행 ${colname}`);
  
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  result.forEach(info => {
    if (info.music_name.includes(user_input) || info.music_singer.includes(user_input) || info.music_theme.includes(user_input)) {
      console.table(info);
    }
  });

};

module.exports= {read_doc, read_community_music_doc};