import React from 'react';
import { PasswordProvider } from './context/PasswordContext';
import { PasswordGenerator } from './components/PasswordGenerator';
import { PasswordSettings } from './components/PasswordSettings';
import { SavedPasswords } from './components/SavedPasswords';
import { KeyRound } from 'lucide-react';

function App() {
  return (
    <PasswordProvider>
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-md mx-auto mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Генератор паролей</h1>
          <p className="mt-2 text-gray-600">Создавайте надёжные пароли с настраиваемыми параметрами</p>
        </div>
        
        <div className="max-w-md mx-auto space-y-6">
          <PasswordGenerator />
          <PasswordSettings />
          <SavedPasswords />
        </div>
      </div>
    </PasswordProvider>
  );
}

export default App;