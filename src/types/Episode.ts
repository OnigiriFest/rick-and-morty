import Character from './Character';

export interface Episodes {
  id: number;
  name: string;
  episode: string;
  characters?: Character[];
  air_data?: string;
}
