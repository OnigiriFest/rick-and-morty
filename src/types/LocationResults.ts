import Location from './Location';

export default interface CharacterResults {
  info?: {
    pages: number;
    next: number;
    prev: number;
  };
  results?: Location[];
  fetching?: Boolean;
  error?: string;
  term: string;
}
