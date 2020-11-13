import React from "react";
import { Route } from "react-router-dom";
import { AdminsLoadingDialog } from "./loading";
import { AdminEditDialog } from "./edit/AdminEditDialog";
//import { AdminDeleteDialog } from "./delete/AdminDelete";
import { AdminsUIProvider } from "./UIContext";

import { AdminsCard } from "./card";

export function AdminsPage({ history }) {
  const adminsUIEvents = {
    newAdminButtonClick: () => {
      history.push("/administrados/new");
    },
    openEditAdminDialog: (id) => {
      history.push(`/administrados/${id}/edit`);
    },
    //openDeleteAdminDialog: (id) => {
    //  history.push(`/administrados/${id}/delete`);
    //},
  }

  return (
    <AdminsUIProvider adminsUIEvents={adminsUIEvents}>
      <AdminsLoadingDialog />
      <Route path="/administrados/new">
        {({ history, match }) => (
          <AdminEditDialog
            show={match != null}
            onHide={() => {
              history.push("/administrados");
            }}
          />
        )}
      </Route>
      <Route path="/administrados/:id/edit">
        {({ history, match }) => (
          <AdminEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/administrados");
            }}
          />
        )}
      </Route>
      {
        /*
        <Route path="/administrados/:id/delete">
        {({ history, match }) => (
          <AdminDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/administrados");
            }}
          />
        )}
      </Route>
        */
      }
      <AdminsCard />
    </AdminsUIProvider>
  );
}
