let userValue = +prompt('Set number'); // 5
let result = 1;
// 5! = 1 * 2 * 3 * 4 * 5

while(userValue > 0) {
  result *= userValue;
  userValue--;
}

alert(result);