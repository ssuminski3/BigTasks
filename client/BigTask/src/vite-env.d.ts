/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_AUTH0_DOMAIN: string;
    readonly REACT_APP_AUTH0_CLIENT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  