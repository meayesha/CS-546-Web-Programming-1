function isDeepEqual(obj1, obj2)
{
    if(obj1 == null) throw `Input1 is missing.`;
    if(obj2 == null) throw `Input2 is missing.`;
    if(Array.isArray(obj1)) throw `Input1 should be an object.`
    if(Array.isArray(obj2)) throw `Input2 should be an object.`
    if(typeof obj1 != 'object') throw `Input1 should be an object.`;
    if(typeof obj2 != 'object') throw `Input2 should be an object.`;
    if(obj1===obj2) return true;
    let obj1keys=Object.keys(obj1);
    let obj2keys=Object.keys(obj2);
       
    if(obj1keys.length != obj2keys.length) 
        return false;

    for(let element of obj1keys)
        {
            if(!obj2keys.includes(element) || !isDeepEqual(obj1[element],obj2[element]))
            return false;
        }
    return true;
};
module.exports ={
    description: 'This is the functions implemented on objects for lab 2',
    makeArrays: (obj) => {

        if (!Array.isArray(obj)) throw `Input ${obj} is of wrong type.`;
        if(obj.length<2) throw `Length of Input array should be atleast 2.`;
        obj.forEach(element => {
            if(typeof element != 'object') throw `${element} is not an object.`;
            if(Object.keys(element).length==0)  throw `object passed is empty`;
        });
        let result=[];
        let result2=[];
        obj.forEach(element => {
             result.push(Object.entries(element));
     
            });
        for(let i=0;i<result.length;i++)
            {
                for(let j=0;j<result[i].length;j++)
                {
                    result2.push(result[i][j]);
                }
            }
    
    return (result2);

    },

    isDeepEqual,

    computeObject: (object, func) => {
        if(object===undefined) throw `Input Object does not exists.`
        if(Object.keys(object).length === 0) throw `Input object is empty.`
        if(typeof object != 'object' || Array.isArray(object)) throw `Input ${object} is not an object.`
        if(func === undefined) throw `No function defined.`
        if(typeof func != 'function') throw `Input Function ${func} is not a function.`
        let newobj={};
        let objkeys=Object.keys(object);
        let objvalues=Object.values(object);
        for(let i=0;i<objkeys.length;i++)
        {   
            if(objvalues[i]==null || objvalues[i]==undefined) throw `Input object should have proper values.`
           objvalues[i] = func(objvalues[i]);
           if(objvalues[i] == Infinity) throw `Division by zero or high value power operation not allowed. `
           newobj[objkeys[i]]=objvalues[i];
        }
       return newobj;
    }
};