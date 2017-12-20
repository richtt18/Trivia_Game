$(document).ready(function() {
  ////// GLOBAL VARIABLES //////

  // Initialize varibles to be used in app logic
  var questions;
  var currentQuestion;
  var isAnswerClicked;
  var isTimeUp;
  var countWrong;
  var countCorrect;
  var intervalId;
  var isUserCorrect;
  var userChoiceIndex;

  ////// EVENT LISTENERS //////

  // When user clicks on an answer
  $(document).on("click", ".choice", function() {
    // If an answer hasn't been clicked and time isn't up
    if (!isAnswerClicked && !isTimeUp) {
      // If the answer clicked is correct
      if (parseInt($(this).attr("index")) === currentQuestion.correctAnswer) {
        // Print correct to result
        $(".result").text("Correct!");
        // Add 1 to correct counter
        countCorrect++;
        isUserCorrect = true;
      } else {
        // Otherwise print wrong to result
        $(".result").text("Wrong!");
        // Add 1 to wrong counter
        countWrong++;
        // Save userChoiceIndex
        userChoiceIndex = parseInt($(this).attr("index"));
        isUserCorrect = false;
      }

      // Set isAnswerClicked to true to prevent things from happening if user continues to click answers
      isAnswerClicked = true;

      // Stop question timer
      stopTimer();

      // Call next round function
      endRound();
    }
  });

  // When user clicks on the Reset button
  $(document).on("click", "button", function() {
    // Call reset function
    reset();
  });


  ////// FUNCTIONS //////

  function reset() {
    // Set questions to array of objects holding questions and answers
    questions = [
      {
        question: "What was the first decenteralized cryptocurrency?",
        answers: ["Bitcoin", "Ethereum", "Hashcoin", "Bitcoin Gold"],
        correctAnswer: 0
      },

      {
        question: "How do you spend or recieve cryptocurrency?",
        answers: ["Cloud link", "A Wallet Key", "Coin Key", "Hard disk drive bank"],
        correctAnswer: 1
      },

      {
        question: "Who created Bitcoin?",
        answers: ["Satoshi Nakamoto", "Federal Reserve", "Bill Gates", "Tupac Shakur"],
        correctAnswer: 0
      },

      {
        question: "What is the proof of work for Bitcoin?",
        answers: ["Satellite link", "Key derivation function", "Chris Bonnington", "Sercure hash algorithm"],
        correctAnswer: 3
      },

      {
        question: "What secures the blockchain?",
        answers: ["GPS", "Banking networks", "Cryptography", "A Pass Key"],
        correctAnswer: 2
      },

      {
        question: "The first blockchain was coneptualized by who?",
        answers: ["US Navy", "Satoshi Nakamoto", "IRS", "Elon Musk"],
        correctAnswer: 1
      },

      {
        question: "What does the cryptocurrency Litecoin use as its hash function?",
        answers: ["Scrypt", "SHA-256", "Tangle", "Javascript"],
        correctAnswer: 0
      },

      {
        question: "How do cryptocurrencies avoid a need for trusted third party verification?",
        answers: ["Creating an ICO", "Using trusted banking server networks", "Timestamping blockchain transactions", "Partnering with the Federal Reserve"],
        correctAnswer: 2
      },

      {
        question: "What is the most secure form of cryptocurrency wallet?",
        answers: ["Hardware wallet", "Brain wallet", "Software wallet", "Multicurrency wallet"],
        correctAnswer: 0
      },

      {
        question: "Who manages a blockchain for use as a distributed ledger?",
        answers: ["Peer-to-peer network", "IRS", "ICO", "World Wide Web"],
        correctAnswer: 0
      },

      {
        question: "What is mandatory to be hardcoded into the software of an application that uses a blockchain?",
        answers: ["The Hash tree", "Wallet key", "Node address", "The Genesis block"],
        correctAnswer: 3
      },

      {
        question: "What was the first cryptocurrency not based on a blockchain?",
        answers: ["Ethereum", "Bitcoin Gold", "IOTA", "Bitcoin Cash"],
        correctAnswer: 2
      }
    ];

    // Set game variables to initial conditions
    countWrong = 0;
    countCorrect = 0;

    // Hide summary div until game over
    $(".summary").hide();

    // Show main and result rows
    $(".mainRow").show();
    $(".resultRow").show();

    // Call choose question function
    chooseQuestion();
  }

  function chooseQuestion() {
    // Set round booleans to initial conditions
    isAnswerClicked = false;
    isTimeUp = false;
    userChoiceIndex = null;

    // Empty certain HTML elements
    $(".choices").empty();
    $(".result").empty();

    // Choose random object from questions array and save to currentQuestion
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    // Print question to HTML
    $(".question").text(currentQuestion.question);
    // Print answers to HTML
    for (i = 0; i < currentQuestion.answers.length; i++) {
      $(".choices").append(`<div class="choice" index=${i}>${currentQuestion.answers[i]}</div>`);
    }
    // Start timer
    runTimer();
  }

  function runTimer() {
    var secondsLeft = 17;

    $(".timer").text(secondsLeft);

    intervalId = setInterval(function() {
      secondsLeft--;
      $(".timer").text(secondsLeft);
      if (secondsLeft === 0) {
        isTimeUp = true;
        stopTimer();
        countWrong++;
        $(".result").text("Time's up!")
        endRound();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function endRound() {
    // Highlight correct answer in green
    var correctIndex = currentQuestion.correctAnswer;
    $(`.choice[index=${correctIndex}]`).css("background-color", "#1C7F35");
    $(`.choice[index=${correctIndex}]`).css("color", "#FFFCEC");

    if (!isUserCorrect) {
      $(`.choice[index=${userChoiceIndex}]`).css("background-color", "#EB593C");
      $(`.choice[index=${userChoiceIndex}]`).css("color", "#FFFCEC");
    }

    // Remove currentQuestion from questions array
    questions.splice(questions.indexOf(currentQuestion), 1);

    // If no questions remain
    if (questions.length === 0) {
      // Replace contents of container with summary and reset button
      $(".mainRow").hide();
      $(".resultRow").hide();
      $(".summaryMessage").text(`That's all of the questions! You got ${countCorrect} questions correct and ${countWrong} questions wrong. Click Reset to play again.`)
      $(".summary").show();
    } else {
      var endRoundTimer = setTimeout(function() {
        chooseQuestion();
      }, 1000);
    }
  }

  ////// CALLS //////
  reset();
});
