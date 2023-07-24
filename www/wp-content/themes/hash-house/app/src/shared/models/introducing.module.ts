
export interface IIntroducingCFieldsPage {
  block_1: { [key: string]: string };
  block_2: { [key: string]: string };
  block_3: {
    description: string;
    images: { [key: string]: string };
    title: null | string;
  };
  specification_sheet: { [key: string]: string };
  product_overview: { [key: string]: string };
}

export interface IIntroducingPage {
  cFields: IIntroducingCFieldsPage;
  content: string;
  title: string;
}
