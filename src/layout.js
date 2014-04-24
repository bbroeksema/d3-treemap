
  function sum(T, from, to) {
    var sum = 0,
        i = from;

    for (i; i < to; i++) {
      sum += this.itemSize(T[i]);
    }

    return sum;
  }

  function reduce(availableSpace, currentChunk, N) {
    switch(currentChunk.phrase()) {
      case d3.layout.phrase.LEFT_TOP_TO_BOTTOM:
      case d3.layout.phrase.LEFT_BOTTOM_TO_TOP:
      case d3.layout.phrase.LEFT_LEFT_TO_RIGHT:
      case d3.layout.phrase.LEFT_RIGHT_TO_LEFT:
        return availableSpace.x(availableSpace.x() + availableSpace.width() * (currentChunk.sum() / N));

      case d3.layout.phrase.BOTTOM_LEFT_TO_RIGHT:
      case d3.layout.phrase.BOTTOM_RIGHT_TO_LEFT:
      case d3.layout.phrase.BOTTOM_BOTTOM_TO_TOP:
      case d3.layout.phrase.BOTTOM_TOP_TO_BOTTOM:
        return availableSpace.y(availableSpace.y() + availableSpace.heigth() * (currentChunk.sum() / N));

      case d3.layout.phrase.RIGHT_BOTTOM_TO_TOP:
      case d3.layout.phrase.RIGHT_TOP_TO_BOTTOM:
      case d3.layout.phrase.RIGHT_RIGHT_TO_LEFT:
      case d3.layout.phrase.RIGHT_LEFT_TO_RIGHT:
        return availableSpace.width(availableSpace.width() - availableSpace.width() * (currentChunk.sum() / N));

      case d3.layout.phrase.TOP_RIGHT_TO_LEFT:
      case d3.layout.phrase.TOP_LEFT_TO_RIGHT:
      case d3.layout.phrase.TOP_TOP_TO_BOTTOM:
      case d3.layout.phrase.TOP_BOTTOM_TO_TOP:
        return availableSpace
          .y(availableSpace.y() + availableSpace.height() * (currentChunk.sum() / N))
          .height(availableSpace.height() - availableSpace.height() * (currentChunk.sum() / N));

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
        availableSpace = reduce(availableSpace, currentChunk, remainingSum);
        // TODO: grow the chunks height or with based on the items in it.
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

    if (currentFrom != from && this.recurse(currentChunk)) {
      var recursiveChunks = layout(T, currentFrom, to);
      if (!recursiveChunks.isEmpty()) {
        result.pop(); // replace last chunk with subdivision result.
        Array.prototype.push.apply(result, recursiveChunks);
      }
    }
    return result;
  }
