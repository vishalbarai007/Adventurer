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
      
      /* Translator gadget styling */
      .goog-te-gadget {
        font-family: inherit !important;
        color: transparent !important;
        background-color: transparent !important;
        display: inline-block !important;
        border: none !important;
        
      }
      
      /* Dropdown container - main button */
      .goog-te-gadget-simple {
        background-color: #012c18 !important;
        border-radius: 4px !important;
        border: none !important;
        color: white !important;
        cursor: pointer;
        display: flex !important;
      
        align-items: center !important;
        min-width: 150px !important;
      }
      
      /* Main dropdown text */
      .goog-te-menu-value {
        color: white !important;
        font-weight: 500 !important;
        font-size: 0.9rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
      }
      
      /* Arrow in dropdown */
      .goog-te-menu-value span:last-child {
        margin-left: 4px !important;
        color: white !important;
      }
      
      /* Dropdown menu styling */
      .goog-te-menu-frame {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
        border-radius: 4px !important;
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
        max-height: 320px !important;
        overflow-y: auto !important;
      }
      
      .goog-te-menu2 {
        background-color: white !important;
        color: black !important;
        font-family: inherit !important;
        border-radius: 4px !important;
        border: none !important;
        padding: 4px 0 !important;
        width: 200px !important;
      }
      
      /* Dropdown items */
      .goog-te-menu2-item div {
        padding: 8px 12px !important;
        color: #333 !important;
        font-weight: 400 !important;
        font-size: 0.9rem !important;
        display: flex !important;
        align-items: center !important;
      }
      
      /* Selected and hover states */
      .goog-te-menu2-item:hover div {
        background-color: #012c18 !important;
        color: white !important;
      }
      
      .goog-te-menu2-item-selected div {
        background-color: rgba(1, 44, 24, 0.1) !important;
        font-weight: 600 !important;
      }
      
      /* Adding flag icons via before pseudo-element */
      .goog-te-menu2-item div:before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 14px;
        margin-right: 8px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      
      /* English flag */
      [data-lang="en"] div:before,
      .goog-te-menu2-item[id*="en"] div:before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjM1IDY1MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8ZyBpZD0idW5pb24iPg0KPHVzZSB5PSItLjIxNiIgeGxpbms6aHJlZj0iI3g0Ii8+DQo8dXNlIHhsaW5rOmhyZWY9IiN4NCIvPg0KPHVzZSB5PSIuMjE2IiB4bGluazpocmVmPSIjczYiLz4NCjwvZz4NCjxnIGlkPSJ4NCI+DQo8dXNlIHhsaW5rOmhyZWY9IiNzNiIvPg0KPHVzZSB5PSIuMDU0IiB4bGluazpocmVmPSIjczUiLz4NCjx1c2UgeT0iLjEwOCIgeGxpbms6aHJlZj0iI3M2Ii8+DQo8dXNlIHk9Ii4xNjIiIHhsaW5rOmhyZWY9IiNzNSIvPg0KPC9nPg0KPGcgaWQ9InM1Ij4NCjx1c2UgeD0iLS4yNTIiIHhsaW5rOmhyZWY9IiNzdGFyIi8+DQo8dXNlIHg9Ii0uMTI2IiB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4PSIuMTI2IiB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4PSIuMjUyIiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InM2Ij4NCjx1c2UgeD0iLS4wNjMiIHhsaW5rOmhyZWY9IiNzNSIvPg0KPHVzZSB4PSIuMzE1IiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InN0YXIiPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0ibWF0cml4KC0uODA5MDIgLS41ODc3OSAuNTg3NzkgLS44MDkwMiAwIDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNwdCIgdHJhbnNmb3JtPSJtYXRyaXgoLjMwOTAyIC0uOTUxMDYgLjk1MTA2IC4zMDkwMiAwIDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNwdCIvPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKDcyKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKDE0NCkiLz4NCjwvZz4NCjxwYXRoIGZpbGw9IiNmZmYiIGlkPSJwdCIgZD0iTS0uMTYyNSwwIDAtLjUgLjE2MjUsMHoiIHRyYW5zZm9ybT0ic2NhbGUoLjA2MTYpIi8+DQo8cGF0aCBmaWxsPSIjYmYwYTMwIiBpZD0ic3RyaXBlIiBkPSJtMCwwaDEyMzV2NTBoLTEyMzV6Ii8+DQo8L2RlZnM+DQo8cGF0aCBmaWxsPSIjZmZmIiBkPSJtMCwwaDEyMzV2NjUwaC0xMjM1eiIvPg0KPHVzZSB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8dXNlIHk9IjEwMCIgeGxpbms6aHJlZj0iI3N0cmlwZSIvPg0KPHVzZSB5PSIyMDAiIHhsaW5rOmhyZWY9IiNzdHJpcGUiLz4NCjx1c2UgeT0iMzAwIiB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8dXNlIHk9IjQwMCIgeGxpbms6aHJlZj0iI3N0cmlwZSIvPg0KPHVzZSB5PSI1MDAiIHhsaW5rOmhyZWY9IiNzdHJpcGUiLz4NCjx1c2UgeT0iNjAwIiB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8cGF0aCBmaWxsPSIjMDAyODY4IiBkPSJtMCwwaDQ5NHYzNTBoLTQ5NHoiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3VuaW9uIiB0cmFuc2Zvcm09Im1hdHJpeCg2NTAgMCAwIDY1MCAyNDcgMTc1KSIvPg0KPC9zdmc+');
      }
      
      /* Hindi flag */
      .goog-te-menu2-item[id*="hi"] div:before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjI1IDE1MCI+PHJlY3Qgd2lkdGg9IjIyNSIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmOWYyZjQiLz48cmVjdCB3aWR0aD0iMjI1IiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkY5OTMzIi8+PHJlY3QgeT0iMTAwIiB3aWR0aD0iMjI1IiBoZWlnaHQ9IjUwIiBmaWxsPSIjMTM4ODA4Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEyLjUgNzUpIj48Y2lyY2xlIHI9IjIwIiBmaWxsPSIjMDAwMDgwIi8+PGNpcmNsZSByPSIxNy41IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSByPSIzLjUiIGZpbGw9IiMwMDAwODAiLz48ZyBpZD0iZCI+PGcgaWQ9ImMiPjxnIGlkPSJiIj48ZyBpZD0iYSI+PHBhdGggZD0iTTAgMTcuNUwwIDAgMSAwIiB0cmFuc2Zvcm09InJvdGF0ZSg3LjUpIHRyYW5zbGF0ZSgwIC0xNy41KSIgZmlsbD0iIzAwMDA4MCIvPjxwYXRoIGQ9Ik0gMCwxNy41IEwgMCwwIEwgLTEsMCIgdHJhbnNmb3JtPSJyb3RhdGUoMjIuNSkgdHJhbnNsYXRlKDAgLTE3LjUpIiBmaWxsPSIjMDAwMDgwIi8+PC9nPjx1c2UgeGxpbms6aHJlZj0iI2EiIHRyYW5zZm9ybT0icm90YXRlKDQ1KSIvPjwvZz48dXNlIHhsaW5rOmhyZWY9IiNiIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCkiLz48L2c+PHVzZSB4bGluazpocmVmPSIjYyIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwKSIvPjwvZz48L2c+PC9zdmc+');
      }

      /* French flag */
      .goog-te-menu2-item[id*="fr"] div:before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjAwIj48cGF0aCBmaWxsPSIjRUQyOTM5IiBkPSJtMCwwaDkwMHY2MDBIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMCwwaDYwMHY2MDBIMHoiLz48cGF0aCBmaWxsPSIjMDAyMzk1IiBkPSJtMCwwaDMwMHY2MDBIMHoiLz48L3N2Zz4=');
      }

      /* Italian flag */
      .goog-te-menu2-item[id*="it"] div:before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTAwIDEwMDAiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0wLDBoMTUwMHYxMDAwSDB6Ii8+PHBhdGggZmlsbD0iIzAwOTI0NiIgZD0ibTAsMGg1MDB2MTAwMEgweiIvPjxwYXRoIGZpbGw9IiNjZTJiMzciIGQ9Im0xMDAwLDBoNTAwdjEwMDBIMTAwMHoiLz48L3N2Zz4=');
      }

      /* Russian flag */
      .goog-te-menu2-item[id*="ru"] div:before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NTAgMzAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMCwwaHQ1MHYzMDBIMHoiLz48cGF0aCBmaWxsPSIjMDA1MmI0IiBkPSJtMCwxMDBINDUwdjEwMEgweiIvPjxwYXRoIGZpbGw9IiNmZjAwMDAiIGQ9Im0wLDIwMGg0NTB2MTAwSDB6Ii8+PC9zdmc+');
      }

      
      /* Style specifically for navigation integration */
      .translate-container {
        height: 100%;
        display: flex;
        align-items: center;
      }
      
      .translate-selector {
        height: 100%;
        display: flex;
        align-items: center;
      }
      
      /* Style the current selected language with flag */
      .goog-te-gadget-simple .goog-te-menu-value:before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 14px;
        margin-right: 8px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjM1IDY1MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8ZyBpZD0idW5pb24iPg0KPHVzZSB5PSItLjIxNiIgeGxpbms6aHJlZj0iI3g0Ii8+DQo8dXNlIHhsaW5rOmhyZWY9IiN4NCIvPg0KPHVzZSB5PSIuMjE2IiB4bGluazpocmVmPSIjczYiLz4NCjwvZz4NCjxnIGlkPSJ4NCI+DQo8dXNlIHhsaW5rOmhyZWY9IiNzNiIvPg0KPHVzZSB5PSIuMDU0IiB4bGluazpocmVmPSIjczUiLz4NCjx1c2UgeT0iLjEwOCIgeGxpbms6aHJlZj0iI3M2Ii8+DQo8dXNlIHk9Ii4xNjIiIHhsaW5rOmhyZWY9IiNzNSIvPg0KPC9nPg0KPGcgaWQ9InM1Ij4NCjx1c2UgeD0iLS4yNTIiIHhsaW5rOmhyZWY9IiNzdGFyIi8+DQo8dXNlIHg9Ii0uMTI2IiB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4PSIuMTI2IiB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4PSIuMjUyIiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InM2Ij4NCjx1c2UgeD0iLS4wNjMiIHhsaW5rOmhyZWY9IiNzNSIvPg0KPHVzZSB4PSIuMzE1IiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InN0YXIiPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0ibWF0cml4KC0uODA5MDIgLS41ODc3OSAuNTg3NzkgLS44MDkwMiAwIDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNwdCIgdHJhbnNmb3JtPSJtYXRyaXgoLjMwOTAyIC0uOTUxMDYgLjk1MTA2IC4zMDkwMiAwIDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNwdCIvPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKDcyKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKDE0NCkiLz4NCjwvZz4NCjxwYXRoIGZpbGw9IiNmZmYiIGlkPSJwdCIgZD0iTS0uMTYyNSwwIDAtLjUgLjE2MjUsMHoiIHRyYW5zZm9ybT0ic2NhbGUoLjA2MTYpIi8+DQo8cGF0aCBmaWxsPSIjYmYwYTMwIiBpZD0ic3RyaXBlIiBkPSJtMCwwaDEyMzV2NTBoLTEyMzV6Ii8+DQo8L2RlZnM+DQo8cGF0aCBmaWxsPSIjZmZmIiBkPSJtMCwwaDEyMzV2NjUwaC0xMjM1eiIvPg0KPHVzZSB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8dXNlIHk9IjEwMCIgeGxpbms6aHJlZj0iI3N0cmlwZSIvPg0KPHVzZSB5PSIyMDAiIHhsaW5rOmhyZWY9IiNzdHJpcGUiLz4NCjx1c2UgeT0iMzAwIiB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8dXNlIHk9IjQwMCIgeGxpbms6aHJlZj0iI3N0cmlwZSIvPg0KPHVzZSB5PSI1MDAiIHhsaW5rOmhyZWY9IiNzdHJpcGUiLz4NCjx1c2UgeT0iNjAwIiB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8cGF0aCBmaWxsPSIjMDAyODY4IiBkPSJtMCwwaDQ5NHYzNTBoLTQ5NHoiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3VuaW9uIiB0cmFuc2Zvcm09Im1hdHJpeCg2NTAgMCAwIDY1MCAyNDcgMTc1KSIvPg0KPC9zdmc+');
      }

      /* Apply hover effect on main dropdown */
      .goog-te-gadget-simple:hover {
        background-color: white !important;
        border-color: #012c18 !important;
      }

      .goog-te-gadget-simple:hover .goog-te-menu-value {
        color: #012c18 !important;
      }

      .goog-te-gadget-simple:hover .goog-te-menu-value span:last-child {
        color: #012c18 !important;
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