
import { Tetromino, PieceType, LoveLetter } from './types';

export const GRID_WIDTH = 13;
export const GRID_HEIGHT = 12;

// Heart mask (Cực khoái level)
export const HEART_MASK = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,1,1,0,0,0],
  [0,0,1,1,1,1,0,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
];

export const GAME_SPEED = 800; // Hard speed for "Cực khoái"

export const WIN_MESSAGE_CONTENT = `Chúc mừng năm mới bồ iu của em 🥺🥳 Chúc mừng người chơi đã giữ chuỗi đón năm mới cùng em lần thứ 6 nhé. Chúng ta đã cùng nhau trải qua rất nhiều thứ cùng nhau, cùng có với nhau rất nhiều kỉ niệm và có cả những ước mơ mà trong đó luôn có sự hiện diện của cả hai. Em biết trước đây tụi mình không phải kiểu người dễ bộc lộ cảm xúc hay suy nghĩ của bản thân, cũng chẳng quen nói những lời từng nghĩ là “sến súa”, nhưng khoảng thời gian ở bên chị đã giúp em hoàn thiện mình hơn, trưởng thành hơn và dám mở lòng nhiều hơn. Vì vậy em thật sự trân trọng chị, trân trọng tình yêu của chúng ta, you complete me, honestly.

Mong rằng đoạn đường phía trước của chúng ta sẽ còn có nhau, mong rằng năm mới đến sẽ có nhiều trải nghiệm mới cho cả hai đứa, em không mong cuộc đời sẽ nhẹ nhàng hơn with hai đứa mình vì vốn dĩ cuộc sống khó hứa trước được điều đó, nhưng em chỉ mong là dù có chuyện gì đến cho dù đẹp hay không đẹp, có vui hay có buồn, em vẫn mong chị biết là chị vẫn có em ở bên. Có thể em không phải người dẫn đường cho chị, nhưng em mong mình sẽ là ánh đèn nhỏ đủ ấm, đủ sáng để chị không thấy lạc lõng trên đoạn đường của mình.`;

