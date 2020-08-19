import Episode from './Episode';

export default interface EpisodeResults {
  info?: {
    pages: number;
    next: number;
    prev: number;
  };
  results?: Episode[];
  fetching?: Boolean;
  error?: string;
  term: string;
}
