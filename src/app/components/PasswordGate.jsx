import { useMemo, useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';

const LOCAL_DEMO_HASH = '8d02a490989c757704c5525d291581517214499e5631463ae2c762b5a223fcbd';

async function sha256(value) {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function PasswordGate({ children }) {
  const expectedHash = useMemo(() => import.meta.env.VITE_UI_PASSWORD_HASH || LOCAL_DEMO_HASH, []);
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('iccrom-demo-unlocked') === '1');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const hash = await sha256(password);
      if (hash === expectedHash) {
        sessionStorage.setItem('iccrom-demo-unlocked', '1');
        setUnlocked(true);
      } else {
        setError('Password not recognized.');
      }
    } finally {
      setBusy(false);
    }
  }

  if (unlocked) return children;

  return (
    <main className="gate-shell">
      <div className="gate-aurora" aria-hidden="true" />
      <section className="gate-card" aria-labelledby="gate-title">
        <div className="gate-brand">
          <span className="brand-mark">I</span>
          <strong>ICCROM</strong>
          <small>restyling concept</small>
        </div>
        <div className="gate-icon"><LockKeyhole size={26} /></div>
        <p className="eyebrow">Private concept preview</p>
        <h1 id="gate-title">A new digital home for the world’s heritage knowledge.</h1>
        <p className="gate-copy">This is a static design prototype prepared for review. Enter the preview password to continue.</p>
        <form onSubmit={submit} className="gate-form">
          <label htmlFor="demo-password">Preview password</label>
          <div className="gate-input-row">
            <input id="demo-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" autoFocus />
            <button type="submit" disabled={!password || busy} aria-label="Open preview"><ArrowRight size={20} /></button>
          </div>
          {error && <p className="gate-error" role="alert">{error}</p>}
        </form>
        <p className="gate-note"><ShieldCheck size={15} /> Lightweight client-side preview gate. Not intended as production access control.</p>
      </section>
    </main>
  );
}
