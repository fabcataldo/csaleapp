export class Accessories{
    static formatDate(date){
        var tmp = new Date(date)
        return tmp.getDate()+'/'+(tmp.getMonth()+1)+'/'+tmp.getFullYear()+' '+tmp.getHours()+':'+tmp.getMinutes()+':'+tmp.getSeconds();
    }
}