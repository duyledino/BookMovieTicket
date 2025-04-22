export const getVideoLength = (time)=>{
    const hour = (Math.floor(time/60)).toString();
    const minute = Math.ceil(time%60).toString();
    const final = hour + 'h'+ minute+'m';
    return final;
}