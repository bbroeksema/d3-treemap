(function() {
  function d3_treemap_rect(x, y, width, height) {
    var rect = {};

    rect.clone = function() {
      return d3_treemap_rect(x, y, width, height);
    }

    rect.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return rect;
    };

    rect.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return rect;
    };

    rect.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return rect;
    };

    rect.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      return rect;
    };


    rect.toPojo = function() {
      return { x: x, y: y, width: width, height: height };
    }

    return rect;
  }
  function d3_treemap_chunk(phrase, availableSpace) {
    var items = [],
        sum = 0,
        chunk = {},
        rect = undefined;

    switch(phrase) {
      case d3.layout.phrase.LEFT_TOP_TO_BOTTOM:
      case d3.layout.phrase.LEFT_BOTTOM_TO_TOP:
      case d3.layout.phrase.LEFT_LEFT_TO_RIGHT:
      case d3.layout.phrase.LEFT_RIGHT_TO_LEFT:
        rect = d3_treemap_rect(
          availableSpace.x(),
          availableSpace.y(),
          0,
          availableSpace.height()
        );
        break;
      case d3.layout.phrase.BOTTOM_LEFT_TO_RIGHT:
      case d3.layout.phrase.BOTTOM_RIGHT_TO_LEFT:
      case d3.layout.phrase.BOTTOM_BOTTOM_TO_TOP:
      case d3.layout.phrase.BOTTOM_TOP_TO_BOTTOM:
        rect = d3_treemap_rect(
          availableSpace.x(),
          availableSpace.y() + availableSpace.height(),
          availableSpace.width(),
          0
        );
        break;

      case d3.layout.phrase.RIGHT_BOTTOM_TO_TOP:
      case d3.layout.phrase.RIGHT_TOP_TO_BOTTOM:
      case d3.layout.phrase.RIGHT_RIGHT_TO_LEFT:
      case d3.layout.phrase.RIGHT_LEFT_TO_RIGHT:
        rect = d3_treemap_rect(
          availableSpace.x() + availableSpace.width(),
          availableSpace.y(),
          0,
          availableSpace.height()
        );
        break;

      case d3.layout.phrase.TOP_RIGHT_TO_LEFT:
      case d3.layout.phrase.TOP_LEFT_TO_RIGHT:
      case d3.layout.phrase.TOP_TOP_TO_BOTTOM:
      case d3.layout.phrase.TOP_BOTTOM_TO_TOP:
        rect = d3_treemap_rect(
          availableSpace.x(),
          availableSpace.y(),
          availableSpace.width(),
          0
        );
        break;

      default:
        throw("Invalid phrase");
    };

    chunk.items = [];

    function calculateItemRect(item, rect) {
      var x = rect.x(),
          y = rect.y(),
          w = chunk.rect().width(),
          h = chunk.rect().height(),
          factor = item / chunk.sum();

      switch(phrase) {
        case d3.layout.phrase.BOTTOM_LEFT_TO_RIGHT:
        case d3.layout.phrase.TOP_LEFT_TO_RIGHT:
          w = chunk.rect().width() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.LEFT_TOP_TO_BOTTOM:
          h = chunk.rect().height() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.LEFT_BOTTOM_TO_TOP:
          h = chunk.rect().height() * factor;
          y = rect.height() - h;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.LEFT_LEFT_TO_RIGHT:
          w = chunk.rect().width() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.LEFT_RIGHT_TO_LEFT:
          w = chunk.rect().width() * factor;
          x = rect.x() + rect.width() - w;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.RIGHT_BOTTOM_TO_TOP:
          h = chunk.rect().height() * factor;
          x = rect.x();
          y = rect.y() + rect.height() - h;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.RIGHT_TOP_TO_BOTTOM:
          x = rect.x();
          h = chunk.rect().height() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.RIGHT_RIGHT_TO_LEFT:
          w = chunk.rect().width() * factor;
          x = rect.x() + rect.width() - w;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.RIGHT_LEFT_TO_RIGHT:
          w = chunk.rect().width() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.BOTTOM_RIGHT_TO_LEFT:
          w = chunk.rect().width() * factor;
          x = rect.x() + rect.width() - w;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.BOTTOM_BOTTOM_TO_TOP:
          h = chunk.rect().height() * factor;
          y = rect.y() + rect.height() - h;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.BOTTOM_TOP_TO_BOTTOM:
          h = chunk.rect().height() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.TOP_RIGHT_TO_LEFT:
          w = chunk.rect().width() * factor;
          x = rect.width() - w;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.TOP_TOP_TO_BOTTOM:
          h = chunk.rect().height() * factor;
          return d3_treemap_rect(x, y, w, h);

        case d3.layout.phrase.TOP_BOTTOM_TO_TOP:
          h = chunk.rect().height() * factor;
          y = rect.y() + rect.height() - h;
          return d3_treemap_rect(x, y, w, h);

        default:
          throw("Invalid phrase");
      }
    }

    function reduce(chunkRect, itemRect) {
      switch(phrase) {
        case d3.layout.phrase.BOTTOM_LEFT_TO_RIGHT: // Fall through
        case d3.layout.phrase.TOP_LEFT_TO_RIGHT:
          return chunkRect
            .x(chunkRect.x() + itemRect.width())
            .width(chunkRect.width() - itemRect.width());

        case d3.layout.phrase.LEFT_TOP_TO_BOTTOM:  // Fall through
        case d3.layout.phrase.RIGHT_TOP_TO_BOTTOM:
          return chunkRect
            .y(chunkRect.y() + itemRect.height())
            .height(chunkRect.height() - itemRect.height());

        case d3.layout.phrase.LEFT_BOTTOM_TO_TOP:  // Fall through
        case d3.layout.phrase.RIGHT_BOTTOM_TO_TOP:
          return chunkRect
            .height(chunkRect.height() - itemRect.height());

        case d3.layout.phrase.LEFT_RIGHT_TO_LEFT:  // Fall through
        case d3.layout.phrase.RIGHT_RIGHT_TO_LEFT:
          return chunkRect
            .width(chunkRect.width() - itemRect.width());

        case d3.layout.phrase.BOTTOM_RIGHT_TO_LEFT: // Fall through
        case d3.layout.phrase.TOP_RIGHT_TO_LEFT:
          return chunkRect
            .width(chunkRect.width() - itemRect.width());

        case d3.layout.phrase.LEFT_LEFT_TO_RIGHT:  // Fall through
        case d3.layout.phrase.RIGHT_LEFT_TO_RIGHT:
          return chunkRect
            .x(chunkRect.x() + itemRect.width())
            .width(chunkRect.width() - itemRect.width());

        case d3.layout.phrase.BOTTOM_TOP_TO_BOTTOM: // Fall through
        case d3.layout.phrase.TOP_TOP_TO_BOTTOM:
          return chunkRect
            .y(chunkRect.y() + itemRect.height())
            .height(chunkRect.height() - itemRect.height());

        case d3.layout.phrase.BOTTOM_BOTTOM_TO_TOP: // Fall through
        case d3.layout.phrase.TOP_BOTTOM_TO_TOP:
          return chunkRect
            .height(chunkRect.height() - itemRect.height());
        default:
          throw("Invalid phrase");
      }
    }

    // This function calculates the rects for each individual item in the chunk.
    // It assumes that no items are added afterwards and that the algorithm has
    // properly updated the chunk.rect for the items in this chunk.
    chunk.itemRects = function() {
      var rect = chunk.rect().clone(),
          itemRect;

      return chunk.items.map(function(item) {
        itemRect = calculateItemRect(item, rect);
        rect = reduce(rect, itemRect);
        return itemRect;
      });
    }

    chunk.phrase = function() {
      return phrase;
    }

    chunk.push = function(item) {
      sum += item;
      chunk.items.push(item);
    }

    chunk.rect = function(_) {
      if (!arguments.length) return rect;
      rect = _;
      return chunk;
    }

    chunk.sum = function() {
      return sum;
    }

    return chunk;
  }
  /**
   * All allowed ways to layout a chunk in the available space and the stack
   * directions of the items in the chunk
   */
  d3.layout.phrase = {
    LEFT_TOP_TO_BOTTOM: 0,
    LEFT_BOTTOM_TO_TOP: 1,
    LEFT_LEFT_TO_RIGHT: 2,
    LEFT_RIGHT_TO_LEFT: 3,

    BOTTOM_LEFT_TO_RIGHT: 4,
    BOTTOM_RIGHT_TO_LEFT: 5,
    BOTTOM_BOTTOM_TO_TOP: 6,
    BOTTOM_TOP_TO_BOTTOM: 7,

    RIGHT_BOTTOM_TO_TOP: 8,
    RIGHT_TOP_TO_BOTTOM: 9,
    RIGHT_RIGHT_TO_LEFT: 10,
    RIGHT_LEFT_TO_RIGHT: 11,

    TOP_RIGHT_TO_LEFT: 12,
    TOP_LEFT_TO_RIGHT: 13,
    TOP_TOP_TO_BOTTOM: 14,
    TOP_BOTTOM_TO_TOP: 15,

    properties: {
      0: { name: "LEFT_TOP_TO_BOTTOM" },
      1: { name: "LEFT_BOTTOM_TO_TOP" },
      2: { name: "LEFT_LEFT_TO_RIGHT" },
      3: { name: "LEFT_RIGHT_TO_LEFT" },
      4: { name: "BOTTOM_LEFT_TO_RIGHT" },
      5: { name: "BOTTOM_RIGHT_TO_LEFT" },
      6: { name: "BOTTOM_BOTTOM_TO_TOP" },
      7: { name: "BOTTOM_TOP_TO_BOTTOM" },
      8: { name: "RIGHT_BOTTOM_TO_TOP" },
      9: { name: "RIGHT_TOP_TO_BOTTOM" },
     10: { name: "RIGHT_RIGHT_TO_LEFT" },
     11: { name: "RIGHT_LEFT_TO_RIGHT" },
     12: { name: "TOP_RIGHT_TO_LEFT" },
     13: { name: "TOP_LEFT_TO_RIGHT" },
     14: { name: "TOP_TOP_TO_BOTTOM" },
     15: { name: "TOP_BOTTOM_TO_TOP" }
    }
  }

  if (Object.freeze)
    Object.freeze(d3.layout.phrase);

  function sum(T, from, to) {
    var sum = 0,
        i = from;

    for (i; i < to; i++) {
      sum += this.itemSize(T[i]);
    }

    return sum;
  }

  // This function decreases the available space rect and increases the chunk's
  // rect. Both the increase and decrease are based on the ratio of item weights
  // in the current chunk and the overall weight N that needs to be laid out.
  //
  // A chunk, by design, takes either full with or full height of the available
  // space. As a result, based on the side the chunk is place (one of LEFT, RIGHT,
  // TOP, BOTTOM), the chunk will grow into the availableSpace:
  //
  // In case the chunk is placed:
  // LEFT  : It takes full height and grows to the left when items are added.
  // RIGHT : It takes full height and grows to the right when items are added.
  // TOP   : It takes full width and grows downwards when items are added.
  // BOTTOM: It takes full widht and grows upwards when items are added.
  function updateAreas(availableSpace, chunk, N) {
    var factor = chunk.sum() / N,
        widhtOrHeight;

    switch(chunk.phrase()) {
      case d3.layout.phrase.LEFT_TOP_TO_BOTTOM:
      case d3.layout.phrase.LEFT_BOTTOM_TO_TOP:
      case d3.layout.phrase.LEFT_LEFT_TO_RIGHT:
      case d3.layout.phrase.LEFT_RIGHT_TO_LEFT:
        widhtOrHeight = availableSpace.width() * factor;
        chunk.rect().width(widhtOrHeight);
        availableSpace
          .x(availableSpace.x() + widhtOrHeight)
          .width(availableSpace.width() - widhtOrHeight);
        break;
      case d3.layout.phrase.BOTTOM_LEFT_TO_RIGHT:
      case d3.layout.phrase.BOTTOM_RIGHT_TO_LEFT:
      case d3.layout.phrase.BOTTOM_BOTTOM_TO_TOP:
      case d3.layout.phrase.BOTTOM_TOP_TO_BOTTOM:
        widhtOrHeight = availableSpace.height() * factor;
        chunk.rect()
          .height(widhtOrHeight)
          .y(chunk.rect().y() - widhtOrHeight);
        availableSpace.height(availableSpace.height() - widhtOrHeight);
        break;
      case d3.layout.phrase.RIGHT_BOTTOM_TO_TOP:
      case d3.layout.phrase.RIGHT_TOP_TO_BOTTOM:
      case d3.layout.phrase.RIGHT_RIGHT_TO_LEFT:
      case d3.layout.phrase.RIGHT_LEFT_TO_RIGHT:
        widhtOrHeight = availableSpace.width() * factor;
        chunk.rect()
          .width(widhtOrHeight)
          .x(availableSpace.width() - widhtOrHeight);
        availableSpace.width(availableSpace.width() - widhtOrHeight);
        break;
      case d3.layout.phrase.TOP_RIGHT_TO_LEFT:
      case d3.layout.phrase.TOP_LEFT_TO_RIGHT:
      case d3.layout.phrase.TOP_TOP_TO_BOTTOM:
      case d3.layout.phrase.TOP_BOTTOM_TO_TOP:
        widhtOrHeight = availableSpace.height() * factor;
        chunk.rect().height(widhtOrHeight);
        availableSpace
          .y(availableSpace.y() + widhtOrHeight)
          .height(availableSpace.height() - widhtOrHeight);
        break;
      default:
        throw("Invalid phrase");
    };
  }

  function layout(T, from , to) {
    if (!from) { from = 0 }
    if (!to) { to = T.length; }

    var availableSpace = d3_treemap_rect(0, 0, this.size[0], this.size[1]), // FIXME: doesn't work like this with recursion.
        remainingSum = sum.apply(this, [T, from, to]),
        currentChunk = d3_treemap_chunk(this.phrase(), availableSpace),
        currentFrom = from ? from : 0,
        result = [currentChunk],
        prevScore = Number.NEGATIVE_INFINITY;

    for (i = from; i < to; i++) {
      var itemSize = this.itemSize(T[i]),
          curScore = this.score(currentChunk, itemSize);

      if (curScore < prevScore) {
        updateAreas(availableSpace, currentChunk, remainingSum);
        remainingSum -= currentChunk.sum();

        if (this.recurse(currentChunk)) {
          var recursiveChunks = layout(T, currentFrom, to);

          if (recursiveChunks.length > 0) {
            result.pop();
            Array.prototype.push.apply(result, recursiveChunks);
          }
        }

        currentChunk = d3_treemap_chunk(this.phrase(currentChunk), availableSpace);
        result.push(currentChunk);
        currentFrom = i;
        prevScore = this.score(currentChunk, itemSize);
      } else {
        prevScore = curScore;
      }
      currentChunk.push(itemSize);
    }
    updateAreas(availableSpace, currentChunk, remainingSum);
    remainingSum -= currentChunk.sum();

    if (currentFrom != from && this.recurse(currentChunk)) {
      var recursiveChunks = layout(T, currentFrom, to);
      if (!recursiveChunks.isEmpty()) {
        result.pop(); // replace last chunk with subdivision result.
        Array.prototype.push.apply(result, recursiveChunks);
      }
    }
    return result;
  }
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

  /**
   * This is the default configuration for the layout algorithm. It results in
   * a grid-like layout. A perfect grid when the number of elements to layout
   * is a perfect square. Otherwise the last couple of elements will be
   * stretched.
   */
  var defaultConfig = {
    itemSize: function(item) { return 1; },
    phrase: function() { return d3.layout.phrase.TOP_LEFT_TO_RIGHT; },
    recurse: function() { return false; },
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

  d3.treemap = function() {
    var size = [1, 1]; // width, height,
        phrase = undefined,
        itemSize = undefined,
        order = undefined,
        recurse = undefined,
        score = undefined;

    function _layout(nodes) {
      var config = {};
      config.size = size;
      config.phrase = phrase ? phrase : defaultConfig.phrase;
      config.itemSize = itemSize ? itemSize : defaultConfig.itemSize;
      config.recurse = recurse ? recurse : defaultConfig.recurse;
      config.score = score ? score : defaultConfig.score(nodes.length);

      var chunks = layout.apply(config, [order ? order(nodes) : nodes]);
      return chunks.reduce(function(rects, chunk) {
        var itemRects = chunk.itemRects().map(function(rect) { return rect.toPojo(); });
        return rects.concat(itemRects);
      }, []);
    }

    _layout.size = function(_) {
      if (!arguments.length) return size;
      size = _;
      return _layout;
    }

    _layout.itemSize = function(_) {
      if (!arguments.length) return itemSize;
      itemSize = _;
      return _layout;
    }

    _layout.phrase = function(_) {
      if (!arguments.length) return phrase;
      phrase = _;
      return _layout;
    }

    _layout.order = function(_) {
      if (!arguments.length) return order;
      order = _;
      return _layout;
    }

    _layout.recurse = function(_) {
      if (!arguments.length) return recurse;
      recurse = _;
      return _layout;
    }

    _layout.score = function(_) {
      if (!arguments.length) return score;
      score = _;
      return _layout;
    }

    return _layout;
  }

  d3.treemap.configurations = configurations;
})();
