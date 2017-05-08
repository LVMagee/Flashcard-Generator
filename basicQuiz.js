// Require the 'inquirer' package
var inquirer = require('inquirer');

// Import the flash cards constructor implementations
var basicCard = require('./main.js');
// Import the full list of questions for basic
var basicQuestions = require('./basicQuestions.js').basicQuestions;

// Variable that holds the basic questions list
var closeQuestions = [];

// Populate the basic questions list
for (var i = 0; i < basicQuestions.length; i++) {
    var q = new basicCard.BasicCard(basicQuestions[i].front, basicQuestions[i].back);
    closeQuestions.push(q);
}

// What question the user is currently on
var currentQuestion = 0;
// How many questions the user has gotten right
var answerRight = 0;
// How many questions the user has gotten wrong
var answerWrong = 0;

// askQuestion prompts the user to answer a given basic question
function askQuestion() {
    inquirer.prompt([
    {
        type: 'input',
        message: closeQuestions[currentQuestion].front + '\nAnswer: ',
        name: 'userGuess'
    }
    ]).then(function (answers) {
        console.log('\n');

        // Check if the user has guessed correctly
        if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].back.toLowerCase()) {
            console.log('Correct!');
            answerRight++;
        } else {
            console.log('Incorrect!');
            answerWrong++;
        }

        // Show the correct answer
        console.log(closeQuestions[currentQuestion].back);
        console.log('-------------------------------------\n');

        // Advance to the next question
        if (currentQuestion < closeQuestions.length - 1) {
            currentQuestion++;
            askQuestion();
        } else {
            console.log('Game Over!');
            console.log('Correct Answers: ' + answerRight);
            console.log('Incorrect Answers: ' + answerWrong);
            console.log('-------------------------------------\n');

            // Prompt the user to play again
            inquirer.prompt([
            {
                type: 'confirm',
                message: 'Would you like to play again?',
                name: 'playAgain'
            }
            ]).then(function (answers) {
                if (answers.playAgain) {
                    // Reset the game
                    currentQuestion = 0;
                    answerRight = 0;
                    answerWrong = 0;

                    // Begin asking the questions!
                    askQuestion();
                } else {
                    // Exit the game
                    console.log('Thanks for playing! Goodbye!');
                }
            });
        }
    });

}
// Begin asking the questions!
askQuestion();