const I18N={
 en:{
  nav:{about:'About',lessons:'Lessons',availability:'Availability',gallery:'Gallery',book:'Book a lesson'},
  home:{eyebrow:'Churwalden · Lenzerheide · Graubünden',title:'THURSTON <strong>ALPINE</strong>',sub:'Private snowboard instruction in the Swiss Alps. Personal coaching, mountain experience and a focus on helping you ride with confidence.',book:'Book a lesson →',about:'About the instructor',m1:'Mountain experience',m2:'Private coaching',m3:'Based in Churwalden'},
  about:{eyebrow:'Your instructor',title:'Learn from someone who loves the mountain.',p1:'Private snowboard instruction built around your ability, your goals and the conditions on the mountain.',p2:"Based in Churwalden, lessons are tailored to your ability, goals and the conditions on the day. Whether you're taking your first turns or looking to ride with more confidence, we'll build the session around you.",button:'See the coaching approach →',badge1:'Private coaching',badge2:'Personal approach'},
  lessons:{eyebrow:'Private coaching',title:'One mountain.<br>One rider at a time.',c1:'One-to-one coaching',c2:'Build your riding',c3:'Ride the Alps',p1:'A session built around your current ability, goals and confidence on the board.',p2:'Improve technique, turns, control and confidence with clear instruction and practical feedback.',p3:'Explore the mountain with an instructor who can adapt the session to the snow and conditions.'},
  german:{eyebrow:'German communication',title:'Simple, honest and practical.',noteTitle:'Deutsch / German',note:'My German is A1 level. I can communicate conversationally and provide simple instruction in German. For detailed or technical explanations, English is the better choice.'},
  qualification:{eyebrow:'The coaching approach',title:'Clear instruction.<br>Practical progression.',p:'Every session is adapted to the rider, the terrain and the conditions. The focus is on useful feedback, confidence and progress that you can take with you onto the mountain.',c1:'Personal coaching matched to your level',c2:'Practical feedback and clear explanations',c3:'Sessions adapted to mountain conditions',cardTitle:'Rider focused',cardText:'Private snowboard coaching',cardNote:'Instructor details will be added to the production site.'},
  availability:{eyebrow:'Availability',title:'Find a day that works.',intro:'Choose a date to see example session times. This demo uses sample availability; the live site can connect this calendar to a real booking system.',available:'Available',booked:'Booked',select:'Select a date',request:'Request this time',demo:'Demo availability — not a live booking calendar.'},
  gallery:{eyebrow:'Riding gallery',title:'The mountain. The students. The progression.',intro:'Student photos live here rather than filling the home page. Each student can have their own gallery, with a name added only when they have given permission.',student:'Student 1',permission:'Name to be added with the student’s permission.',back:'Back to home →'},
  cta:{eyebrow:'Ready to ride?',title:'Let’s make the mountain yours.',p:'Tell me what you would like to work on, when you are visiting and where you are staying. We will find the right session for you.',button:'Start a booking enquiry →',mobile:'Mobile',email:'Email'},
  footer:'Private snowboard instruction · Churwalden · Lenzerheide · Graubünden',footerDemo:'Demo version · Contact details withheld'
 },
 de:{
  nav:{about:'Über mich',lessons:'Unterricht',availability:'Verfügbarkeit',gallery:'Galerie',book:'Unterricht buchen'},
  home:{eyebrow:'Churwalden · Lenzerheide · Graubünden',title:'THURSTON <strong>ALPINE</strong>',sub:'Privater Snowboardunterricht in den Schweizer Alpen. Persönliches Coaching und praktische Hilfe für mehr Sicherheit auf dem Snowboard.',book:'Unterricht buchen →',about:'Über den Instructor',m1:'Erfahrung in den Bergen',m2:'Privates Coaching',m3:'In Churwalden',},
  about:{eyebrow:'Dein Snowboardlehrer',title:'Lerne von jemandem, der die Berge liebt.',p1:'Privater Snowboardunterricht, angepasst an dein Können, deine Ziele und die Bedingungen am Berg.',p2:'Der Unterricht wird an dein Können, deine Ziele und die Bedingungen angepasst. Wir arbeiten Schritt für Schritt und praktisch.',button:'Der Coaching-Ansatz →',badge1:'Privates Coaching',badge2:'Persönlicher Ansatz'},
  lessons:{eyebrow:'Privater Unterricht',title:'Ein Berg.<br>Ein Fahrer zur Zeit.',c1:'Einzelunterricht',c2:'Dein Snowboard verbessern',c3:'Die Alpen fahren',p1:'Eine Session passend zu deinem Können, deinen Zielen und deinem Vertrauen auf dem Board.',p2:'Wir verbessern Technik, Kurven, Kontrolle und Sicherheit mit klaren und praktischen Übungen.',p3:'Wir fahren gemeinsam auf dem Berg und passen den Unterricht an Schnee und Bedingungen an.'},
  german:{eyebrow:'Deutsch',title:'Einfach, ehrlich und praktisch.',noteTitle:'Deutschkenntnisse',note:'Mein Deutsch ist auf A1-Niveau. Ich kann mich im Alltag verständigen und einfachen Unterricht auf Deutsch geben. Für ausführliche oder technische Erklärungen ist Englisch besser geeignet.'},
  qualification:{eyebrow:'Der Coaching-Ansatz',title:'Klare Erklärungen.<br>Praktische Fortschritte.',p:'Jede Session wird an den Fahrer, das Gelände und die Bedingungen angepasst. Der Fokus liegt auf nützlichem Feedback, mehr Sicherheit und Fortschritt.',c1:'Persönliches Coaching passend zu deinem Können',c2:'Praktisches Feedback und klare Erklärungen',c3:'Sessions angepasst an die Bedingungen am Berg',cardTitle:'Auf den Fahrer fokussiert',cardText:'Privates Snowboard-Coaching',cardNote:'Details zum Instructor werden auf der Produktionsseite ergänzt.'},
  availability:{eyebrow:'Verfügbarkeit',title:'Finde einen passenden Tag.',intro:'Wähle ein Datum und sehe Beispielzeiten. Diese Demo verwendet Beispielzeiten; später kann der Kalender mit einem echten Buchungssystem verbunden werden.',available:'Frei',booked:'Belegt',select:'Datum auswählen',request:'Diese Zeit anfragen',demo:'Demo-Verfügbarkeit — noch keine echte Buchung.'},
  gallery:{eyebrow:'Riding Galerie',title:'Der Berg. Die Schüler. Der Fortschritt.',intro:'Die Fotos der Schüler sind auf einer eigenen Seite. Jeder Schüler kann eine eigene Galerie bekommen. Ein Name wird nur mit Erlaubnis hinzugefügt.',student:'Schüler 1',permission:'Name wird mit Erlaubnis des Schülers ergänzt.',back:'Zur Startseite →'},
  cta:{eyebrow:'Bereit zum Fahren?',title:'Machen wir den Berg zu deinem.',p:'Sag mir, woran du arbeiten möchtest, wann du kommst und wo du wohnst. Dann finden wir die richtige Session.',button:'Anfrage senden →',mobile:'Handy',email:'E-Mail'},
  footer:'Privater Snowboardunterricht · Churwalden · Lenzerheide · Graubünden',footerDemo:'Demo-Version · Kontaktdaten zurückgehalten'
 }
};

