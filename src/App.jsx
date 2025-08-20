import React, { useMemo, useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, Home, CalendarDays, HeartHandshake, Sparkles, Settings, ChevronRight, ChevronLeft,
  MessageCircle, Star, Globe2, ShieldCheck, Info, HelpCircle, Bell, User2, Moon, SunMedium,
  Download, Search, Users, LineChart, Zap, MapPin, Gamepad2, NotebookPen, Gift
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Switch } from "./components/ui/switch";
import { Slider } from "./components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";

/**
 * Partners Horoscopes – 100% AI structured matching system
 * Mobile-first SPA with hamburger menu + bottom navigation
 * Languages: Czech (cs), Slovak (sk), Polish (pl), Hungarian (hu)
 * Includes extras: Love Energy Meter, Shared Diary, AI Date Generator, Games, Connection Map, Forecast
 * Payment stubs (Stripe/LemonSqueezy ready)
 */

const dictionaries = {
  cs: {
    appTitle: "Partnerské horoskopy",
    subtitle: "Chytré párování lásky pomocí AI",
    start: "Začít",
    today: "Dnes",
    daily: "Denní",
    weekly: "Týdenní",
    monthly: "Měsíční",
    matches: "Shody",
    questionnaire: "Dotazník",
    settings: "Nastavení",
    menu: "Menu",
    language: "Jazyk",
    theme: "Tmavý režim",
    about: "O aplikaci",
    help: "Nápověda",
    privacy: "Ochrana soukromí",
    terms: "Podmínky",
    notifications: "Upozornění",
    compatibility: "Kompatibilita",
    synastry: "Synastrie",
    loveCalc: "Láskoměr",
    birthChart: "Nativní horoskop",
    profiles: "Profily partnerů",
    messages: "Zprávy",
    favorites: "Oblíbené",
    results: "Výsledky",
    premium: "Premium",
    onboarding: "Úvod",
    contact: "Kontakt",
    export: "Export dat",
    mood: "Nálada",
    search: "Hledat",
    addPartner: "Přidat partnera",
    name: "Jméno",
    gender: "Pohlaví",
    birthDate: "Datum narození",
    birthTime: "Čas narození (vol.)",
    birthPlace: "Místo narození (vol.)",
    sign: "Znamení",
    save: "Uložit",
    compute: "Spočítat",
    overallScore: "Celkové skóre",
    greatMatch: "Skvělá shoda",
    goodMatch: "Dobrá shoda",
    okMatch: "Průměrná shoda",
    poorMatch: "Nízká shoda",
    explainScore: "Jak počítáme skóre",
    qIntro: "Odpovězte upřímně – pomáhá to přesnějšímu párování.",
    qLifestyle: "Životní styl",
    qCommunication: "Komunikace",
    qIntimacy: "Intimita",
    qFuture: "Budoucí plány",
    qConflict: "Řešení konfliktů",
    submit: "Odeslat",
    reset: "Reset",
    horoscopeFor: "Horoskop pro",
    selectSign: "Vyberte znamení",
    pairs: "Páry",
    aiMatches: "AI shody",
    noMatches: "Zatím žádné shody",
    demoText: "Demo data pouze pro ukázku.",
    loveEnergy: "Energie lásky",
    diary: "Sdílený deník",
    dateIdeas: "AI nápady na rande",
    games: "Hry",
    map: "Kosmická mapa",
    forecast: "Předpověď vztahu",
    upgrade: "Přejít na Premium",
    buyGift: "Dárkový přístup",
  },
  sk: {
    appTitle: "Partnerské horoskopy",
    subtitle: "Chytré párovanie lásky pomocou AI",
    start: "Začať",
    today: "Dnes",
    daily: "Denný",
    weekly: "Týždenný",
    monthly: "Mesačný",
    matches: "Zhody",
    questionnaire: "Dotazník",
    settings: "Nastavenia",
    menu: "Menu",
    language: "Jazyk",
    theme: "Tmavý režim",
    about: "O aplikácii",
    help: "Pomoc",
    privacy: "Súkromie",
    terms: "Podmienky",
    notifications: "Upozornenia",
    compatibility: "Kompatibilita",
    synastry: "Synastria",
    loveCalc: "Láskomer",
    birthChart: "Natatívny horoskop",
    profiles: "Profily partnerov",
    messages: "Správy",
    favorites: "Obľúbené",
    results: "Výsledky",
    premium: "Premium",
    onboarding: "Úvod",
    contact: "Kontakt",
    export: "Export dát",
    mood: "Nálada",
    search: "Hľadať",
    addPartner: "Pridať partnera",
    name: "Meno",
    gender: "Pohlavie",
    birthDate: "Dátum narodenia",
    birthTime: "Čas narodenia (vol.)",
    birthPlace: "Miesto narodenia (vol.)",
    sign: "Znamenie",
    save: "Uložiť",
    compute: "Vypočítať",
    overallScore: "Celkové skóre",
    greatMatch: "Skvelá zhoda",
    goodMatch: "Dobrá zhoda",
    okMatch: "Priemerná zhoda",
    poorMatch: "Nízka zhoda",
    explainScore: "Ako počítame skóre",
    qIntro: "Odpovedajte úprimne – pomáha to presnejšiemu párovaniu.",
    qLifestyle: "Životný štýl",
    qCommunication: "Komunikácia",
    qIntimacy: "Intimita",
    qFuture: "Budúce plány",
    qConflict: "Riešenie konfliktov",
    submit: "Odoslať",
    reset: "Reset",
    horoscopeFor: "Horoskop pre",
    selectSign: "Vyberte znamenie",
    pairs: "Páry",
    aiMatches: "AI zhody",
    noMatches: "Zatiaľ žiadne zhody",
    demoText: "Demo dáta iba pre ukážku.",
    loveEnergy: "Láska energia",
    diary: "Zdieľaný denník",
    dateIdeas: "Nápady na rande",
    games: "Hry",
    map: "Kozmická mapa",
    forecast: "Predpoveď vzťahu",
    upgrade: "Prejsť na Premium",
    buyGift: "Darčekový prístup",
  },
  pl: {
    appTitle: "Partnerskie horoskopy",
    subtitle: "Inteligentne łączenie par dzięki AI",
    start: "Start",
    today: "Dziś",
    daily: "Dzienny",
    weekly: "Tygodniowy",
    monthly: "Miesięczny",
    matches: "Dopasowania",
    questionnaire: "Ankieta",
    settings: "Ustawienia",
    menu: "Menu",
    language: "Język",
    theme: "Tryb ciemny",
    about: "O aplikacji",
    help: "Pomoc",
    privacy: "Prywatność",
    terms: "Warunki",
    notifications: "Powiadomienia",
    compatibility: "Kompatybilność",
    synastry: "Synastria",
    loveCalc: "Miernik miłości",
    birthChart: "Kosmogram",
    profiles: "Profile partnerów",
    messages: "Wiadomości",
    favorites: "Ulubione",
    results: "Wyniki",
    premium: "Premium",
    onboarding: "Wprowadzenie",
    contact: "Kontakt",
    export: "Eksport danych",
    mood: "Nastrój",
    search: "Szukaj",
    addPartner: "Dodaj partnera",
    name: "Imię",
    gender: "Płeć",
    birthDate: "Data urodzenia",
    birthTime: "Godzina urodz. (opc.)",
    birthPlace: "Miejsce urodz. (opc.)",
    sign: "Znak",
    save: "Zapisz",
    compute: "Oblicz",
    overallScore: "Wynik ogólny",
    greatMatch: "Świetne dopasowanie",
    goodMatch: "Dobre dopasowanie",
    okMatch: "Średnie dopasowanie",
    poorMatch: "Słabe dopasowanie",
    explainScore: "Jak liczymy wynik",
    qIntro: "Odpowiadaj szczerze – to pomaga dopasowaniu.",
    qLifestyle: "Styl życia",
    qCommunication: "Komunikacja",
    qIntimacy: "Intymność",
    qFuture: "Plany na przyszłość",
    qConflict: "Rozwiązywanie konfliktów",
    submit: "Wyślij",
    reset: "Reset",
    horoscopeFor: "Horoskop dla",
    selectSign: "Wybierz znak",
    pairs: "Pary",
    aiMatches: "Dopasowania AI",
    noMatches: "Brak dopasowań",
    demoText: "Dane demonstracyjne do podglądu.",
    loveEnergy: "Energia miłości",
    diary: "Wspólny dziennik",
    dateIdeas: "Pomysły na randki",
    games: "Gry",
    map: "Kosmiczna mapa",
    forecast: "Prognoza relacji",
    upgrade: "Przejdź na Premium",
    buyGift: "Dostęp w prezencie",
  },
  hu: {
    appTitle: "Párhoroszkópok",
    subtitle: "Okos párosítás AI segítségével",
    start: "Indítás",
    today: "Ma",
    daily: "Napi",
    weekly: "Heti",
    monthly: "Havi",
    matches: "Találatok",
    questionnaire: "Kérdőív",
    settings: "Beállítások",
    menu: "Menü",
    language: "Nyelv",
    theme: "Sötét mód",
    about: "Az alkalmazásról",
    help: "Súgó",
    privacy: "Adatvédelem",
    terms: "Feltételek",
    notifications: "Értesítések",
    compatibility: "Kompatibilitás",
    synastry: "Szinásztria",
    loveCalc: "Szerelem-mérő",
    birthChart: "Születési képlet",
    profiles: "Partnerek profiljai",
    messages: "Üzenetek",
    favorites: "Kedvencek",
    results: "Eredmények",
    premium: "Prémium",
    onboarding: "Bevezető",
    contact: "Kapcsolat",
    export: "Adat export",
    mood: "Hangulat",
    search: "Keresés",
    addPartner: "Partner hozzáadása",
    name: "Név",
    gender: "Nem",
    birthDate: "Születési dátum",
    birthTime: "Születési idő (opciós)",
    birthPlace: "Születési hely (opciós)",
    sign: "Csillagjegy",
    save: "Mentés",
    compute: "Számítás",
    overallScore: "Összesített pontszám",
    greatMatch: "Remek páros",
    goodMatch: "Jó páros",
    okMatch: "Közepes páros",
    poorMatch: "Gyenge páros",
    explainScore: "Hogyan számolunk",
    qIntro: "Válaszolj őszintén – ez javítja a párosítást.",
    qLifestyle: "Életmód",
    qCommunication: "Kommunikáció",
    qIntimacy: "Intimitás",
    qFuture: "Jövőbeli tervek",
    qConflict: "Konfliktuskezelés",
    submit: "Küldés",
    reset: "Visszaállítás",
    horoscopeFor: "Horoszkóp:",
    selectSign: "Válassz jegyet",
    pairs: "Párok",
    aiMatches: "AI találatok",
    noMatches: "Nincs találat",
    demoText: "Demó adatok a bemutatóhoz.",
    loveEnergy: "Szerelmi energia",
    diary: "Közös napló",
    dateIdeas: "Randiötletek",
    games: "Játékok",
    map: "Kozmikus térkép",
    forecast: "Kapcsolati előrejelzés",
    upgrade: "Prémium előfizetés",
    buyGift: "Ajándék hozzáférés",
  },
};

