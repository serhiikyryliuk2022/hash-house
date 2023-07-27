
export interface IIntroducingCFieldsPage {
  block_1: { [key: string]: string };
  block_2: { [key: string]: string };
  block_3: { [key: string]: string };
  specification_sheet: { [key: string]: string };
  product_overview: { [key: string]: string };
  url?: string
}

export interface IIntroducingPage {
  cFields: IIntroducingCFieldsPage;
  content: string;
  title: string;
}
