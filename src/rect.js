  function d3_treemap_rect(x, y, width, height) {
    var rect = {};

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
