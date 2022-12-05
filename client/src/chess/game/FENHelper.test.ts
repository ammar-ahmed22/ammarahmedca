import { FENHelper } from "./FENHelper";

test("parseMatrix works as expected", () => {
  const fens = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR",
  ];

  fens.forEach((fen) => {
    const matrix = FENHelper.parseFEN(fen);
    expect(FENHelper.parseMatrix(matrix)).toEqual(fen);
  });
});
