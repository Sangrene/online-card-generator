import {
  CARD_DECK,
  createGameDistribution,
  createGameHash,
  getGameFromHash,
} from "./core";
describe("Game", () => {
  it("Correctly setup base 52 card deck", () => {
    expect(CARD_DECK).toHaveLength(52);
  });

  describe("Game building", () => {
    it("Creates players according to params", () => {
      expect(
        Object.keys(
          createGameDistribution({
            players: ["Hugo", "Elodie", "Giorgio"],
          }).distribution
        )
      ).toEqual(["Hugo", "Elodie", "Giorgio"]);
    });

    it("Distribute all cards if asks to do so", () => {
      const distribution = createGameDistribution({
        players: ["Hugo", "Elodie", "Giorgio"],
      }).distribution;
      expect(distribution["Hugo"]).toHaveLength(18);
      expect(distribution["Elodie"]).toHaveLength(17);
    });
  });

  describe("Game hashing", () => {
    it("Encode and decode game without loosing informations", () => {
      const game = {
        distribution: { Hugo: ["a, b"], Elodie: ["b, c"] },
      };
      const hash = createGameHash(game);
      expect(getGameFromHash(hash)).toEqual(game);
    });

    it("Ensure that hash can be contained in URL", () => {
      const game = createGameDistribution({
        players: ["Hugo", "Elodie", "Giorgio"],
      });
      expect(createGameHash(game).length).toBeLessThan(2000);
    });
  });
});
