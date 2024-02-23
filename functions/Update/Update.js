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
  let keyvalue;
  if(key === '1'){
    keyvalue = 'music_name';
  }else if(key === '2'){
    keyvalue = 'music_singer';
  }else if(key === '3'){
    keyvalue = 'music_theme';
  }

  console.log(`바꾸고 싶은 값을 입력해주세요`)
  let value = await Input.uInput();

  var qry ={music_name : find};
  var val = {$set :{ keyvalue : value}};
  
  update_docs(client, dbname, colname, qry, val)
};



// sort예제 인데 의도와는 다르게 업데이트를 사용한다
async function update_docs(client, dbname, colname, query, value) {

  //  const result = await client.db(dbname).collection(colname).updateOne(qry, vals);
  

  const result = await client.db(dbname).collection(colname).updateMany(query, value);
  
  console.log(result)
  console.log("Documents updated");
};

module.exports= {update_docs, update_music_docs, update_PL_name_docs};