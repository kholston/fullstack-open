export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibilty = 'great' | 'good' | 'ok' | 'poor';

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibilty;
  comment?: string;
}

