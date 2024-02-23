const { MongoClient } = require('mongodb');
const Input = require('../../input')

async function update_PL_name_docs(client, dbname, colname, key) {
  console.log(`바꿀 플레이리스트의 아름을 적어주세요`)  //메뉴
  let find = await Input.uInput();

  console.log(`바꾸고 싶은 이름을 입력해주세요`)
  let value = await Input.uInput();

  let qry = {key: find};
  let val = {$set :{ key : value}};
  
  update_docs(client, dbname, colname, qry, val)
};

async function update_music_docs(client, dbname, colname) {

  console.log(`바꿀 노래의 제목을 적어주세요`)  //메뉴
  let find = await Input.uInput();
  console.log(`다음 중 어떤 것을 바꾸고 싶으신가요 ?`)
  console.log(`1.노래제목 2.가수 3.테마`)
  let key = await Input.uInput();

  console.log(`바꾸고 싶은 값을 입력해주세요`)
  let value = await Input.uInput();

  if(key === '1'){
    var qry ={music_name : find};
    var val = {$set :{music_name:value}};
  }else if(key === '2'){
    var qry ={music_name : find};
    var val = {$set :{music_singer:value}};
  }else if(key === '3'){
    var qry ={music_name : find};
    var val = {$set :{music_theme:value}};
  }
  
  update_docs(client, dbname, colname, qry, val)
};



// sort예제 인데 의도와는 다르게 업데이트를 사용한다
async function update_docs(client, dbname, colname, query, value) {

  //  const result = await client.db(dbname).collection(colname).updateOne(qry, vals);
  

  const result = await client.db(dbname).collection(colname).updateMany(query, value);
  
  console.log(result)
  console.log("Documents updated");
};



// 플레이리스트 내 음악 추가
async function insert_music(playlistName) {
  try{
    while(true){
      console.log(`추가할 음악의 이름을 입력해주세요. (종료:"0")`)
      var musicName = await Input.uInput();
      if (musicName === "0") {
        console.log("음악 추가 기능을 종료합니다.");
        break;
      }else{
        var qry01 = {music_name: musicName}
        var musicInfo = await client.db("butube").collection("MUSIC").findOne(qry01)
        if (!musicInfo) {
          console.log("존재하지 않는 음악입니다.");
        }else{
          var musicID = musicInfo._id
          var musicSinger = musicInfo.music_singer
          var musicTheme = musicInfo.music_theme
          
          var qry02 = {playlist_name: playlistName}
          var val02 = { 
            $push: { 
              music_info: {
                music_id: musicID,
                music_name: musicName,
                music_singer: musicSinger,
                music_theme: musicTheme
              } 
            } 
          }
          const result01 = await client.db("butube").collection("PLAYLIST").updateOne(qry02,val02)
          console.log(`${musicInfo.music_name}을(를) 플레이리스트에 추가하였습니다.`)
        }
      }
    }
  }catch(e){
    console.log(e.message);
  }
}




// 플레이리스트 수정
async function update_PL() {
  try{
    console.log("-------플레이리스트 수정-------");
    console.log("1. 음악 추가 2. 음악 삭제");

    let PLMenu = await Input.uInput();
    if (PLMenu === "1") {
      await ins.insert_music("플리1");
    }else if (PLMenu === "2") {
      await del.delete_music("플리1");
    }else {
      console.log("잘못된 입력입니다.")
    }
  }catch(e){
    console.log(e.message);
  }
}


// 내 정보 수정 기능
async function update_user (client, userID) {
  try{
    while (true){
      console.log("-------------------현재 내 정보-------------------")
      let qry01 = {user_id: userID}
      let result01 = await client.db("butube").collection("USER").findOne(qry01)

      let userInfo = [];
      userInfo[0] = {"아이디" : result01.user_id, "비밀번호" : result01.user_pw, "이름" : result01.user_name, "전화번호" : result01.user_phone} 
      console.table(userInfo);

      console.log("1.비밀번호 변경 2. 이름 변경 3. 전화번호 변경 4. 종료")
      let userInfoMenu = await Input.uInput()

      if (userInfoMenu === "1") {
        console.log("변경하실 비밀번호를 입력해 주세요.")
        let userPW = await Input.uInput()
        let val02 = {$set:{user_pw: userPW}}
        const result02 = await client.db("butube").collection("USER").updateOne(qry01,val02)
        console.log("비밀번호를 변경하였습니다.")
      } else if (userInfoMenu === "2") {
        console.log("변경하실 이름을 입력해 주세요.")
        let userName = await Input.uInput()
        let val03 = {$set:{user_name: userName}}
        const result03 = await client.db("butube").collection("USER").updateOne(qry01,val03)
        console.log("이름을 변경하였습니다.")
      } else if (userInfoMenu === "3") {
        console.log("변경하실 전화번호를 입력해 주세요.")
        let userPhone = await Input.uInput()
        let val04 = {$set:{user_phone: userPhone}}
        const result04 = await client.db("butube").collection("USER").updateOne(qry01,val04)
        console.log("전화번호를 변경하였습니다.")
      } else if (userInfoMenu === "4") {
        console.log("내 정보 변경 기능을 종료합니다.")
        process.exit();
      } else {
        console.log("잘못된 입력입니다.")
      }
    }
  }catch(e){
    console.log(e.message)
  }
}



module.exports= {update_music_docs, insert_music, update_PL, update_PL_name_docs, update_user};
