import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import { OrganicsPage } from "./page";

export default function OrganicsModule() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/"
            to="/organics"
          />
        }
        <ContentRoute path="/organics" component={OrganicsPage} />
      </Switch>
    </Suspense>
  );
}
