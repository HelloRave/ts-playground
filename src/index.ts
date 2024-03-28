import { VARIABLE_ONE } from "./esmodules";
import { parsed } from "./generics";

function test(num: number) {
  return `Number to string: ${num}`;
}

console.log(test(VARIABLE_ONE));
console.log(parsed);