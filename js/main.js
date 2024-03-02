"use strict";

window.addEventListener("load", function () {
  // variables

  let input_password = document.getElementById("input_password");
  let range_selector = document.getElementById("range-selector");
  let number_selector = document.getElementById("number-selector");
  let button_generate = document.getElementById("button_generate");
  let button_reset = document.getElementById("button_reset");
  let uppercase_cb = document.getElementById("uppercase");
  let lowercase_cb = document.getElementById("lowercase");
  let numbers_cb = document.getElementById("numbers");
  let symbols_cb = document.getElementById("symbols");
  let copy_password = document.getElementById("copy-password");
  let img_copy_button = document.querySelector(".copy-img");

  const uppercase_letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const lowercase_letters = "qwertyuiopasdfghjklzxcvbnm";
  const numbers = "1234567890";
  const symbols = "`!@#$%^&*()_+=-";

  function GeneratePassword() {
    let length = number_selector.value;

    let password = "";

    if (!uppercase_cb.checked && !lowercase_cb.checked && !numbers_cb.checked && !symbols_cb.checked) {
      input_password.classList.add("shake");
      input_password.value = "*Select atleast one setting";
      copy_password.style.display = "none";
    } else {
      copy_password.style.display = "inline-block";
      img_copy_button.src = "css/copy.svg";
      input_password.classList.remove("shake");
      for (let i = 0; i < length; i++) {
        let result_function = SelectItem();
        password = password + result_function;
      }
      input_password.value = password;
    }
  }

  function ResetPassword() {
    input_password.value = "";
    copy_password.style.display = "none";
    if (copy_password.style.backgroundColor == "green") {
      copy_password.style.backgroundColor = "rgb(70, 181, 255)";
    }
    number_selector.value = 15;
    range_selector.value = 15;
    input_password.classList.remove("shake");
  }

  function SelectItem() {
    let random_item = [];

    if (uppercase_cb.checked) {
      random_item.push(GetUppercase());
    }

    if (lowercase_cb.checked) {
      random_item.push(GetLowecase());
    }

    if (numbers_cb.checked) {
      random_item.push(GetNumber());
    }

    if (symbols_cb.checked) {
      random_item.push(GetSymbol());
    }

    let value_to_return = random_item[Math.floor(Math.random() * random_item.length)];
    return value_to_return;
  }

  // Functions for selecting customised password

  function GetUppercase() {
    let uppercase_array = uppercase_letters.split("");
    return uppercase_array[Math.floor(Math.random() * uppercase_array.length)];
  }
  function GetLowecase() {
    let lowercase_array = lowercase_letters.split("");
    return lowercase_array[Math.floor(Math.random() * lowercase_array.length)];
  }
  function GetNumber() {
    let numbers_array = numbers.split("");
    return numbers_array[Math.floor(Math.random() * numbers_array.length)];
  }
  function GetSymbol() {
    let symbols_array = symbols.split("");
    return symbols_array[Math.floor(Math.random() * symbols_array.length)];
  }

  button_generate.addEventListener("click", GeneratePassword);
  button_reset.addEventListener("click", ResetPassword);

  range_selector.addEventListener("mousemove", function () {
    number_selector.value = range_selector.value;
  });

  number_selector.addEventListener("blur", function () {
    range_selector.value = number_selector.value;
  });

  copy_password.addEventListener("click", function () {
    input_password.select();
    navigator.clipboard.writeText(input_password.value);
    window.getSelection().removeAllRanges();

    let img_copy_button = document.querySelector(".copy-img");
    if (copy_password.style.backgroundColor != "green") {
      copy_password.style.backgroundColor = "green";
    }
    img_copy_button.src = "css/check.svg";
  });
});
