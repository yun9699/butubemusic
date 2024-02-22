const {MongoClient} = require ('mongodb');
const Input = require ('./input')

const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);

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