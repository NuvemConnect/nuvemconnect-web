export interface GoogleApi {
  accounts: {
    id: {
      initialize: (config: any) => void; // eslint-disable-line
      renderButton: (element: HTMLElement, options: any) => void; // eslint-disable-line
    };
  };
}
