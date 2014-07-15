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
          x = rect.x() - w;
          y = rect.height() - h;
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
            .y(chunkRect.y() + itemRect.height())
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
