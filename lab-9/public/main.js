function isPrime(number) {
    
    if(number ==1 || number ==0)
    {
    return false;
    }
    else if(number ==2)
    {
        return true;
    }
    for(let i=2;i<number;i++)
        {
            if(number%i ==0)
            {
               return false;
            }
        }
        return true;

}
function calculateFibo(number)
{
    let num1=0;
    let num2=1;
    let sum=0;
    if(number <1)
    {
    return num1;
    }
    for(let i=0;i<number-1;i++)
    {
        sum=num1+num2;
        num1=num2;
        num2=sum;
    }
    return num2;
}

function checkPrimeNumber() {
   // console.log("in checkPrime");
    const inputForm = document.getElementById("input-form");
    if (inputForm) {
        let textInput=document.getElementById("number");
        const number = parseInt(document.getElementById("number").value);

        if (isNaN(number)) {
            $("#error-container").removeClass("hidden");
            $("#error-text").text("Please enter a number");
        } else {
            $("#error-container").addClass("hidden");
            let fiboNumber=calculateFibo(number);
            if (isPrime(fiboNumber)) {
                $("#results").append(`<li class="is-prime">The Fibonacci of ${number} is ${fiboNumber}.</li>`);
            } else {
                $("#results").append(`<li class="not-prime">The Fibonacci of ${number} is ${fiboNumber}.</li>`);
            }
        }
        textInput.value = '';
      errorDiv.hidden = false;
      textInput.focus();
     // textInput.className = 'inputClass';
    }
}