
$(function() {
  $(document).foundation();

  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  var score = 0;
  var letter;
  var check;
  var count = 0;
  var life = 5;
  var words;
  var word = [];
  var guess = [];
  var index;
  var url = 'http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words';


  var getWords = function(url, difficulty, minLength, maxLength) {
    $.ajax({
      url: url,
      type: 'get',
      data: {
        difficulty: difficulty,
        minLength: minLength,
        maxLength: maxLength
      },
      success: function(data) {
        data = data.replace(/\r?\n|\r/g, ' ').split(' ').splice(0, 1);
        for(var i = 0; i < data.toString().split('').length; i++) {
          word.push(data[i]);
          console.log(data[data.split('')]])
        }
        getGuess(word)
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

    var getGuess = function(word) {
      for(var j = 0; j < word.length; j++) {
        guess.push('_');
        $('.words').append("<li class='guess"+j+"'>"+guess[j]+"</li>");
      }
    };


    var getUserInfo = function(name, difficulty, minLength, maxLength) {

      if( name !== '' ) {
        $('div.err').addClass('hide');
        $('.name-field').hide();
        $('.player').append("<h3>Welcome "+ name +"</h3>");
        $('span.badge.success').html(life)
        $('span.badge.secondary').html(score);
        getWords(url, difficulty, minLength, maxLength);

      } else {
        $('div.err').removeClass('hide');
      }

    }

    // Start the game
    $('.play').click(function(){
      getUserInfo(
        $('.name').val(),
        $('.difficulty').val(),
        $('.minLength').val(),
        $('.maxLength').val()
      );

    });

    //-------------------------------------------
    // populate alphabet letters
    $.each(alphabet, function(i, val){
      $('.button-group').append("<a class='button alphabet'>"+val+"</a>");
    })
    //-----------------------------------------------


    $('a.alphabet').click(function(){ //TODO -> fix the counting problem
      letter = $(this).text();
      // $(this).addClass('disabled');
      check = _.find(word, function(element, i) {
        index = i;
        return letter.toLowerCase() === element
        // console.log(word.split('').splice(index, 1))
        //returns true when found false otherwise
      })


      // if you found the letter in word
      // keep letter and delete it from the word array
      // check if the letter was found in the letter array
      if(check) {
        // if($('.guess'+index ).html() === "_" ) {
        $( "li " ).each(function( idx ) {
          // console.log( index + ": " + );
          if( guess[idx] === "_") {
            guess[idx] = letter
            // console.log(word.indexOf(word[idx]))
            // $( this ).text(letter)
            score += 48; // increase the score
            // .splice(index, 1, letter); // swap the guess with the correct letter

            $('li.guess'+idx).text(letter); // append the new letter
            $('span.badge.secondary').html(score); // append the new score
            return false;
          }
        });


      } else {
        life--;
        count++; // counter for swaping the images of hangman
        $('span.badge.success').html(life);

      }


      // check if life is not 0 yet
      if( life < 1 ) {
        $('#img').attr('src', './assets/images/hangman.gif'); //swap the first img with the last one
      } else if (count === 1) {
        $('#img').attr('src', './assets/images/second.png')
      } else if (count === 2) {
        $('#img').attr('src', './assets/images/third.png')
      } else if (count === 3) {
        $('#img').attr('src', './assets/images/fourth.png')
      } else if (count === 4) {
        $('#img').attr('src', './assets/images/fifth.png')
      }
    })

    });
