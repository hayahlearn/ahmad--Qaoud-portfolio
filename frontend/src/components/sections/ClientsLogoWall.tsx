import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

// Simple SVG Icons for Tech Brands
const TechLogos = {
  Google: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.053-1.133 7.973-3.267 1.947-1.933 2.533-4.693 2.533-6.947 0-.573-.04-1.107-.12-1.867h-10.387z" />
    </svg>
  ),
  Microsoft: () => (
    <svg viewBox="0 0 23 23" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M0 0h11.377v11.372H0zM11.733 0H23.11v11.372H11.733zM0 11.732h11.377V23.105H0zM11.733 11.732H23.11V23.105H11.733z" />
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M17.65 9.43c.473.367.627 1.173.1 1.76l-.413.433c-.453.513-1.127.42-1.573.06-1.633-1.307-3.64-1.367-5.32-.233-2.027 1.36-2.587 4.093-1.307 6.133.487.773 1.253 1.333 2.133 1.58.287.08.573.12.86.12 1.907 0 3.667-1.073 4.547-2.773.053-.107.413-.787.413-.787l2.253.913s-.36.68-.5.92c-1.467 2.547-4.247 4.08-7.14 3.94-3.573-.173-6.527-2.973-6.873-6.54-.38-3.927 2.547-7.407 6.467-7.687 2.56-.18 5.027 1.1 6.353 3.16zM19.34 22.047c.18-.32.093-.727-.2-.947-.647-.487-1.313-.933-2-1.333-.307-.18-.7-.16-.973.06-.067.053-.613.507-.613.507s.76.653 1.16 1.013c.127.113.267.213.407.3.367.227.84.153 1.18-.173l1.04-.427zM22.953 2.72c-.853-.88-2.613-.673-3.64-.52-1.567.233-4.08 1.147-6.04 2.827-.373.32-.34.9.067 1.207l.56.427c.367.28.893.22 1.193-.087 1.4-1.387 3.333-2.133 4.513-2.313.433-.067.82.027 1.033.24.213.213.2.627-.087 1.213-.673 1.367-2.707 3.32-5.747 4.267-.447.14-.627.653-.4.927.0.0.913 2.167.913 2.167.2.473.86.547 1.18.153 1.227-1.5 6.64-5.353 6.947-8.473.127-1.287-.8-1.747-0.5-2.033z" />
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0843 1.6363-.9567a.7983.7983 0 0 0 .3924-.6908v-2.0716l-1.9288 1.1119v3.6391a4.4996 4.4996 0 0 1 .7058.0556 4.469 4.469 0 0 1 1.9288-.046v-.0044zm-9.5932-5.462a4.466 4.466 0 0 1 .4943-3.003l1.8215 1.0504a.7936.7936 0 0 0 .79.0069l1.793-1.0567-1.923-1.1166-3.1539 1.8335v.0652a4.5204 4.5204 0 0 1 .1781 2.2203zm2.508-8.9189a4.5029 4.5029 0 0 1 2.6288-.2049l-1.8152 1.0504a.7842.7842 0 0 0-.3956.683v2.1005l1.9242-1.109-3.1578-1.8317-3.1578-1.8317.0005.0005a4.5126 4.5126 0 0 1 1.3414-1.1895zm14.8465 5.5133a.7936.7936 0 0 0 .79-.007l1.793-1.0567-1.9242-1.1166-3.1539 1.8336v.0583a4.523 4.523 0 0 1-.1678 2.2223l-1.8216-1.051a.793.793 0 0 0-.79-.007 4.5129 4.5129 0 0 1 2.637.206zm-1.8236 7.8427-1.8023-1.051a.7892.7892 0 0 0-.7859-.007l-1.7929 1.0567 1.9239 1.1166 3.154-1.8336-.0105-.005a4.5103 4.5103 0 0 1-.1679-2.2223l1.8315 1.0596a.7936.7936 0 0 0 .79.0069 4.502 4.502 0 0 1-2.6178.2043zm-4.7073-1.2828-1.9288 1.1118v-3.708l-.134-.078a4.4827 4.4827 0 0 1-2.9054 1.0028v-2.0022l1.6364.9567a.7983.7983 0 0 0 .3924.6908l1.9392-1.121v3.235z" />
    </svg>
  ),
  Zapier: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M3.6 12.8h7.2L7.2 24l13.2-11.2h-7.2L16.8 0z" />
    </svg>
  ),
  N8n: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M12.9 8.25h2.95v-2.4h-5.9v7.1h6.65v2.4H10.5V8.25zm5.35-2.4h2.4v2.4h-2.4V5.85zm0 7.1h2.4v2.4h-2.4v-2.4zm-9.5-4.7h-2.4V5.85h2.4v2.4zm-2.4 4.7h2.4v2.4h-2.4v-2.4z" />
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.13-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-2.5l-.05-.28-.09-.53-.14-.48-.18-.4-.23-.33-.26-.28-.31-.22-.29-.15-.26-.09-.19-.05h-1.55l-3-.04-1.12.08-1.55.35-1.35.63-1.08.88-1.5.87-1.16 1.15-1 .85-.75 1.05-.48.98L.1 9.8l.06 3.09.28 1.74.45 1.56.63 1.34.8 1.1 1.7 1.48 2.05 1.02 2.37.5 2.65.1 1.87-.1 1.37-.36 1.03-.61.68-.84.34-1.05.1-1.23v-1.1l.02-.69.06-.52.12-.42.18-.36.23-.28.28-.2.31-1.15.26-.08.19-.03h5.21l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.28.07.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v2.5l.05.28.09.52.14.48.18.4.23.33.26.28.31.22.29.15.26.09.19.05h1.56l3 .04 1.12-.08 1.54-.35 1.35-.63 1.09-.87 1.49-.88 1.16-1.15.99-.85.76-1.05.47-.98.24-1.6L23.9 9.3 23.62 7.56 23.17 6 22.55 4.67 21.75 3.55 20.06 2.09 18.01 1.07 15.64.57z" />
    </svg>
  ),
  Supabase: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M11.758.846a1.536 1.536 0 0 0-2.3.93L5.354 13.91a.768.768 0 0 0 .73 1.012H11.5l-2.09 8.232a1.536 1.536 0 0 0 2.668 1.258l7.556-11.026a.768.768 0 0 0-.635-1.203H13.7L15.39 1.72a1.536 1.536 0 0 0-3.632-.874z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 98 96" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-16c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 13c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
      <circle cx="12" cy="12" r="2.2" />
      <g transform="rotate(60 12 12)">
        <ellipse rx="10" ry="4.5" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <g transform="rotate(120 12 12)">
        <ellipse rx="10" ry="4.5" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <ellipse rx="10" ry="4.5" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.955 5.43h2.12a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954 5.43h2.12a.185.185 0 00.185-.186v-1.888a.185.185 0 00-.185-.185h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.955 0h2.12a.185.185 0 00.185-.186v-1.888a.185.185 0 00-.185-.185h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m0-2.714h2.12a.186.186 0 00.185-.186V9.006a.186.186 0 00-.185-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0-2.715h2.12a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m8.865 7.15c-.27-.478-2.023-.97-6.22-1.353-.198-.018-.344.17-.233.336.564.847 2.158 1.489 2.158 1.489.28.318.572.714.545 1.18-.018.33-.243.6-.533.765-.303.17-.676.216-1.028.16-.367-.06-.72-.25-1.012-.5-.28-.242-.518-.543-.727-.853-.254-.373-.497-.756-.752-1.127-.123-.18-.247-.406-.472-.51a.833.833 0 00-.83.078c-.29.196-.45.54-.457.887-.008.35.132.68.35.955.358.455.776.852 1.252 1.18 1.053.722 2.378 1.01 3.633 1.077 1.547.085 3.097-.245 4.493-.935.91-.453 1.637-1.168 2.05-2.085.107-.24.238-.632.062-.83-.153-.17-.372-.083-.55-.008-.667.288-1.527.794-1.728 1.096z" />
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.5 16h-1.5v-2.5h-1v2.5H7.5V16h-1.5v-5h3.5v1h-1v1.5h1V16zm4 0h-3v-5h3v1h-2v1h1.5v1h-1.5v1h2v1zm4.5 0h-3v-5h3v1h-2v1h1.5v1h-1.5v1h2V16z" />
      <path d="M18.84 15.526v-4.545h-1.127v1.758c0 .736-.33 1.117-1.076 1.117-.674 0-1.004-.374-1.004-1.015v-1.86H14.5v2.09c0 1.154.674 1.666 1.838 1.666 1.112 0 1.62-.485 1.76-1.114v1.07.037h.743zm-7.05-4.545H9.68v4.545h1.127V12.16h2.14v-1.06h-2.14v-.88h2.373v-1.066h.61z" fillOpacity="0" />
      {/* Note: Simplified TS logo for visibility */}
      <path d="M12.75 12h3.5v1.5h-1.25v4.5h-1.5v-4.5H12.75V12zm5 1.5v3.25c0 .3.1.45.4.45.1 0 .25-.05.4-.1v1.35c-.3.15-.75.25-1.15.25-1.25 0-1.65-.85-1.65-2.25v-3h1.5v-.5h1.5v.5h1v1.5h-1z" />
    </svg>
  ),
  Make: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6s4.298-9.6 9.6-9.6 9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm-1.8-15h-1.8v3.6h-3.6v1.8h3.6v3.6h1.8v-3.6h3.6v-1.8h-3.6v-3.6zm5.4 6v3.6h-3.6v1.8h3.6v3.6h1.8v-3.6h3.6v-1.8h-3.6v-3.6h-1.8z" />
      {/* Note: Simplified M logo, actually Make (Integromat) is a purple circle with M. Using a generic M shape or similar if exact SVG unavailable in memory. I will use a clean 'M' representation or the actual Make logo path if known. 
          Make logo is distinct. Let's use a standard "M" path or similar for now, but to be safe, I'll use a text-based SVG or a known shape.
          Actually, I'll use a visually pleasing abstract shape for Make if I don't have the exact path, maximizing for "Tech" feel. 
          Wait, I can do better. Make is "M" on a purple background. 
      */}
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-3v3h-2v-3H8v-2h3V7z" />
    </svg>
  ),
  Gemini: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M13.87 3.39l-1.46 3.65c-.17.42-.44.75-.81 1.05-.2.16-.62.38-1.07.56l-3.23 1.25a.39.39 0 0 0 0 .73l3.23 1.25c.45.18.87.4 1.07.56.37.3.64.63.81 1.05l1.46 3.65c.18.45.69.45.87 0l1.46-3.65c.17-.42.44-.75.81-1.05.2-.16.62-.38 1.07-.56l3.23-1.25a.39.39 0 0 0 0-.73l-3.23-1.25c-.45-.18-.87-.4-1.07-.56-.37-.3-.64-.63-.81-1.05l-1.46-3.65a.47.47 0 0 0-.87 0zM4.66 12.6l-.76 1.89-.04.09c-.19.46-.77.46-.96 0l-.8-2.02-.01-.01c-.18-.45-.7-.45-.88 0l-.76 1.89-.04.09c-.19.46-.77.46-.96 0l-.8-2.02-.01-.01c-.18-.45-.7-.45-.88 0L.9 16.29l.04-.09c.19-.46.77-.46.96 0l.8 2.02.01.01c.18.45.7.45.88 0l.76-1.89.04-.09c.19-.46.77-.46.96 0l.8 2.02.01.01c.18.45.7.45.88 0l.76-1.89.04-.09c.19-.46.77-.46.96 0z" />
      {/* Standard Sparkle for Gemini */}
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
    </svg>
  ),
  GoogleAI: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor">
      <path d="M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0z" fillOpacity="0.2" />
      <path d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
    </svg>
  )
};

