import Character from './Character';

export default interface Location {
  id: number;
  name: string;
  dimesion: string;
  type?: string;
  residents?: Character[];
}
