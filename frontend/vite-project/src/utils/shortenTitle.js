export const shorten = (title,maxlength = 9)=>{
    if(title && title.length > maxlength){
        return title.slice(0,maxlength) + "...";
    }
    return title;
}