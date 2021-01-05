const questionOne = function questionOne(arr) {
    let myobj={};
    if(arr==null)
    {
        console.log(myobj);
    }
    else{
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]==1)
        { 
            myobj[arr[i]]=false;
        }
        else if(arr[i]==2)
        {
            myobj[arr[i]]=true;
        }
        else 
        {
            let count=0;
            for(let j=2;j<=arr[i];j++)
            {
                if(arr[i]%j==0)
                count++;
            }
            if(count==1)
            {
                myobj[arr[i]]=true;
            }
            else 
            {
                myobj[arr[i]]=false;
            }
        }
    }

    console.log(myobj);
    return myobj;
}
    };

const questionTwo = function questionTwo(arr) { 
    let sum=0;
        let sroot=0;
        if(arr==null)
        {
            console.log(0);
        }
        else{
        for(let i=0;i<arr.length;i++)
        {
            sum+=Math.pow(arr[i],2);
        }
       
        sum=Math.pow(sum,6);
       
        sroot=Math.sqrt(sum);
        console.log(sroot);
        return sroot;
        }
};

const questionThree = function questionThree(text) {
    text=text.toLowerCase();
        console.log(text);
        let vcount=0, ccount=0, pcount=0, ncount=0, spcount=0,spaces=0;
        let vowels=/[aeiou]/g;
        let numbers=/\d/g;
        let spacepatt=/\s/g;
        let consonantpatt= /(?![aeiou])[a-z]/g;
        //let punctuations=/[\'.?“,\-\!:;()[\]\u2026 ]/g;
        let punctuations=/[\'\".?\\!:;\(\),]/g;
        let specialpatt=/[@#$%^&*_~`{}|]/g
        let strobj={
            consonants: 0, vowels: 0, numbers: 0, spaces: 0,punctuation: 0, specialCharacters: 0
        };

        let checkvowels=text.match(vowels);
        if(checkvowels)
        {
            vcount=checkvowels.length;
        }
        else vcount=0;
        let checknumbers=text.match(numbers);
        if(checknumbers)
        {
            ncount=checknumbers.length;
        }
        else ncount=0;
        let checkspaces=text.match(spacepatt);
        if(checkspaces)
        {
            spaces=checkspaces.length;
        }
        else spaces=0;
        let checkspecial=text.match(specialpatt);
        if(checkspecial)
        {
            spcount=checkspecial.length;
        }
        else spcount=0;
        let checkconsonants=text.match(consonantpatt);
        if(checkconsonants)
        {
            ccount=checkconsonants.length;
        }
        else ccount=0;
        let checkpunctuations=text.match(punctuations);
        if(checkpunctuations)
        {
            pcount=checkpunctuations.length;
        }
        else pcount=0;
        strobj.consonants=ccount;
        strobj.vowels=vcount;
        strobj.numbers=ncount;
        strobj.spaces=spaces;
        strobj.punctuation=pcount;
        strobj.specialCharacters=spcount;

        console.log(strobj);
        return strobj;
};

const questionFour = function questionFour(num1, num2,num3) {
    let payment=0;
    let x=Math.pow((1+num2/1200),(num3*12));
    let y=1-1/x;
    payment=Math.round(100*(num1*num2)/(1200*y))/100;
    console.log(payment);
    return payment;
}

module.exports = {
    firstName: "Ayesha", 
    lastName: "Parveen", 
    studentId: "10471893",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};