let timer = document.getElementById('timer')
let quoteId = document.getElementById("quote")
let typing = document.getElementById("typing")
let quoteApi = 'https://api.quotable.io/random'
function getQuote() {
    return fetch(quoteApi).then(res => res.json()).then(data => data.content)
    
}


async function getNextQuote() {
  const quote = await getQuote()
  quoteId.innerText = ''
  quote.split('').forEach( character => {
    let span = document.createElement("span")
    span.innerText = character
    quoteId.appendChild(span)
  });
  typing.value = null 
  startTimer()
}



typing.addEventListener('input', ()=>{
    typing.innerHTML = 0
    let correct = true
    let arrayQuote = quoteId.querySelectorAll('span');
    let arrayInput =  typing.value.split('');
    arrayQuote.forEach((charSpan, index) => {
        let typedchar = arrayInput[index]
        if(typedchar==null){
        charSpan.classList.remove("correct")
        charSpan.classList.remove("incorrect")
        correct = false;
        }
        else if(typedchar===charSpan.innerText){
            charSpan.classList.add("correct")
            charSpan.classList.remove("incorrect")
            correct = true;
        }else{
            charSpan.classList.remove("correct")
            charSpan.classList.add("incorrect")
            correct = false
        }
    })
    if (correct) {
        
        getNextQuote()
        
    }
})

let startTime
function startTimer() {
   timer.innerText = 0
   startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
        if (timer.innerText == 59) {
            getNextQuote()
        }
    }, 1000);
    
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
  }



getNextQuote()