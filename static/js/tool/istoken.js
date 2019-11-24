
$(function () {
    var indexType = 2;
    let token = sessionStorage.getItem('token');
    if (token == null || token == "") {
        if(indexType==1){
            window.location.href = "../login.html";
        }else{
            window.location.href = "../../login.html";
        }
    }
});