const I18nContext = createContext({ lang: "cs", t: (k) => k, setLang: (l)=>{} });
const useI18n = () => useContext(I18nContext);

const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const COMP = [
  [0.7,0.5,0.8,0.4,0.9,0.6,0.7,0.5,0.8,0.4,0.8,0.6],
  [0.5,0.8,0.5,0.7,0.6,0.9,0.6,0.5,0.5,0.8,0.6,0.7],
  [0.8,0.5,0.7,0.5,0.8,0.6,0.7,0.5,0.9,0.4,0.9,0.7],
  [0.4,0.7,0.5,0.8,0.5,0.6,0.6,0.8,0.5,0.6,0.5,0.9],
  [0.9,0.6,0.8,0.5,0.8,0.6,0.7,0.5,0.9,0.5,0.8,0.6],
  [0.6,0.9,0.6,0.6,0.6,0.8,0.6,0.7,0.6,0.8,0.6,0.7],
  [0.7,0.6,0.7,0.6,0.7,0.6,0.8,0.6,0.7,0.6,0.8,0.6],
  [0.5,0.5,0.5,0.8,0.5,0.7,0.6,0.8,0.5,0.7,0.6,0.7],
  [0.8,0.5,0.9,0.5,0.9,0.6,0.7,0.5,0.8,0.5,0.9,0.7],
  [0.4,0.8,0.4,0.6,0.5,0.8,0.6,0.7,0.5,0.8,0.6,0.6],
  [0.8,0.6,0.9,0.5,0.8,0.6,0.8,0.6,0.9,0.6,0.8,0.6],
  [0.6,0.7,0.7,0.9,0.6,0.7,0.6,0.7,0.7,0.6,0.6,0.8],
];

