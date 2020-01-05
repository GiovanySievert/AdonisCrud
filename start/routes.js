"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use("Route");

Route.post("users", "UserController.store");
Route.post("session", "SessionController.store");

Route.post("password", "ForgotPasswordController.store");
Route.put("password", "ForgotPasswordController.update");

Route.get("file/:id", "FileController.show");

Route.group(() => {
  Route.post("file", "FileController.store");

  Route.resource("projects", "ProjectController").apiOnly();
}).middleware("auth");
