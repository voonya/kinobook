import type { SPARoutes } from '@common';
import { PageTitle } from '@common';

import { useEffect } from 'react';

export const useTitle = (pageName: SPARoutes) => {
  useEffect(() => {
    document.title = PageTitle[pageName] || 'KinoBook';
  }, [pageName]);
};