const LS_KEY = "partners_horo_state_v2";

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
function scoreFromQuestionnaire(answers){
  const weights = { lifestyle:1, communication:1.1, intimacy:1.1, future:1.2, conflict:1.2 };
  const sumW = Object.values(weights).reduce((a,b)=>a+b,0);
  const raw = Object.entries(weights).reduce((acc,[k,w])=> acc + (answers?.[k] ?? 2)*w, 0);
  const max = 4*sumW;
  return raw/max;
}
function zodiacScore(aIndex, bIndex){ return COMP[aIndex][bIndex]; }
function computeCompatibility(partnerA, partnerB, answers){
  const base = zodiacScore(partnerA.sign, partnerB.sign);
  const q = scoreFromQuestionnaire(answers);
  const blended = clamp(0.7*base + 0.3*q, 0, 1);
  const score = Math.round(blended*100);
  let label = "";
  if(score>=80) label = "great"; else if(score>=65) label="good"; else if(score>=50) label="ok"; else label="poor";
  return { score, label, parts: { base: Math.round(base*100), questionnaire: Math.round(q*100) } };
}
function dailyEnergy(a, b){
  // deterministic daily energy based on date + signs
  const d = new Date(); const seed = (d.getFullYear()*37 + (d.getMonth()+1)*13 + d.getDate()*7 + a.sign*11 + b.sign*17) % 101;
  return seed;
}

