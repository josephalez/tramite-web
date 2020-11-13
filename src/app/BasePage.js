import React, {lazy, Suspense} from "react";
import {Redirect, Switch} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
//import {BuilderPage} from "./pages/BuilderPage";
//import {MyPage} from "./pages/MyPage";
//import {DashboardPage} from "./pages/DashboardPage";
import { HomePage } from "./pages/home/HomePage";
import { Home2Page } from "./pages/home-2/Home2Page";
//import { Users } from "./pages/users/Users";
import Dashboard from "./pages/dashboard";

/*
const GoogleMaterialPage = lazy(() =>
import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
*/
const AdministradosPage = lazy(() =>
    import("./modules/administrados")
);

const UsersPage = lazy(()=>
    import('./modules/users')
);

const OrganicsPage = lazy(()=>
    import('./modules/organics')
);

const ChatPage = lazy(()=>
    import('./modules/chat')
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/home"/>
                }
                <ContentRoute path="/home" component={Dashboard} />
                <ContentRoute path="/documents" component={HomePage}/> 
                <ContentRoute path="/internos" component={Home2Page}/>
                <ContentRoute path="/users" component={UsersPage} />
                <ContentRoute path="/organics" component={OrganicsPage} />
                <ContentRoute path="/administrados" component={AdministradosPage} />
                <ContentRoute path="/chat" component={ChatPage} />
                {/*
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                <ContentRoute path="/builder" component={BuilderPage}/>
                <ContentRoute path="/my-page" component={MyPage}/>
                <Route path="/google-material" component={GoogleMaterialPage}/>
                <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                <Route path="/e-commerce" component={ECommercePage}/>
                <Redirect to="error/error-v1"/>
                */}
            </Switch>
        </Suspense>
    );
}
