export const shorten = (title,maxlength = 10)=>{
    if(title.length > maxlength){
        return title.slice(0,maxlength) + "...";
    }
    return title
}