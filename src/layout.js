function Rect() {}
function Chunk() {}
Chunk.prototype.addItem = function() {}
Chunk.prototype.reduce = function() {}

function phrase() { return null; }
function order(T) { return T; }
function recurse() { return false; }
function score() { return Number.NEGATIVE_INFINITY; }

function layout(T, from , to) {
  var availableSpace = new Rect(0, 0, 1, 1),
      currentChunk = new Chunk(phrase(null), availableSpace),
      currentFrom = from,
      result = [currentChunk],
      T = order(T, from, to),
      prevScore = Number.NEGATIVE_INFINITY;

  for (i = from; i < to; ++i) {
    var itemSize = size(T[i])),
        curScore = score(currentChunk, itemSize);
        
    if (curScore < prevScore) {
      currentChunk.reduce(availableSpace);
      if (recurse(currentChunk)) {
        var recursiveChunks = layout(T, currentFrom, to);
        
        if (recursiveChunks.length > 0) {
          result.pop();
          Array.prototype.push.apply(result, recursiveChunks);
        }
      }
      
      currentChunk = new Chunk(phrase(currentChunk), availableSpace);
      result.push(currentChunk);
      currentFrom = i;
      prevScore = score(currentChunk, itemSize);
    } else {
      prevScore = curScore;
    }
    currentChunk.addItem(itemSize);
  }
  
  if (currentFrom != from && recurse(currentChunk)) {
    var recursiveChunks = layout(T, currentFrom, to);
    if (!recursiveChunks.isEmpty()) {
      result.pop(); // replace last chunk with subdivision result.
      Array.prototype.push.apply(result, recursiveChunks);
    }
  }
  return result;
}
