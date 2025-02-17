import {FederationPlugin} from './microfrontend.model';
import {NavigationAlias} from './navigation.const';

export const SAMPLE_CONFIGURATION: ReadonlyArray<FederationPlugin> = [
  {
    type: 'angular',
    subType: 'routeModule',
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
    remoteName: 'angular_mfe_1',
    exposedModule: 'MfeModule',
    displayName: 'Notes',
    routePath: 'notes',
    moduleClassName: 'BusinessModule',
    navigationAlias: 'notesList'
  },
  {
    type: 'angular',
    subType: 'routeModule',
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
    remoteName: 'angular_mfe_1',
    exposedModule: 'MfeModule',
    displayName: 'Notes',
    routePath: 'notesOlga',
    moduleClassName: 'BusinessModule',
    navigationAlias: 'notesList'
  },
  {
    type: 'react',
    remoteEntry: 'http://localhost:8080/remoteEntry.js',
    remoteName: 'react_app',
    exposedModule: 'ReactApp',
    displayName: 'Notes admin panel',
    routePath: 'notesAdminPanel',
    navigationAlias: 'notesAdminPanel',
    moduleName: 'MainApplicationPlugin'
  },
  {
    remoteEntry: 'http://localhost:3002/remoteEntry.js',
    remoteName: 'vue_app',
    exposedModule: './App',
    displayName: 'Simple Vue App',
    routePath: 'vue',
    navigationAlias: 'vue'
  },
  {
    type: 'vue',
    remoteEntry: 'http://localhost:3002/remoteEntry.js',
    remoteName: 'vue_app',
    exposedModule: './Content',
    displayName: 'Simple Vue Component',
    routePath: 'vue-content',
    navigationAlias: 'vue-content'
  },
  {
    type: 'react',
    remoteEntry: 'http://localhost:8081/remoteEntry.js',
    remoteName: 'react_routes_app',
    exposedModule: 'RoutesApp',
    displayName: 'Nested routes example',
    routePath: 'routesReact',
    navigationAlias: 'routesReact',
    moduleClassName: 'MainApplicationPlugin'
  }
];

export const NAVIGATION_ALIASES_MAP_TO_ROUTE_URL: Record<NavigationAlias, FederationPlugin['navigationAlias']> = {
  NOTES_ADMIN_PANEL: 'notesAdminPanel',
  NOTES_LIST: 'notesList'
};

export const ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR: Record<string, FederationPlugin> = {
  notesCounter: {
    subType: 'component',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'angular_mfe_2',
    exposedModule: 'NotesCounter',
    componentClassName: 'NotesCounterComponent'
  },
  notesCounterWithProvidersExtended: {
    subType: 'componentModule',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'angular_mfe_2',
    exposedModule: 'NotesCounterModule',
    exposedComponent: 'NotesCounter',
    moduleClassName: 'NotesCounterModule',
    componentClassName: 'NotesCounterComponent'
  },
  reactExamplePlugin: {
    remoteEntry: 'http://localhost:8081/remoteEntry.js',
    remoteName: 'react_routes_app',
    exposedModule: 'PropsApp',
    moduleClassName: 'PluginApplication'
  }
};

export const ANGULAR_REMOTE_SERVICE_DESCRIPTOR: Record<string, FederationPlugin> = {
  notesService: {
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'angular_mfe_2',
    exposedModule: 'NotesCounterModule',
    moduleClassName: 'NotesCounterModule',
    serviceClassName: 'NotesService'
  }
};