function useLocalState(defaultState){
  const [state, setState] = useState(()=>{
    try { const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : defaultState; } catch(e){ return defaultState; }
  });
  useEffect(()=>{ localStorage.setItem(LS_KEY, JSON.stringify(state)); }, [state]);
  return [state, setState];
}

const I18n = () => null;

function TopBar({ onOpenMenu }){
  const { t } = useI18n();
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-zinc-950/70 border-b">
      <div className="flex items-center gap-3 px-4 py-3 max-w-md mx-auto">
        <Button size="icon" variant="ghost" onClick={onOpenMenu} className="rounded-2xl"><Menu className="h-6 w-6" /></Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">{t("appTitle")}</h1>
          <p className="text-xs opacity-70">{t("subtitle")}</p>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
function ThemeToggle(){
  const [dark, setDark] = useState(()=>document?.documentElement?.classList.contains("dark"));
  useEffect(()=>{ const root = document.documentElement; dark ? root.classList.add("dark") : root.classList.remove("dark"); },[dark]);
  return (<Button variant="ghost" size="icon" onClick={()=>setDark(d=>!d)} className="rounded-2xl">{dark ? <SunMedium className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}</Button>);
}
function BottomNav({ current, setCurrent }){
  const { t } = useI18n();
  const tabs = useMemo(()=>[
    { id:"home", icon: Home, label: t("today") },
    { id:"daily", icon: CalendarDays, label: t("daily") },
    { id:"matches", icon: HeartHandshake, label: t("matches") },
    { id:"questionnaire", icon: NotebookPen, label: t("questionnaire") },
    { id:"settings", icon: Settings, label: t("settings") },
  ], [t]);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/90 dark:bg-zinc-950/90 backdrop-blur">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {tabs.map(tab=>{
          const ActiveIcon = tab.icon; const active = current===tab.id;
          return (
            <button key={tab.id} onClick={()=>setCurrent(tab.id)} className={`flex flex-col items-center justify-center py-2 text-xs ${active?"font-semibold":"opacity-70"}`}>
              <ActiveIcon className="h-5 w-5 mb-1"/>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
function Drawer({ open, onClose, children, title }){
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
          <motion.aside initial={{x:-320}} animate={{x:0}} exit={{x:-320}} transition={{type:"spring", stiffness:300, damping:30}} className="absolute left-0 top-0 bottom-0 w-[88%] max-w-sm bg-white dark:bg-zinc-950 shadow-2xl border-r p-4 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" className="rounded-2xl" onClick={onClose}><ChevronLeft/></Button>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function Section({ title, children, icon:Icon }){
  return (
    <Card className="rounded-2xl shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">{Icon && <Icon className="h-4 w-4"/>}{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}

// Pages
function HomePage({ state }){
  const { t } = useI18n();
  const [sign, setSign] = useState(0);
  const pairs = state.profiles;
  const topPair = pairs.length>=2 ? {a:pairs[0], b:pairs[1]} : null;
  const energy = topPair ? dailyEnergy(topPair.a, topPair.b) : 50;
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={`${t("horoscopeFor")} ${SIGNS[sign]}`} icon={Sparkles}>
        <Select value={String(sign)} onValueChange={(v)=>setSign(Number(v))}>
          <SelectTrigger className="rounded-xl"><SelectValue placeholder={t("selectSign")}/></SelectTrigger>
          <SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent>
        </Select>
        <p className="text-sm opacity-70">
          {t("demoText")} {SIGNS[sign]} – {new Date().toLocaleDateString()}.
        </p>
      </Section>
      <Section title={t("loveEnergy")} icon={Zap}>
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
          <div>
            <div className="text-3xl font-bold">{energy}</div>
            <div className="text-xs opacity-70">{t("overallScore")}</div>
          </div>
          <div className="h-14 w-14 rounded-full" style={{boxShadow:`0 0 30px ${Math.max(10,energy)}px rgba(255,0,128,0.${Math.max(2, Math.floor(energy/10))})`}}/>
        </div>
        <p className="text-xs opacity-70">Aura glow updates daily based on your top pair.</p>
      </Section>
    </div>
  );
}

function DailyPage(){
  const { t } = useI18n();
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("daily")} icon={CalendarDays}><p className="text-sm">{t("demoText")}</p></Section>
      <Section title={t("weekly")} icon={CalendarDays}><p className="text-sm">{t("demoText")}</p></Section>
      <Section title={t("monthly")} icon={CalendarDays}><p className="text-sm">{t("demoText")}</p></Section>
    </div>
  );
}

function QuestionnairePage({ onFinished }){
  const { t } = useI18n();
  const [answers, setAnswers] = useState({ lifestyle:2, communication:2, intimacy:2, future:2, conflict:2 });
  const Row = ({label, keyName}) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm"><span>{label}</span><span className="opacity-70">{answers[keyName]}</span></div>
      <Slider value={[answers[keyName]]} max={4} step={1} onValueChange={([v])=> setAnswers(a=>({...a,[keyName]:v}))} />
    </div>
  );
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("questionnaire")} icon={NotebookPen}>
        <p className="text-sm opacity-70">{t("qIntro")}</p>
        <div className="space-y-4">
          <Row label={t("qLifestyle")} keyName="lifestyle"/>
          <Row label={t("qCommunication")} keyName="communication"/>
          <Row label={t("qIntimacy")} keyName="intimacy"/>
          <Row label={t("qFuture")} keyName="future"/>
          <Row label={t("qConflict")} keyName="conflict"/>
        </div>
        <div className="flex gap-2 pt-2">
          <Button className="rounded-xl" onClick={()=> onFinished?.(answers)}>{t("submit")}</Button>
          <Button className="rounded-xl" variant="secondary" onClick={()=> setAnswers({ lifestyle:2, communication:2, intimacy:2, future:2, conflict:2 })}>{t("reset")}</Button>
        </div>
      </Section>
    </div>
  );
}

