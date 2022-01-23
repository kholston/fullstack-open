export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibilty {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };


export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibilty;
  comment?: string;
}

