// layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Interactive Paper',
  description: 'Editable 3D paper with login interface',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={`${poppins.className} bg-gray-100 text-gray-900 min-h-screen`}>
          {children}
        </div>
      </body>
    </html>
  );
}
