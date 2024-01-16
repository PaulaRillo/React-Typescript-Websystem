import { useEffect, useState } from 'react';

export const useGetCurrentLang = () => {
  const [lang, setLang] = useState('en-US');

  useEffect(() => {
    const item = window.localStorage.getItem('i18nextLng');
    if (item) setLang(String(item));
  }, []);

  return { lang };
};
