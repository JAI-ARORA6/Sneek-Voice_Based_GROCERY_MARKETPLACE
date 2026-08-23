# 🎙️ Voice Command Shopping Assistant

An intelligent, voice-powered shopping list manager equipped with client-side Natural Language Processing (NLP), smart suggestions (restock history, seasonal recommendations, health & eco substitutes), voice-activated catalog search & price filtering, and a modern glassmorphic interface.

---

## 📝 Approach Write-Up (Technical Assessment Summary - 200 Words Max)

> **Approach & Architecture Summary:**
> **Approach & Architecture Summary:**
> 
> To build an intelligent, candidate-grade Voice Command Shopping Assistant, I designed a client-side architecture using **React 18**, **Vite**, and the **Web Speech API** (`SpeechRecognition` & `SpeechSynthesis`). 
> 
> The core engine features a custom **Natural Language Processing (NLP)** pipeline with:
> 1. **Phonetic Speech-to-Text Correction**: Fixes STT misspellings and accents (e.g., *"doloor"* ➔ *"dollar"*, *"stwawbery"* ➔ *"strawberry"*, *"mik"* ➔ *"milk"*).
> 2. **Semantic Category Synonym Expansion**: Resolves queries like *"fruits"* or *"dairy"* to matching product tags (e.g., Bananas, Avocados, Sweet Corn).
> 3. **Flexible Intent & Entity Extraction**: Parses intents (`ADD_ITEM`, `REMOVE_ITEM`, `SEARCH_FILTER`, `CLEAR_LIST`) with automatic quantity deduction (e.g., *"remove 5 milk from it"* reduces 85 ➔ 80), price thresholds (*"under $3"*), and unit prefix stripping across 5 languages.
> 
> The **Smart Recommendation System** generates Restock Frequency Alerts, Seasonal Produce highlights, and Health/Eco Substitutes (e.g., Almond Milk for Whole Milk). A glassmorphic UI with audio visualizers and a 1-click test suite ensures 100% testability for assessors.

---

## ✨ Features Implemented

### 1. Voice Input & Multilingual Recognition
- **Voice Command Recognition**: Real-time microphone listening using HTML5 `SpeechRecognition` with live waveform animations.
- **Flexible Natural Language Processing (NLP)**: Understands varied phrasing (*"I want to buy 5 bananas"*, *"Can you put milk on my list"*, *"Remove bread"*, *"Find organic apples below $4"*).
- **Multilingual Support**: Supports 5 languages (`en-US`, `es-ES`, `fr-FR`, `de-DE`, `hi-IN`).
- **Text-to-Speech (TTS) Feedback**: Spoken audio confirmations (*"Added 2x Apples to Produce"*) with toggleable mute.

### 2. Smart Suggestions & AI Recommendations
- **Product Restock Alerts**: History-based recommendations detecting items running low.
- **Seasonal Recommendations**: In-season fruit/vegetable highlights tailored to peak harvest times.
- **Substitutes & Healthy Swaps**: Proactive alternatives (e.g., Almond/Oat Milk for Whole Milk, Whole Wheat Bread for White Bread).

### 3. Shopping List & Category Management
- **Automatic Categorization**: Sorts items into Produce, Dairy & Eggs, Bakery, Beverages, Pantry, Snacks, Personal Care.
- **Quantity & Unit Controls**: Precise parsing (e.g., *"2 bottles of water"*, *"5 oranges"*).
- **Price Estimation**: Real-time cart total calculation and item check/uncheck status.
- **Persistence**: Remembers shopping list items in `localStorage`.

### 4. Voice-Activated Search & Price Range Filtering
- **Voice Search Catalog**: Modal overlay supporting spoken queries (*"Find organic apples under $5"*).
- **Price Range Slider & Brand Filters**: Interactive filtering by maximum price, brand, and organic certification.

### 5. Modern UI / UX
- **Glassmorphic Aesthetic**: Translucent cards, smooth gradients, and backdrop blur effects.
- **Visual Feedback**: Real-time speech transcript banner, toast notifications, and animated listening pulse.
- **Mobile & Desktop Responsive**: Fits mobile screens, tablets, and desktop displays seamlessly.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/JAI-ARORA6/Sneek-Voice_Based_GROCERY_MARKETPLACE.git

# Navigate into the project folder
cd Sneek-Voice_Based_GROCERY_MARKETPLACE

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## 🛠️ Build & Cloud Deployment

### 🔑 HTTPS Requirement for Voice Recognition
> **Note**: Modern browsers (Chrome, Safari, Edge) require **HTTPS** for persistent microphone access and Web Speech API voice recognition. All cloud deployment options below provide automatic SSL/HTTPS.

### 1. Firebase Hosting (Google Cloud Platform)
Firebase Hosting provides ultra-fast global CDN delivery backed by Google Cloud Infrastructure.

```bash
# 1. Login to Firebase / GCP
npx firebase-tools login

# 2. Initialize project (select Hosting)
npx firebase-tools init hosting

# 3. Build & Deploy
npm run deploy:firebase
```

### 2. Vercel Cloud Deployment
```bash
# Deploy instantly to Vercel global edge network
npm run deploy:vercel
```

### 3. Netlify Cloud Deployment
```bash
# Deploy to Netlify CDN
npm run deploy:netlify
```

---

## 📁 Repository Structure

```
voice-command-shopping-assistant/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── VoiceMicController.jsx
    │   ├── ShoppingList.jsx
    │   ├── SmartSuggestions.jsx
    │   ├── VoiceSearchModal.jsx
    │   ├── QuickManualInput.jsx
    │   ├── AudioWaveform.jsx
    │   └── ToastNotification.jsx
    ├── data/
    │   └── mockCatalog.js
    └── services/
        ├── nlpEngine.js
        ├── voiceService.js
        └── recommendationEngine.js
```
