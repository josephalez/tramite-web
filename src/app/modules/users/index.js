import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import { UsersPage } from "./page";

export default function UsersModule() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/"
            to="/users"
          />
        }
        <ContentRoute path="/users" component={UsersPage} />
      </Switch>
    </Suspense>
  );
}
