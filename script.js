const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-PasswordDisplay]");

const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".GenrateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!#$%&'()*+,-./"

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider(); 
SetIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min
    const max = inputSlider.max

    inputSlider.style.backgroundSize = ((passwordLength - min)* 100 / (max - min) ) + "%100%"
}

function SetIndicator (color) {
    indicator.style.backgroundColor = color ;
   
    indicator.style.boxShadow =  ` 0px 0px 30px ${color}`;

}

function getRndInteger (min , max ) {
   return Math.floor(Math.random() * (max - min )) + min;
}

function generateRandomNumber() {
    return getRndInteger(0 , 9);
}

function generateLowerCase () {
    return String.fromCharCode(getRndInteger(97,123))

}

function generateUpperCase () {
    return String.fromCharCode(getRndInteger(65,91))

}

function genrateSymbols () {
    const randNum = getRndInteger(0 , symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength () {
    let hasUpper = false; 
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;


    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8) {
        SetIndicator ("#0f0")
    }
    else if (passwordLength >=6 && (hasUpper || hasLower)&& (hasSym || hasNum)) {
        SetIndicator ("#ff0")
    }
    else {SetIndicator ("#f00")}

}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied!";
  } catch (e) {
    copyMsg.innerText = "Failed to Copy!";
  }

  // Add this line ↓
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handelCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) =>{
        if(checkBox.checked)
            checkCount++;

        if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
}

    })
}
allCheckBox.forEach((checkBox) =>{
    checkBox.addEventListener('change' , handelCheckBoxChange);
})

inputSlider.addEventListener('input' , (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , () => {
    if (passwordDisplay.value)
        copyContent();
})
generateBtn.addEventListener('click' , () => {
   
    if (checkCount ==0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount
        handleSlider();
    };
    
password = "";


// if(uppercaseCheck.Checked) {
//     password += generateUpperCase();
// }

// if(lowercaseCheck.Checked) {
//     password += generateLowerCase();
// }


// if(numbersCheck.Checked) {
//     password += generateRandomNumber();
// }


// if(symbolCheck.Checked) {
//     password += genrateSymbols();
// }


let funcArr  = [] ;

if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
}
if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
}
if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
}
if (symbolCheck.checked) {
    funcArr.push(genrateSymbols);
}
for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();
}
for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0 , funcArr.length);
    password += funcArr[randIndex]();
}

password = shufflePassword(Array.from(password));

passwordDisplay.value = password;

calcStrength();


});














