import { ChevronDown } from 'lucide-react';
import { COLORS, FONTS, UI } from '../tokens';

export default function FaqItem({ faq, idx, openFaq, setOpenFaq, Icon }) {
  const isOpen = openFaq === faq.id;

  return (
    <div
      className="fade-up"
      style={{
        background: UI.cardGlass,
        border: `1px solid ${COLORS.green}60`,
        borderRadius: '8px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        animationDelay: `${idx * 0.1}s`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
        className="faq-trigger"
        style={{
          width: '100%',
          padding: '1.5rem',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          fontFamily: FONTS.body,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {Icon ? <Icon size={22} style={{ color: COLORS.gold, flexShrink: 0 }} aria-hidden /> : null}
          {faq.question}
        </span>
        <ChevronDown
          size={24}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s',
            color: COLORS.gold,
            marginLeft: '1rem',
            flexShrink: 0,
          }}
          aria-hidden
        />
      </button>

      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div style={{ padding: '0 1.5rem 1.5rem', color: '#ffffffcc', lineHeight: '1.6', fontFamily: FONTS.body }}>
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
