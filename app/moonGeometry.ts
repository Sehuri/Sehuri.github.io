// Coordinates are measured in the original artwork, before object-fit crops it.
const moons = {
  desktop: [
    { side: 0, x: 1132, y: 229, diameter: 44 },
    { side: 1, x: 1237, y: 147, diameter: 74 },
  ],
  mobile: [
    { side: 0, x: 504, y: 253, diameter: 34 },
    { side: 1, x: 583, y: 183, diameter: 62 },
  ],
} as const;

export function moonHitBoxes(
  width: number,
  height: number,
  imageWidth: number,
  imageHeight: number,
  positionX: number,
  positionY: number,
  mobile: boolean,
) {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const offsetX = (width - imageWidth * scale) * positionX;
  const offsetY = (height - imageHeight * scale) * positionY;
  return moons[mobile ? "mobile" : "desktop"].map((moon) => ({
    side: moon.side,
    left: offsetX + (moon.x - moon.diameter / 2) * scale,
    top: offsetY + (moon.y - moon.diameter / 2) * scale,
    size: moon.diameter * scale,
  }));
}
