import React from "react";
import { Route } from "react-router-dom";
import { UsersLoadingDialog } from "./loading";
import { UserEditDialog } from "./edit/UserEditDialog";
//import { UserDeleteDialog } from "./delete/UserDelete";
import { UsersUIProvider } from "./UIContext";
import { UsersCard } from "./card";

export function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/users/new");
    },
    openEditUserDialog: (id) => {
      history.push(`/users/${id}/edit`);
    },
    //openDeleteUserDialog: (id) => {
    //  history.push(`/users/${id}/delete`);
    //},
  }

  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <UsersLoadingDialog />
      <Route path="/users/new">
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/:id/edit">
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      {
        /*
        <Route path="/users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
        */
      }
      <UsersCard />
    </UsersUIProvider>
  );
}
