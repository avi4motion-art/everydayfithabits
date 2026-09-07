(function(){
var b=document.querySelector('.progress i');
if(b){var t=function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;
b.style.width=(m>0?(h.scrollTop/m*100):0)+'%';};
addEventListener('scroll',t,{passive:true});t();}
document.querySelectorAll('.mainnav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('navopen')})});
})();
