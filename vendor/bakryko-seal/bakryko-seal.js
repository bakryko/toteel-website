const sprite = new URL('./bakryko-seal.svg', import.meta.url).href;
const projects = [
  {
    "ar": "عين الصفا",
    "en": "Ain Al Safa",
    "noteAr": "",
    "noteEn": "",
    "year": 2026
  },
  {
    "ar": "توتيل",
    "en": "Toteel",
    "noteAr": "",
    "noteEn": "",
    "year": 2026
  },
  {
    "ar": "the-hand",
    "en": "the-hand",
    "noteAr": "",
    "noteEn": "",
    "year": 2026
  },
  {
    "ar": "محل المياه",
    "en": "Water Store",
    "noteAr": "",
    "noteEn": "",
    "year": 2026
  },
  {
    "ar": "3d-portfolio",
    "en": "3d-portfolio",
    "noteAr": "",
    "noteEn": "",
    "year": 2026
  },
  {
    "ar": "تكوين",
    "en": "Takween",
    "noteAr": "محرّك ذاتي التطوّر — بيراقب نفسو ويصلّح نفسو",
    "noteEn": "A self-improving engine that monitors and repairs itself",
    "year": 2026
  },
  {
    "ar": "جارفس",
    "en": "Jarvis",
    "noteAr": "مخطط مساعد شخصي محلي ١٠٠٪ — بلا سحابة ولا اشتراكات",
    "noteEn": "A plan for a fully local personal assistant, without cloud services or subscriptions",
    "year": 2026
  },
  {
    "ar": "ونس",
    "en": "Wns",
    "noteAr": "خزنة ذكريات دافية لناسك القريبين",
    "noteEn": "A warm place to keep memories of the people close to you",
    "year": 2026
  },
  {
    "ar": "بوصلة",
    "en": "Bawsala",
    "noteAr": "نظام سوشيال ذكي للمحلات — بديل الوكالات",
    "noteEn": "A social media system for shops, an alternative to an agency",
    "year": 2026
  },
  {
    "ar": "دفعة",
    "en": "Dof3a",
    "noteAr": "رفيق مذاكرة لطلاب الشهادة السودانية",
    "noteEn": "A study companion for Sudanese secondary school students",
    "year": 2026
  },
  {
    "ar": "مصنع الوكلاء",
    "en": "Agent Factory",
    "noteAr": "وكلاء من مواصفات ثابتة، يحكمهم الدليل والسياسة",
    "noteEn": "Agents built from fixed specifications and governed by evidence and policy",
    "year": 2026
  },
  {
    "ar": "مدرستي",
    "en": "Madrasati",
    "noteAr": "إدارة المدرسة والتعلّم ومتابعة الأبناء، في مكان واحد",
    "noteEn": "School management, learning and family follow-up in one place",
    "year": 2026
  }
];
const labels = {
  ar: ['حديقة بكريكو', 'إغلاق', 'الوردة الأولى'],
  en: ['Bakryko’s garden', 'Close', 'First rose']
};

function icon(url, id, width, height) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(ns, 'use');
  use.setAttribute('href', url + '#' + id);
  svg.append(use);
  return svg;
}
function node(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  if (text) el.textContent = text;
  return el;
}
class BakrykoSeal extends HTMLElement {
  static observedAttributes = ['lang', 'sprite'];
  connectedCallback() { this.render(); }
  disconnectedCallback() { this.cleanup(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  cleanup() {
    clearTimeout(this.timer);
    this.querySelector('dialog[open]')?.close();
    this.listeners?.abort();
  }
  render() {
    this.cleanup();
    this.listeners = new AbortController();
    const listen = (el, event, fn) => el.addEventListener(event, fn, {signal:this.listeners.signal});
    const ar = (this.closest('[lang]')?.lang || 'ar').toLowerCase().startsWith('ar');
    const lang = ar ? 'ar' : 'en';
    const [title, closeLabel, firstRose] = labels[lang];
    const url = this.getAttribute('sprite') || sprite;
    const mark = node('button','bk-mark');
    mark.type = 'button';
    mark.setAttribute('aria-label', title);
    mark.setAttribute('aria-haspopup','dialog');
    mark.append(icon(url,'seal',40,47));
    const name = node('span','bk-name','Bakryko');
    const numbers = node('span','bk-numbers','14.823286, 33.215151');
    name.dir = numbers.dir = 'ltr';
    const dialog = node('dialog','bk-dialog');
    dialog.dir = ar ? 'rtl' : 'ltr';
    dialog.setAttribute('aria-label', title);
    const exit = node('button','bk-close','×');
    exit.type = 'button';
    exit.setAttribute('aria-label',closeLabel);
    const plants = node('div','bk-plants');
    const caption = node('div','bk-caption');
    caption.setAttribute('aria-live','polite');
    const buttons = [];
    for (const entry of [null, ...projects]) {
      const button = node('button', 'bk-plant');
      button.type = 'button';
      button.setAttribute('aria-label',entry?.[lang] || firstRose);
      button.setAttribute('aria-pressed','false');
      button.append(icon(url,'bloom',34,34));
      buttons.push(button);
      listen(button,'click', () => {
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        caption.replaceChildren();
        if (entry) {
          const year = new Intl.NumberFormat(ar ? 'ar-EG' : 'en', {useGrouping:false}).format(entry.year);
          caption.append(node('b','',entry[lang]),node('small','',year),node('span','',ar ? entry.noteAr : entry.noteEn));
        }
      });
      plants.append(button);
    }
    dialog.append(exit,plants,caption);
    const open = () => {
      if (dialog.open) return;
      caption.replaceChildren();
      buttons.forEach(item=>item.setAttribute('aria-pressed','false'));
      plants.scrollLeft = 0;
      dialog.showModal();
      exit.focus({preventScroll:true});
    };
    listen(mark,'pointerdown', event => {
      clearTimeout(this.timer);
      if (event.isPrimary && event.button === 0) this.timer = setTimeout(open,2000);
    });
    for (const event of ['pointerup','pointercancel','pointerleave','touchmove','blur']) {
      listen(mark,event,()=>clearTimeout(this.timer));
    }
    listen(mark,'contextmenu',event=>event.preventDefault());
    listen(mark,'click', event=>{ if (event.detail === 0) open(); });
    listen(exit,'click',()=>dialog.close());
    listen(dialog,'close',()=>mark.focus({preventScroll:true}));
    this.replaceChildren(mark,name,numbers,dialog);
  }
}
if (!customElements.get('bakryko-seal')) customElements.define('bakryko-seal', BakrykoSeal);
