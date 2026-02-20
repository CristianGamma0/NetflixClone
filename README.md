# Netflix Clone - React + PocketBase

Un clone di Netflix completo e funzionale costruito con React e PocketBase, che integra l'API di TMDB (The Movie Database) per contenuti cinematografici e televisivi in tempo reale.

![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)
![PocketBase](https://img.shields.io/badge/PocketBase-0.26.8-b8dbe4)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38bdf8?logo=tailwindcss)

## 📋 Caratteristiche Principali

### 🔐 Autenticazione e Gestione Profili
- **Sistema di autenticazione completo** con registrazione e login
- **Multi-profilo per utente** (come Netflix reale)
- **Profili bambini** con contenuti filtrati
- **Avatar personalizzabili** con selezione visiva
- **Profilo predefinito** automatico per accesso rapido

### 🎬 Contenuti TMDB
- **Catalogo completo** di film e serie TV tramite TMDB API
- **Categorie multiple**:
  - Film popolari
  - Trending della settimana
  - Film più votati
  - Serie TV popolari
  - Film in arrivo
  - Nuovi e popolari
- **Dettagli completi** per ogni contenuto (cast, trailer, generi, votazioni)
- **Immagini ad alta qualità** (poster, backdrop)

### 📝 Sistema di Recensioni
- **Valutazioni a stelle** (1-5 stelle)
- **Commenti testuali** fino a 1000 caratteri
- **Review pubbliche/private**
- **Indicazione spoiler**
- **Sistema di like** per le recensioni
- **Contatore like** in tempo reale

### 📚 Watchlist Personalizzata
- **Aggiungi/rimuovi** contenuti dalla watchlist
- **Watchlist per profilo** (ogni profilo ha la sua)
- **Pagina dedicata** per visualizzare la watchlist
- **Sincronizzazione automatica** con il database

### 🎨 Interfaccia Utente
- **Design ispirato a Netflix** con UI moderna
- **Animazioni fluide** e transizioni smooth
- **Responsive design** per tutti i dispositivi
- **Componenti Material-UI** per una UX professionale
- **Icone Lucide React** per un look moderno

## 🛠️ Stack Tecnologico

### Frontend
- **React 19.2.0** - Libreria UI con React Compiler
- **Vite 7.2.4** - Build tool ultra-veloce
- **React Router DOM 7.13.0** - Navigazione SPA
- **TanStack Query 5.90.21** - Gestione stato server e caching
- **TailwindCSS 3.4.19** - Utility-first CSS framework
- **Material-UI 7.3.7** - Componenti UI professionali
- **Lucide React** - Libreria di icone moderne

### Backend
- **PocketBase 0.26.8** - Backend as a Service (BaaS)
- **SQLite** - Database embedded (tramite PocketBase)
- **Real-time subscriptions** - Aggiornamenti live

### API Esterne
- **TMDB API** - Database di film e serie TV

## 📁 Struttura del Progetto

```
Netflix/
├── src/
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── auth/           # Modal di autenticazione
│   │   ├── featured/       # Contenuto in evidenza
│   │   ├── list/           # Liste di contenuti
│   │   ├── listItem/       # Elemento singolo lista
│   │   ├── navbar/         # Barra di navigazione
│   │   ├── profiles/       # Gestione profili
│   │   ├── reviews/        # Sistema recensioni
│   │   └── watchlist/      # Pulsante watchlist
│   ├── contexts/           # Context API React
│   │   └── AuthContext.jsx # Gestione autenticazione
│   ├── hooks/              # Custom React Hooks
│   │   ├── useProfiles.js  # Gestione profili
│   │   ├── useReviews.js   # Gestione recensioni
│   │   ├── useTMDBQueries.js # Query TMDB
│   │   └── useWatchlist.js # Gestione watchlist
│   ├── pages/              # Pagine principali
│   │   ├── Details.jsx     # Dettagli film/serie
│   │   └── Watchlist.jsx   # Pagina watchlist
│   ├── config/             # Configurazioni
│   │   ├── pocketbase.js   # Client PocketBase
│   │   └── tmdb.js         # Configurazione TMDB
│   ├── home/               # Homepage
│   └── App.jsx             # Componente root
├── pb/                      # Backend PocketBase
│   ├── pb_data/            # Database e storage
│   ├── pb_migrations/      # Migrazioni database
│   └── pb_schema.json      # Schema database
└── public/                 # Asset statici
```

## 🗄️ Schema Database (PocketBase)

### Collections

#### **users** (Auth Collection)
- `id` - ID utente (15 caratteri)
- `email` - Email unica
- `password` - Password hashata
- `name` - Nome utente
- `avatar` - Immagine profilo
- `verified` - Email verificata
- `created` / `updated` - Timestamp

#### **profiles** (Base Collection)
- `id` - ID profilo
- `user` - Relazione con users
- `name` - Nome profilo (max 50 caratteri)
- `avatar_url` - URL avatar
- `avatar` - Immagine avatar
- `is_kids` - Profilo bambini (boolean)
- `language` - Lingua (it-IT, en-US, es-ES, fr-FR, de-DE)
- `is_default` - Profilo predefinito (boolean)

#### **watchlist** (Base Collection)
- `id` - ID watchlist item
- `profile` - Relazione con profiles
- `tmdb_id` - ID contenuto TMDB
- `media_type` - Tipo (movie/tv)
- `title` - Titolo
- `poster_path` - Path poster
- `backdrop_path` - Path backdrop
- `overview` - Descrizione
- `vote_average` - Voto medio (0-10)
- `release_date` - Data di rilascio
- `created` - Data aggiunta

#### **reviews** (Base Collection)
- `id` - ID recensione
- `profile` - Relazione con profiles
- `tmdb_id` - ID contenuto TMDB
- `media_type` - Tipo (movie/tv)
- `rating` - Valutazione (1-5)
- `comment` - Commento (max 1000 caratteri)
- `title` - Titolo contenuto
- `poster_path` - Path poster
- `is_spoiler` - Contiene spoiler (boolean)
- `is_public` - Recensione pubblica (boolean)
- `likes` - Numero di likes

#### **review_likes** (Base Collection)
- `id` - ID like
- `review` - Relazione con reviews
- `profile` - Relazione con profiles
- **Unique constraint**: (review, profile)

## 🚀 Installazione e Configurazione

### Prerequisiti
- Node.js 18+ installato
- PocketBase scaricato

### 1. Setup Frontend

```bash
# Clona il repository
git clone <repository-url>

# Naviga nella cartella Netflix
cd Netflix

# Installa le dipendenze
npm install
```

### 2. Configurazione TMDB API

1. Registrati su [TMDB](https://www.themoviedb.org/)
2. Ottieni una API key da [API Settings](https://www.themoviedb.org/settings/api)
3. Aggiorna `src/config/tmdb.js` con la tua API key:

```javascript
export const TMDB_API_KEY = 'la-tua-api-key';
```

### 3. Setup Backend PocketBase

```bash
# Naviga nella cartella pb
cd ../pb

# Avvia PocketBase (Windows)
pocketbase serve

# O su Linux/Mac
./pocketbase serve
```

PocketBase sarà disponibile su `http://127.0.0.1:8090`

### 4. Configurazione Database

Le migrazioni del database sono già incluse nella cartella `pb_migrations/` e verranno applicate automaticamente al primo avvio di PocketBase.

Se necessario, puoi accedere all'admin UI di PocketBase su `http://127.0.0.1:8090/_/` per:
- Visualizzare le collections
- Modificare le regole di accesso
- Gestire i dati

### 5. Avvio Applicazione

```bash
# Torna alla cartella Netflix
cd ../Netflix

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## 📱 Utilizzo

### Primo Accesso
1. Registrati con email e password
2. Crea il tuo primo profilo con avatar e nome
3. Inizia a esplorare il catalogo!

### Navigazione
- **Homepage** - Sfoglia categorie di film e serie TV
- **Dettagli** - Clicca su un contenuto per vedere dettagli, cast, trailer
- **Watchlist** - Aggiungi contenuti alla tua lista personale
- **Recensioni** - Valuta e commenta i contenuti
- **Profili** - Cambia profilo dal menu navbar

## 🔧 Script Disponibili

```bash
# Sviluppo
npm run dev

# Build produzione
npm run build

# Anteprima build
npm run preview

# Linting
npm run lint
```

## 🔒 Sicurezza e Privacy

### Regole di Accesso PocketBase

- **users**: Gli utenti possono vedere e modificare solo i propri dati
- **profiles**: Ogni utente gestisce solo i propri profili
- **watchlist**: Privata per profilo, visibile solo al proprietario
- **reviews**: Pubbliche se impostate, altrimenti private
- **review_likes**: Visibili solo agli utenti autenticati

### Autenticazione
- Password hashate con bcrypt tramite PocketBase
- Token JWT per sessioni
- Durata token: 7 giorni (configurabile)

## 🎯 Funzionalità Avanzate

### Caching Intelligente
TanStack Query gestisce automaticamente:
- **Cache time**: 10 minuti
- **Stale time**: 5 minuti
- **Retry**: 1 tentativo in caso di errore
- **Refetch on focus**: Disabilitato per migliori performance

### Real-time Updates
Le modifiche al database (watchlist, reviews) si sincronizzano automaticamente grazie a:
- Query invalidation di TanStack Query
- Ottimistic updates per UI reattiva

## 📝 API TMDB Utilizzate

- `/movie/popular` - Film popolari
- `/trending/all/week` - Trending settimanali
- `/movie/top_rated` - Film top rated
- `/tv/popular` - Serie TV popolari
- `/movie/upcoming` - Film in arrivo
- `/movie/{id}` - Dettagli film
- `/tv/{id}` - Dettagli serie TV
- `/movie/{id}/credits` - Cast e crew
- `/movie/{id}/videos` - Trailer e video

## 🤝 Contribuire

Contributi, issue e feature request sono benvenuti!

## 📄 License

Questo progetto è rilasciato sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.

---

**Note**: Ricorda di non committare mai la tua TMDB API key in un repository pubblico. Usa variabili d'ambiente in produzione.