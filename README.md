# 🇮🇳 YojanaMitra

> Find the government schemes you qualify for in 2 minutes, in Hindi and English.

YojanaMitra is a web app that matches citizens to central and state government schemes using **verified eligibility rules**, then explains the results in simple language. Answer 6 simple questions and get: which schemes you qualify for, **why** you qualify, the documents you need, and how to apply.

Built for **[Hackathon Name]** by **[Team Name]**.

---

## The Problem

India has hundreds of welfare schemes (scholarships, pensions, health cover, farmer support, housing, loans), but many eligible people never claim them. They don't know a scheme exists, can't tell whether they qualify, and get lost in English-heavy portals and paperwork.

## The Solution

1. Pick your language (Hindi or English).
2. Answer 6 simple questions.
3. Get matched schemes with a plain-language **"Why you qualify"**.
4. See the documents checklist, step-by-step application guide, and the official link.

## Key Features

- **Hindi + English** interface and explanations
- **Rule-based matching:** eligibility is decided by code, not AI guesses
- **AI-powered explanations:** an LLM only rewrites results in simple language
- **"Why you qualify"** for every result
- **Documents checklist** and application steps per scheme
- **Official source link** and "last verified" date on each scheme
- **Voice input** (browser Web Speech API) *(if enabled)*
- **CSC Mode** for operators who help others check eligibility *(if enabled)*
- **No login, no stored personal data**

## How It Works

```
User picks language
      ↓
Answers 6 questions (age, state, income, occupation, gender, category)
      ↓
Frontend sends profile → POST /match
      ↓
Backend filters schemes.json using eligibility rules
      ↓
Matched schemes → LLM explains in simple language
      ↓
Results: scheme cards + why you qualify
      ↓
Details: documents + steps to apply + official link
```

> **Rules decide eligibility. AI only explains.** If the LLM is unavailable, the app falls back to a template-based explanation.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript *(or React)* |
| Backend | Python, FastAPI |
| Data | `schemes.json` (no database) |
| AI | LLM API for explanations |
| Voice | Web Speech API |

## Project Structure

> Adjust to match your actual folders.

```
yojanamitra/
├── backend/
│   ├── main.py            # FastAPI app and /match endpoint
│   ├── matcher.py         # Rule-based eligibility logic
│   ├── explain.py         # LLM explanation + fallback template
│   ├── schemes.json       # Scheme data (with sources)
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── docs/
│   └── prd.md
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.10+
- An LLM API key (optional; the app works with fallback explanations without it)

### 1. Clone the repo
```bash
git clone https://github.com/[your-username]/yojanamitra.git
cd yojanamitra
```

### 2. Set up the backend
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Add your API key
Copy the example file and fill it in:
```bash
cp ../.env.example .env
```
```env
LLM_API_KEY=your_api_key_here
```
> Never commit your `.env` file. Make sure it is listed in `.gitignore`.

### 4. Run the backend
```bash
uvicorn main:app --reload
```
The API runs at `http://localhost:8000`. Interactive docs are at `http://localhost:8000/docs`.

### 5. Run the frontend
Open `frontend/index.html` in your browser, or serve it locally:
```bash
cd ../frontend
python -m http.server 5500
```
Then visit `http://localhost:5500`.

## API

### `POST /match`

**Request**
```json
{
  "language": "hi",
  "age": 45,
  "state": "Uttar Pradesh",
  "income": 150000,
  "occupation": "farmer",
  "gender": "male",
  "category": "obc"
}
```

**Response**
```json
{
  "count": 4,
  "results": [
    {
      "id": "scheme_001",
      "name": "Scheme Name",
      "benefit_summary": "...",
      "why_you_qualify": "...",
      "documents": ["..."],
      "apply_steps": ["..."],
      "apply_link": "https://...",
      "last_verified": "YYYY-MM-DD"
    }
  ]
}
```

### `GET /health`
Returns `{"status": "ok"}`.

## Scheme Data

Each scheme in `schemes.json` follows this structure:

```json
{
  "id": "scheme_001",
  "name": "Scheme Name",
  "name_hi": "योजना का नाम",
  "category": "farmer",
  "benefit_summary": "Short description",
  "eligibility": {
    "min_age": 18,
    "max_age": 60,
    "max_income": 200000,
    "states": ["all"],
    "occupations": ["farmer"],
    "genders": ["all"],
    "categories": ["all"]
  },
  "documents": ["Aadhaar", "Land record"],
  "apply_steps": ["Step 1", "Step 2"],
  "apply_link": "official portal URL",
  "source": "official source URL",
  "last_verified": "YYYY-MM-DD"
}
```

**Adding a scheme:** copy an entry, fill the values from the **official scheme page or [myScheme.gov.in](https://www.myscheme.gov.in)**, and set `last_verified` to today's date.

## Testing

Run the test profiles against the matcher:
```bash
cd backend
pytest
```
*(Add your test file, e.g. `test_matcher.py`, with hand-verified profiles and edge cases such as exact age and income boundaries.)*

## Privacy

- No login or accounts
- Profile data is processed per request and **not stored**
- Do not enter real Aadhaar or other sensitive IDs. The app never asks for them.

## Disclaimer

YojanaMitra is an informational tool and **not an official government service**. Eligibility rules change, so always confirm details on the official scheme portal before applying. Each scheme shows its source link and last verified date.

## Roadmap

- [x] Rule-based matching engine
- [x] Hindi + English
- [ ] More states and regional languages
- [ ] WhatsApp bot for low-bandwidth users
- [ ] "Nearly eligible" suggestions
- [ ] Admin panel for verified scheme updates
- [ ] Partnerships with CSCs, NGOs, and panchayats

## Team

| Name | Role |
|---|---|
| [Name 1] | Backend |
| [Name 2] | Frontend |
| [Name 3] | Data and research |
| [Name 4] | Pitch and testing |

## License

[MIT License](LICENSE) *(or your choice)*

---

⭐ If this project helps you, give it a star.
