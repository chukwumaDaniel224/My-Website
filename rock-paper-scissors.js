let  score = JSON.parse(localStorage.   getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
    }; 

    updateScoreElement();

  /*  
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    }
  }*/

    let isautoplaying = false;
    let intervalid;

    //we can also use an arrow function in this case//
    // eg: const autoplay  = () => { } //
  function autoplay() {
    if (!isautoplaying) {
      intervalid = setInterval(function() {
        const playersMove = pickComputerMove();
        playGame(playersMove);
      }, 1000);
      isautoplaying = true;

    }
    else {
      clearInterval(intervalid);
      isautoplaying =  false;
    }
  }

  document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock')
  })

  document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper')
  })

  document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors')
  })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    }
    else if (event.key === 'p') {
      playGame('paper');
    }
    else if (event.key === 's') {
      playGame('scissors');
    }
  });

  function playGame(playersMove) {
    const computerMove = pickComputerMove();
    let result = '';

      if (playersMove === 'scissors') {

      if (computerMove === 'rock') {
          result = 'You Lose.';
      }
      else if (computerMove === 'paper') {
          result = 'You Win.';
      }
      else if (computerMove === 'scissors') {
          result = 'Tie.';
      }
  }

  else if (playersMove === 'paper') {

    if (computerMove === 'rock') {
          result = 'You Win.';
      }
      else if (computerMove === 'paper') {
          result = 'Tie.';
      }
      else if (computerMove === 'scissors') {
          result = 'You Lose.';
      }
  }

  else if (playersMove === 'rock' ) {
    
    if (computerMove === 'rock') {
        result = 'Tie.';
    }
    else if (computerMove === 'paper') {
        result = 'You Lose.';
    }
    else if (computerMove === 'scissors') {
        result = 'You Win.';
    }
  };

  if (result === 'You Win.') {
    score.wins += 1;
  }
  else if (result === 'You Lose.') {
    score.losses += 1
  }
  else if (result === 'Tie.') {
    score.ties += 1
  };

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =
  `You
  <img src="./${playersMove}-emoji.png" class="move-icon"> , computer
  <img src="./${computerMove}-emoji.png" class="move-icon">`;

  updateScoreElement();

}

  function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';
    if (randomNumber >= 0 && randomNumber <1/3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1/3 && randomNumber <2/3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2/3 && randomNumber <1) {
        computerMove = 'scissors';
    }

    return computerMove;
    }
  