const slots={
 '2026-12-02':['09:00','11:30','14:00'],
 '2026-12-03':['10:00','13:30'],
 '2026-12-04':[],
 '2026-12-05':['09:30','12:30','15:00'],
 '2026-12-06':['10:00','13:00'],
 '2026-12-07':['09:00','11:30'],
 '2026-12-08':[],
 '2026-12-09':['09:30','12:30','15:00'],
 '2026-12-10':['10:00','13:30'],
 '2026-12-11':['09:00','11:30','14:00'],
 '2026-12-12':['09:30','12:30'],
 '2026-12-13':[]
};
let lang=localStorage.getItem('thurstonLang')||'en';
function t(path){return path.split('.').reduce((o,k)=>o?.[k],I18N[lang])||''}
function setText(sel,path){const el=document.querySelector(sel);if(el)el.innerHTML=t(path)}
function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=t(el.dataset.i18n));
 document.querySelectorAll('[data-i18n-attr]').forEach(el=>{const [attr,path]=el.dataset.i18nAttr.split('|');el.setAttribute(attr,t(path));});
 document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
 const yearEl=document.querySelector('[data-year]');if(yearEl)yearEl.textContent=new Date().getFullYear();
 if(window.renderCalendar)renderCalendar();
}
function setLanguage(next){lang=next;localStorage.setItem('thurstonLang',lang);applyLanguage()}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
const menu=document.querySelector('.menu-toggle');if(menu){menu.addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open'))}

let selectedDate=null, selectedSlot=null;
function renderCalendar(){
 const grid=document.querySelector('#calendar-grid');if(!grid)return;
 grid.innerHTML='';
 ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach((d,i)=>{const el=document.createElement('div');el.className='weekday';el.textContent=lang==='de'?['Mo','Di','Mi','Do','Fr','Sa','So'][i]:d;grid.appendChild(el)});
 const first=new Date(2026,11,1), start=(first.getDay()+6)%7, days=31;
 for(let i=0;i<start;i++){const el=document.createElement('div');el.className='day muted';grid.appendChild(el)}
 for(let d=1;d<=days;d++){
  const key=`2026-12-${String(d).padStart(2,'0')}`;const el=document.createElement('div');const s=slots[key];el.className='day '+(s&&s.length?'available':'booked')+(selectedDate===key?' selected':'');
  el.innerHTML=`<span class="day-number">${d}</span><span class="day-status">${s&&s.length?t('availability.available'):t('availability.booked')}</span>`;
  if(s&&s.length)el.addEventListener('click',()=>selectDate(key));
  grid.appendChild(el);
 }
 while(grid.children.length%7) {const el=document.createElement('div');el.className='day muted';grid.appendChild(el)}
 updateSlotPanel();
}
function selectDate(key){selectedDate=key;selectedSlot=null;renderCalendar()}
function updateSlotPanel(){
 const panel=document.querySelector('#slot-panel');if(!panel)return;
 if(!selectedDate){panel.innerHTML=`<div><h3>${t('availability.select')}</h3><p class="availability-note">${t('availability.demo')}</p></div>`;return}
 const s=slots[selectedDate]||[];const dateLabel=new Date(selectedDate+'T12:00:00').toLocaleDateString(lang==='de'?'de-CH':'en-GB',{weekday:'long',day:'numeric',month:'long'});
 panel.innerHTML=`<div><h3>${dateLabel}</h3><div class="slots">${s.map(x=>`<button class="slot ${selectedSlot===x?'chosen':''}" data-slot="${x}">${x}</button>`).join('')}</div><p class="availability-note">${t('availability.demo')}</p></div><div><button class="btn" id="request-slot" ${selectedSlot?'':'disabled'}>${t('availability.request')}</button></div>`;
 panel.querySelectorAll('.slot').forEach(b=>b.addEventListener('click',()=>{selectedSlot=b.dataset.slot;updateSlotPanel()}));
 const req=panel.querySelector('#request-slot');if(req)req.addEventListener('click',()=>{document.querySelector('#booking-summary').textContent=`${dateLabel} · ${selectedSlot}`;document.querySelector('#booking').scrollIntoView({behavior:'smooth',block:'start'});});
}
window.renderCalendar=renderCalendar;
applyLanguage();

// V7: keep the home navigation available while scrolling, while changing it to a solid alpine header.
(function(){
 const header=document.querySelector('.home-header');
 if(header){
   const sync=()=>header.classList.toggle('is-scrolled',window.scrollY>30);
   sync(); window.addEventListener('scroll',sync,{passive:true});
 }

 // V7: click-to-enlarge gallery images. The full-resolution source is shown in the lightbox.
 const box=document.querySelector('#lightbox'), image=document.querySelector('#lightbox-image'), caption=document.querySelector('#lightbox-caption');
 if(box && image){
   document.querySelectorAll('.photo img').forEach(img=>img.addEventListener('click',()=>{
     image.src=img.currentSrc||img.src;
     image.alt=img.alt||'';
     caption.textContent=img.alt||'';
     box.classList.add('open'); box.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
   }));
   const close=()=>{box.classList.remove('open');box.setAttribute('aria-hidden','true');image.src='';document.body.style.overflow='';};
   box.addEventListener('click',e=>{if(e.target===box)close()});
   box.querySelector('.lightbox-close').addEventListener('click',close);
   document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('open'))close()});
 }
})();
