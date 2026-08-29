import type { DiaryEntry } from '../types';

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => (
  <div>
    <h2>diary entries</h2>
    {diaries.map(diary => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <div>visibility: {diary.visibility}</div>
        <div>weather: {diary.weather}</div>
        {diary.comment && <div>comment: {diary.comment}</div>}
      </div>
    ))}
  </div>
);

export default DiaryList;
