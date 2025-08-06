import {useLocation} from 'react-router-dom'

const navigateLink = (e)=>{
    const isActive = e.isActive;
    const location =  useLocation();
    
    console.log(location);
    console.log(isActive);
    return isActive ? "active":""
}

export default navigateLink;