function checkPhone(val){ 
//	console.log(val);
    if((/^1[3456789]\d{9}$/.test(val))){ 
//  	console.log("000");
        return true; 
    } 
}
function checkPwd(val){ 
	var reg = /^[A-Za-z0-9]{6,16}$/; 
    if(reg.test(val)){ 
        return true; 
    } 
}
export{
	checkPhone,
	checkPwd,
}
	

