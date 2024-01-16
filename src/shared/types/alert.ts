export type IAlert = {
  severity: 'success' | 'info' | 'warning' | 'error';
  isLoading?: boolean;
  title: string;
  message?: string;
  autoHideDuration?: number;
};
