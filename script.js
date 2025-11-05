const script = [
  {speaker:'나레이션',bg:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=60',char:'',text:'겨울 시발 시작하지도 않았지만 조온나게 춥다'},
  {speaker:'주인공',char:'images/IMG_1843.jpeg',text:'(오늘부터 새 학년, 심장이 자꾸 빨라져.)'},
  {speaker:'건우',char:'images/IMG_1842.jpeg',text:'"안녕! 너도 2학년이야? 나 유나야, 잘 부탁해!"'},
  {speaker:'주인공',text:'"응, 잘 부탁해...!" (웃음이 서툴게 튀어나온다)'},
  {speaker:'나레이션',text:'첫 만남은 늘 어색하지만, 유나는 다정했고 웃음은 쉽게 풀렸다.'},
  {speaker:'건우',text:'"오늘 점심 같이 먹을래? 우리 반 애들이랑 자리 있어."',choices:[
    {text:'같이 가자',goto:'lunch-group'},
    {text:'혼자 있고 싶다고 한다',goto:'decline-lunch'}
  ]},

  // --- lunch-group ---
  {id:'lunch-group',speaker:'나레이션',text:'유나와 함께 점심을 먹으러 가자 교정에서 웃음과 이야기꽃이 피어난다.'},
  {speaker:'민호',char:'https://i.imgur.com/2uJb2ZK.png',text:'"너, 어디에서 왔어? 친해져서 반가워."'},
  {speaker:'주인공',text:'"여기 근처에 살아."'},
  {speaker:'유나',text:'"방과 후에 같이 공부할 사람? 우리 스터디에 들어와~"',choices:[
    {text:'들어간다',goto:'join-study'},
    {text:'생각해본다',goto:'think-study'}
  ]},

  // --- decline-lunch ---
  {id:'decline-lunch',speaker:'주인공',text:'"미안, 오늘은 혼자 있고 싶어..."'},
  {speaker:'나레이션',text:'혼자 점심을 먹었던 날, 창밖을 보며 유나가 자꾸 떠올랐다.'},

  // --- join-study ---
  {id:'join-study',speaker:'나레이션',text:'스터디에 들어가면 유나와 더 자주 만나게 된다. 서로 배우며 가까워진다.'},
  {speaker:'유나',text:'"너 문제 잘 푸네, 멋있다~"'},
  {speaker:'주인공',text:'"너도 잘하잖아. 같이 하니까 재밌다."'},
  {speaker:'유나',text:'"끝나고 카페 갈래?"',choices:[
    {text:'같이 간다',goto:'cafe'},
    {text:'집에 간다',goto:'go-home'}
  ]},

  // --- cafe ---
  {id:'cafe',speaker:'나레이션',bg:'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=60',text:'분위기 좋은 카페. 늦은 오후 햇살이 창가를 물들인다.'},
  {speaker:'유나',text:'"오늘 이야기하니까 더 알고 싶어졌어."'},
  {speaker:'주인공',text:'"나도... 너랑 있으면 편해."'},
  {speaker:'유나',text:'"다음 주 축제 준비 같이 할래?"',choices:[
    {text:'한다',goto:'festival'},
    {text:'바쁘다고 한다',goto:'busy'}
  ]},

  // --- go-home ---
  {id:'go-home',speaker:'나레이션',text:'혼자 집으로 돌아가는 길, 머릿속엔 유나의 웃음이 맴돈다.'},

  // --- busy ---
  {id:'busy',speaker:'주인공',text:'"요즘 좀 바빠서..."'},
  {speaker:'유나',text:'"괜찮아! 네가 편하면 돼."'},
  {speaker:'나레이션',text:'조심스레 서로를 이해하는 사이가 되어간다.'},

  // --- festival ---
  {id:'festival',speaker:'나레이션',text:'축제 준비로 함께하는 시간이 많아졌다. 함께 장식을 만들며 웃는다.'},
  {speaker:'유나',text:'"너랑 팀이라 즐거워."'},
  {speaker:'주인공',text:'"나도. 시간 진짜 빨리 가네."'},
  {speaker:'유나',text:'"밤에 별보러 갈래?"',choices:[
    {text:'함께 간다',goto:'stargaze'},
    {text:'다음에 보자고 한다',goto:'later'}
  ]},

  // --- stargaze ---
  {id:'stargaze',speaker:'나레이션',bg:'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1400&q=60',text:'운동장 뒤 조용한 밤하늘, 별빛이 흐른다.'},
  {speaker:'유나',text:'"이렇게 조용한 건 오랜만이야."'},
  {speaker:'주인공',text:'"응... 너랑 있어서 더 좋아."'},
  {speaker:'나레이션',text:'유나가 다가와 손을 살짝 잡는다. 따뜻한 온기와 떨림.'},
  {speaker:'유나',text:'"오늘, 고마워."'},
  {speaker:'주인공',text:'"나도. 이 순간 기억할게."'},
  {speaker:'나레이션',text:'풋풋하고 따뜻한 계절의 기억 — 엔딩.'}
];

let idx = 0;
const nameEl = document.getElementById('name');
const textEl = document.getElementById('text');
const bgEl = document.getElementById('bg');
const charEl = document.getElementById('char');
const nextBtn = document.getElementById('next');
const choicesEl = document.getElementById('choices');

function renderNode(node) {
  if (node.bg) bgEl.style.backgroundImage = `url('${node.bg}')`;
  nameEl.textContent = node.speaker || '';
  textEl.textContent = node.text || '';
  if (node.char) { charEl.src = node.char; charEl.style.display='block'; }
  else { charEl.style.display='none'; }
  choicesEl.innerHTML = '';
  if (node.choices) {
    nextBtn.disabled = true;
    node.choices.forEach(c => {
      const b = document.createElement('div');
      b.className = 'choice';
      b.textContent = c.text;
      b.onclick = () => gotoId(c.goto);
      choicesEl.appendChild(b);
    });
  } else nextBtn.disabled = false;
}

function gotoId(id) {
  const i = script.findIndex(s => s.id === id);
  if (i !== -1) { idx = i; renderNode(script[idx]); }
}

function next() {
  idx++;
  if (idx >= script.length) idx = script.length - 1;
  renderNode(script[idx]);
}

nextBtn.onclick = next;

document.getElementById('save').onclick = () => {
  localStorage.setItem('vn_idx', idx);
  alert('저장되었습니다.');
};

document.getElementById('load').onclick = () => {
  const v = localStorage.getItem('vn_idx');
  if (v !== null) {
    idx = parseInt(v);
    renderNode(script[idx]);
    alert('불러오기 완료');
  } else alert('저장된 데이터가 없습니다.');
};

document.getElementById('restart').onclick = () => {
  if (confirm('처음부터 다시 시작할까요?')) {
    idx = 0;
    renderNode(script[0]);
    localStorage.removeItem('vn_idx');
  }
};

function estimateTime() {
  const words = script.map(s => (s.text || '').split(/\\s+/).length).reduce((a,b) => a + b, 0);
  const wpm = 130;
  const minutes = Math.max(5, Math.round(words / wpm));
  document.getElementById('timeEstimate').textContent = `플레이 분량: 약 ${minutes}분`;
}

estimateTime();

renderNode(script[0]);

