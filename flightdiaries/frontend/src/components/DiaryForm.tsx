import { useState } from 'react';

import { Visibility, Weather } from '../types';
import type { NewDiaryEntry } from '../types';

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ date, weather, visibility, comment });
    setDate('');
    setComment('');
  };

  return (
    <form onSubmit={addEntry}>
      <h2>add new entry</h2>
      <div>
        <label htmlFor="date">date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
        visibility
        {Object.values(Visibility).map(option => (
          <label key={option}>
            <input
              type="radio"
              name="visibility"
              value={option}
              checked={visibility === option}
              onChange={() => setVisibility(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <div>
        weather
        {Object.values(Weather).map(option => (
          <label key={option}>
            <input
              type="radio"
              name="weather"
              value={option}
              checked={weather === option}
              onChange={() => setWeather(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <div>
        <label htmlFor="comment">comment</label>
        <input
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
