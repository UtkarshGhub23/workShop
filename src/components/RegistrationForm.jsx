import { useState } from "react";
import { useToast } from "../hooks/useToast.jsx";
import { sendToTelegram } from "../utils/telegram";

const INITIAL = { name: "", email: "", phone: "", address: "", focus: "", friend: "", terms: false };

export default function RegistrationForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const showToast = useToast();

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.address.trim()) e.address = true;
    if (!form.focus) e.focus = true;
    if (!form.terms) e.terms = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      if (errors.terms || !form.terms) {
        showToast("Please accept the guidelines to continue.", "error");
      } else {
        showToast("Please fill in all highlighted fields.", "error");
      }
      return;
    }

    setSubmitting(true);
    try {
      await sendToTelegram(form);
      setSuccess(true);
      showToast(`🎉 Welcome to the crew, ${form.name.trim()}! See you on Friendship Day!`, "success", 7000);
    } catch (err) {
      console.error(err);
      showToast("Could not send notification. Check your Bot Token & Chat ID in config.js", "error", 8000);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setForm(INITIAL);
    setErrors({});
    setSuccess(false);
  }

  const Icon = ({ children }) => <div className="field-icon">{children}</div>;

  return (
    <section className="panel panel-register" id="register" aria-label="Registration Form">
      <div className="panel-inner">

        <div className="form-header">
          <div className="form-title-wrap">
            <h2>Save Your Spot 💛</h2>
            <p>Join the circle. Takes 60 seconds.</p>
          </div>
          <div className="seats-meter" aria-label="38 of 60 spots filled">
            <div className="meter-track">
              <div className="meter-fill" style={{ width: "63.3%" }}></div>
            </div>
            <span>22 spots remaining — don't miss out!</span>
          </div>
        </div>

        {!success ? (
          <form className={`reg-form${submitting ? " submitting" : ""}`} noValidate onSubmit={handleSubmit}>

            {/* Name */}
            <div className="field-group">
              <label htmlFor="reg-name" className="field-label">Your Name</label>
              <div className="field-wrap">
                <Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></Icon>
                <input
                  type="text" id="reg-name" className={`field-input${errors.name ? " error" : ""}`}
                  placeholder="What do your friends call you?"
                  value={form.name} onChange={(e) => set("name", e.target.value)}
                  aria-invalid={errors.name || undefined} aria-describedby="name-err"
                />
              </div>
              <div className={`field-error${errors.name ? " visible" : ""}`} id="name-err" role="alert">Please enter your name.</div>
            </div>

            {/* Email */}
            <div className="field-group">
              <label htmlFor="reg-email" className="field-label">Email Address</label>
              <div className="field-wrap">
                <Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></Icon>
                <input
                  type="email" id="reg-email" className={`field-input${errors.email ? " error" : ""}`}
                  placeholder="you@example.com"
                  value={form.email} onChange={(e) => set("email", e.target.value)}
                  aria-invalid={errors.email || undefined} aria-describedby="email-err"
                />
              </div>
              <div className={`field-error${errors.email ? " visible" : ""}`} id="email-err" role="alert">Please enter a valid email address.</div>
            </div>

            {/* Phone */}
            <div className="field-group">
              <label htmlFor="reg-phone" className="field-label">Phone Number</label>
              <div className="field-wrap">
                <Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22H6.6a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></Icon>
                <input
                  type="tel" id="reg-phone" className={`field-input${errors.phone ? " error" : ""}`}
                  placeholder="+91 98765 43210"
                  value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={errors.phone || undefined} aria-describedby="phone-err"
                />
              </div>
              <div className={`field-error${errors.phone ? " visible" : ""}`} id="phone-err" role="alert">Please enter your phone number.</div>
            </div>

            {/* City */}
            <div className="field-group">
              <label htmlFor="reg-address" className="field-label">City</label>
              <div className="field-wrap">
                <Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></Icon>
                <input
                  type="text" id="reg-address" className={`field-input${errors.address ? " error" : ""}`}
                  placeholder="Where are you coming from?"
                  value={form.address} onChange={(e) => set("address", e.target.value)}
                  aria-invalid={errors.address || undefined} aria-describedby="address-err"
                />
              </div>
              <div className={`field-error${errors.address ? " visible" : ""}`} id="address-err" role="alert">Please enter your city.</div>
            </div>

            {/* What excites you */}
            <div className="field-group">
              <label htmlFor="reg-focus" className="field-label">What excites you most?</label>
              <div className="field-wrap select-wrap">
                <Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></Icon>
                <select
                  id="reg-focus" className={`field-input field-select${errors.focus ? " error" : ""}`}
                  value={form.focus} onChange={(e) => set("focus", e.target.value)}
                  aria-invalid={errors.focus || undefined} aria-describedby="focus-err"
                >
                  <option value="" disabled>Pick what you love most…</option>
                  <option value="stories">💬 Sharing stories & memories</option>
                  <option value="games">🎮 Games & fun challenges</option>
                  <option value="crafts">🎨 Creative crafts & art</option>
                  <option value="music">🎵 Music & dancing</option>
                  <option value="food">🍕 Food & feasting together</option>
                </select>
                <div className="select-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className={`field-error${errors.focus ? " visible" : ""}`} id="focus-err" role="alert">Please select an option.</div>
            </div>

            {/* Bring a friend */}
            <div className="field-group">
              <label htmlFor="reg-friend" className="field-label">Bringing a friend? (Optional)</label>
              <div className="field-wrap">
                <Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></Icon>
                <input
                  type="text" id="reg-friend" className="field-input"
                  placeholder="Your friend's name (they get a spot too!)"
                  value={form.friend} onChange={(e) => set("friend", e.target.value)}
                />
              </div>
            </div>

            {/* Terms */}
            <label className="terms-row" htmlFor="reg-terms">
              <span className="check-wrap">
                <input
                  type="checkbox" id="reg-terms" className="visually-hidden"
                  checked={form.terms} onChange={(e) => set("terms", e.target.checked)}
                />
                <span className="check-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              </span>
              <span className="terms-text">
                I promise to bring good vibes and agree to the <a href="#">Friendship Day Guidelines</a> 🤞
              </span>
            </label>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={submitting}>
              <span className="btn-shimmer" aria-hidden="true"></span>
              <span className="btn-label">Count Me In! 🎉</span>
              <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              <span className="btn-spinner" aria-hidden="true"></span>
            </button>

            <p className="form-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Free event. No spam. Just good times with great people.
            </p>
          </form>
        ) : (
          <div className="success-state" aria-live="polite">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3>You're in! 🎉</h3>
            <p>You're all set, {form.name.trim()}! 💛 Check {form.email.trim()} for details. Can't wait to see you!</p>
            <button className="reset-btn" onClick={handleReset}>Register Another Friend</button>
          </div>
        )}

      </div>
    </section>
  );
}