function ProfilesPage({ state, setState }){
  const { t } = useI18n();
  const [form, setForm] = useState({ name:"", gender:"", birthDate:"", birthTime:"", birthPlace:"", sign:0 });
  function addProfile(){
    if(!form.name) return;
    setState(s=> ({...s, profiles:[...s.profiles, {...form, id:Date.now()}]}));
    setForm({ name:"", gender:"", birthDate:"", birthTime:"", birthPlace:"", sign:0 });
  }
  function removeProfile(id){ setState(s=> ({...s, profiles: s.profiles.filter(p=>p.id!==id)})); }
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("profiles")} icon={Users}>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder={t("name")} value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="rounded-xl"/>
          <Input placeholder={t("gender")} value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} className="rounded-xl"/>
          <Input type="date" placeholder={t("birthDate")} value={form.birthDate} onChange={e=>setForm({...form, birthDate:e.target.value})} className="rounded-xl"/>
          <Input type="time" placeholder={t("birthTime")} value={form.birthTime} onChange={e=>setForm({...form, birthTime:e.target.value})} className="rounded-xl"/>
          <Input placeholder={t("birthPlace")} value={form.birthPlace} onChange={e=>setForm({...form, birthPlace:e.target.value})} className="rounded-xl col-span-2"/>
          <Select value={String(form.sign)} onValueChange={(v)=> setForm({...form, sign:Number(v)})}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder={t("sign")} /></SelectTrigger>
            <SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent>
          </Select>
          <Button onClick={addProfile} className="rounded-xl"><User2 className="h-4 w-4 mr-2"/>{t("addPartner")}</Button>
        </div>
        <div className="grid gap-2 pt-2">
          {state.profiles.length===0 && (<p className="text-sm opacity-70">{t("noMatches")}</p>)}
          {state.profiles.map(p=> (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs opacity-70">{SIGNS[p.sign]} • {p.birthDate}</div>
              </div>
              <Button size="icon" variant="ghost" className="rounded-2xl" onClick={()=>removeProfile(p.id)}>✕</Button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function MatchesPage({ state }){
  const { t } = useI18n();
  const answers = state.answers;
  const profiles = state.profiles;
  const combos = [];
  for(let i=0;i<profiles.length;i++){
    for(let j=i+1;j<profiles.length;j++){
      const a = profiles[i], b = profiles[j];
      const { score, label } = computeCompatibility(a,b, answers);
      combos.push({ a,b, score, label });
    }
  }
  combos.sort((x,y)=> y.score - x.score);
  const labelMap = { great: t("greatMatch"), good: t("goodMatch"), ok: t("okMatch"), poor: t("poorMatch") };
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("aiMatches")} icon={Zap}>
        {combos.length===0 && <p className="text-sm opacity-70">{t("noMatches")}</p>}
        <div className="grid gap-3">
          {combos.map((c,idx)=> (
            <Card key={idx} className="rounded-2xl">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.a.name} ↔ {c.b.name}</div>
                  <div className="text-xs opacity-70">{SIGNS[c.a.sign]} × {SIGNS[c.b.sign]}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{c.score}</div>
                  <div className="text-xs">{labelMap[c.label]}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function CompatibilityPage(){
  const { t } = useI18n();
  return (
    <div className="p-4 pb-24 space-y-4">
      <QuickPairs />
      <Section title={t("synastry")} icon={LineChart}><p className="text-sm opacity-70">{t("demoText")}</p></Section>
    </div>
  );
}

function QuickPairs(){
  const { t } = useI18n();
  const [a, setA] = useState(0);
  const [b, setB] = useState(6);
  const demoAns = { lifestyle:3, communication:3, intimacy:3, future:3, conflict:3 };
  const { score, label, parts } = computeCompatibility({sign:a},{sign:b}, demoAns);
  const labelMap = { great: t("greatMatch"), good: t("goodMatch"), ok: t("okMatch"), poor: t("poorMatch") };
  return (
    <Section title={t("compatibility")} icon={HeartHandshake}>
      <div className="grid grid-cols-2 gap-2">
        <Select value={String(a)} onValueChange={(v)=>setA(Number(v))}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent>
        </Select>
        <Select value={String(b)} onValueChange={(v)=>setB(Number(v))}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
        <div>
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-xs opacity-70">Overall</div>
        </div>
        <div className="text-sm font-medium">{labelMap[label]}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs opacity-70">
        <div>Base: {parts.base}</div>
        <div>Q: {parts.questionnaire}</div>
      </div>
    </Section>
  );
}

function LoveCalcPage(){
  const { t } = useI18n();
  const [a, setA] = useState(0); const [b,setB]=useState(0);
  const [nameA,setNameA]=useState(""); const [nameB,setNameB]=useState("");
  const pseudo = useMemo(()=>{ const seed = (nameA.length*7 + nameB.length*13 + a*11 + b*17) % 101; return seed; }, [a,b,nameA,nameB]);
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("loveCalc")} icon={HeartHandshake}>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder={`${t("name")} A`} value={nameA} onChange={e=>setNameA(e.target.value)} className="rounded-xl"/>
          <Input placeholder={`${t("name")} B`} value={nameB} onChange={e=>setNameB(e.target.value)} className="rounded-xl"/>
          <Select value={String(a)} onValueChange={(v)=>setA(Number(v))}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder={t("sign")} /></SelectTrigger>
            <SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent>
          </Select>
          <Select value={String(b)} onValueChange={(v)=>setB(Number(v))}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder={t("sign")} /></SelectTrigger>
            <SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
          <div className="text-3xl font-bold">{pseudo}</div>
          <div className="text-xs opacity-70">{t("overallScore")}</div>
        </div>
      </Section>
    </div>
  );
}

function DiaryPage({ state, setState }){
  const { t } = useI18n();
  const [a, setA] = useState(""); const [b, setB] = useState("");
  function syncScore(){
    const wa = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
    const wb = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
    const inter = [...wa].filter(x=>wb.has(x)).length;
    const union = new Set([...wa, ...wb]).size || 1;
    return Math.round((inter/union)*100);
  }
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("diary")} icon={NotebookPen}>
        <Textarea placeholder="Partner A – denní poznámka" value={a} onChange={e=>setA(e.target.value)} />
        <Textarea placeholder="Partner B – denní poznámka" value={b} onChange={e=>setB(e.target.value)} />
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
          <div className="text-3xl font-bold">{syncScore()}</div>
          <div className="text-xs opacity-70">Sync score</div>
        </div>
      </Section>
    </div>
  );
}

function DateGeneratorPage(){
  const { t } = useI18n();
  const [a, setA] = useState(0); const [b,setB]=useState(0);
  const [style,setStyle] = useState("cozy");
  const idea = useMemo(()=>{
    const pair = `${SIGNS[a]}-${SIGNS[b]}`;
    const base = {
      cozy: `Domácí večer: vařte společně něco z dětství, ${pair} milují pohodlí.`,
      adventure: `Mini výprava: západ slunce a piknik v parku – ${pair} potřebují jiskru.`,
      culture: `Galerie + káva: ${pair} načerpají inspiraci a mluví o snech.`,
    };
    return base[style];
  },[a,b,style]);
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("dateIdeas")} icon={Sparkles}>
        <div className="grid grid-cols-2 gap-2">
          <Select value={String(a)} onValueChange={(v)=>setA(Number(v))}><SelectTrigger className="rounded-xl"><SelectValue/></SelectTrigger><SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent></Select>
          <Select value={String(b)} onValueChange={(v)=>setB(Number(v))}><SelectTrigger className="rounded-xl"><SelectValue/></SelectTrigger><SelectContent>{SIGNS.map((s,i)=>(<SelectItem key={s} value={String(i)}>{s}</SelectItem>))}</SelectContent></Select>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="rounded-xl"><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="cozy">Cozy</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-3 rounded-xl bg-muted text-sm">{idea}</div>
      </Section>
    </div>
  );
}

