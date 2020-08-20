import Location from './Location';

export default interface LocationResults {
  info?: {
    pages: number;
    next: number;
    prev: number;
  };
  results?: Location[];
  fetching?: Boolean;
  error?: string;
  term?: string;
}
