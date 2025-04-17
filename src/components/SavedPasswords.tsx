import React from 'react';
import { usePassword } from '../context/PasswordContext';
import { Trash2, Copy } from 'lucide-react';

export const SavedPasswords: React.FC = () => {
  const { state, dispatch } = usePassword();

  const handleCopy = async (password: string) => {
    await navigator.clipboard.writeText(password);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'REMOVE_PASSWORD', id });
  };

  if (state.savedPasswords.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Сохранённые пароли</h2>
      
      <div className="space-y-3">
        {state.savedPasswords.map((password) => (
          <div
            key={password.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="font-mono text-sm truncate max-w-[200px]">
              {password.value}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleCopy(password.value)}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Копировать пароль"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(password.id)}
                className="p-1 text-red-500 hover:text-red-700"
                title="Удалить пароль"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};