const clients = [
  // --- Artificial Intelligence & Models (Priority 1) ---
  { name: 'OpenAI', logo: TechLogos.OpenAI, color: 'text-emerald-500 hover:text-emerald-600' },
  { name: 'Google Gemini', logo: TechLogos.Gemini, color: 'text-blue-500 hover:text-blue-600' },
  { name: 'Google AI Studio', logo: TechLogos.GoogleAI, color: 'text-blue-400 hover:text-blue-500' },

  // --- Automation & Workflows (Priority 2) ---
  { name: 'n8n', logo: TechLogos.N8n, color: 'text-pink-500 hover:text-pink-600' },
  { name: 'Zapier', logo: TechLogos.Zapier, color: 'text-orange-600 hover:text-orange-700' },
  { name: 'Make', logo: TechLogos.Make, color: 'text-purple-600 hover:text-purple-700' },

  // --- Cloud & Infrastructure (Priority 3) ---
  { name: 'Google Cloud', logo: TechLogos.Google, color: 'text-red-500 hover:text-red-600' },
  { name: 'Microsoft Azure', logo: TechLogos.Microsoft, color: 'text-blue-500 hover:text-blue-600' },
  { name: 'AWS', logo: TechLogos.AWS, color: 'text-orange-500 hover:text-orange-600' },
  { name: 'Supabase', logo: TechLogos.Supabase, color: 'text-emerald-400 hover:text-emerald-500' },
  { name: 'Docker', logo: TechLogos.Docker, color: 'text-blue-500 hover:text-blue-600' },

  // --- Development & Tools (Priority 4) ---
  { name: 'GitHub', logo: TechLogos.GitHub, color: 'text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-300' },
  { name: 'Python', logo: TechLogos.Python, color: 'text-blue-400 hover:text-blue-500' },
  { name: 'TypeScript', logo: TechLogos.TypeScript, color: 'text-blue-600 hover:text-blue-700' },
  { name: 'React', logo: TechLogos.React, color: 'text-cyan-400 hover:text-cyan-500' },
];

export function ClientsLogoWall() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection animation="fade-up">
          <p className="text-center text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">
            {language === 'ar' ? 'شركاء التقنية والنجاح' : 'Technology & Success Partners'}
          </p>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-12 max-w-3xl mx-auto leading-tight">
            {language === 'ar'
              ? 'نعتمد على أفضل التقنيات العالمية لتقديم حلول موثوقة وقابلة للتوسع'
              : 'We rely on top global technologies to deliver reliable, scalable solutions'}
          </h2>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-14 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="group flex flex-col items-center justify-center gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-4 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 ${client.color}`}>
                <client.logo />
              </div>
              <span className="text-xs font-medium text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
