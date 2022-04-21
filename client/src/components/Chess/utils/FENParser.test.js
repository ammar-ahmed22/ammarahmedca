import FENParser from "./FENParser";


const openingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const pE4FEN = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
const parser = new FENParser(openingFEN)
const e4 = new FENParser(pE4FEN);

//console.log(e4.squaresFromFEN())

//console.log(parser.squaresFromFEN())

const boardLayout = [
    [
      'r', 'n', 'b',
      'q', 'k', 'b',
      'n', 'r'
    ],
    [
      'p', 'p', 'p',
      'p', 'p', 'p',
      'p', 'p'
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      'P', 'P', 'P',
      'P', 'P', 'P',
      'P', 'P'
    ],
    [
      'R', 'N', 'B',
      'Q', 'K', 'B',
      'N', 'R'
    ]
]

const e4boardLayout = [
    [
      'r', 'n', 'b',
      'q', 'k', 'b',
      'n', 'r'
    ],
    [
      'p', 'p', 'p',
      'p', 'p', 'p',
      'p', 'p'
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      false, false,
      false, false,
      'P',   false,
      false, false
    ],
    [
      false, false,
      false, false,
      false, false,
      false, false
    ],
    [
      'P', 'P',   'P',
      'P', false, 'P',
      'P', 'P'
    ],
    [
      'R', 'N', 'B',
      'Q', 'K', 'B',
      'N', 'R'
    ]
]

console.log(parser.fenFromSquares(boardLayout))
console.log(e4.fenFromSquares(e4boardLayout))

test("opening FEN should create correct 2D array", () => {
      expect(parser.squaresFromFEN()).toEqual(boardLayout)
})

test("white pawn to e4 should create correct 2D array", () => {
    expect(e4.squaresFromFEN()).toEqual(e4boardLayout)
})

test("opening layout should return opening FEN", () => {
    expect(parser.fenFromSquares(boardLayout)).toEqual(openingFEN)
})

test("white pawn to e4 board layout should return correct FEN", () => {
    expect(e4.fenFromSquares(e4boardLayout)).toEqual(pE4FEN)
})

test("fenFromSquares can take options that modify FEN accordingly", () => {
    expect(parser.fenFromSquares(boardLayout, { colorToMove: "b"})).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1")
})