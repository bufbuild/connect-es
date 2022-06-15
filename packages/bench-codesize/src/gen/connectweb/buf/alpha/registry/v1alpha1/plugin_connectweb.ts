// Copyright 2020-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @generated by protoc-gen-connect-web v0.0.7 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/plugin.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import {CreatePluginRequest, CreatePluginResponse, CreateTemplateRequest, CreateTemplateResponse, CreateTemplateVersionRequest, CreateTemplateVersionResponse, DeletePluginRequest, DeletePluginResponse, DeleteTemplateRequest, DeleteTemplateResponse, DeprecatePluginRequest, DeprecatePluginResponse, DeprecateTemplateRequest, DeprecateTemplateResponse, GetPluginRequest, GetPluginResponse, GetPluginVersionRequest, GetPluginVersionResponse, GetTemplateRequest, GetTemplateResponse, GetTemplateVersionRequest, GetTemplateVersionResponse, ListOrganizationPluginsRequest, ListOrganizationPluginsResponse, ListOrganizationTemplatesRequest, ListOrganizationTemplatesResponse, ListPluginContributorsRequest, ListPluginContributorsResponse, ListPluginVersionsRequest, ListPluginVersionsResponse, ListPluginsRequest, ListPluginsResponse, ListTemplateContributorsRequest, ListTemplateContributorsResponse, ListTemplateVersionsRequest, ListTemplateVersionsResponse, ListTemplatesRequest, ListTemplatesResponse, ListUserPluginsRequest, ListUserPluginsResponse, ListUserTemplatesRequest, ListUserTemplatesResponse, SetPluginContributorRequest, SetPluginContributorResponse, SetTemplateContributorRequest, SetTemplateContributorResponse, UndeprecatePluginRequest, UndeprecatePluginResponse, UndeprecateTemplateRequest, UndeprecateTemplateResponse} from "./plugin_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * PluginService manages plugins.
 *
 * @generated from service buf.alpha.registry.v1alpha1.PluginService
 */
