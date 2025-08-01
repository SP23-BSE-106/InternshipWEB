

    // Get references to input fields
    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");
    const result = document.getElementById("result");

    // Event: when user types in first input
    num1.addEventListener("input", function () {
      result.value = "NaN"; // Set NaN on typing in first box
    });

    // Event: when user types in second input
    num2.addEventListener("input", function () {
      const val1 = parseInt(num1.value);
      const val2 = parseInt(num2.value);

      // Display sum if both are valid numbers
      if (!isNaN(val1) && !isNaN(val2)) {
        result.value = val1 + val2;
      } else {
        result.value = "NaN";
      }
    });
