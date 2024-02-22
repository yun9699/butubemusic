





async function read_doc(client, dbname, colname) {
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  // const result = await client.db(dbname).collection(colname).find({"price":{$gt:10000}}).toArray();
  // const result = await client.db(dbname).collection(colname).find({"Name":"TV"}).toArray();
  // const result = await client.db(dbname).collection(colname).findOne({});  
  console.log(result);
  result.forEach(info => {
    console.table(info.music_id)
  });

};