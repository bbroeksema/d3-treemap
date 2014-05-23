
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
