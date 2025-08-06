export const convertToBase64 = (file)=>{
    return new Promise((resovle,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ()=>{
            resovle(fileReader.result);
        };
        fileReader.onerror=(err)=>{
            reject(err);
        }
    })
}