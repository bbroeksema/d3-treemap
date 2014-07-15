  /**
   * This is the default configuration for the layout algorithm. It results in
   * a grid-like layout. A perfect grid when the number of elements to layout
   * is a perfect square. Otherwise the last couple of elements will be
   * stretched.
   */
  var configurations = {
    Test: {
      itemSize: {
        allowed: ['CONSTANT', 'DATA'],
        make: function(size) {
          switch(size) {
            case 'CONSTANT':
              return function() { return 1; }
            case 'DATA':
              return function(item) { return +item; }
            default:
              throw('Free does not allow ' + size + ' as the size function');
          }
        }
      },

      phrase: {
        allowed: [
          'LEFT_TOP_TO_BOTTOM',
          'LEFT_BOTTOM_TO_TOP',
          'LEFT_LEFT_TO_RIGHT',
          'LEFT_RIGHT_TO_LEFT',
          'BOTTOM_LEFT_TO_RIGHT',
          'BOTTOM_RIGHT_TO_LEFT',
          'BOTTOM_BOTTOM_TO_TOP',
          'BOTTOM_TOP_TO_BOTTOM',
          'RIGHT_BOTTOM_TO_TOP',
          'RIGHT_TOP_TO_BOTTOM',
          'RIGHT_RIGHT_TO_LEFT',
          'RIGHT_LEFT_TO_RIGHT',
          'TOP_RIGHT_TO_LEFT',
          'TOP_LEFT_TO_RIGHT',
          'TOP_TOP_TO_BOTTOM',
          'TOP_BOTTOM_TO_TOP'
        ],

        make: function(initialPhrase) {
          if (this.allowed.indexOf(initialPhrase) === -1) {
            throw('Grid does not allow ' + initialPhrase + ' as the initial phrase');
          }
          return function() {
            return d3.layout.phrase[initialPhrase];
          };
        }
      },

      recurse: function() {
        return false;
      },

      score: function(itemCount) { // Grid scoring function
        var chunkItemCount = 0;
        var itemCountWithIntSquare = Math.pow(Math.ceil(Math.sqrt(itemCount)), 2);
        return function(chunk, item) {
          var score = Math.pow(chunkItemCount, 2) < itemCountWithIntSquare ? 1 : 0;
          if (score === 1) {
            chunkItemCount++;
          } else {
            chunkItemCount = 0;
          }
          return score;
        }
      }
    },

    Grid: {
      itemSize: {
        allowed: ['CONSTANT'],
        make: function(size) {
          switch(size) {
            case 'CONSTANT':
              return function() { return 1; }
            default:
              throw('Grid does not allow ' + size + ' as the size function');
          }
        }
      },

      phrase: {
        allowed: [
          'LEFT_TOP_TO_BOTTOM',
          'LEFT_BOTTOM_TO_TOP',
          'BOTTOM_LEFT_TO_RIGHT',
          'BOTTOM_RIGHT_TO_LEFT',
          'RIGHT_BOTTOM_TO_TOP',
          'RIGHT_TOP_TO_BOTTOM',
          'TOP_RIGHT_TO_LEFT',
          'TOP_LEFT_TO_RIGHT'
        ],

        make: function(initialPhrase) {
          if (this.allowed.indexOf(initialPhrase) === -1) {
            throw('Grid does not allow ' + initialPhrase + ' as the initial phrase');
          }
          return function() {
            return d3.layout.phrase[initialPhrase];
          };
        }
      },

      recurse: function() {
        return false;
      },

      score: function(itemCount) { // Grid scoring function
        var chunkItemCount = 0;
        var itemCountWithIntSquare = Math.pow(Math.ceil(Math.sqrt(itemCount)), 2);
        return function(chunk, item) {
          var score = Math.pow(chunkItemCount, 2) < itemCountWithIntSquare ? 1 : 0;
          if (score === 1) {
            chunkItemCount++;
          } else {
            chunkItemCount = 0;
          }
          return score;
        }
      }
    }
  }
