const axios =require('axios');
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
   // const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data ;// this will be the array of people objects
  }

  async function getPersonById(id){
      const peopleData=await getPeople();
      if(id == null) throw `Input paramter missing`
      if(typeof id != 'number') throw `Input value ${id} is of the wrong type.`
      if(id<0 || id>1000) throw `Input value ${id} is of out of range.`
      let obj= peopleData.find(peopleData => peopleData.id == id);
        return obj;
 };

 async function howManyPerState(stateAbbrv){
    const peopleState=await getPeople();
    if(stateAbbrv == null) throw `Input paramter missing`
    if(typeof stateAbbrv != 'string') throw `Input value ${stateAbbrv} is of the wrong type.`
    if(stateAbbrv.match(/\d+/g) != null) throw `The state ${stateAbbrv} does not exists.` 
    if (!stateAbbrv.replace(/\s/g, '').length) throw  `Input contains only whitespaces.`
      let count =0;
      for(let i=0;i<peopleState.length;i++)
      {
          if(peopleState[i].address.state == stateAbbrv)
                  
                      count++;
                  
              }
    
        if(count==0) throw `There are no people in ${stateAbbrv}.`
        return count;
};

async function personByAge(index){
    const personAgedata=await getPeople();
    if(index == null) throw `Input paramter missing`
    if(typeof index != 'number') throw `Index value ${index} is of the wrong type.`
    if(index<0 || index>1000) throw `Index value ${index} is of out of range.`
    let ageData='';
    let age=0;
    let peopleobj={};
    let currentDate=new Date();
    let month=new Date();
    let date=currentDate.getMonth()+1 + '/' + currentDate.getDate() + '/' +currentDate.getFullYear();
    for(let i=0;i<personAgedata.length;i++)
      {
           ageData=personAgedata[i].date_of_birth;
           ageData=new Date(ageData);
           date=new Date(date);
           age=date.getFullYear()-ageData.getFullYear();
           year=ageData.getFullYear();
           month=ageData.getMonth();
           day=ageData.getDate();
        if (date.getMonth() < ageData.getMonth() || 
        date.getMonth() == ageData.getMonth() && date.getDate() < ageData.getDate()) {
             age--;
            }
        personAgedata[i].year=year;
        personAgedata[i].age=age;
       personAgedata[i].month=month;
       personAgedata[i].day=day;
      }
      personAgedata.sort((a,b) => (a.year > b.year) ? 1 :(a.year == b.year) ? (a.month >b.month)? 1 :(a.month ==b.month)? (a.day > b.day) ? 1 :-1 :-1 :-1);
      peopleobj['first_name']=personAgedata[index].first_name;
      peopleobj['last_name']=personAgedata[index].last_name;
      peopleobj['date_of_birth']=personAgedata[index].date_of_birth;
      peopleobj['age']=personAgedata[index].age;
      return peopleobj;
};

async function peopleMetrics()
{
    const peopleDataMetrics=await getPeople();
    let totalLetters=0, tottalVowels=0,totalConsonants=0,averageAge=0;
    let longestName='',shortestName='',mostRepeatedCity='';
    let vowels=/[aeiouAEIOU]/g;
    let consonantpatt= /(?![aeiouAEIOU])[a-zA-Z]/g;
    let space=/\s/g;
    let countspace=0;
    let name=[];
    for(let i=0;i<peopleDataMetrics.length;i++)
    { 
        let fnameSpace=peopleDataMetrics[i].last_name.match(space);
        let lnameSpace=peopleDataMetrics[i].first_name.match(space);
        if(fnameSpace)
        countspace+=fnameSpace.length;
        if(lnameSpace)
        countspace+=lnameSpace.length;
        //totalLetters+=peopleDataMetrics[i].first_name.length + peopleDataMetrics[i].last_name.length;
        name[i]=peopleDataMetrics[i].first_name.length + peopleDataMetrics[i].last_name.length-countspace;
        let checkfname_v=peopleDataMetrics[i].first_name.match(vowels);
        if(checkfname_v)
        {
            tottalVowels+=checkfname_v.length;
        }
        let checklname_v=peopleDataMetrics[i].last_name.match(vowels);
        if(checklname_v)
        {
            tottalVowels+=checklname_v.length;
        }
        let checkconsonants_f=peopleDataMetrics[i].first_name.match(consonantpatt);
        if(checkconsonants_f)
        {
            totalConsonants+=checkconsonants_f.length;

        }
        let checkconsonants_l=peopleDataMetrics[i].last_name.match(consonantpatt);
        if(checkconsonants_l)
        {
            totalConsonants+=checkconsonants_l.length;

        }
      countspace=0;

    }
    let max=0,min=99999;
    let pos=0,pos1=0;
    for(let j=0;j<name.length;j++)
    {
        if(max<name[j])
        {
            max=name[j];
            pos=j;
        }

        if(min>name[j])
        {
            min=name[j];
            pos1=j;
        }
    }
    longestName=peopleDataMetrics[pos].first_name + " " + peopleDataMetrics[pos].last_name
    shortestName=peopleDataMetrics[pos1].first_name + " " + peopleDataMetrics[pos1].last_name
    let city=[];
    for(let i=0;i<peopleDataMetrics.length;i++)
      {
          city[i]=peopleDataMetrics[i].address.city;
      }
      let countCity=0;
      let countC=[];
      for(let j=0;j<city.length;j++)
      {
          for(let k=j+1;k<city.length;k++)
          {
              if(city[j]==city[k])
              {
                  countCity++;
                  
              }
              countC[j]=countCity;
          }
          countCity=0;
      }
      let cityMax=0,posCity=0;
      for(let x=0;x<countC;x++)
      {
          if(cityMax<countC[x])
          {
              cityMax=countC[x];
              posCity=x;

          }
      }
      mostRepeatedCity=city[posCity];
      
    let currentDate=new Date();
    //let month=new Date();
    let ageMetric=0;
    let date=currentDate.getMonth()+1 + '/' + currentDate.getDate() + '/' +currentDate.getFullYear();
    for(let i=0;i<peopleDataMetrics.length;i++)
      {
           ageData=peopleDataMetrics[i].date_of_birth;
           ageData=new Date(ageData);
           date=new Date(date);
           ageMetric=date.getFullYear()-ageData.getFullYear();
        if (date.getMonth() < ageData.getMonth() || 
        date.getMonth() == ageData.getMonth() && date.getDate() < ageData.getDate()) {
             ageMetric--;
            }
        averageAge+=ageMetric;
}

averageAge=Math.floor(averageAge/peopleDataMetrics.length);
totalLetters=tottalVowels+totalConsonants;
let metricObj={};
metricObj['totalLetters']=totalLetters;
metricObj['totalVowels']=tottalVowels;
metricObj['totalConsonants']=totalConsonants;
metricObj['longestName']=longestName;
metricObj['shortestName']=shortestName;
metricObj['mostRepeatingCity']=mostRepeatedCity;
metricObj['averageAge']=averageAge;
return metricObj;
}
  module.exports={getPersonById, howManyPerState, personByAge, peopleMetrics};
