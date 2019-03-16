export interface Transition {
  name?: string;
  amount?: number;
  recurring?: string;
  [key: string]: string | number | undefined;
}
