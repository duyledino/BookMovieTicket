const getAgeUser = (date)=>{
    const now = new Date();
    const temp = new Date(date);
    return (now.getFullYear() - temp.getFullYear());
}

export {getAgeUser}