import QuotePerDays from '@components/QuotePerDays/QuotePerDays';
import YourQuotes from '@components/YoursQuotes/YoursQuotes';
import WelcomeHome from '@components/WelcomeHome/WelcomeHome';
import CardFeatures from '@components/CardFeatures/CardFeatures';

export default function Home() {
  return (
    <>
      <WelcomeHome />

      <QuotePerDays /> 

      <CardFeatures />

      <YourQuotes />
    </>
  );
}