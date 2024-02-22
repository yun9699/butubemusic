const {MongoClient} = require ('mongodb');
const Input = require ('./input')

const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);

async function delete_user() {
  try{
    await client.connect();
    console.log("-------회원 삭제-------")
    console.log("아이디를 입력해주세요.")
    let userID = await Input.uInput();

    let qry01 = {user_id: userID}
    const result01 = await client.db("butube").collection("USER").findOne(qry01);
    if (result01 === null) {
      console.log("존재하지 않는 아이디입니다.")
      process.exit();
    } else{
      const result02 = await client.db("butube").collection("USER").deleteOne(qry01);
      console.log("회원 삭제가 완료되었습니다.")
    }
  }catch(e){
    console.log(e.message);
  }finally{
    await client.close();
    process.exit();
  }
}

delete_user();