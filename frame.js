const { MongoClient } = require('mongodb');
const Create = require('./functions/Create/Create.js');
const Read = require('./functions/Read/Read.js');
const Delete = require('./functions/Delete/Delete.js');
const Update = require('./functions/Update/Update.js');
const Input = require('./input.js')

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(100); // 원하는 숫자로 변경

async function main(){
  const db = 'butube';
  const uri = process.env.DB_ATLAS_URL;   //연결할 DB 주소
  const client = new MongoClient(uri);    //클라이언트 -> uri 주소 입력

  try{
  await client.connect();                 //클라이언트를 통해 서버접속
  console.clear();                          //콘솔창정리
      console.log(`1. 관리자용 2. 회원용 3. 종료`);
      let menu = await Input.uInput();   // 메뉴 입력
      if(menu==='1') {                                        //1번 선택 (관리자용)
        await Read.login(client);
        while(true){                                          //true 값을 반환하는 동안 프로그램 실행
        console.log('1.회원 정보 관리 2. 음악 DB 관리 3.종료');     //1.회원 정보 관리, 2. 음악 DB 관리 3. 종료
        menu = await Input.uInput();                          // 메뉴 입력
          if(menu === '1'){                                    // 1.(회원 정보 관리)
            let colname = 'USER';
            console.log(`1. 회원 추가 2. 회원 삭제 3. 회원 보기 4. 종료`)       // 메뉴 출력
            menu = await Input.uInput();   // 메뉴 입력
              if(menu === '1'){                                 //1번 = 추가
                await Create.create_user();
              }else if(menu ==='2'){                            //2번 = 삭제
                console.log('회원 삭제');
                Delete.delete_user(client);
              }else if(menu ==='3'){                            //3번 = 보기
                Read.read_all(client,colname);
              }else if(menu ==='4'){                            //4번 = 종료
                console.log('종료')
                await client.close();
                process.exit();
              }else{                                            //예외처리
                console.log('잘못된 입력입니다.')}
                wait(1000);
          }else if(menu =='2'){                                   //2.(음악DB관리)
            let colname ='MUSIC'
            console.log(`1. 노래 추가 2. 노래 정보 변경 3. 노래 삭제 4. 종료`)  //메뉴
            menu = await Input.uInput();
            if(menu === '1'){                                          //1번 = 추가
              await Create.create_music(client);
            }else if(menu ==='2'){                                     //2번 = 수정
              await Update.update_music_docs(client, db, colname);
            }else if(menu ==='3'){                                     //3번 = 삭제
              await Delete.del_music_docs(client, colname);
            }else if(menu ==='4'){                                     //4번 = 종료
              console.log('종료')
              await client.close();
              process.exit();
            }else{                                                     //예외처리
              console.log('잘못된 입력입니다.')
            }
          }else if(menu === '3'){                                  // 3. 종료
            console.log('종료')
            await client.close();
            process.exit();
          }else{                                                     //예외처리
            console.log('잘못된 입력입니다.')
          }}
      }else if(menu==='2'){                                   //2번 선택 (고객용)
        console.log(`1. 회원가입 2.로그인 3.종료`);                      //메뉴
        menu = await Input.uInput();                        
        if(menu === '1'){                                      //회원가입
          await Create.create_user(client);
        }else if(menu=== '2'){                                //로그인
          let userID = await Read.login(client);
          while(true){
          console.log(`접속하신 ID는 ${userID} 입니다.`)
          console.log(`1.음악재생 2.플레이리스트 3.마이페이지 4.커뮤니티 5.종료`)  //메뉴
          menu = await Input.uInput();
          if(menu === '1') {                                             //1.음악재생
            console.log(`1.플레이리스트 선택 2.top100 3.종료`)                     //메뉴2
            menu = await Input.uInput();
            if(menu === '1'){                                          //1.내 플레이리스트 선택 (재생 추가)
            await Read.read_PL(client, userID);
              console.log(`재생할 플레이리스트 제목을 입력해주세요`)
              let plname = await Input.uInput();
              
              console.log(`선택한 플레이리스트는 다음과 같습니다`)
              await Read.select_PL(client, plname);
              await Read.music_start_PL(client, plname);

            }else if (menu ==='2'){                                    //2.랜덤재생 (탑100)
              await Read.read_top100(client);
            }else if(menu ==='3'){                                      //종료
              console.log('종료')
              await client.close();
              process.exit();
            }else{                                                     //예외처리
              console.log('잘못된 입력입니다.')
            };
          }else if(menu === '2'){                                      //2.플레이리스트
            console.log('1.플레이리스트 선택 2. 플레이리스트 만들기 3. 종료');
            menu = await Input.uInput();
            if(menu==='1'){                                               //플리 선택
              await Read.read_PL(client, userID)
              wait(1000);
              console.log(`어떤 플레이리스트를 선택하시겠습니까? (이름)`);
              let plname = await Input.uInput();
            console.log('1.플레이리스트 수정 2.플레이리스트 삭제 3.종료');//플리 선택
            menu = await Input.uInput();
              wait(1000);
              await Read.select_PL(client, plname);
              if(menu ==='1'){                                            //2-2-1 1.플리수정
                await Update.update_PL(client,plname);   
              }else if(menu === '2'){                                     //2-2-1 2.플리삭제
                await Delete.delete_PL(client);                            
              }else if(menu ==='3'){                                      //2-2-1 3.종료
                console.log('종료')
                await client.close();
                process.exit();
              }else{                                                      //예외처리
                console.log('잘못된 입력입니다.')
              };
            }else if(menu==='2'){                                          //2-2-2 플리 만들기
            await Create.create_PL(client,userID);                                      
            }else if(menu ==='3'){                                          //2-2-3 종료
              console.log('종료')
              await client.close();
              process.exit();
            }else{                                                          //예외처리
              console.log('잘못된 입력입니다.')
            };
          }else if(menu === '3'){                                     //3.마이페이지
            console.log('1.내정보 수정 2. 회원탈퇴 3. 종료');
            menu = await Input.uInput();
            if(menu === '1'){                                         //2-3-1 정보수정(추가필요))
            //함수추가필요
            }else if(menu === '2'){                                   //2-3-2 회원탈퇴
              await Delete.delete_user(); 
            }else if(menu ==='3'){                                      //종료
              console.log('종료')
              await client.close();
              process.exit();
            }else{                                                     //예외처리
              console.log('잘못된 입력입니다.')
            };
          }else if(menu === '4'){                                     //4.커뮤니티
            console.log('1.음악 검색 2.top100 3.종료')
            menu = await Input.uInput();
            if(menu === '1'){                                           //1.음악검색(테마or가수)
              console.log('1.가수 이름으로 검색 2.테마로 검색')
              let select = await Input.uInput();
              console.log('검색 내용을 입력해주세요')
              let input = await Input.uInput();
              await Read.read_music(client, input ,select);
            }else if (menu === '2'){                                    //2.탑100
              await Read.show_top100(client);
            }else if(menu ==='3'){                                      //3.종료
              console.log('종료')
              await client.close();
              process.exit();
            }else{                                                     //예외처리
              console.log('잘못된 입력입니다.')
            };
          }else if(menu ==='5'){                                      //종료
            console.log('프로그램 종료');
            await client.close();
            process.exit();
          }else{                                                     //예외처리
            console.log('잘못된 입력입니다.')
          }};
      }else if(menu ==='3'){                                      //종료
            console.log('종료')
            await client.close();
            process.exit();
      }else{                                                     //예외처리
            console.log('잘못된 입력입니다.')
      }} ;
      await wait(1000);

}finally{
  await wait(1000);
}};

main();

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));