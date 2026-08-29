import axios from 'axios';
import { useEffect, useState } from 'react';

import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import diaryService from './services/diaries';
import type { DiaryEntry, NewDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    void diaryService.getAll().then(setDiaries);
  }, []);

  const notifyError = (message: string) => {
    setError(message);
    setTimeout(() => setError(undefined), 5000);
  };

  const addEntry = async (entry: NewDiaryEntry) => {
    try {
      const added = await diaryService.create(entry);
      setDiaries(current => current.concat(added));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        notifyError(JSON.stringify(e.response?.data ?? e.message));
      } else {
        notifyError('unknown error');
      }
    }
  };

  return (
    <div>
      <h1>flight diaries</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <DiaryForm onSubmit={entry => void addEntry(entry)} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