function GamesPage(){
  const { t } = useI18n();
  const [answers,setAnswers]=useState({q1:0,q2:0,q3:0});
  const score = Math.round(((answers.q1+answers.q2+answers.q3)/12)*100);
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("games")} icon={Gamepad2}>
        <div className="space-y-3">
          <div>
            <div className="text-sm">Kdo plánuje rande častěji?</div>
            <Slider value={[answers.q1]} max={4} step={1} onValueChange={([v])=>setAnswers(a=>({...a,q1:v}))}/>
          </div>
          <div>
            <div className="text-sm">Kdo je spontánnější?</div>
            <Slider value={[answers.q2]} max={4} step={1} onValueChange={([v])=>setAnswers(a=>({...a,q2:v}))}/>
          </div>
          <div>
            <div className="text-sm">Kdo vyřeší konflikt rychleji?</div>
            <Slider value={[answers.q3]} max={4} step={1} onValueChange={([v])=>setAnswers(a=>({...a,q3:v}))}/>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted mt-2">
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-xs opacity-70">Game insight</div>
        </div>
      </Section>
    </div>
  );
}

function ConnectionMapPage({ state }){
  const { t } = useI18n();
  const nodes = state.profiles;
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("map")} icon={MapPin}>
        <div className="w-full h-64 bg-muted rounded-xl relative overflow-hidden">
          {nodes.map((n, i)=>{
            const x = (i*77)%260; const y = (i*53)%200;
            return (
              <div key={n.id} className="absolute px-2 py-1 bg-white rounded-xl border text-xs" style={{left:x, top:y}}>{n.name} • {SIGNS[n.sign]}</div>
            );
          })}
          {/* simple lines could be added with SVG, omitted for brevity */}
        </div>
        <p className="text-xs opacity-70">Add more profiles to see the network grow.</p>
      </Section>
    </div>
  );
}

