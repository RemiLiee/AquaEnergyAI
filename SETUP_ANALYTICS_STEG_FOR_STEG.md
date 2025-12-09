# 📊 Google Analytics Setup - Steg for Steg Guide

## 🎯 Mål: Få din Measurement ID (G-XXXXXXXXXX) og legg den til i Vercel

---

## STEG 1: Logg inn på Google Analytics

1. **Gå til**: https://analytics.google.com/
2. **Logg inn** med din Google-konto (eller opprett en hvis du ikke har)
3. Du vil se en innloggingsside - skriv inn e-post og passord

---

## STEG 2: Start opprettelse av Property

Etter innlogging vil du se en av disse skjermene:

### Scenario A: Du har ingen properties ennå
- Du vil se en knapp som sier **"Start measuring"** eller **"Get started"**
- Klikk på den

### Scenario B: Du har allerede properties
- Klikk på **"Admin"** (tannhjul-ikonet) nederst til venstre
- I kolonnen **"Property"** → Klikk **"Create Property"**

---

## STEG 3: Fyll ut Property-detaljer

Du vil nå se et skjema. Fyll ut:

```
Property name: AquaEnergy AI
Reporting time zone: (UTC+01:00) Oslo
Currency: Norwegian Krone (NOK)
```

**Klikk "Next"**

---

## STEG 4: Velg Business Information

1. **Industry category**: 
   - Velg **"Technology"** eller **"Other"**

2. **Business size**: 
   - Velg **"Small"** eller **"Medium"**

3. **How you intend to use Google Analytics**: 
   - ✅ **Measure customer engagement with your site**
   - ✅ **Measure conversions (purchases, sign-ups, etc.)**

**Klikk "Create"**

---

## STEG 5: Godta vilkår

1. Les vilkårene (valgfritt, men anbefalt)
2. **Klikk "I Accept"** eller **"Accept"**

---

## STEG 6: Opprett Web Stream

Du vil nå se en side som spør om "Data streams". 

1. **Klikk på "Web"** (ikke iOS eller Android)

2. Fyll ut skjemaet:
   ```
   Website URL: https://aquaenergyai.com
   Stream name: AquaEnergy AI Website
   ```

3. **Klikk "Create stream"**

---

## STEG 7: 🔑 KOPIER MEASUREMENT ID (VIKTIG!)

Etter å ha opprettet stream, vil du se en side med:

```
Measurement ID
G-XXXXXXXXXX
```

**Dette er det viktigste!**

1. **Kopier hele Measurement ID-en** (f.eks. `G-ABC123XYZ`)
2. **Lim den inn i en notatblokk** eller et dokument så du ikke mister den
3. **Dette er ID-en du trenger for Vercel!**

---

## STEG 8: Legg til i Vercel

### 8a. Gå til Vercel Dashboard

1. **Åpne**: https://vercel.com/dashboard
2. **Logg inn** hvis du ikke allerede er innlogget
3. **Velg prosjektet ditt** (sannsynligvis "AquaEnergy-AI" eller lignende)

### 8b. Gå til Environment Variables

1. **Klikk på "Settings"** i toppmenyen
2. I venstremenyen, **klikk på "Environment Variables"**

### 8c. Legg til ny variabel

1. **Klikk på "Add New"** (eller "Add" knappen)

2. Fyll ut skjemaet:
   ```
   Key: NEXT_PUBLIC_GA_ID
   Value: [Lim inn din Measurement ID her, f.eks. G-ABC123XYZ]
   Environment: 
     ✅ Production
     ✅ Preview
     ✅ Development
   ```

3. **Klikk "Save"**

---

## STEG 9: Redeploy nettsiden

1. Gå til **"Deployments"** i toppmenyen
2. Finn den **siste deploymenten** (øverst i listen)
3. **Klikk på de tre prikkene (⋯)** til høyre for deploymenten
4. **Klikk "Redeploy"**
5. **Vent 2-3 minutter** til deployment er ferdig

---

## STEG 10: Test at det fungerer ✅

### Metode 1: Browser Developer Tools

1. **Gå til**: https://aquaenergyai.com
2. **Trykk F12** (åpne Developer Tools)
3. Gå til **"Network"**-fanen
4. **Filtrer på "gtag"** eller **"analytics"**
5. **Du skal se requests til `google-analytics.com`** ✅

### Metode 2: Google Tag Assistant

1. **Installer** [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension
2. **Gå til nettsiden din**
3. **Klikk på Tag Assistant-ikonet** i browseren
4. **Du skal se at Google Analytics er aktivert** ✅

---

## 🎉 FERDIG!

Nå har du:
- ✅ Google Analytics property opprettet
- ✅ Measurement ID lagt til i Vercel
- ✅ Nettsiden redeployet
- ✅ Analytics aktivert og fungerende

---

## ❓ Troubleshooting

### Analytics fungerer ikke?
- ✅ Sjekk at `NEXT_PUBLIC_GA_ID` er lagt til i Vercel
- ✅ Sjekk at du har redeployet etter å ha lagt til variabelen
- ✅ Sjekk at Measurement ID starter med `G-`
- ✅ Sjekk browser console for feilmeldinger (F12)

### Cookie-banner vises ikke?
- ✅ Slett cookies i nettleseren og last siden på nytt
- ✅ Sjekk at `CookieBanner` komponenten er importert i `layout.tsx`

### Data vises ikke i Google Analytics?
- ✅ Det kan ta **24-48 timer** før data vises
- ✅ Sjekk at du har valgt riktig property i Google Analytics
- ✅ Test med Google Tag Assistant for å verifisere at tracking fungerer

---

## 📞 Trenger du hjelp?

Hvis du støter på problemer, sjekk:
- [Google Analytics Hjelp](https://support.google.com/analytics)
- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Neste steg**: Følg guiden over, og når du har Measurement ID-en, legg den til i Vercel! 🚀

