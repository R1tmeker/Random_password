import React, { useRef, useMemo, useState } from 'react';
import { usePassword } from '../context/PasswordContext';
import { Settings, Copy, RefreshCw } from 'lucide-react';
import type { PasswordSettings } from '../types';

const generatePassword = (settings: PasswordSettings): string => {
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';

  let chars = '';
  if (settings.includeNumbers) chars += numbers;
  if (settings.includeSymbols) chars += symbols;
  if (settings.includeUppercase) chars += uppercase;
  if (settings.includeLowercase) chars += lowercase;

  if (!chars) return '';

  return Array.from(crypto.getRandomValues(new Uint32Array(settings.length)))
    .map((x) => chars[x % chars.length])
    .join('');
};

export const PasswordGenerator: React.FC = () => {
  const { state, dispatch } = usePassword();
  const generateButtonRef = useRef<HTMLButtonElement>(null);
  const [regenerateKey, setRegenerateKey] = useState(0);

  const password = useMemo(() => 
    generatePassword(state.settings),
    [state.settings, regenerateKey]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
  };

  const handleSave = () => {
    dispatch({ type: 'SAVE_PASSWORD', password });
  };

  const handleRegenerate = () => {
    setRegenerateKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Генератор паролей</h2>
        <button
          onClick={() => dispatch({ type: 'RESET_SETTINGS' })}
          className="text-gray-500 hover:text-gray-700"
          title="Сбросить настройки"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full px-4 py-3 text-lg bg-gray-100 rounded-lg"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Копировать пароль"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            ref={generateButtonRef}
            onClick={handleRegenerate}
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Сгенерировать новый пароль"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Сохранить пароль
      </button>
    </div>
  );
};