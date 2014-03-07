(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var TowersUI = Hanoi.TowersUI = function() {

  }

  TowersUI.render = function(game) {
    $('.container').empty();
    for (var i = 0; i < game.towers.length; i++) {
      var $stack = $('<div></div>');
      $stack.data('id', i);
      $stack.addClass('stack');
      game.towers[i].forEach(function(discSize) {
        var $disc = $('<div></div>');
        $disc.data('size', discSize);
        $disc.addClass('disc');
        $disc.css('width', discSize * 30);
        console.log($stack.length);
        $disc.css('bottom', $($stack).children().length * 50);
        $disc.css('margin-left', 75 - (discSize * 15));
        $disc.css('margin-right', 75 - (discSize * 15));
        $stack.prepend($disc);
      })
      $('.container').append($stack);
    }
  }

  TowersUI.bindHandlers = function(game) {
    this.render(game);
    var $fromStack = null;

    $(document).ready(function() {
      $('.container').on('click', 'div.stack', function(event) {
        $fromStack = TowersUI.handleClick(event, game, $fromStack);
        if(game.isWon()) {
          alert("A winner is you!");
          $('.container').off('click');
        }
      });
    });

  }

  TowersUI.handleClick = function(event, game, $fromStack) {
    var $stack = event.currentTarget;
    if ($fromStack === null) {
      //console.log($fromStack);
      //first click
      $fromStack = $stack;
      $($stack).addClass("highlighted");
      return $fromStack;
    } else {
      if(game.move($($fromStack).data('id'), $($stack).data('id'))) {
        TowersUI.render(game);
      } else {
        alert("NOPE");
      }
      $($fromStack).removeClass("highlighted");
      $fromStack = null;
      return $fromStack
    }
  }

})(this);