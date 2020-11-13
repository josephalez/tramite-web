import React from "react";
import { Route } from "react-router-dom";
import { OrganicsLoadingDialog } from "./loading";
import { OrganicEditDialog } from "./edit/OrganicEditDialog";
//import { OrganicDeleteDialog } from "./delete/OrganicDelete";
import { OrganicsUIProvider } from "./UIContext";
import { OrganicsCard } from "./card";

export function OrganicsPage({ history }) {
  const organicsUIEvents = {
    newOrganicButtonClick: () => {
      history.push("/organics/new");
    },
    openEditOrganicDialog: (id) => {
      history.push(`/organics/${id}/edit`);
    },
    //openDeleteOrganicDialog: (id) => {
    //  history.push(`/organics/${id}/delete`);
    //},
  }

  return (
    <OrganicsUIProvider organicsUIEvents={organicsUIEvents}>
      <OrganicsLoadingDialog />
      <Route path="/organics/new">
        {({ history, match }) => (
          <OrganicEditDialog
            show={match != null}
            onHide={() => {
              history.push("/organics");
            }}
          />
        )}
      </Route>
      <Route path="/organics/:id/edit">
        {({ history, match }) => (
          <OrganicEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/organics");
            }}
          />
        )}
      </Route>
      {
        /*
        <Route path="/organics/:id/delete">
        {({ history, match }) => (
          <OrganicDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/organics");
            }}
          />
        )}
      </Route>
        */
      }
      <OrganicsCard />
    </OrganicsUIProvider>
  );
}
