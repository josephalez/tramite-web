import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import { AdminsPage } from "./page";

export default function AdminsModule() {

  console.log('post crash')

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/"
            to="/administrados"
          />
        }
        <ContentRoute path="/administrados" component={AdminsPage} />
      </Switch>
    </Suspense>
  );
}
