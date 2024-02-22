




async function del_music_docs(client, dbname, colname) {
  let myqry = { Name: "TV" };
  const result = await client.db(dbname).collection(colname).deleteOne(myqry);
  console.log("Document Deleted");

  //  var myqry = {"price":{$gt:10000}};
  //  const result = await client.db(dbname).collection(colname).deleteMany(myqry);
  //  console.log("Documents Deleted");
};