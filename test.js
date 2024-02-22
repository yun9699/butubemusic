const { MongoClient } = require('mongodb');
const { uInput } = require('./input'); // input.js에서 uInput 함수를 가져옵니다.

const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);

async function read_top100() {
  try {
    await client.connect();
    const result = await client.db("butube").collection("MUSIC").find({ music_rank: { $exists: true } }).toArray();
    const formattedResults = result.map(item => {
      return {
        '순위': item.music_rank,
        '곡명': item.music_name,
        '가수': item.music_singer,
        '테마': item.music_theme
      };
    });

    // 수정된 결과를 테이블로 출력합니다.
    console.table(formattedResults);

    // 사용자에게 곡명을 입력받습니다.
    console.log('재생을 원하시는 곡명을 입력해주세요: ');
    const songName = await uInput(); // 사용자로부터 입력을 받는다
    const song = result.find(item => item.music_name === songName);

    if (song) {
      const line = '-'.repeat(30);
      console.log(line);
      console.log(`(재생중) ${song.music_name} - ${song.music_singer}`);
      console.log(line);

      // 현재 곡 정보 저장
      let currentSong = song;

      // 메뉴 출력 및 선택 처리
      function showMenu() {
        console.log('1. 셔플 2. 뒤로가기 3. 앞으로가기 4. 댓글추가');
      }

      async function handleMenu() {
        const input = await uInput();
        switch (input) {
          case '1':
            // 셔플 기능 구현
            break;

          case '2':
            if (!currentSong) {
              console.log('현재 재생 중인 곡이 없습니다.');
              break;
            }


          
            const prevSong = await client.db("butube").collection("MUSIC").findOne({ _id: { $lt: currentSong._id } }, { sort: { _id: -1 } });
            if (!prevSong) {
              console.log('첫 번째 곡입니다.');
              break;
            }
          
            // 현재 곡 정보 업데이트
            currentSong = prevSong;
          
            // 이전 곡 정보 출력
            console.log(line);
            console.log(`(재생중) ${prevSong.music_name} - ${prevSong.music_singer}`);
            console.log(line);

            // 메뉴 출력 및 선택 처리
            showMenu();
            await handleMenu();
            break;
            
          case '3':
            if (!currentSong) {
              console.log('현재 재생 중인 곡이 없습니다.');
              break;
            }

            const nextSong = await client.db("butube").collection("MUSIC").findOne({ _id: { $gt: currentSong._id } });
            if (!nextSong) {
              console.log('마지막 곡입니다.');
              break;
            }

            // 현재 곡 정보 업데이트
            currentSong = nextSong;

            // 다음 곡 정보 출력
            console.log(line);
            console.log(`(재생중) ${nextSong.music_name} - ${nextSong.music_singer}`);
            console.log(line);

            // 메뉴 출력 및 선택 처리
            showMenu();
            await handleMenu();
            break;
          case '4':
            // 댓글추가 기능 구현
            break;
        }
      }

      showMenu();
      await handleMenu();

    } else {
      console.log('해당 곡을 찾을 수 없습니다. 곡명을 정확히 입력해주세요.');
    }

  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
}

read_top100();