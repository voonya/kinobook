import React from 'react';
import type { History } from 'history';
import type { BrowserRouterProps as NativeBrowserRouterProps } from 'react-router-dom';
import { Router } from 'react-router-dom';

export interface BrowserRouterProps
  extends Omit<NativeBrowserRouterProps, 'window'> {
  history: History;
}

export const BrowserRouter: React.FC<BrowserRouterProps> = React.memo(
  (props: BrowserRouterProps) => {
    const { history, ...restProps } = props;
    const [state, setState] = React.useState({
      action: history.action,
      location: history.location,
    });

    React.useLayoutEffect(() => history.listen(setState), [history]);

    return (
      <Router
        {...restProps}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      />
    );
  },
);
