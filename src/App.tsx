import { ContextModalProvider } from '@ergolabs/ui-kit';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Suspense, useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';
import { BehaviorSubject, first, mapTo, Observable, tap, zip } from 'rxjs';

import { applicationConfig } from './applicationConfig';
import { ApplicationRoutes, routesConfig } from './ApplicationRoutes';
import { panalytics } from './common/analytics';
import { useObservable } from './common/hooks/useObservable';
import { gaInitializer } from './common/initializers/gaInitializer';
import { networkDomInitializer } from './common/initializers/networkDomInitializer';
import { sentryInitializer } from './common/initializers/sentryInitializer';
import { startAppTicks } from './common/streams/appTick';
import { AppLoadingProvider, SettingsProvider } from './context';
import { LanguageProvider } from './i18n/i18n';

const Application = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoadingProvider>
          <SettingsProvider>
            <GoogleReCaptchaProvider
              reCaptchaKey={applicationConfig.reCaptchaKey}
            >
              <LanguageProvider>
                <ContextModalProvider>
                  <ApplicationRoutes />
                </ContextModalProvider>
              </LanguageProvider>
            </GoogleReCaptchaProvider>
          </SettingsProvider>
        </AppLoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(3 105 161 / 1)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(3 105 161 / 1)',
      contrastText: '#fff',
    },
    text: {
      primary: '#FFF',
      secondary: '#FFF',
    },
    background: {
      default: 'rgb(24 24 27 / 1)',
      paper: 'rgb(15 23 42 / 0.7)',
    },
  },
});

const initializers: Observable<boolean>[] = [
  sentryInitializer(),
  panalytics.init(),
  networkDomInitializer(routesConfig),
  gaInitializer(),
];

const isAppInitialized$ = new BehaviorSubject(false);
const initializeApp = () => {
  zip(initializers)
    .pipe(
      mapTo(true),
      tap(() => startAppTicks()),
      first(),
    )
    .subscribe(isAppInitialized$);
};

export const ApplicationInitializer: React.FC = () => {
  const [isAppInitialized] = useObservable(isAppInitialized$, [], false);

  useEffect(() => initializeApp(), []);

  if (!isAppInitialized) {
    return null;
  }

  return (
    <Suspense fallback={''}>
      <Application />
    </Suspense>
  );
};