function ForecastPage(){
  const { t } = useI18n();
  const timelines = ["This week: focus on small kindnesses.","Next month: plan a short trip.","In 3 months: align on a shared goal."];
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("forecast")} icon={LineChart}>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {timelines.map((x,i)=>(<li key={i}>{x}</li>))}
        </ul>
      </Section>
    </div>
  );
}

function PremiumPage(){
  const { t } = useI18n();
  function goCheckout(){
    // Replace with real Stripe/LemonSqueezy link
    window.location.href = "https://example.com/checkout";
  }
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("premium")} icon={ShieldCheck}>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Full synastry breakdown</li>
          <li>Unlimited profiles</li>
          <li>Advanced matching toggles</li>
          <li>Ad-free</li>
        </ul>
        <div className="flex gap-2 pt-2">
          <Button className="rounded-xl" onClick={goCheckout}>{t("upgrade")}</Button>
          <Button className="rounded-xl" variant="secondary"><Gift className="h-4 w-4 mr-2"/>{t("buyGift")}</Button>
        </div>
      </Section>
    </div>
  );
}

function SettingsPage({ state, setState, lang, setLang }){
  const { t } = useI18n();
  return (
    <div className="p-4 pb-24 space-y-4">
      <Section title={t("settings")} icon={Settings}>
        <div className="flex items-center justify-between">
          <div className="text-sm">{t("language")}</div>
          <Select value={lang} onValueChange={(v)=>setLang(v)}>
            <SelectTrigger className="rounded-xl w-40"><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="cs">Čeština</SelectItem>
              <SelectItem value="sk">Slovenčina</SelectItem>
              <SelectItem value="pl">Polski</SelectItem>
              <SelectItem value="hu">Magyar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">{t("notifications")}</div>
          <Switch checked={state.notifications} onCheckedChange={(v)=> setState(s=>({...s, notifications:v}))} />
        </div>
      </Section>
    </div>
  );
}

function StaticPage({ title, icon:Icon, children }){
  return (<div className="p-4 pb-24 space-y-4"><Section title={title} icon={Icon}>{children}</Section></div>);
}

