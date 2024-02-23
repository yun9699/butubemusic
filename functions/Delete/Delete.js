async function del_music_docs(client, colname) {

  console.log(`삭제하고 싶은 노래의 제목을 입력해주세요`)  //메뉴
  let key = await Input.uInput();
  var qry ={music_name : key};
  await del_docs(client, colname, qry);
};



async function del_docs(client, colname, query) {
  const result = await client.db(butube).collection(colname).deleteOne(query);
  console.log("Document Deleted");

  //  var myqry = {"price":{$gt:10000}};
  //  const result = await client.db(dbname).collection(colname).deleteMany(myqry);
  //  console.log("Documents Deleted");
};

// 회원 삭제 기능
async function delete_user() {
  try{
    await client.connect();
    console.log("-------회원 삭제-------")
    console.log("아이디를 입력해주세요.")
    let userID = await Input.uInput();

    let qry01 = {user_id: userID}
    const result01 = await client.db("butube").collection("USER").findOne(qry01);
    if (result01 === null) {
      console.log("존재하지 않는 아이디입니다.");
      process.exit();
    } else{
      const result02 = await client.db("butube").collection("USER").deleteOne(qry01);
      console.log("회원 삭제가 완료되었습니다.");
    }
  }catch(e){
    console.log(e.message);
  }finally{
    await client.close();
    process.exit();
  }
}

module.exports= {del_docs, delete_user, del_music_docs};