const maxNumberForSimpleMultiply = Math.pow(2, 26);

module.exports = function multiply(first, second) {
  if (
    first <= maxNumberForSimpleMultiply &&
    second <= maxNumberForSimpleMultiply
  )
    return (parseInt(first) * parseInt(second)).toString();

  const firstIntArray = convertStringToIntArray(first);
  const secondIntArray = convertStringToIntArray(second);

  const resultIntArray = multiplyBigInt(firstIntArray, secondIntArray);
  const result = convertIntArrayToString(resultIntArray);
  return result;
};

function convertStringToIntArray(str) {
  const intArray = [];
  for (let i = 0; i < str.length; i++) {
    intArray.unshift(parseInt(str[i]));
  }
  return intArray;
}

function multiplyBigInt(firstIntArray, secondIntArray) {
  const resultIntArray = [];

  firstIntArray.forEach((firstElement, firstPosition) => {
    secondIntArray.forEach((secondElement, secondPosition) => {
      const result = firstElement * secondElement;
      if (resultIntArray[firstPosition + secondPosition] !== undefined) {
        resultIntArray[firstPosition + secondPosition] += result;
      } else resultIntArray.push(result);
    });
  });

  return optimizeIntArray(resultIntArray);
}

function optimizeIntArray(intArray) {
  intArray.forEach((element, position) => {
    if (element > 9) {
      const transfer = Math.trunc(element / 10);
      intArray[position] = element - transfer * 10;
      if (position + 1 === intArray.length) {
        intArray.push(transfer);
      } else {
        intArray[position + 1] += transfer;
      }
    }
  });
  return intArray;
}

function convertIntArrayToString(intArray) {
  return intArray
    .reverse()
    .toString()
    .replace(/,/g, "");
}
