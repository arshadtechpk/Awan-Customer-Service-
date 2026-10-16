const nav = document.getElementById('nav');
document.getElementById('menuBtn').addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

// Prevent selecting a date in the past.
const dateField = document.getElementById('bookingDate');
if (dateField) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  dateField.min = localDate;
  dateField.value = localDate;
}
function makeBookingRef() {
  const d = new Date();
  const stamp = [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('');
  const tail = Math.random().toString(36).slice(2,6).toUpperCase();
  return `AW-${stamp}-${tail}`;
}
document.getElementById('bookingForm').addEventListener('submit',e=>{
 e.preventDefault();
 const name=document.getElementById('customerName').value.trim();
 const phone=document.getElementById('customerPhone').value.trim();
 const model=document.getElementById('deviceModel').value.trim();
 const problem=document.getElementById('problem').value;
 const date=document.getElementById('bookingDate').value;
 const time=document.getElementById('bookingTime').value;
 const details=document.getElementById('details').value.trim() || 'Not provided';
 const ref=makeBookingRef();
 const msg=`Assalam-o-Alaikum AWAN Customer Service,%0A%0ANEW REPAIR BOOKING REQUEST%0ABooking Reference: ${encodeURIComponent(ref)}%0ACustomer Name: ${encodeURIComponent(name)}%0ACustomer Phone: ${encodeURIComponent(phone)}%0ADevice: ${encodeURIComponent(model)}%0AService: ${encodeURIComponent(problem)}%0APreferred Date: ${encodeURIComponent(date)}%0APreferred Time: ${encodeURIComponent(time)}%0AFault Details: ${encodeURIComponent(details)}%0A%0AKindly confirm availability and estimate.`;
 const target='https://wa.me/923092255002?text='+msg;
 const opened=window.open(target,'_blank');
 if (!opened) window.location.href=target;
 const result=document.getElementById('bookingResult');
 if(result){result.hidden=false;result.innerHTML=`Your reference: <strong>${ref}</strong><br>WhatsApp will open. Press <strong>Send</strong> there, then wait for our team to confirm your booking.`;}
});
document.getElementById('trackForm').addEventListener('submit',e=>{
 e.preventDefault();
 const id=document.getElementById('repairId').value.trim();
 const msg=`Assalam-o-Alaikum AWAN Customer Service,%0AMeri repair ka status batayein.%0ARepair / Receipt ID: ${encodeURIComponent(id)}`;
 const target='https://wa.me/923092255002?text='+msg;
 const opened=window.open(target,'_blank');
 if (!opened) window.location.href=target;
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{});
