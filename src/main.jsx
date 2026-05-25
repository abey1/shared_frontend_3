import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import "./index.css";
import App from "./App.jsx";
import { msalConfig } from "./auth/msalConfig";
import {
  consumeInviteRedirectIfAny,
  isInviteMsalLoginFlow,
} from "./auth/inviteMsalRedirect.js";
import { markOpenAdminAfterNextMe } from "./auth/postLoginAdminLanding.js";
import { AppRolesProvider } from "./context/AppRolesContext.jsx";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    msalInstance.setActiveAccount(event.payload.account);
    if (isInviteMsalLoginFlow()) {
      return;
    }
    markOpenAdminAfterNextMe();
  }
});

async function bootstrap() {
  await msalInstance.initialize();
  const redirectResult = await msalInstance.handleRedirectPromise();
  if (redirectResult?.account) {
    msalInstance.setActiveAccount(redirectResult.account);
    const invitePath = consumeInviteRedirectIfAny();
    if (invitePath) {
      window.location.replace(`${window.location.origin}${invitePath}`);
      return;
    }
    /** Redirect login completes here; LOGIN_SUCCESS may not fire before React mounts. */
    markOpenAdminAfterNextMe();
  } else {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <AppRolesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppRolesProvider>
      </MsalProvider>
    </StrictMode>,
  );
}

bootstrap();
