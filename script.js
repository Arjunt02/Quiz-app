const questions=[
    {
        question:"A copy of 'real' DOM that is kept in memory is called what?",
        answers:[
            {text:"DOM",correct:false},
            {text:"Virtual DOM",correct:true},
            {text:"React DOM",correct:false},
            {text:"Shadow DOM",correct:false}
        ]
    },
    {
        question:"Which keyword create a constant in JavaScript",
        answers:[
            {text:"Const",correct:true},
            {text:"Var",correct:false},
            {text:"Let",correct:false},
            {text:"Constant",correct:false}
        ]
    },
    {
        question:"What is the default local host port that a React development server uses?",
        answers:[
            {text:"3500",correct:false},
            {text:"8080",correct:false},
            {text:"5000",correct:false},
            {text:"3000",correct:true}
        ]
    },
    {
        question:"What command is used to start the React local development server",
        answers:[
            {text:"npm serve",correct:false},
            {text:"npm start",correct:true},
            {text:"npm build",correct:false},
            {text:"npm run dev",correct:false}
        ]
    },
    {
        question:"Which operator ca be used to conditionally render a React component",
        answers:[
            {text:"??",correct:false},
            {text:"||",correct:false},
            {text:"::",correct:false},
            {text:"&&",correct:true}
        ]
    },
    {
        question:"What tool does React use to compile JSX",
        answers:[
            {text:"Babel",correct:true},
            {text:"ReactDOM",correct:false},
            {text:"React Router",correct:false},
            {text:"JSX Compiler",correct:false}
        ] 
    },
]


const questionElement=document.getElementById("question")
const answerButtons=document.getElementById("answer-buttons")
const nextButton=document.getElementById("next-btn")


let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next",
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct")
        score++;
    }else{
        selectBtn.classList.add("incorrect")
    }

    // only choose one answer
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    })
    nextButton.style.display="block"

}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton()
    }else{
        startQuiz();
    }
})

startQuiz();


