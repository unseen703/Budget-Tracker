
const formatdate = (date) =>
{
    let d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let year = `${d.getFullYear()}`;
    let day = `${d.getDate()}`;

    if(day.length < 2)
    {
        day = `0${day}`;
    }
   if(month.length < 2)
   {
    month = `0${month}`;
   }

   let res = {year , month , day };
   return res.join('-');
} 
export default formatdate;