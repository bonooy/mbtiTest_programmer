const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 10;

const select = [0,0,0,0];


function addAnswer(answerText,qIdx,idx){
    var a = document.querySelector(".aBox");
    var answer = document.createElement('button');
    
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    
    answer.classList.add('fadeIn');

    a.appendChild(answer);

    answer.innerHTML = answerText;

    answer.addEventListener("click",function(){
        var children = document.querySelectorAll('.answerList'); 
        for(let i=0;i<children.length;i++){
            children[i].disabled = true;

            children[i].style.WebkitAnimation = "fadeOut 0.5s"
            children[i].style.animation = "fadeOut 0.5s"
        }
        setTimeout(()=>{
            // 타깃 타입별 늘려주기
            var target = qnaList[qIdx].a[idx].type;

            // 타깃에 들어있는 모든 타입 1씩 추가
            for(let i=0;i<target.length;i++){
                select[target[i]]+=1 
            }

            for(let i=0;i<children.length;i++){
                children[i].style.display = 'none';    
            }
            goNext(++qIdx);
        },450)
    },false)
}

function calResult(){   // 결과 계산
    // indexOf :  index반환
    // ... : 전개구문 : 선택한 배열을 펼치게 해줌
    // 최대값을 가지고 있는 인덱스를 반환해줌
    var result = select.indexOf(Math.max(...select));   // select에서 최대값의 인덱스 선택
    return result;  // 결과 반환

}
function setResult(){
    let point = calResult();    // point result 값 담기
    
    const resultNameIntro = document.querySelector('.resultIntro');
    resultNameIntro.innerHTML = infoList[point].nameIntro; 

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    // 이미지 넣는 법
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector("#resultImg");
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
    
    const resultDesc1 = document.querySelector('.resultDesc1');
    const resultDescTitle1 = document.querySelector('.resultDescTitle1');
    resultDescTitle1.innerHTML = infoList[point].descTitle1;
    resultDesc1.innerHTML = infoList[point].desc1;
  
    const resultDesc2 = document.querySelector('.resultDesc2');
    const resultDescTitle2 = document.querySelector('.resultDescTitle2');
    resultDescTitle2.innerHTML = infoList[point].descTitle2;
    resultDesc2.innerHTML = infoList[point].desc2;

    resultDesc1.style.color = "rgb(96.4%, 90.8%, 79%)";
    resultDescTitle1.style.color = "rgb(96.4%, 90.8%, 79%)";
    resultDesc2.style.color = "rgb(96.4%, 90.8%, 79%)";
    resultDescTitle2.style.color = "rgb(96.4%, 90.8%, 79%)";
}

function goResult(){    // 결과로 가기
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";            
        }, 450);
    },450);
    
    setResult();    // 결과 셋팅
}

function goNext(qIdx){  // 질문이 다 끝났을 때 결과로 이동하는 함수
    if(qIdx == endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.style.color = "rgb(99.5%, 83.8%, 51.2%)";
    q.innerHTML = qnaList[qIdx].q;
    
    for(let i in qnaList[qIdx].a)
    {
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }
    var countStatusNum = document.querySelector('.countStatus');
    countStatusNum.innerHTML = (qIdx+1)+"/"+endPoint;

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1)+"%"

}

function start(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";            
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    },450);
}

