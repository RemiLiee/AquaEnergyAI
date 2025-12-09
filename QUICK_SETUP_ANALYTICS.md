# Rask Oppsett - Google Analytics for AquaEnergy AI

## Steg 1: Gå til Google Analytics
1. Åpne: https://analytics.google.com/
2. Logg inn med din Google-konto

## Steg 2: Opprett Property (hvis du ikke har en)
1. Klikk "Admin" (tannhjul-ikonet) nederst til venstre
2. I kolonnen "Property" → Klikk "Create Property"
3. Fyll ut:
   - **Property name**: `AquaEnergy AI`
   - **Time zone**: `(UTC+01:00) Oslo`
   - **Currency**: `Norwegian Krone (NOK)`
4. Klikk "Next"

## Steg 3: Velg Business Info
1. **Industry category**: Velg "Technology" eller "Other"
2. **Business size**: Velg "Small" eller "Medium"
3. **How you intend to use Google Analytics**: 
   - ✅ Measure customer engagement
   - ✅ Measure conversions
4. Klikk "Create"

## Steg 4: Godta vilkår
1. Les vilkårene
2. Klikk "I Accept"

## Steg 5: Opprett Web Stream
1. Velg "Web" (ikke iOS eller Android)
2. Fyll ut:
   - **Website URL**: `https://aquaenergyai.com`
   - **Stream name**: `AquaEnergy AI Website`
3. Klikk "Create stream"

## Steg 6: Kopier Measurement ID
1. Du ser nå en side med "Measurement ID"
2. Det ser ut som: `G-XXXXXXXXXX` (f.eks. `G-ABC123XYZ`)
3. **KOPIER DENNE ID-EN** - du trenger den nå!

---

## Steg 7: Legg til i Vercel

### 7a. Gå til Vercel Dashboard
1. Åpne: https://vercel.com/dashboard
2. Logg inn
3. Velg prosjektet "AquaEnergy-AI" (eller hva det heter)

### 7b. Legg til Environment Variable
1. Klikk på **Settings** (i toppmenyen)
2. Klikk på **Environment Variables** (i venstremenyen)
3. Klikk på **Add New** (eller "Add" knappen)
4. Fyll ut:
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: Lim inn din Measurement ID (f.eks. `G-ABC123XYZ`)
   - **Environment**: Velg ALLE tre:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
5. Klikk **Save**

### 7c. Redeploy
1. Gå til **Deployments** (i toppmenyen)
2. Finn den siste deploymenten
3. Klikk på de tre prikkene (⋯) til høyre
4. Klikk **Redeploy**
5. Vent 2-3 minutter til deployment er ferdig

---

## Steg 8: Test at det fungerer

### Metode 1: Browser Developer Tools
1. Gå til: https://aquaenergyai.com
2. Trykk **F12** (åpne Developer Tools)
3. Gå til **Network**-fanen
4. Filtrer på "gtag" eller "analytics"
5. Du skal se requests til `google-analytics.com` ✅

### Metode 2: Google Tag Assistant
1. Installer [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension
2. Gå til nettsiden din
3. Klikk på Tag Assistant-ikonet
4. Du skal se at Google Analytics er aktivert ✅

### Metode 3: Google Analytics Dashboard
1. Gå tilbake til Google Analytics
2. Klikk på "Reports" i venstremenyen
3. Vent 24-48 timer (data kan ta litt tid å vises)
4. Du skal se besøksdata ✅

---

## Troubleshooting

### Analytics fungerer ikke?
- ✅ Sjekk at `NEXT_PUBLIC_GA_ID` er lagt til i Vercel
- ✅ Sjekk at du har redeployet etter å ha lagt til variabelen
- ✅ Sjekk at Measurement ID starter med `G-`
- ✅ Sjekk browser console for feilmeldinger (F12)

### Cookie-banner vises ikke?
- ✅ Slett cookies i nettleseren og last siden på nytt
- ✅ Sjekk at `CookieBanner` komponenten er importert i `layout.tsx`

### Data vises ikke i Google Analytics?
- ✅ Det kan ta 24-48 timer før data vises
- ✅ Sjekk at du har valgt riktig property i Google Analytics
- ✅ Test med Google Tag Assistant for å verifisere at tracking fungerer

---

## Ferdig! 🎉

Nå har du:
- ✅ Vercel Analytics (fungerer automatisk)
- ✅ Google Analytics (krever oppsett over)
- ✅ Cookie-banner (GDPR-compliant)
- ✅ Speed Insights (automatisk)

**Neste steg**: Følg guiden over for å aktivere Google Analytics!

