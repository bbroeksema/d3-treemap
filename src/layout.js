
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
    var factor = chunk.sum() / N;

    switch(chunk.phrase()) {
      case d3.layout.phrase.LEFT_TOP_TO_BOTTOM:
      case d3.layout.phrase.LEFT_BOTTOM_TO_TOP:
      case d3.layout.phrase.LEFT_LEFT_TO_RIGHT:
      case d3.layout.phrase.LEFT_RIGHT_TO_LEFT:
        availableSpace
          .x(availableSpace.x() + availableSpace.width() * factor)
          .width(availableSpace.width() - availableSpace.width() * factor);
        break;
      case d3.layout.phrase.BOTTOM_LEFT_TO_RIGHT:
      case d3.layout.phrase.BOTTOM_RIGHT_TO_LEFT:
      case d3.layout.phrase.BOTTOM_BOTTOM_TO_TOP:
      case d3.layout.phrase.BOTTOM_TOP_TO_BOTTOM:
        availableSpace.y(availableSpace.y() + availableSpace.heigth() * factor);
        break;
      case d3.layout.phrase.RIGHT_BOTTOM_TO_TOP:
      case d3.layout.phrase.RIGHT_TOP_TO_BOTTOM:
      case d3.layout.phrase.RIGHT_RIGHT_TO_LEFT:
      case d3.layout.phrase.RIGHT_LEFT_TO_RIGHT:
        availableSpace.width(availableSpace.width() - availableSpace.width() * factor);
        break;
      case d3.layout.phrase.TOP_RIGHT_TO_LEFT:
      case d3.layout.phrase.TOP_LEFT_TO_RIGHT:
      case d3.layout.phrase.TOP_TOP_TO_BOTTOM:
      case d3.layout.phrase.TOP_BOTTOM_TO_TOP:
        chunk.rect().height(availableSpace.height() * factor);
        availableSpace
          .y(availableSpace.y() + availableSpace.height() * factor)
          .height(availableSpace.height() - availableSpace.height() * factor);
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
