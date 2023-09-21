import { VARIABLE_ONE } from "./esmodules";

function test(num: number) {
  return num++;
}

console.log(test(VARIABLE_ONE));
