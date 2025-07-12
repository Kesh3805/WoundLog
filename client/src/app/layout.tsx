import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, Inter, UnifrakturCook, Orbitron, VT323, Great_Vibes, Dancing_Script, Libre_Baskerville, Share_Tech_Mono, Just_Another_Hand, Special_Elite, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../../hooks/useAuth';
import NavBarWrapper from '../../components/NavBarWrapper';
import { ToastProvider } from '../../components/ToastContext';
import { MoodProvider } from '../../components/MoodContext';
import { ThemeProvider } from '../../components/ThemeContext';
import { ThemeAnimationProvider } from '../../components/ThemeAnimationContext';
import { ThemeSoundProvider } from '../../components/ThemeSoundContext';
import { ThemeAIStyleProvider } from '../../components/ThemeAIStyleContext';
import { ThemeMicroUXProvider } from '../../components/ThemeMicroUXContext';
import { ThemeLoreProvider } from '../../components/ThemeLoreContext';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const unifraktur = UnifrakturCook({ variable: "--font-unifraktur", subsets: ["latin"], display: "swap", weight: "700" });
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], display: "swap", weight: ["400", "700"] });
const vt323 = VT323({ variable: "--font-vt323", subsets: ["latin"], display: "swap", weight: "400" });
const greatVibes = Great_Vibes({ variable: "--font-greatvibes", subsets: ["latin"], display: "swap", weight: "400" });
const dancingScript = Dancing_Script({ variable: "--font-dancingscript", subsets: ["latin"], display: "swap", weight: ["400", "700"] });
const libreBaskerville = Libre_Baskerville({ variable: "--font-librebaskerville", subsets: ["latin"], display: "swap", weight: ["400", "700"] });
const shareTechMono = Share_Tech_Mono({ variable: "--font-sharetechmono", subsets: ["latin"], display: "swap", weight: "400" });
const justAnotherHand = Just_Another_Hand({ variable: "--font-justanotherhand", subsets: ["latin"], display: "swap", weight: "400" });
const specialElite = Special_Elite({ variable: "--font-specialelite", subsets: ["latin"], display: "swap", weight: "400" });
const cormorantGaramond = Cormorant_Garamond({ variable: "--font-cormorantgaramond", subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "WoundLog - Write it. Feel it. Bleed it. Heal it.",
  description: "A poetic, expressive journaling and self-reflection platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable} ${inter.variable} ${unifraktur.variable} ${orbitron.variable} ${vt323.variable} ${greatVibes.variable} ${dancingScript.variable} ${libreBaskerville.variable} ${shareTechMono.variable} ${justAnotherHand.variable} ${specialElite.variable} ${cormorantGaramond.variable}`}> 
      <body className="bg-gradient-to-br from-[#0A0A0A] via-[#1D1F2A] to-[#2C0B0E] dark:from-[#0A0A0A] dark:via-[#1D1F2A] dark:to-[#2C0B0E] min-h-screen font-inter text-[#E0E0E0]">
        <ThemeProvider>
          <ThemeAnimationProvider>
            <ThemeSoundProvider>
              <ThemeAIStyleProvider>
                <ThemeMicroUXProvider>
                  <ThemeLoreProvider>
                    <MoodProvider>
                      <AuthProvider>
                        <ToastProvider>
                          <NavBarWrapper />
        {children}
                        </ToastProvider>
                      </AuthProvider>
                    </MoodProvider>
                  </ThemeLoreProvider>
                </ThemeMicroUXProvider>
              </ThemeAIStyleProvider>
            </ThemeSoundProvider>
          </ThemeAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
