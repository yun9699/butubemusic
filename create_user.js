const {MongoClient} = require ('mongodb');
const Input = require ('./input')

const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);


async function create_user() {
  try{
    await client.connect();
    console.log ("-------회원가입-------")
    console.log("아이디를 입력해주세요.")
    let userID =  await Input.uInput()
    console.log("비밀번호를 입력해주세요.")
    let userPW = await Input.uInput()
    console.log("이름을 입력해주세요.")
    let userName = await Input.uInput()
    console.log("전화번호를 입력해주세요.")
    let userPhone = await Input.uInput()

    let qry = {_id: userID, user_pw: userPW, user_name: userName, user_phone: userPhone};
    const result = await client.db("butube").collection("USER").insertOne(qry);
    console.log("회원가입이 완료되었습니다.")

  }catch(e){
    console.log(e.message);
  }finally{
    await client.close();
    process.exit();
  }
}

create_user();