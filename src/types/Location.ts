import Character from './Character';

export default interface Location {
  id: number;
  name: string;
  dimension: string;
  type?: string;
  residents?: Character[];
}
