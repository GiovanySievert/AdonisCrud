"use strict";

const Project = use("App/Models/Project");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ProjectController {
  async index({ request, response, view }) {
    const projects = await Project.query()
      .with("user")
      .fetch();

    return projects;
  }

  async store({ request, response, auth }) {
    const data = request.only(["title", "description"]);

    const project = await Project.create({ ...data, user_id: auth.user.id });

    return project;
  }

  async show({ params }) {
    const projects = await Project.findOrFail(params.id);

    await projects.load("user");
    await projects.load("tasks");

    return projects;
  }

  async update({ params, request }) {
    const projects = await Project.findOrFail(params.id);
    const data = request.only(["title", "description"]);

    projects.merge(data);

    projects.save();

    return projects;
  }

  async destroy({ params, request, response }) {
    const projects = await Project.findOrFail(params.id);

    projects.delete();
  }
}

module.exports = ProjectController;
