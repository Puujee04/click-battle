const $team1Square = document.querySelector('.team1-square');
const $team2Square = document.querySelector('.team2-square');
const $team1Score = document.querySelector('.team1-score');
const $team2Score = document.querySelector('.team2-score');
const $resetBtn = document.querySelector('.reset-btn');
let score1, score2;
db.collection('battle').doc('yaYPbT2RgKAlblWC6KeZ').onSnapshot((doc) => {
    score1 = doc.data().red;
    score2 = doc.data().blue; 
    console.log(score1, score2);
    drawHtml(score1, score2);
    finished(score1, score2);
});

$team1Square.addEventListener('click', function(){
    db.collection('battle').doc('yaYPbT2RgKAlblWC6KeZ').update({
        red: firebase.firestore.FieldValue.increment(1)});
    
})

$team2Square.addEventListener('click', function(){
    db.collection('battle').doc('yaYPbT2RgKAlblWC6KeZ').update({
        blue: firebase.firestore.FieldValue.increment(1)
    })
})

function drawHtml(teamScore1, teamScore2){
    let totalScore = teamScore1 + teamScore2;
    $team1Square.style.width = `${(teamScore1 * 100) / totalScore}%`;
    $team1Score.innerHTML = teamScore1;
    $team2Square.style.width = `${(teamScore2 * 100) / totalScore}%`;
    $team2Score.innerHTML = teamScore2;
}

$resetBtn.addEventListener('click', function(){
    db.collection('battle').doc('yaYPbT2RgKAlblWC6KeZ').update({
        blue: 50,
        red: 50
    })
    drawHtml(score1, score2); 
})

function finished(teamScore1, teamScore2){
    if(teamScore1 === 500){
        alert(`Team 1 win`);
    }
    if(teamScore2 === 500){
        alert(`Team 2 win`);
    }
}