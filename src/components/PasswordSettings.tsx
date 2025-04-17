import React from 'react';
import { usePassword } from '../context/PasswordContext';

export const PasswordSettings: React.FC = () => {
  const { state, dispatch } = usePassword();
  const { settings } = state;

  const handleSettingChange = (setting: keyof typeof settings, value: boolean | number) => {
    dispatch({
      type: 'GENERATE',
      settings: { ...settings, [setting]: value },
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Настройки пароля</h2>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between">
            <span>Длина пароля</span>
            <input
              type="number"
              min="4"
              max="32"
              value={settings.length}
              onChange={(e) => handleSettingChange('length', parseInt(e.target.value, 10))}
              className="w-20 px-2 py-1 border rounded"
            />
          </label>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.includeNumbers}
            onChange={(e) => handleSettingChange('includeNumbers', e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Включить цифры</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.includeSymbols}
            onChange={(e) => handleSettingChange('includeSymbols', e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Включить специальные символы</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.includeUppercase}
            onChange={(e) => handleSettingChange('includeUppercase', e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Включить заглавные буквы</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.includeLowercase}
            onChange={(e) => handleSettingChange('includeLowercase', e.target.checked)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-700">Включить строчные буквы</span>
        </label>
      </div>
    </div>
  );
};