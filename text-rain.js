// 캔버스 설정
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = 'bold 150px Arial';

// 창 크기 변경 이벤트에 대한 이벤트 리스너 등록
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 초기 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//배경색
const colorRange = document.getElementById('colorRange');
colorRange.addEventListener('change', function() {
  const hue = this.value;
  const gradient = `linear-gradient(to top, hsl(${hue}, 100%, 75%), white)`;
  canvas.style.background = gradient;
});




// 입력된 글자를 저장할 배열
const texts = [];

// 새로운 글자 추가 함수
function addText() {
    const textInput = document.getElementById("textInput");
    const textValue = textInput.value.trim(); // 입력된 텍스트의 앞뒤 공백 제거
    if (!textValue) return; // 입력된 텍스트가 없으면 함수를 빠져나감
    const textWidth = ctx.measureText(textValue).width;
    const text = {
        value: textValue,
        x: Math.random() * (canvas.width - (70+textWidth)),
        y: 0,
        speed: Math.random() * 5 + 2,
        isAlive: true
    };
    texts.push(text);
    textInput.value = "";
}



// Add Text 버튼에 click 이벤트 리스너 등록
const addTextButton = document.getElementById("addTextButton");
addTextButton.addEventListener("click", addText);

// 글자 상태 업데이트
function updateText() {
    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        if (text.isAlive) {
            text.y += text.speed;
            if (text.y > canvas.height) {
                text.isAlive = false;
            }

            for (let j = 0; j < texts.length; j++) {
                const otherText = texts[j];
                if (text !== otherText && text.y < otherText.y) {
                    if (text.y + 150 >= otherText.y) {
                        text.isAlive = false;
                        break;
                    }
                }
            }

        } else if (text.y > canvas.height + 100) {
            texts.splice(i, 1);
            i--;
        }
    }
}
//글자색
const colorScroll = document.getElementById("colorScroll");
colorScroll.addEventListener("input", function() {
    const hue = colorScroll.value;
    for (let i = 0; i < texts.length; i++) {
        texts[i].color = `hsl(${hue}, 100%, 50%)`;
    }
});

const text = {
    value: textInput.value,
    x: Math.random() * (canvas.width - ctx.measureText(textInput.value).width),
    y: 0,
    speed: Math.random() * 5 + 1,
    isAlive: true,
    color: "black"
};



// 글자 그리기
function drawText() {
    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        ctx.font = "bold 150px Arial";
        const textWidth = ctx.measureText(text.value).width;
        const textHeight = 150;
        const boxWidth = textWidth + 20;
        const boxHeight = textHeight + 0;
        const boxX = text.x - 10;
        const boxY = text.y - boxHeight + 20;



        // 글자 그리기
        ctx.fillStyle = text.color;
        ctx.fillText(text.value, text.x, text.y);
    }
}

const centerTextButton = document.getElementById("centerTextButton");
centerTextButton.addEventListener("click", centerText);

function centerText() {
    const lineHeight = 70; // 각 텍스트의 높이
    const startY = canvas.height / 2 + lineHeight * (texts.length - 1) / 2; // 첫 번째 텍스트의 y 좌표
  
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const textWidth = ctx.measureText(text.value).width;
      const textHeight = parseInt(text.size);
  
      // Set position
      text.x = canvas.width / 2 - textWidth / 2;
      text.y = startY - i * lineHeight;
 

        // GIF 파일 로드하기
    const gifUrl = 'black3.gif';
    const gif = document.createElement('img');
    gif.src = gifUrl;
    
    // GIF를 출력할 태그에 추가하기
    const gifContainer = document.getElementById('gif-container');
    gifContainer.appendChild(gif);


    }
}
  
// 캔버스 초기화
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 애니메이션 실행
function animate() {
    clearCanvas();
    updateText();
    drawText();
    requestAnimationFrame(animate);
}

// 최초 애니메이션 실행
animate();
