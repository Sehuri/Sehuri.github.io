import assert from "node:assert/strict";
import test from "node:test";
import { moonHitBoxes } from "../app/moonGeometry.ts";

test("the two click targets match the moon discs in the full desktop artwork", () => {
  assert.deepEqual(moonHitBoxes(1600, 1120, 1600, 1120, .5, .4, false), [
    { side: 0, left: 1110, top: 207, size: 44 },
    { side: 1, left: 1200, top: 110, size: 74 },
  ]);
});

test("right-aligned tablet crops move the artwork and targets together", () => {
  assert.deepEqual(moonHitBoxes(800, 1120, 1600, 1120, 1, 0, false), [
    { side: 0, left: 310, top: 207, size: 44 },
    { side: 1, left: 400, top: 110, size: 74 },
  ]);
});

test("vertical cover cropping respects the image's 40% object position", () => {
  assert.deepEqual(moonHitBoxes(800, 480, 1600, 1120, .5, .4, false), [
    { side: 0, left: 555, top: 71.5, size: 22 },
    { side: 1, left: 600, top: 23, size: 37 },
  ]);
});

test("the portrait source has its own moon coordinates and disc sizes", () => {
  assert.deepEqual(moonHitBoxes(390, 572, 780, 1144, .5, 0, true), [
    { side: 0, left: 243.5, top: 118, size: 17 },
    { side: 1, left: 276, top: 76, size: 31 },
  ]);
});

test("both moon discs remain inside the responsive background at supported widths", () => {
  for (const width of [320, 390, 760, 761, 855, 973, 1154, 1440, 1600]) {
    const mobile = width <= 760;
    const height = mobile ? 572 : 166 + Math.min(475, Math.max(380, width * .33)) + Math.min(420, Math.max(350, width * .29));
    const targets = moonHitBoxes(width, height, mobile ? 780 : 1600, mobile ? 1144 : 1120, width > 760 && width <= 980 ? 1 : .5, mobile || width <= 980 ? 0 : .4, mobile);
    for (const target of targets) {
      assert.ok(target.left >= 0 && target.left + target.size <= width, `${width}px: moon is outside the horizontal crop`);
      assert.ok(target.top >= 0 && target.top + target.size <= height, `${width}px: moon is outside the vertical crop`);
    }
    const [small, large] = targets;
    assert.ok(large.left > small.left + small.size, `${width}px: moon targets overlap`);
  }
});
