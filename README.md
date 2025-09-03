# AI Personal Finance Guide

A simple personal finance dashboard built with HTML, Tailwind CSS, and vanilla JavaScript.  
Track your income and expenses, view statistics, and get smart advice on your spending habits.

---

## Features

- **Add Transactions:** Record income and expenses with category, date, and notes.
- **Dashboard:** See your total balance, earnings, and expenses.
- **Statistics:** Interactive pie chart of your finances (powered by Chart.js).
- **AI Advice:** Get actionable advice based on your spending and saving patterns.
- **Transaction History:** View and delete past transactions.
- **Responsive UI:** Built with Tailwind CSS for a modern look.

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Samruddhi1304/Ai-personal-finance-tracker.git
   ```

2. **Install dependencies (for Tailwind build):**
   ```sh
   npm install
   ```

3. **Build Tailwind CSS:**
   ```sh
   npm run dev
   ```
   This will generate `dist/output.css`.

4. **Open the app:**
   - Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code, or
   - Open `index.html` directly in your browser.

---

## How Advice Works

- The advice is generated using a simple rule-based function in [`js/ai.js`](js/ai.js).
---

## Project Structure

```
├── index.html
├── dist/
│   └── output.css
├── js/
│   ├── main.js
│   ├── ai.js
│   └── transactions.js
├── tailwind.config.js
├── package.json
```

---

## Customization

- The advice logic is rule-based and can be adjusted in `generateAdvice()` in `ai.js`.
- If you want to use real AI advice (OpenAI), see the comments in `ai.js` for a sample API call (for local/demo use only).

---

## Credits

- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## Live Demo

Check out the live app here: https://ai-personal-finance-tracker-bay.vercel.app/
