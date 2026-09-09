(function(){
var b=document.querySelector('.progress i');
if(b){var t=function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;
b.style.width=(m>0?(h.scrollTop/m*100):0)+'%';};
addEventListener('scroll',t,{passive:true});t();}
document.querySelectorAll('.mainnav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('navopen')})});
})();

/* email capture -> Klaviyo client subscriptions API */
(function(){
var CO='UppGQn', LIST='W3ajGr';
var forms=document.querySelectorAll('form.klaviyo-form-placeholder');
if(!forms.length) return;
var st=document.createElement('style');
st.textContent='.capture .cnote{margin:14px 0 0;font-size:15px;font-weight:600;max-width:52ch;line-height:1.45}.capture .cnote.ok{color:#8fe3b8}.capture .cnote.err{color:#ffb3a3;font-weight:500;font-size:14px}';
document.head.appendChild(st);
function wire(form){
 if(form.dataset.wired) return; form.dataset.wired='1';
 var input=form.querySelector('input[type=email]'), btn=form.querySelector('button');
 if(!input||!btn) return;
 var note=document.createElement('p'); note.className='cnote'; note.setAttribute('role','status'); note.hidden=true;
 form.insertAdjacentElement('afterend',note);
 function say(m,ok){ note.textContent=m; note.hidden=false; note.className='cnote'+(ok?' ok':' err'); }
 form.addEventListener('submit',function(e){
  e.preventDefault();
  var email=(input.value||'').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ say('That email address looks off \u2014 mind checking it?',false); input.focus(); return; }
  var label=btn.textContent; btn.disabled=true; btn.textContent='Sending\u2026';
  fetch('https://a.klaviyo.com/client/subscriptions/?company_id='+CO,{
   method:'POST',
   headers:{'content-type':'application/json',revision:'2024-10-15'},
   body:JSON.stringify({data:{type:'subscription',attributes:{profile:{data:{type:'profile',attributes:{email:email}}}},relationships:{list:{data:{type:'list',id:LIST}}}}})
  }).then(function(r){
   if(r.status===202||r.ok){
    form.hidden=true;
    var s=form.parentNode.querySelector('small'); if(s) s.hidden=true;
    say('You\u2019re in. Check your inbox \u2014 the 30-day challenge is on its way.',true);
   } else { throw new Error(r.status); }
  }).catch(function(){
   btn.disabled=false; btn.textContent=label;
   say('Something went wrong on our end. Try again in a moment, or email hello@everydayfithabits.com.',false);
  });
 });
}
forms.forEach(wire);
})();
