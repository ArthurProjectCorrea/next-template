import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import TopLoader from '@/components/top-loader';
import { getDictionary, hasLocale } from './dictionaries';

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.RootLayout.title,
    description: dict.RootLayout.description,
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }];
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TopLoader />
      {children}
    </ThemeProvider>
  );
}