export const PluginService = {
  typeName: "buf.alpha.registry.v1alpha1.PluginService",
  methods: {
    /**
     * ListPlugins returns all the plugins available to the user. This includes
     * public plugins, those uploaded to organizations the user is part of,
     * and any plugins uploaded directly by the user.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListPlugins
     */
    listPlugins: {
      name: "ListPlugins",
      I: ListPluginsRequest,
      O: ListPluginsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListUserPlugins lists all plugins belonging to a user.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListUserPlugins
     */
    listUserPlugins: {
      name: "ListUserPlugins",
      I: ListUserPluginsRequest,
      O: ListUserPluginsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListOrganizationPlugins lists all plugins for an organization.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListOrganizationPlugins
     */
    listOrganizationPlugins: {
      name: "ListOrganizationPlugins",
      I: ListOrganizationPluginsRequest,
      O: ListOrganizationPluginsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetPluginVersion returns the plugin version, if found.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.GetPluginVersion
     */
    getPluginVersion: {
      name: "GetPluginVersion",
      I: GetPluginVersionRequest,
      O: GetPluginVersionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListPluginVersions lists all the versions available for the specified plugin.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListPluginVersions
     */
    listPluginVersions: {
      name: "ListPluginVersions",
      I: ListPluginVersionsRequest,
      O: ListPluginVersionsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * CreatePlugin creates a new plugin.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.CreatePlugin
     */
    createPlugin: {
      name: "CreatePlugin",
      I: CreatePluginRequest,
      O: CreatePluginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetPlugin returns the plugin, if found.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.GetPlugin
     */
    getPlugin: {
      name: "GetPlugin",
      I: GetPluginRequest,
      O: GetPluginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * DeletePlugin deletes the plugin, if it exists. Note that deleting
     * a plugin may cause breaking changes for templates using that plugin,
     * and should be done with extreme care.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.DeletePlugin
     */
    deletePlugin: {
      name: "DeletePlugin",
      I: DeletePluginRequest,
      O: DeletePluginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * SetPluginContributor sets the role of a user in the plugin.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.SetPluginContributor
     */
    setPluginContributor: {
      name: "SetPluginContributor",
      I: SetPluginContributorRequest,
      O: SetPluginContributorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListPluginContributors returns the list of contributors that has an explicit role against the plugin.
     * This does not include users who have implicit roles against the plugin, unless they have also been
     * assigned a role explicitly.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListPluginContributors
     */
    listPluginContributors: {
      name: "ListPluginContributors",
      I: ListPluginContributorsRequest,
      O: ListPluginContributorsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * DeprecatePlugin deprecates the plugin, if found.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.DeprecatePlugin
     */
    deprecatePlugin: {
      name: "DeprecatePlugin",
      I: DeprecatePluginRequest,
      O: DeprecatePluginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * UndeprecatePlugin makes the plugin not deprecated and removes any deprecation_message.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.UndeprecatePlugin
     */
    undeprecatePlugin: {
      name: "UndeprecatePlugin",
      I: UndeprecatePluginRequest,
      O: UndeprecatePluginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetTemplate returns the template, if found.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.GetTemplate
     */
    getTemplate: {
      name: "GetTemplate",
      I: GetTemplateRequest,
      O: GetTemplateResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListTemplates returns all the templates available to the user. This includes
     * public templates, those owned by organizations the user is part of,
     * and any created directly by the user.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListTemplates
     */
    listTemplates: {
      name: "ListTemplates",
      I: ListTemplatesRequest,
      O: ListTemplatesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListUserPlugins lists all templates belonging to a user.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListUserTemplates
     */
    listUserTemplates: {
      name: "ListUserTemplates",
      I: ListUserTemplatesRequest,
      O: ListUserTemplatesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListOrganizationTemplates lists all templates for an organization.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListOrganizationTemplates
     */
    listOrganizationTemplates: {
      name: "ListOrganizationTemplates",
      I: ListOrganizationTemplatesRequest,
      O: ListOrganizationTemplatesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetTemplateVersion returns the template version, if found.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.GetTemplateVersion
     */
    getTemplateVersion: {
      name: "GetTemplateVersion",
      I: GetTemplateVersionRequest,
      O: GetTemplateVersionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListTemplateVersions lists all the template versions available for the specified template.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListTemplateVersions
     */
    listTemplateVersions: {
      name: "ListTemplateVersions",
      I: ListTemplateVersionsRequest,
      O: ListTemplateVersionsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * CreateTemplate creates a new template.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.CreateTemplate
     */
    createTemplate: {
      name: "CreateTemplate",
      I: CreateTemplateRequest,
      O: CreateTemplateResponse,
      kind: MethodKind.Unary,
    },
    /**
     * DeleteTemplate deletes the template, if it exists.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.DeleteTemplate
     */
    deleteTemplate: {
      name: "DeleteTemplate",
      I: DeleteTemplateRequest,
      O: DeleteTemplateResponse,
      kind: MethodKind.Unary,
    },
    /**
     * CreateTemplateVersion creates a new template version.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.CreateTemplateVersion
     */
    createTemplateVersion: {
      name: "CreateTemplateVersion",
      I: CreateTemplateVersionRequest,
      O: CreateTemplateVersionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * SetTemplateContributor sets the role of a user in the template.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.SetTemplateContributor
     */
    setTemplateContributor: {
      name: "SetTemplateContributor",
      I: SetTemplateContributorRequest,
      O: SetTemplateContributorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * ListTemplateContributors returns the list of contributors that has an explicit role against the template.
     * This does not include users who have implicit roles against the template, unless they have also been
     * assigned a role explicitly.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.ListTemplateContributors
     */
    listTemplateContributors: {
      name: "ListTemplateContributors",
      I: ListTemplateContributorsRequest,
      O: ListTemplateContributorsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * DeprecateTemplate deprecates the template, if found.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.DeprecateTemplate
     */
    deprecateTemplate: {
      name: "DeprecateTemplate",
      I: DeprecateTemplateRequest,
      O: DeprecateTemplateResponse,
      kind: MethodKind.Unary,
    },
    /**
     * UndeprecateTemplate makes the template not deprecated and removes any deprecation_message.
     *
     * @generated from rpc buf.alpha.registry.v1alpha1.PluginService.UndeprecateTemplate
     */
    undeprecateTemplate: {
      name: "UndeprecateTemplate",
      I: UndeprecateTemplateRequest,
      O: UndeprecateTemplateResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

