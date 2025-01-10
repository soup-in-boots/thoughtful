import assert from "node:assert";

const OVERSIZED_DIMENSION = 150;
const BULKY_VOLUME = 1000000;
const HEAVY_MASS = 20;

function isTooLong(dimension) {
  return dimension >= OVERSIZED_DIMENSION;
}

function isTooBig(width, height, length) {
  if (isTooLong(width)) return true;
  if (isTooLong(height)) return true;
  if (isTooLong(length)) return true;

  let volume = width * height * length;
  return volume >= BULKY_VOLUME;
}

function isTooHeavy(mass) {
  return mass >= HEAVY_MASS;
}

export function sort(width, height, length, mass) {
  // If there's a problem, we should throw an error and let the caller
  // decide what's best. A motto I learned from Erlang is "fail fast and noisily" --
  // it's better to anticipate, identify, and handle errors where they occur instead
  // of later on down the line.

  // Since this is JavaScript, we should probably guard against incorrect
  // types. This has the benefit of ensuring we receive all of the arguments,
  // too. We'll handy the tricky NaN here too.
  assert(
    typeof width === "number" && !Number.isNaN(width),
    "width must be a number",
  );
  assert(
    typeof height === "number" && !Number.isNaN(height),
    "height must be a number",
  );
  assert(
    typeof length === "number" && !Number.isNaN(length),
    "length must be a number",
  );
  assert(
    typeof mass === "number" && !Number.isNaN(mass),
    "mass must be a number",
  );

  // ...and what if one of the sensors is malfunctioning and reports a size of
  // 0? Even if it were truly 200cm long, it would still not be rejected!
  assert(width > 0, "width must be greater than zero");
  assert(height > 0, "height must be greater than zero");
  assert(length > 0, "length must be greater than zero");
  assert(mass > 0, "mass must be greater than zero");

  // ...even worse, what if a bad calculation has left us with an infinite
  // value!? Then it would always be rejected!
  assert(width < Infinity, "width must be finite");
  assert(height < Infinity, "height must be finite");
  assert(length < Infinity, "length must be finite");
  assert(mass < Infinity, "mass must be finite");

  // Now we're pretty solid that we've got good inputs. Let's run our
  // business logic.
  if (isTooBig(width, height, length)) {
    if (isTooHeavy(mass)) {
      return "REJECTED";
    } else {
      return "SPECIAL";
    }
  } else {
    if (isTooHeavy(mass)) {
      return "SPECIAL";
    } else {
      return "STANDARD";
    }
  }
}
