export interface I_Rule_Node {
  icon: string;
  count: number;
  extra?: {
    title: string;
    count: number;
  }[];
}
