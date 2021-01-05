function checkArrayError(arr,variableName='Provided variable')
{
    if (arr===undefined) throw `${variableName} has no argument present.`;

    if(arr.length==0) throw `${variableName} array is empty.`;

    if (!Array.isArray(arr)) throw `${variableName} ${arr} is of wrong type.`;

    arr.forEach(element => { 
        if(typeof element !== 'number') 
            throw `Array element ${element} is not a number.`;
    });
}

function checkfillArray(end, variableName='Provided variable')
{
    if (end <= 0) throw `${variableName} ${end} is not a positive integer greater than 0.`;

    if(end == null ) throw `No value passed for ${variableName}.`;

    if (typeof end !== 'number' || !Number.isInteger(end)) throw `${variableName} ${end} is of wrong type.`;
}


module.exports = {
    description: 'This is the functions implemented on array for lab 2',
    mean: (arr) => {
        checkArrayError(arr,'Input');
        let sum =0;
        for(let i=0;i<arr.length;i++)
        {
            sum+=arr[i];
        }
        let arrmean= Math.round(100*(sum/arr.length))/100;
        return (arrmean);
    },

    medianSquared: (arr) => {

        checkArrayError(arr, 'Input');
        // for(let i=0;i<arr.length;i++)
        // {
        //     arr[i]=Math.round(100*Math.pow(arr[i],2))/100;
        // }

        const sortedarray= arr.sort(function(a,b){return a-b});

        const mid=Math.ceil(arr.length/2);
        console.log(mid);

        let median= (arr.length%2==0 ? (sortedarray[mid]+sortedarray[mid-1])/2 :sortedarray[mid-1]);

        median=Math.round(100*(Math.pow(median,2)))/100;
        return median;

    },
    
    maxElement: (arr) => {

        checkArrayError(arr, 'Input');
        const obj={};
        let max=0,pos=0;
        for(let i=0;i<arr.length;i++)
        {
            if(max<arr[i])
            {
                max=arr[i];
                pos=i;
            }
        }
        obj[arr[pos]]=pos;
        return obj;

    },

    fill: (end, value) => {
        checkfillArray(end, 'Input')
        const fillArray=[];
        if(value != null)
        {
            for(let i=0;i<end;i++)
            {
                fillArray[i]=value;
            }
        }
        else{
            for(let j=0;j<end;j++)
            {
                fillArray[j]=j;
            }
        }
        return fillArray;
    },

    countRepeating: (array) => {
        if(array === undefined) throw `No argument passed`;
        if(!Array.isArray(array)) throw `Input ${array} is of wrong type.`;
        const countobj= {};
        let count=1;
        if(array.length==0)
        {
        return countobj;
        }
        else
        {
            array.forEach(function(x){
                countobj[x]=(countobj[x] || 0) +1;
            });
            for(let element in countobj)
            {
                if (countobj[element]===1)
                {
                delete countobj[element];
                }
            }
            return countobj;
        }
    },

    isEqual: (arrayOne, arrayTwo) => {
    if(arrayOne === undefined ) throw `First parameter is not passed`;
    if(arrayTwo === undefined) throw `Second parameter is not passed`;
    if(!Array.isArray(arrayOne)) throw `Input ${arrayOne} is of wrong type.`;
    if(!Array.isArray(arrayTwo)) throw `Input ${arrayTwo} is of wrong type.`;
    
    arrayOne.forEach(element =>
    {
        if(Array.isArray(element))
        {
            element.sort();
        }
    });

    arrayTwo.forEach(element =>
    {
        if(Array.isArray(element))
        {
            element.sort();
        }
    });
   // const sortedarrayone= arrayOne.sort(function(a,b){return a-b}) ;
    //const sortedarraytwo= arrayTwo.sort(function(a,b){return a-b});
   const sortedarrayOne= arrayOne.sort();
   const sortedarrayTwo = arrayTwo.sort();
    if(JSON.stringify(sortedarrayOne) === JSON.stringify(sortedarrayTwo))
    {
        return true;
    }
    else 
        return false;
    
    }
};
