const funcarry= require('./arrayUtils');
const funcstring= require('./stringUtils');
const funcobj= require('./objUtils');

console.log("---------Mean Test Cases --------")
try {
    const meanOne=funcarry.mean([2,3,4]);
    console.log(meanOne);
    console.log('mean passed successfully');
}catch(e)
{
    console.log(e);
    console.error('mean failed test case');
}

try {
    const meanTwo=funcarry.mean(["guitar", 1, 3, "apple"]);
    console.log(meanTwo);
    console.error('mean did not error')
}catch(e)
{
    console.log(e);
    console.error('mean failed successfully');
}
console.log("---------Median Squarred Test Cases --------")
try {
    const medianOne=funcarry.medianSquared([1,2,4,5]);
    console.log(medianOne);
    console.log('medianSquarred passed successfully');
}catch(e)
{
    console.log(e);
    console.error('medianSquarred failed test case');
}

try {
    const medianTwo=funcarry.medianSquared();
    console.log(medianTwo);
    console.error('medianSquarred did not error')
}catch(e)
{
    console.log(e);
    console.error('medianSquarred failed successfully');
}
console.log("---------Max Element Test Cases --------")
try {
    const maxElement1=funcarry.maxElement([1,2,4,78,9]);
    console.log(maxElement1);
    console.log('maxElement passed successfully');
}catch(e)
{
    console.log(e);
    console.error('maxElement failed test case');
}

try {
    const maxElement2=funcarry.maxElement("test");
    console.log(maxElement2);
    console.error('maxElement did not error')
}catch(e)
{
    console.log(e);
    console.error('maxElement failed successfully');
}
console.log("---------Fill Test Cases --------")
try {
    const fillOne=funcarry.fill(3,5);
    console.log(fillOne);
    console.log('fill passed successfully')
}catch(e)
{
    console.log(e);
    console.error('fill failed test case');
}

try {
    const fillTwo=funcarry.fill(-3,'x');
    console.log(fillTwo);
    console.error('fill did not error')
}catch(e)
{
    console.log(e);
    console.error('fill failed successfully');
}
console.log("---------Count Repeating Test Cases --------")
try {
    const countRepeatingOne=funcarry.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log(countRepeatingOne);
    console.log('countRepeating passed successfully')
}catch(e)
{
    console.log(e);
    console.error('countRepeating failed test case');
}

try {
    const countRepeatingTwo=funcarry.countRepeating(112233);
    console.log(countRepeatingTwo);
    console.error('countRepeating did not error')
}catch(e)
{
    console.log(e);
    console.error('countRepeating failed successfully');
}
console.log("---------isEqual Test Cases --------")
try {
    const isEqualOne=funcarry.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log(isEqualOne);
    console.log('isEqual passed successfully')
}catch(e)
{
    console.log(e);
    console.error('isEqual failed test case');
}

try {
    const isEqualTwo=funcarry.isEqual(123,321);
    console.log(isEqualTwo);
    console.error('isEqual did not error')
}catch(e)
{
    console.log(e);
    console.error('isEqual failed successfully');
}

console.log("---------camelCase Test Cases --------")
try {
    const camelCaseOne=funcstring.camelCase('FOO BAR');
    console.log(camelCaseOne);
    console.log('camelCase passed successfully')
}catch(e)
{
    console.log(e);
    console.error('camelCase failed test case');
}

try {
    const camelCaseTwo=funcstring.camelCase('    ');
    console.log(camelCaseTwo);
    console.error('camelCase did not error')
}catch(e)
{
    console.log(e);
    console.error('camelCase failed successfully');
}
console.log("---------replaceChar Test Cases --------")
try {
    const replaceCharOne=funcstring.replaceChar('Hello, How are you? I hope you are well. Hope you are happy and healthy.');
    console.log(replaceCharOne);
    console.log('replaceChar passed successfully')
}catch(e)
{
    console.log(e);
    console.error('replaceChar failed test case');
}

try {
    const replaceCharTwo=funcstring.replaceChar(123);
    console.log(replaceCharTwo);
    console.error('replaceChar did not error')
}catch(e)
{
    console.log(e);
    console.error('replaceChar failed successfully');
}
console.log("---------mashUp Test Cases --------")
try {
    const mashUpOne=funcstring.mashUp('hello','world');
    console.log(mashUpOne);
    console.log('mashUp passed successfully')
}catch(e)
{
    console.log(e);
    console.error('mashUp failed test case');
}

try {
    const mashUpTwo=funcstring.mashUp("hello","h");
    console.log(mashUpTwo);
    console.error('mashUp did not error')
}catch(e)
{
    console.log(e);
    console.error('mashUp failed successfully');
}
console.log("---------makeArrays Test Cases --------")
try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };    
    const makeArraysOne=funcobj.makeArrays([first,second,third]);
    console.log(makeArraysOne);
    console.log('makeArrays passed successfully')
}catch(e)
{
    console.log(e);
    console.error('makeArrays failed test case');
}

try {
    const first = { x: 2, y: 3};
    const second = 1234;
    const makeArraysTwo=funcobj.makeArrays([first,second]);
    console.log(makeArraysTwo);
    console.error('makeArrays did not error')
}catch(e)
{
    console.log(e);
    console.error('makeArrays failed successfully');
}
console.log("---------isDeepEqual Test Cases --------")
try {
    const forth ={a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};
    const deepEqualOne=funcobj.isDeepEqual(forth,fifth);
    console.log(deepEqualOne);
    console.log('isDeepEqual passed successfully')
}catch(e)
{
    console.log(e);
    console.error('isDeepEqual failed test case');
}

try {
    const first = {a:2, b:9};
    const second = [1234];
    const deepEqualTwo=funcobj.isDeepEqual();
    console.log(deepEqualTwo);
    console.error('isDeepEqual did not error')
}catch(e)
{
    console.log(e);
    console.error('isDeepEqual failed successfully');
}
console.log("---------Compute Object Test Cases --------")
try {
    const computeObjectOne=funcobj.computeObject({ a: 3, b: 7, c: 5 }, n => Math.pow(n,2));
    console.log(computeObjectOne);
    console.log('computeObject passed successfully')
}catch(e)
{
    console.log(e);
    console.error('computeObject failed test case');
}

try {
    const computeObjectTwo=funcobj.computeObject();
    console.log(computeObjectTwo);
    console.error('computeObject did not error')
}catch(e)
{
    console.log(e);
    console.error('computeObject failed successfully');
}