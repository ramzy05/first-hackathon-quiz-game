/* here were going to creates et set of question with their answer */

let questions = [
  {
    question:"What does HTML stand for?",
    response:"Hyper Text Markup Language",
    props:[
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "House Translator Modeling Language",
    ]
  },
  {
    question:"Who is making the Web standards?",
    response:"The world Wide Web Consortium",
    props:[
      "The world Wide Web Consortium",
      "Mozilla",
      "Google",
      "Microsoft",
    ]
  },
  {
    question:"Choose the correct HTML element for the largest heading:",
    response:"<h1>",
    props:[
      "<heading>",
      "<h6>",
      "<head>",
      "<h1>",
    ]
  },
  {
    question:"What does CSS stand for?",
    response:"Cascading Style Sheets",
    props:[
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ]
  },
  {
    question:"Which HTML attribute is used to define inline styles?",
    response:"style",
    props:[
      "style",
      "font",
      "styles",
      "class",
    ]
  },
]

/* end creating questions  */

/* let's get dom elements */

const currentQuest = document.querySelector('.quest');
const remainingTime = document.querySelector('.time');
const allProps = document.querySelectorAll('.resp-cont');//props stands for propositions about question
const numQuest = document.querySelector('.numQuest');
const totalQuest = document.querySelector('.totalQuestion');
const progBar = document.querySelector('.prog-bar span');
const nextBtn = document.querySelector('.next-btn');
const quitBtn = document.querySelector('.quit-btn');

let score = 0, answer = false;/*
  score is going to take +1 everytime the user found the correct answer 
  then answer = false means that the user have yet give his answer*/
let currentQuestId= 0;
let idTime, idTimeProg;
let time = 15; //time of the game is set to 15seconds
remainingTime.textContent = time;


/* initialisation */
displayQuestions()
/* end initialisation */



nextBtn.addEventListener('click',(e)=>{
  if(currentQuestId === questions.length){
    alert('Votre score est de '+score+'/'+questions.length);
    e.preventDefault()

  }else{
    currentQuestId++;
    answer = false;
    time = 15;
    displayQuestions()
    
  }
})






function startTime(time){
  /*this functions is going to set the timer function for the remaining time*/
  idTime = setInterval(timer, 1000);
  function timer(){
    if(time >= 0){
      if( time > 9){ 
        remainingTime.textContent = time;
      }else{
        remainingTime.textContent = '0'+ time;
      }
      time--;
    }else{
      clearInterval(idTime);//we top the numeric timer 
      if(!answer){
        /* then here, we simply display icons to show the incorrect answers 
        and the correct one*/
        allProps.forEach((div)=>{
          let checkIcon = div.querySelector('.icons').children[0];
          let xmarkIcon =  div.querySelector('.icons').children[1];
          let resp = div.querySelector('.resp');
          if(resp.textContent.slice(3) === questions[currentQuestId].response){
            checkIcon.style.display = 'inline-block';
            xmarkIcon.style.display = 'none';
          }else{
            xmarkIcon.style.display = 'inline-block';
          }
      
        });
         /* end of displaying icons*/
      }

    }
  
  };
}

/* progress bar */
function startTimeBar(time){
  /* this function is incharge of the progress bar  */
  idTimeProg = setInterval(timer, 25);
  function timer(){
    time += 1;
    progBar.style.width = time + 'px';
    if(time > 640){/*640 represent the width of the progress bar (in pixel)
    so a that with the bar will stop progressing*/
      clearInterval(idTimeProg);
    }
  };
}
/* end progress bar */




/* processing functions */

function displayQuestions(){
  init();//look the comments inside this file to understant what it is doing 
  startTime(15);
  startTimeBar(0)
  currentQuest.textContent = questions[currentQuestId].question
  numQuest.textContent = currentQuestId + 1;
  totalQuest.textContent = questions.length
  let currentProps = shuffle(questions[currentQuestId].props), propId = 0;
  allProps.forEach((prop)=>{
    prop.querySelector('.resp').textContent = propId+ 1 +'. '+ currentProps[propId];
    propId++;
  })
}


(function checkProp(){
  removeIcons();
  allProps.forEach((prop)=>{
    prop.addEventListener('click', (e)=>{
      if(!answer){//here the answer = false, that have not yet make a choice

        clearInterval(idTimeProg);
        clearInterval(idTime);
        let resp = prop.querySelector('.resp');
        let checkIcon = prop.querySelector('.icons').children[0];
        let xmarkIcon =  prop.querySelector('.icons').children[1];
        checkIcon.style.display = 'none';
        xmarkIcon.style.display = 'none';
        
        if(resp.textContent.slice(3) === questions[currentQuestId].response){
          //user found the correct answer
          checkIcon.style.display = 'inline-block';//success
          score++;//increase the score
          xmarkIcon.style.display = 'none';
          
        }else{
          checkIcon.style.display = 'none';
          xmarkIcon.style.display = 'none';
          //mark all other answers as false
          allProps.forEach((div)=>{
            let checkIcon = div.querySelector('.icons').children[0];
            let xmarkIcon =  div.querySelector('.icons').children[1];
            let resp = div.querySelector('.resp');
            if(resp.textContent.slice(3) === questions[currentQuestId].response){
              checkIcon.style.display = 'inline-block';
              xmarkIcon.style.display = 'none';
            }else{
              xmarkIcon.style.display = 'inline-block';
            }
        
          });
        }
        answer = true;

      }
      e.preventDefault()
    })
  })

})();

function removeIcons(){
  allProps.forEach((div)=>{
    let checkIcon = div.querySelector('.icons').children[0];
    let xmarkIcon =  div.querySelector('.icons').children[1];    
    xmarkIcon.style.display = 'none';
    checkIcon.style.display = 'none';
  });
}

function resetTimeAsset(){
  remainingTime.textContent = '15';
  progBar.style.width = '0'
}

function init(){
  clearInterval(idTime);
  clearInterval(idTimeProg);
  resetTimeAsset();
  removeIcons();
    //the three previous instructions are for reinitialisation of timer and progressBar
}


function shuffle(array) {
  /* here I'm generating a random array to change the order
  of response propisitions to make sure that I'm going to have the same 
  order every time */
  return (array.sort(() => Math.random() - 0.5));
}

/* end processing functions */

