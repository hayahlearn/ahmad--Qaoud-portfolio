import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only load if measurement ID exists
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics: Missing VITE_GA_MEASUREMENT_ID');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: '${location.pathname}'
      });
    `;
    document.head.appendChild(script2);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [location.pathname]);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }, [location.pathname]);

  return null;
};

// Helper function to track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Common event tracking functions
export const trackButtonClick = (buttonName: string, page?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    page: page || window.location.pathname
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    success
  });
};

export const trackConsultationBooking = (service?: string) => {
  trackEvent('consultation_booking', {
    service,
    timestamp: new Date().toISOString()
  });
};
