




async function del_music_docs(client, dbname, colname, query) {
  const result = await client.db(dbname).collection(colname).deleteOne(query);
  console.log("Document Deleted");

  //  var myqry = {"price":{$gt:10000}};
  //  const result = await client.db(dbname).collection(colname).deleteMany(myqry);
  //  console.log("Documents Deleted");
};

module.exports= {del_music_docs};