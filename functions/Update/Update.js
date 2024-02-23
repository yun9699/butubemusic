

// sort예제 인데 의도와는 다르게 업데이트를 사용한다
async function update_music_docs(client, dbname, colname, query, value) {

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

module.exports= {update_music_docs, insert_music, update_PL};