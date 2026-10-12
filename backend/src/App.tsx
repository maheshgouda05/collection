import React, { useState } from 'react';
import { WardrobeProvider } from './lib/wardrobeContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { CollectionView } from './views/CollectionView.tsx';
import { AddDressView } from './views/AddDressView.tsx';
import { MyModelView } from './views/MyModelView.tsx';
import { OutfitPlannerView } from './views/OutfitPlannerView.tsx';
import { AiStylistView } from './views/AiStylistView.tsx';
import { WeatherView } from './views/WeatherView.tsx';
import { ScanFindView } from './views/ScanFindView.tsx';
import { CheckBeforeBuyView } from './views/CheckBeforeBuyView.tsx';
import { ProfileView } from './views/ProfileView.tsx';

function MainLayout() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            onNavigate={setCurrentTab}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}
        {currentTab === 'collection' && (
          <CollectionView onNavigate={setCurrentTab} />
        )}
        {currentTab === 'add-dress' && (
          <AddDressView onSuccess={() => setCurrentTab('collection')} />
        )}
        {currentTab === 'my-model' && <MyModelView />}
        {currentTab === 'outfits' && <OutfitPlannerView />}
        {currentTab === 'assistant' && <AiStylistView />}
        {currentTab === 'weather' && <WeatherView onNavigate={setCurrentTab} />}
        {currentTab === 'scan' && <ScanFindView onNavigate={setCurrentTab} />}
        {currentTab === 'check-buy' && <CheckBeforeBuyView />}
        {currentTab === 'profile' && (
          <ProfileView onOpenAuth={() => setIsAuthOpen(true)} />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <WardrobeProvider>
      <MainLayout />
    </WardrobeProvider>
  );
}
