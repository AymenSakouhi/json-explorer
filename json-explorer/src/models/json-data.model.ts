export interface FieldsData {
  id: string;
  prop: string;
  value: string;
  hasError: boolean;
}

export interface JsonData {
  date: string;
  hasError: boolean;
  fields: FieldsData[];
  //optional
  test?: object;
}
