import Character from './Character';

export default interface Episode {
  id: number;
  name: string;
  episode: string;
  characters?: Character[];
  air_data?: string;
}
