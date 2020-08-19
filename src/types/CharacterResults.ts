import Character from './Character';

export default interface CharacterResults {
  info?: {
    pages: number;
    next: number;
    prev: number;
  };
  results?: Character[];
  fetching?: Boolean;
  error?: string;
  term: string;
}
