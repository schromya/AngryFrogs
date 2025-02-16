
/*
Scales given value x in range  inMin-inMax to the returned value
in range outMin-outMax. Makes sure the output value is clamped between the
out bounds.
*/
export function scaleValue(x, inMin, inMax, outMin, outMax) {
    let scaled = ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    return Math.min(outMax, Math.max(outMin, scaled));
}