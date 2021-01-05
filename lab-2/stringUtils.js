function checkString(str, variableName='Provided variable')
{
    if(str === undefined) throw `No string present.`
    if(str === '') throw `The length of the string ${variableName} ${str} should be greater than 0.`
    if(typeof str !== 'string') throw `${variableName} ${str} is of wrong type.`
    
};

function checkmashUpString(str, variableName='Provided variable')
{
    if(str === undefined) throw `No argument passed.`
   if(str === '') throw `No string passed.`
    if(typeof str !== 'string') throw `${variableName} ${str} is of wrong type.`
    if(str.length <2) throw `${variableName} ${str} should be atleast 2 characters. `
};
module.exports={
    description: 'This is the functions implemented on string for lab 2',
    camelCase: (str) => {
        checkString(str, 'Input');
        if (!str.replace(/\s/g, '').length) throw  `Input contains only whitespaces.`
        str=str.trim();
        return str.split(' ').map(function(letter, index){
            if(index==0) 
            {
                
                return letter.toLowerCase();
            }
            
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join('');
    },
    
    replaceChar: (string) => {
        checkString(string,'Input');
        if (!string.replace(/\s/g, '').length) throw  `Input contains only whitespaces.`
        string=string.trim();
        let temparray=string.split('');
        let count=1;
        //console.log(temparray);
        
            for(let j=1;j<temparray.length;j++)
            {
                if(temparray[0].toLowerCase()==temparray[j].toLowerCase() && temparray[j]!=' ')
                {
                    if(count==1)
                    {
                        temparray[j]="*";
                        count++;
                    }
                    else
                    {
                        temparray[j]="$";
                        count--;
                    }
                }
            }
            
       return temparray.join('');
    },
    mashUp: (string1,string2) =>{
        checkmashUpString(string1,'Input1');
        checkmashUpString(string2,'Input2');
        // if(string1.length<2) throw `${string1} should be atleast 2 characters. `
        // if(string2.length<2) throw `${string2} should be atleast 2 characters. `
        let a=string1.substr(0,2);
        let b=string2.substr(0,2);
        String.prototype.replaceAt= function(index,replace){
            return this.substr(0,index) + replace +this.substr(index + replace.length);
        }
        let res1=string1.replaceAt(0,b);
        let res2=string2.replaceAt(0,a);
        let result=res1 + " " + res2;
        return result;
    }
};