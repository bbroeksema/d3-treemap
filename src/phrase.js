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
