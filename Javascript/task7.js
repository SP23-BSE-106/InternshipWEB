  
// Get references to input fields
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");

// When user types in first box, set result to NaN
num1.addEventListener("input", function () {
  result.value = "NaN";
});

// When user types in second box, compute sum
num2.addEventListener("input", function () {
  const val1 = parseInt(num1.value);
  const val2 = parseInt(num2.value);

  if (!isNaN(val1) && !isNaN(val2)) {
    result.value = val1 + val2;
  } else {
    result.value = "NaN";
  }
});
