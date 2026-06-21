/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

// Extend the Window interface to include googleTranslateElementInit and google.translate
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: any;
        InlineLayout: {
          SIMPLE: any;
        };
      };
    };
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Function to remove Google translate elements
    const removeGoogleElements = () => {
      const googleElements = [
        '.goog-te-banner-frame',
        '.goog-logo-link',
        '.goog-te-balloon-frame'
      ];

      googleElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });
    };

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        const container = document.getElementById('google-translate-element');

        if (container) {
          // Avoid re-initialization
          if (!container.querySelector('.goog-te-combo')) {
            container.innerHTML = ''; // Clear any previous widget
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,hi,ta,te,ml,bn,kn,mr,gu,fr,it,ru',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google-translate-element');

            // Remove Google elements after initialization
            setTimeout(removeGoogleElements, 100);
          }
        }
      }
    };

    // Custom CSS to style with flags and match the image
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide unwanted banners and branding */
      .goog-te-banner-frame, 
      .goog-logo-link, 
      .goog-te-balloon-frame {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
      }
      
      /* Hide the G icon */
      .goog-te-gadget-icon {
        display: none !important;
      }

      /* Hide the "Powered by Google Translate" text/image completely */
      .goog-te-gadget {
        font-family: inherit !important;
        color: transparent !important;
        background-color: transparent !important;
        font-size: 0px !important; /* Hides the "Powered by" text */
        display: flex !important;
        align-items: center !important;
        border: none !important;
      }
      
      .goog-te-gadget > span > a {
        display: none !important;
      }

      /* Style the select dropdown */
      .goog-te-combo {
        background-color: transparent !important;
        color: inherit !important;
        font-family: inherit !important;
        font-weight: 500 !important;
        font-size: 0.875rem !important; /* matches text-sm */
        text-transform: uppercase !important;
        border: none !important;
        outline: none !important;
        cursor: pointer;
        padding: 0 !important;
        margin: 0 !important;
        width: auto !important;
        appearance: none; 
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      /* Select dropdown options */
      .goog-te-combo option {
        background-color: #012c18 !important; /* Dark green to match theme */
        color: white !important;
        text-transform: none !important; /* Keep language names readable */
        padding: 8px !important;
      }
    `;
    document.head.appendChild(style);

    // MutationObserver to continuously remove Google elements
    const observer = new MutationObserver(removeGoogleElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      observer.disconnect();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="translate-container">
      <div
        id="google-translate-element"
        className="translate-selector"
      />
    </div>
  );
};

export default GoogleTranslate;