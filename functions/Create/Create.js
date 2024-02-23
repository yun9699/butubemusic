const { MongoClient } = require('mongodb');
const Input = require('../../input')

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




// 회원가입 기능
async function create_user(client) {
  try{
    await client.connect();
    console.log ("-------회원가입-------")
    console.log("아이디를 입력해주세요.")
    let userID =  await Input.uInput()
    let qry01 = {user_id: userID}
    const result01 = await client.db("butube").collection("USER").findOne(qry01);
    
    if (result01 !== null) {
      console.log("이미 존재하는 아이디입니다.")
    }else{
      console.log("비밀번호를 입력해주세요.")
      let userPW = await Input.uInput()

      console.log("이름을 입력해주세요.")
      let userName = await Input.uInput()

      console.log("전화번호를 입력해주세요.")
      let userPhone = await Input.uInput()

      let qry02 = {user_id: userID, user_pw: userPW, user_name: userName, user_phone: userPhone};
      const result02 = await client.db("butube").collection("USER").insertOne(qry02);
      console.log("회원가입이 완료되었습니다.")
    }
  }catch(e){
    console.log(e.message);
  }finally{
    await client.close();
    process.exit();
  }
}



//플레이리스트 생성
async function create_PL(client) {
  try{
    await client.connect();
    console.log("-------플레이리스트 생성-------");
    console.log("생성할 플레이리스트 이름을 지정해 주세요.");
    let PLName = await Input.uInput();
    let qry01 = {user_id: 123, playlist_name: PLName, music_info: []}

    const result01 = await client.db("butube").collection("PLAYLIST").insertOne(qry01)
    console.log(`"${PLName}" 플레이리스트가 생성되었습니다.`)
    await ins.insert_music(PLName);
  }catch(e){
    console.log(e.message);
  }finally{
    await client.close();
    process.exit();
  }
}


// admin 계정으로 데이터베이스에 음악 추가
async function create_music() {
  try{
    console.log("-------데이터베이스 음악 추가-------")
    console.log("음악의 이름을 입력해 주세요.")
    musicName = await Input.uInput()
    console.log("가수 이름을 입력해 주세요.")
    musicSinger = await Input.uInput()
    console.log("음악의 장르를 지정해 주세요.")
    musicTheme = await Input.uInput()
    
    let qry01 = {music_name: musicName, music_singer: musicSinger, music_theme: musicTheme}
    const result01 = await client.db("butube").collection("MUSIC").insertOne(qry01)
    console.log(`"${musicName}"음악이 데이터베이스에 추가되었습니다.`)
    
  }catch(e){
    console.log(e.message);
  }
}


module.exports= {newcollection, createdoc, create_user, create_PL, create_music};