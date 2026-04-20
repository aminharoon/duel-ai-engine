import Header from './Header';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] relative overflow-x-hidden ambient-bg">
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-10 flex flex-col min-h-[calc(100vh-80px)]">
        {children}
      </main>
    </div>
  );
}
