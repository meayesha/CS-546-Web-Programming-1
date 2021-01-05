const people = require("./people");
const work = require("./work");

async function main(){
   console.log("---------getPersonById Test Cases --------");
    try{
        const peopleId = await people.getPersonById(100);
        console.log (peopleId);
        console.log('getPersonById passed successfully');
    }catch(e){
        console.log (e);
        console.error('getPersonById failed test case');
    }
    try{
        const peopleId = await people.getPersonById(1001);
        console.log (peopleId);
        console.error('getPersonById did not error');
    }catch(e){
        console.log (e);
        console.error('getPersonById failed successfully.');
    }
    console.log("---------howManyPerState Test Cases --------");
    try{
        const peopleStateCount = await people.howManyPerState("CO");
        console.log (peopleStateCount);
        console.log('howManyPerState passed successfully');
    }catch(e){
        console.log (e);
        console.error('howManyPerState failed test case');
    }
    try{
        const peopleStateCount = await people.howManyPerState("WY");
        console.log (peopleStateCount);
        console.error('howManyPerState did not error');
    }catch(e){
        console.log (e);
        console.error('howManyPerState failed successfully');
    }

    console.log("---------personByAge Test Cases --------");
    try{
       const peopleAge = await people.personByAge(500);
       console.log (peopleAge);
       console.log('personByAge passed successfully');
        
    }catch(e){
        console.log (e);
        console.error('personByAge failed test case');
    }
    try{
        const peopleAge = await people.personByAge();
        console.log (peopleAge);
        console.error('personByAge did not error');
         
     }catch(e){
         console.log (e);
         console.error('personByAge failed successfully');
     }

    console.log("---------peopleMetrics Test Cases --------");

    try{
        const peopleMetricDate = await people.peopleMetrics();
        console.log (peopleMetricDate);
        console.log('peopleMetrics passed successfully');
         
     }catch(e){
         console.log (e);
         console.error('peopleMetrics failed test case');
     }

     console.log("---------listEmployees Test Cases --------");
     try{
        const listEmployeesData = await work.listEmployees();
        console.log (JSON.stringify(listEmployeesData));
        console.log('listEmployees passed successfully');
         
     }catch(e){
         console.log (e);
         console.error('listEmployees failed test case');
     }

     console.log("---------fourOneOne Test Cases --------");
     try{
        const listCompanyData = await work.fourOneOne('240-144-7553');
        console.log (listCompanyData);
        console.log('fourOneOne passed successfully');
         
     }catch(e){
         console.log (e);
         console.error('fourOneOne failed test case');
     }

     try{
        const listCompanyData = await work.fourOneOne('212-208-8374');
        console.log (listCompanyData);
        console.error('fourOneOne did not error.');
         
     }catch(e){
         console.log (e);
         console.error('fourOneOne failed successfully');
     }
     console.log("---------whereDoTheyWork Test Cases --------");
     try{
        const ssnData = await work.whereDoTheyWork('277-85-0056');
        console.log (ssnData);
        console.log('whereDoTheyWork passed successfully');
         
     }catch(e){
         console.log (e);
         console.error('whereDoTheyWork failed test case');
     }
     try{
        const ssnData = await work.whereDoTheyWork('264-67-0084');
        console.log (ssnData);
        console.error('whereDoTheyWork did not error');
         
     }catch(e){
         console.log (e);
         console.error('whereDoTheyWork failed successfully');
     }
}

main();