const axios =require('axios');
async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
   // const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data; // this will be the array of people objects
  }
  async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
   // const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data ;// this will be the array of people objects
  }
   

async function listEmployees(){
    const peopledata = await getPeople();
    const empData=await getWork();
    const worklist=[];
    empData.forEach(async (workData) => {
        let workObj={company_name:"", employees:[]};
        for(let i=0;i<workData.employees.length;i++)
        {
            workObj.employees.push({
                first_name:peopledata[workData.employees[i]-1].first_name,
                last_name:peopledata[workData.employees[i]-1].last_name
            });
        }
        workObj.company_name=workData.company_name;

        worklist.push(workObj);
    });
    return worklist;
}

async function fourOneOne(phoneNumber){
    const empData=await getWork();
    if(phoneNumber == null) throw `Input paramter missing.`
    if(typeof phoneNumber != 'string') throw `Input value ${phoneNumber} is of wrong type.`
    const phoneCheck=/^[0-9]{3}\-[0-9]{3}\-[0-9]{4}/;
    let valid=phoneNumber.match(phoneCheck);
    if(!valid) throw `The format for the phone number ${phoneNumber} is wrong.`
    let phoneObj={company_name:"", company_address:{}};
    empData.forEach(async (workData) =>{
        
        if(workData.company_phone == phoneNumber)
        {
            phoneObj.company_name=workData.company_name;
            phoneObj.company_address=workData.company_address
        }
    });
    if(phoneObj.company_name.length == 0) throw `No data for the phone number ${phoneNumber} exists.`
    else
    return phoneObj;
}

async function whereDoTheyWork(ssn){
    const peopledata = await getPeople();
    const empData=await getWork();
    if(ssn == null) throw `Input paramter missing.`
    if(typeof ssn != 'string') throw `Input value ${ssn} is of wrong type.`
    const ssnCheck=/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}/;
    let valid=ssn.match(ssnCheck);
    if(!valid) throw `The format for the ssn ${ssn} is wrong.`
    let result="";
    let empId=0;
    peopledata.forEach(async (employeeData) =>{
        if(employeeData.ssn == ssn)
        {
            result+=employeeData.first_name + " " + employeeData.last_name + " works at ";
            empId=employeeData.id;
        }
        
    });
    if(empId == 0) throw `No person with ssn ${ssn} exists.`
    else{
    empData.forEach(async (workData) =>{
        for(let i=0;i<workData.employees.length;i++)
        {
            if(empId == workData.employees[i])
            {
                result+=workData.company_name+ ".";
            }
        }
    });
    return result;
}
    
    
}
module.exports={listEmployees, fourOneOne, whereDoTheyWork};
    

