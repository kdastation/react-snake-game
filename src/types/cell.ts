export interface ICell {
  x: number;
  y: number;
  row: number;
  col: number;
  food?: boolean;
  bomb?: boolean;
}
