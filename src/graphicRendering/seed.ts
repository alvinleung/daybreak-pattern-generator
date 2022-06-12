import OpenSimplexNoise from "@minttu/open-simplex-noise";

export type Seed = {
  seedValue: number;
  openSimplexNoise: OpenSimplexNoise;
};

export function createSeed(seedValue: number): Seed {
  const openSimplex = new OpenSimplexNoise(seedValue);

  return {
    seedValue: seedValue,
    openSimplexNoise: openSimplex,
  };
}
