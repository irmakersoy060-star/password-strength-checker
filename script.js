const password = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const score = document.getElementById("score");
const togglePassword = document.getElementById("togglePassword");

const lengthCheck = document.getElementById("length");
const upperCheck = document.getElementById("uppercase");
const lowerCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const crackTime = document.getElementById("crackTime");

password.addEventListener("input", checkPassword);

togglePassword.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
});

function checkPassword() {

    const value = password.value;

    let points = 0;

    const hasLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    update(lengthCheck, hasLength, "At least 8 characters");
    update(upperCheck, hasUpper, "Uppercase Letter");
    update(lowerCheck, hasLower, "Lowercase Letter");
    update(numberCheck, hasNumber, "Number");
    update(specialCheck, hasSpecial, "Special Character");

    if (hasLength) points += 20;
    if (hasUpper) points += 20;
    if (hasLower) points += 20;
    if (hasNumber) points += 20;
    if (hasSpecial) points += 20;

    score.textContent = points;

    strengthFill.style.width = points + "%";

    if (points <= 20) {
        strengthFill.style.background = "#ef4444";
        strengthText.textContent = "Strength: Very Weak";
    }
    else if (points <= 40) {
        strengthFill.style.background = "#f97316";
        strengthText.textContent = "Strength: Weak";
    }
    else if (points <= 60) {
        strengthFill.style.background = "#eab308";
        strengthText.textContent = "Strength: Medium";
    }
    else if (points <= 80) {
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Strength: Strong";
    }
    else {
        strengthFill.style.background = "#16a34a";
        strengthText.textContent = "Strength: Very Strong";
    }
    if(points <= 20){
    crackTime.textContent = "Instantly";
    }
    else if(points <= 40){
        crackTime.textContent = "A few minutes";
    }
    else if(points <= 60){
        crackTime.textContent = "Several hours";
    }
    else if(points <= 80){
        crackTime.textContent = "Several years";
    }
    else{
        crackTime.textContent = "Centuries";
    }
}

function update(element, status, text) {

    if (status) {
        element.innerHTML = "✅ " + text;
    } else {
        element.innerHTML = "❌ " + text;
    }

}
generateBtn.addEventListener("click", () => {

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let generated = "";

    for(let i=0;i<16;i++){

        generated += chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    password.value = generated;

    checkPassword();

});

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(password.value);

    copyBtn.textContent="Copied!";

    setTimeout(()=>{

        copyBtn.textContent="Copy Password";

    },1500);

});