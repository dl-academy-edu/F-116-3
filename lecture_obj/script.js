const CASE_1 = 121; // false
const CASE_2 = -121; // true
const CASE_3 = 10; // false


const isPalindrom = (x) => {
    let strX = x + "";
    return strX.split("").reverse().join("") === strX ? true : false;
}

console.log(isPalindrom(CASE_1));
console.log(isPalindrom(CASE_2));
console.log(isPalindrom(CASE_3));