const PAGES = [
  { id: "home", titleKey: "today", icon: Home, component: HomePage },
  { id: "daily", titleKey: "daily", icon: CalendarDays, component: DailyPage },
  { id: "compatibility", titleKey: "compatibility", icon: HeartHandshake, component: CompatibilityPage },
  { id: "loveCalc", titleKey: "loveCalc", icon: Sparkles, component: LoveCalcPage },
  { id: "questionnaire", titleKey: "questionnaire", icon: NotebookPen, component: QuestionnairePage },
  { id: "profiles", titleKey: "profiles", icon: Users, component: ProfilesPage },
  { id: "matches", titleKey: "matches", icon: Zap, component: MatchesPage },
  { id: "diary", titleKey: "diary", icon: NotebookPen, component: DiaryPage },
  { id: "dateIdeas", titleKey: "dateIdeas", icon: Sparkles, component: DateGeneratorPage },
  { id: "games", titleKey: "games", icon: Gamepad2, component: GamesPage },
  { id: "map", titleKey: "map", icon: MapPin, component: ConnectionMapPage },
  { id: "forecast", titleKey: "forecast", icon: LineChart, component: ForecastPage },
  { id: "premium", titleKey: "premium", icon: ShieldCheck, component: PremiumPage },
  { id: "settings", titleKey: "settings", icon: Settings, component: SettingsPage },
  { id: "about", titleKey: "about", icon: Info, component: (p)=> <StaticPage title={p.t("about")} icon={Info}><p className="text-sm">{p.t("demoText")}</p></StaticPage> },
  { id: "help", titleKey: "help", icon: HelpCircle, component: (p)=> <StaticPage title={p.t("help")} icon={HelpCircle}><p className="text-sm">FAQ…</p></StaticPage> },
  { id: "privacy", titleKey: "privacy", icon: ShieldCheck, component: (p)=> <StaticPage title={p.t("privacy")} icon={ShieldCheck}><p className="text-sm">Privacy policy placeholder.</p></StaticPage> },
  { id: "terms", titleKey: "terms", icon: ShieldCheck, component: (p)=> <StaticPage title={p.t("terms")} icon={ShieldCheck}><p className="text-sm">Terms placeholder.</p></StaticPage> },
  { id: "onboarding", titleKey: "onboarding", icon: Sparkles, component: (p)=> <StaticPage title={p.t("onboarding")} icon={Sparkles}><p className="text-sm">Onboarding tips.</p></StaticPage> },
  { id: "contact", titleKey: "contact", icon: MessageCircle, component: (p)=> <StaticPage title={p.t("contact")} icon={MessageCircle}><p className="text-sm">Email us…</p></StaticPage> },
  { id: "export", titleKey: "export", icon: Download, component: (p)=> <StaticPage title={p.t("export")} icon={Download}><p className="text-sm">Export coming soon.</p></StaticPage> },
  { id: "mood", titleKey: "mood", icon: SunMedium, component: (p)=> <StaticPage title={p.t("mood")} icon={SunMedium}><p className="text-sm">Mood tracker.</p></StaticPage> },
];

function usePage(){
  const [page, setPage] = useState("home");
  useEffect(()=>{
    const applyHash = ()=>{ const id = window.location.hash.replace('#',''); if(PAGES.find(p=>p.id===id)) setPage(id); };
    window.addEventListener('hashchange', applyHash); applyHash();
    return ()=> window.removeEventListener('hashchange', applyHash);
  },[]);
  useEffect(()=>{ if(window.location.hash!==`#${page}`) window.location.hash = `#${page}`; },[page]);
  return [page, setPage];
}

export default function App(){
  const [lang, setLang] = useState("cs");
  const t = (k)=> dictionaries[lang]?.[k] ?? k;
  const i18nValue = { lang, setLang, t };
  const [state, setState] = useLocalState({
    answers: { lifestyle:2, communication:2, intimacy:2, future:2, conflict:2 },
    profiles: [], notifications: true,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = usePage();
  function handleQuestionnaireFinished(ans){ setState(s=> ({...s, answers: ans})); setCurrent("matches"); }
  const pageMeta = PAGES.find(p=>p.id===current) ?? PAGES[0];
  const PageComp = pageMeta.component;

  return (
    <I18nContext.Provider value={i18nValue}>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-foreground">
        <TopBar onOpenMenu={()=>setMenuOpen(true)} />
        <main className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.2}}>
              {typeof PageComp === 'function' ? (
                <PageComp
                  state={state}
                  setState={setState}
                  onFinished={handleQuestionnaireFinished}
                  t={t} lang={lang} setLang={setLang}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav current={current} setCurrent={setCurrent} />
        <Drawer open={menuOpen} onClose={()=>setMenuOpen(false)} title={t("menu")}>
          <nav className="grid gap-1">
            {PAGES.map(p=>{
              const Icon = p.icon;
              return (
                <button key={p.id} onClick={()=>{ setCurrent(p.id); setMenuOpen(false); }} className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted text-left ${current===p.id? 'bg-muted':''}`}>
                  <Icon className="h-4 w-4"/><span className="text-sm">{t(p.titleKey) ?? p.id}</span><ChevronRight className="ml-auto h-4 w-4 opacity-70"/>
                </button>
              );
            })}
          </nav>
        </Drawer>
      </div>
    </I18nContext.Provider>
  );
}
