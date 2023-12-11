export interface option {
  modalTitle: string;
  rate: string;
  ratePercent: string;
  size: string;
  num: string;
}
type types = 'CPU' | 'memory' | 'disk';
export type allRate = Record<types, option>;
