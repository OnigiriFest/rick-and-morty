import Character from './Character';

export interface Location {
  id: number;
  name: string;
  dimesion: string;
  type?: string;
  residents?: Character[];
}
