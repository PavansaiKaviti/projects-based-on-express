// having each element
const nameEl = document.getElementById("name");
const genderEl = document.getElementById("gender");
const ageEl = document.getElementById("age");
const collegeEl = document.getElementById("college");
const cgpaEl = document.getElementById("cgpa");
const buttonEl = document.getElementById("finally");
const overall = () => {
  //extracting values form each and everyelement
  const remain = async () => {
    const name = await nameEl.value;
    const gender = await genderEl.value;
    const age = await ageEl.value;
    const college = await collegeEl.value;
    const cgpa = await cgpaEl.value;
    const result = {
      name: name,
      age: age,
      gender: gender,
      college: college,
      cgpa: cgpa,
    };
    console.log(result);
  };
  remain();
};
// adding function to button
buttonEl.addEventListener("click", () => {
  overall();
});
