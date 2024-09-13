import { PrimeReactProvider } from 'primereact/api'

import { Public_Sans } from 'next/font/google';
import './globals.css';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import AuthProvider from '@/app/libs/providers/AuthContext';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata = {
  title: "Extranjería Eli - Odiseo",
  description: "Sistema de Gestión",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={publicSans.className}
        style={{
          backgroundColor: '#F4F7FA'
        }}
      >
        <AuthProvider>
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
