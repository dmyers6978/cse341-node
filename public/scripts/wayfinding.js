window.onload = function(){
    var nav = Array.from(document.getElementsByClassName('nav'));
    var path = window.location.pathname.split('/')[1];
    if(!path){
        nav.forEach(a => {
            if(a.classList.contains("active")){
                a.classList.remove("active");
            }
            if(a.href == window.location.protocol + "//" + window.location.host + "/"){
                a.classList.add("active");
            }
        })
    } else{
        nav.forEach(a => {
            if(a.classList.contains("active")){
                a.classList.remove("active");
            }
            console.log(a.href);
            if(a.href == window.location.protocol + "//" + window.location.host + "/" + path){
                a.classList.add("active");
            }
        })
    }
}