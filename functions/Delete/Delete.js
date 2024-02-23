const { MongoClient } = require('mongodb');
const Input = require('../../input')

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
async function delete_user(client) {
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

// 플레이리스트 내 노래 삭제 기능

async function delete_music(playlistName) {
  try{
    while(true){
      console.log(`삭제할 음악의 이름을 입력해주세요. (종료:"0")`)
      var musicName = await Input.uInput();
      if (musicName === "0") {
        console.log("음악 삭제 기능을 종료합니다.");
        break;
      }else{
        var qry01 = {music_name: musicName}
        var musicInfo = await client.db("butube").collection("MUSIC").findOne(qry01)
        if (!musicInfo) {
          console.log("존재하지 않는 음악입니다.");
        }else{
          var qry02 = {playlist_name: playlistName}
          var val02 = {$pull:{music_info:{music_name: musicName}}}
          
          var result01 = await client.db("butube").collection("PLAYLIST").updateOne(qry02,val02)
          
          console.log(`${musicInfo.music_name}을(를) 플레이리스트에서 삭제하였습니다.`)
        }
      }
    }
  }catch(e){
    console.log(e.message)
  }
}

// 플레이리스트 삭제 기능
async function delete_PL(client) {
  try{
    console.log("-------플레이리스트 삭제-------");
    console.log("삭제할 플레이리스트 이름을 지정해 주세요.");
    let PLName = await Input.uInput();
    let qry01 = {playlist_name: PLName}

    const PLInfo = await client.db("butube").collection("PLAYLIST").findOne(qry01)
    if (!PLInfo) {
      console.log( `존재하지 않는 플레이리스트입니다.`)
    }else{
      const result01 = await client.db("butube").collection("PLAYLIST").deleteOne(qry01)
      console.log(`"${PLName}" 플레이리스트가 삭제되었습니다.`)
    }
  }catch(e){
    console.log(e.message);
  }
}

module.exports= {del_music_docs, delete_user, delete_music, delete_PL};
