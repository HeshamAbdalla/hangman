
$(function() {
  $(document).foundation();
  introJs().start();

  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  var url = 'http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words';
  var score = 0;
  var counter = 0; // nextGame counter
  var count = 0; // counter for Hangman Digram
  var alphaLetter;
  var correctWords; // holder for the full-word
  var wordLetter = []; // array of letters
  var secretWord = []; // array of "_"
  var userName;
  var level; // difficulty
  var guesses = 5;
  // var idx;



  var getWords = function(url, difficulty, minLength, maxLength) {
    $.ajax({
      url: url,
      type: 'get',
      data: {
        difficulty: difficulty,
        minLength: minLength,
        maxLength: maxLength,
        count: 1,
        start: Math.floor(Math.random() * 100) + 0
      },
      success: function(data) {
        if(data !== '') {

        correctWords = data;
        data = data.split('');
        for(var i = 0; i < data.length; i++) {
          wordLetter.push(data[i]);
          console.log(wordLetter);
        }
        getGuess(wordLetter);
      } else {
        console.error("DATA IS EMPTY! " + data);
      }
      },
      error: function(err) {
        console.error(err);
      }
    });
  };

  var getGuess = function(word) {
    for(var j = 0; j < wordLetter.length; j++) {
      secretWord.push('_');
      $('.words').append("<li class='guess"+j+"'>"+secretWord[j]+"</li>");
    }
  };

  //----- Get Customized Words-----\\
  var getGameInfo = function(name, difficulty, minLength, maxLength) {
    if( difficulty < 10 ) {
      $('div.err').addClass('hide');
      $('.name-field').hide();
      $('.player').html("<h3>"+ name + "<small> Level " + difficulty +"<br>"+ " Max Length " + maxLength + "<br>"+ " Min Length " + minLength + " </small></h3>");
      $('span.badge.success').html(guesses);
      $('span.badge.secondary').html(score);
      getWords(url, difficulty, minLength, maxLength);
    } else {
      $('div.err').removeClass('hide');
    }
  };

  //----- Start Game -----\\
  $('.play').click(function() {
    userName = $('input.name').val();
    level = $('.difficulty').val();
    getGameInfo(
      userName,
      level,
      $('.minLength').val(),
      $('.maxLength').val()
    );
    $('#img').attr('src', './assets/images/first.png');
  });

  //----- Alphabet letters -----\\
  $.each(alphabet, function(i, val) {
    $('.button-group').append("<a class='button alphabet'>"+val+"</a>");
  });

  //---- Alphabet
  $('a.alphabet').click(function() {
    alphaLetter = $(this).text().toLowerCase();
    // check if the letter in wordLetter array
    for(var i = 0; i < wordLetter.length; i++) {
      if ( wordLetter[i] === alphaLetter ) {
        secretWord[i] = alphaLetter;
        score += 48;
        counter++;
        $(this).addClass('disabled');
        $('li.guess'+i).text(alphaLetter); // append the new letter
        $('span.badge.secondary').html(score); // append the new score
      }
    }
    var idx = (wordLetter.indexOf(alphaLetter));
    if ( idx === - 1 ) {
      guesses--;
      count++;
      console.error(idx, count);
      $(this).addClass('disabled');
      $('span.badge.success').html(guesses);
    }

    if( guesses < 1 ) {
      $('#img').attr('src', './assets/images/hangman.gif');
      $('#modal').html(
        '<p class="lead">Your Score <span class="badge secondary">' + score +'</span></p>\
        <p class="lead">The word was ' + correctWords.toUpperCase() +'</p>').foundation('open');
         //module for the correct word and the score
         newGame()
      } else if (guesses === 5) {
        $('#img').attr('src', './assets/images/first.png');
      } else if (guesses === 4) {
        $('#img').attr('src', './assets/images/second.png');
      } else if (guesses === 3) {
        $('#img').attr('src', './assets/images/third.png');
      } else if (guesses === 2) {
        $('#img').attr('src', './assets/images/fourth.png');
      } else if (guesses === 1) {
        $('#img').attr('src', './assets/images/fifth.png');
      }
      nextGame(counter, wordLetter.length); // check if player got the correct word
  });

    //----------- Next Game ------------\\
    var nextGame = function(num, arrlen) {
      if(num === arrlen) {
        wordLetter = [];
        secretWord = [];
        alphaLetter = '';
        counter = 0;
        // count = 0;
        $('.words').text('');
        $('span.badge.secondary').html(score);
        $('span.badge.success').html(guesses);

        $('.button-group a').removeClass('disabled');
        getGameInfo(userName, level, Math.floor(Math.random() * 6 ) + 1, Math.floor(Math.random() * 12 ) + 4);
      }
    };

    var newGame = function() {
      secretWord = [];
      guesses = 5;
      count = 0;
      score = 0;
      alphaLetter = '';
      wordLetter = [];
      $('.words').text('');
      $('span.badge.secondary').html(score);
      $('span.badge.success').html(guesses);
      $('#img').attr('src', './assets/images/first.png');
      $('.button-group a').removeClass('disabled');
      getGameInfo(userName, level, Math.floor(Math.random() * 6 ) + 0, Math.floor(Math.random() * 12 ) + 1);
    }
    //-------- New Game ---------\\
    $('#newGame').click(function() {
      newGame();
    });




    console.log('%cREACH PILOT PROGRAM', "font-size: 40px; color: blue");
  });
