
export default class CommonUtil {
  static formatDate = date => { 
    if (!date) return "";

    let month = date.getMonth()+1;
    month = month<=9? "0"+month:month;

    let day = date.getDate();
    day = day<=9?"0"+day:day;

    let year = date.getFullYear();
    
    const r = day+"/"+month+"/"+year;
    return r;
  }; 

  static formatDateByDash = date => {
      if (!date) return "";
      if( typeof date === "string") return date;

      let month = date.getMonth()+1;
      month = month<=9? "0"+month:month;

      let day = date.getDate();
      day = day<=9?"0"+day:day;

      let year = date.getFullYear();
      const r = year+"-"+month+"-"+ day;
      return r;
    }; 

   static cleanData(data){
     if(data===undefined || data===null){
       return "";
     }
     if(typeof data === "object"){
      if(data.id===undefined || data.id===null){
        return "";
      }
      return data.id;
     }
     return data;
   } 

   static uuid(){
    var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    return uniqueId;
   }
}