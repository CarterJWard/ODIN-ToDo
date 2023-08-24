function Input() {
  const parent = document.createElement("div");
  const input = document.createElement("input");
  input.placeholder = "New Project";

  parent.appendChild(input);
  function getValue() {
    const value = input.value;
    input.value = "";
    return value;
  }
  return { element: parent, getValue };
}

export default Input;
