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