export const LOVE_LETTERS: LoveLetter[] = [
  {
    id: '2023-11-20',
    date: '20.11.2023',
    title: '3 Years',
    content: `em cũng đắn đo không biết nên tặng gì cho c để kỉ niệm 3 năm bám víu nhau, nhưng mà sau cùng thì e chọn là cuộn film mà chị thích với thời gian để cùng c đi ăn những món ngon. Cảm ơn e bé đã chịu đựng và hết mực yêu thương em, đôi lúc e hơi bướng bỉnh hoặc hay hỏi những câu vô tri để c trả lời, nhưng mà tại vì tui muốn được nghe bà khen tui hay cùng tui làm mấy trò nhảm nhí đó. Gòi hãy tận dụng cuộn film tui tặng để chụp thật nhìu hình cho 2 đứa đi !!! Đừng có tiếc tiền hay tiếc film mà ko chụp lại mấy khoảnh khắc này đó, vì em nghĩ là những tấm hình này sẽ giúp mình lưu lại những kỉ niệm đẹp của c and e đó hehe. Em iu mu nhìu 😗\n\nEm bé của chị,`
  },
  {
    id: '2022-12-03',
    date: '3.12.2022',
    title: 'Có lúc này, lúc kia',
    content: `Hey khi nào tâm hồn dễ chịu thì đọc nhé, hôm nay đi chơi với mẹ với e vui vẻ nhé!

E chỉ mún nói để mình hiểu nhau thôi, việc e k hỏi c mệt hay việc c k hỏi e việc e khó chịu nó cũng giống nhau ở chỗ e với c đều quan tâm cảm xúc của mình hơn

E k nói ai đúng ai sai ở đây nhma e chỉ mún c hiểu dc lí do vì sao e như vậy và e cũng hiểu suy nghĩ riêng của c. 

E biết là cả 2 thừa bt đối phương đang cảm thấy ntn nhma quan trọng là 1 trong 2 phải nói ra thì mới giải quyết đc, e xin lỗi vì trong lúc e tự giải quyết chuyện bực mình trong người e nên e nói lời cụt ngũn với c và ko chú ý đến cảm xúc của c, nhma e cũng muốn c hiểu 1 điều là e rất là khó chịu với việc thay đổi nhanh chóng như v, ko phải 1 lần nhma nhiều lần r nên e mới cảm thấy khó chịu đến vậy, e biết c mệt nên việc đổi kế hoạch ở nhà là việc k trách c được, nhma e k thể nào dứt dc cái sự khó chịu đó trong e, vì e cũng đã đợi c từ lúc học ra ở trường xong chạy về nhà đợi c dưới trời nắng để chở c đi, kiểu tự dưng c gọi e c bảo đổi kế hoạch cái e cảm giác nó rất là khó chịu lun ý.

Nhma lúc đó e k thể nào dằn hết lại sự khó chịu trong lòng mình rồi c cũng k hỏi j việc e khó chịu nhvay, có thể là c nghĩ c k làm j sai nên để e tự khó chịu r tự hết, oke này k trách c đc vì đó là suy nghĩ của c, nhma e cảm thấy hơi bùn vì chí ít nếu c bt e đang cảm thấy v c có thể hỏi e 1 câu r e sẽ tự nguôi nhanh vì e bt c đang quan tâm e, nhìu khi e cảm thấy khó chịu bí bách nhvay mà thấy c k có ý định nào về việc hỏi e nên e ko thể giải phóng nó ra dc, rồi cứ v e với c nghĩ cho cảm xúc của chính mình r quên đi việc đối phương nghĩ j 

Vậy thui, e chỉ mún e với c hiểu nhau hơn để mình có thể giải quyết những chuyện này nhẹ nhàng hơn.`
  },
  {
    id: '2022-10-12',
    date: '12.10.2022',
    title: 'Morning Energy',
    content: `Hi e bé, chúc e bé buổi sáng zui zẻ có nhìu năng lượng để đi làm nhá 😗\n\nCảm ơn vì tối qua đã nằm nghe e vừa khóc vừa nói ra những suy nghĩ trong đầu, mặc dù sáng c phải đi làm sớm. C nghe e nói, e cũng nghe c nói lên những suy nghĩ của mình, and e thấy rằng chúng ta mặc dù đã hiểu nhau nhìu hơn rồi, nhưng mà vẫn còn nhiều điều để cả 2 hiểu thêm and cảm thông hơn for nhau lắm to có thể cùng đi with nhau lâu hơn được.\n\nDạo này c có vẻ bận hơn, e cũng có những việc riêng của e xong 2 đứa ko có tâm sự with nhau nhiều. Nên chắc cũng vì thế mà có nhiều vấn đề cả 2 ko hiểu được for nhau. Vì vậy e nghĩ là À tại sao trước mỗi buổi tối đi ngủ mình ko thử nằm trò chuyện về những thứ đang diễn ra dạo gần đây của cả 2? Cảm xúc của 2 đứa đang ntn ròi, có ổn định hok? Kiểu là 1 cuộc trò chuyện cởi mở ko phàn nàn hay phán xét j cả, chỉ đơn giản là lắng nghe nhau thôi. Thật tốt nếu mỗi ngày e and c đều dành ra ít tgian to quan tâm hơn về tinh thần của đối phương, e nghĩ vậy thì có nhiều điều mình sẽ khắc phục đc hơn.\n\nChỉ là dạo này e kiểu bị lost nên nhiều lúc bản thân bị tiêu cực, xong e lại nghĩ c đi làm về có nhìu việc phải lo xong e lại k share with c về những việc đó with e cũng bị khó khăn trong việc giãi bày suy nghĩ của mình ấy, mà tự giải quyết một mình ý, xong e kiểu thui rùi k ổn rùi :(((( e nên cần 1 người lắng nghe những điều e nói. Xong đến lúc e nói for c, xong cứ kiểu bị bùng nổ cảm xúc xong e ko kìm dc nước mắt ý :((( hiuhiu, nhưng mà e sẽ cố gắng thay đổi bản thân mình một chút, tập speak out with mn xung quanh and with c nhìu hơn, and cũng mong là c hiểu and thấu cảm for những câu từ hơi lộn xộn của e 🥺\n\nThui tóm tắt mấy cái ý này lại là with e, chị luôn là top priority and cục zàng cục bạc của e. Xin lỗi e bé vì những lúc vô tâm vô tri ko để ý đến cảm xúc của c hay chưa dc tinh tế lắm trong vài việc. E sẽ học cách quan sát and tăng EQ của mình nhìu hơn to cả 2 ko bị bùn khóc huhu nữa, and e cũng mong là c hiểu and cảm thông for những thứ cta đối lập nhau and những thứ nhìu lúc yếu đúi e vẫn mong dc c dịu dàng chủ động with e nhìu hơn 👉🏻👈🏻\n\nVậy nha, dài quá sợ bà đọc tới đây là bà chửi tui 🥲 nhưng thui zì tương lai ko nằm khóc tới gần 3h sáng nên tui mới viết tự sự gửi bà nè, vậy nghen, yêu bà dữ lắm đó, nhất của nhất lun 😗 nào mịt mỏi quá cần tui đấm bóp giác hơi thì cứ hun tui 1 cái là tui lm lìn nhó 😙☺️`
  },
  {
    id: '2021-12-03',
    date: '3.12.2021',
    title: '1 Year & Birthday',
    content: `Ting tong, vừa tròn một năm ngày kỉ niệm ăn lẩu mắm thái cùng nhao, vừa đón sinh nhật cục nợ của em and lần đầu tiên đi ún gụ with nhao ^^ nhiều lần đầu tiên thế pồ nhờ. Chúc c dù tuổi 20 hay 30 vẫn iu e như tuổi 19 nhá, em sẽ là cái gối ôm có chế độ sạc pin for lmu những lúc lmu cần. Xin gửi một tràng nụ hôn cháy pỏng and cái ôm ấm áp cùng with rất nhiều nỗi nhớ sến súa đến for e bé lmu của e 😗 Wish chúng ta đang bên nhau and e có thể ôm c thật chặt lúc này 😢`
  },
  {
    id: '2021-11-20',
    date: '20.11.2021',
    title: 'Bé cây to Chị',
    content: `From bé cây to Chị\nNhớ chăm em nhé\nĐể em mãi xanh and tươi tốt\nNhớ thương em nhé\nĐể em lớn lên with tình yêu\nCủa chị.\nChúc mừng ngày của chúng mình, đồ bò ngơ ❤️`
  },
  {
    id: '2021-01-17',
    date: '17.01.2021',
    title: 'Ngắm nhìn',
    content: `Thích những lúc e có thể ngắm nhìn c từ xa, rồi 2 ánh mắt ta chạm nhau, một trong hai sẽ ngại ngùng, những lúc ấy, c hay cười and e hay bảo c khùng không phải vì c khùng thật mà là vì e ngại ý`
  },
  {
    id: '2020-12-31',
    date: '31.12.2020',
    title: 'New Year 2020-2021',
    content: `Chắc còn xíu nữa thôi là một năm nữa lại khép lại and em biết là cả em and chị đều đã phải trải qua một năm được and mất cũng nhiều thứ, nhưng mà điều làm em bớt ghét cái năm này lại là vì em đã tìm được một người có thể khiến em trở lại là em của 3 năm trước, em từng nghĩ là mình sẽ khó mở lòng lại sau nhiều thứ. Nhưng mà, điều gì đến cũng sẽ đến, em luôn tin là tình yêu sẽ đến lúc mà ta không ngờ tới and sẽ va vào nhau mà không cần biết là nhanh hay chậm. Cảm ơn chị vì đã đến and ở cạnh chăm sóc for em, and cũng xin lỗi vì những lúc em làm chị khó chịu hay là có chút vướng víu trong lòng về chuyện e and người cũ. Năm mới, em sẽ gác lại hết những chuyện đã cũ and chị sẽ là người đầu tiên trong chương mới của em. Em mong là mình sẽ cùng nhau kết thúc and bắt đầu năm mới cùng nhau thật là lâu, and điều quan trọng là “Năm mới vui vẻ, em thương chị nhiều lắm ❤️”`
  }
];

export const TETROMINOS: Record<PieceType, Tetromino> = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: '#3366cc',
    type: 'I',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#669933',
    type: 'J',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#993366',
    type: 'L',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#cc9933',
    type: 'O',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#339999',
    type: 'S',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#663399',
    type: 'T',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#993333',
    type: 'Z',
  },
};
