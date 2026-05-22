import { useState, type FormEvent } from 'react';
import FadeIn from '../components/FadeIn';

// TODO: replace with Brijesh's real receiving email when provided.
const CONTACT_EMAIL = 'brijesh@example.com';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `New inquiry from ${name || 'your website'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    'w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 text-[#D7E2EA] placeholder:text-white/30 outline-none transition-colors focus:border-[#B600A8]/60 focus:bg-white/[0.06]';

  return (
    <section
      id="contact"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}
        >
          Contact
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-center text-[#D7E2EA]/60 font-light uppercase tracking-wide mb-12 sm:mb-16 max-w-xl mx-auto"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)' }}
        >
          Tell me about your shoot — weddings, portraits, events, brands. I&apos;ll get back to you.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} y={30}>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto flex flex-col gap-4 sm:gap-5"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <textarea
            required
            rows={5}
            placeholder="What do you have in mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            className="self-center mt-2 rounded-full text-white font-medium uppercase tracking-widest px-10 py-3.5 md:px-12 md:py-4 text-sm md:text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow:
                '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid white',
              outlineOffset: '-3px',
            }}
          >
            Send Message
          </button>
        </form>
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <p className="text-center text-white/40 text-sm mt-10">
          or reach me on{' '}
          <a
            href="https://instagram.com/brie_o_graphy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA] underline-offset-4 hover:underline"
          >
            @brie_o_graphy
          </a>
        </p>
      </FadeIn>
    </section>
  );
}
