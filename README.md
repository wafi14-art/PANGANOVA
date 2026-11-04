## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **UI Runtime:** React 19
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Custom Editorial Design Tokens)
- **Visualizations:** Recharts
- **Iconography:** Lucide React
- **Data Pipeline:** Python (Standard Library — zero external dependency)
- **Package Manager:** npm

## Getting Started

1. **Jalankan Pipeline Data & Validasi Integritas:**
   ```bash
   python scripts/clean_and_validate.py
   python -m unittest -v tests/test_data_integrity.py
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Akses antarmuka di `http://localhost:3000`.

3. **Production Build & Typecheck:**
   ```bash
   npm run build
   ```