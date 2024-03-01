export function convertFractionToNumber(fractionString) {
  // Split the string by the "/" delimiter
  const parts = fractionString.split("/");

  // Validate input format
  if (parts.length !== 2) {
    throw new Error(
      "Invalid fraction format. Please use 'numerator/denominator'."
    );
  }

  // Parse numerator and denominator to numbers
  const numerator = parseInt(parts[0], 10);
  const denominator = parseInt(parts[1], 10);

  // Validate denominator (cannot be zero)
  if (denominator === 0) {
    throw new Error("Denominator cannot be zero.");
  }

  // Calculate and return the decimal equivalent
  return numerator / denominator;
}
