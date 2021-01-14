declare module '@expense-tracker/data' {
  export const colors: [{
    id: string,
    name: string,
    hex: string
  }];
  export const currencies: [
    {
      code: string,
      name: string,
      symbol: string,
      hex: string | null
    }
  ];
}
