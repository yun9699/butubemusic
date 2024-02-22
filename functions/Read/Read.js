





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

//로그인 기능
async function login() {
  try{
    await client.connect();
    console.log("-------로그인-------")
    console.log("아이디를 입력해주세요.")
    let userID = await Input.uInput();

    let qry01 = {user_id: userID}
    const result01 = await client.db("butube").collection("USER").findOne(qry01);
    if (result01 === null) {
      console.log("존재하지 않는 아이디입니다.")
      process.exit();
    } else{
      let password = result01.user_pw
      console.log("비밀번호를 입력해주세요.")
      let userPW = await Input.uInput();
      if (password !== userPW){
        console.log("잘못된 비밀번호입니다.");
      }else{
        console.log("로그인이 완료되었습니다.")
      }
    }
  }catch(e){
    console.log(e.message);
  }finally{
    await client.close();
    process.exit();
  }
}
login();



module.exports= {read_doc, login, read_community_music_doc};
