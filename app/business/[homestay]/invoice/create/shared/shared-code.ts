export type Invoice = {
  guestName: string;
  invoiceDate: Date;
  checkinDate: Date;
  checkoutDate: Date;
  accomodation: Accomodation[];
  food: Food;
  amenities: Item[];
};

export type Accomodation = {
  rate: number;
  description: string;
  noOfDays: number;
};

export type Food = {
  breakfast: Item[];
  lunch: Item[];
  snacks: Item[];
  dinner: Item[];
};

export type Item = {
  name: string;
  quantity: number;
  rate: number;
};
