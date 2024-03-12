const input = document.getElementById("display");
const appendToDisplay = (a) => {
  input.value = input.value + a;
};
const clearDisplay = () => {
  input.value = "";
};
const calculate = () => {
  try {
    input.value = eval(input.value);
  } catch (error) {
    input.value = "check operation";
  }
};
const clearOneItem = () => {
  try {
    const str = new String(input.value);
    const str1 = str.substring(0, str.length - 1);
    input.value = str1;
  } catch (error) {
    input.value = "please enter something to clear";
  }
};
