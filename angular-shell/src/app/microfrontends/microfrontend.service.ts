import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Microfrontend} from './microfrontend.model';
import {Observable, of} from "rxjs";
import {shareReplay, switchMap, tap} from "rxjs/operators";
import {buildRoutes} from "../utils/route-utils";
import {loadRemoteEntry} from "../utils/federation-utils";

@Injectable()
export class MicrofrontendService {

  constructor(private router: Router,
  ) {
  }

  private static loadConfiguration(): Observable<ReadonlyArray<Microfrontend>> {
    return of(JSON.parse('[\n' +
      '  {\n' +
      '    "type": "angular",\n' +
      '    "subType": "module",\n' +
      '    "remoteEntry": "http://localhost:4201/remoteEntry.js",\n' +
      '    "remoteName": "angular_mfe_1",\n' +
      '    "exposedModule": "MfeModule",\n' +
      '    "displayName": "First lazy module plugin",\n' +
      '    "routePath": "firstModule",\n' +
      '    "moduleName": "BusinessModule"\n' +
      '  },\n' +
      '  {\n' +
      '    "type": "angular",\n' +
      '    "subType": "component",\n' +
      '    "remoteEntry": "http://localhost:4201/remoteEntry.js",\n' +
      '    "remoteName": "angular_mfe_1",\n' +
      '    "exposedModule": "BusinessComponent",\n' +
      '    "displayName": "First stupid component plugin",\n' +
      '    "routePath": "firstComponent",\n' +
      '    "moduleName": "BusinessComponent"\n' +
      '  },\n' +
      '  {\n' +
      '    "type": "angular",\n' +
      '    "subType": "module",\n' +
      '    "remoteEntry": "http://localhost:4202/remoteEntry.js",\n' +
      '    "remoteName": "angular_mfe_2",\n' +
      '    "exposedModule": "MfeModule",\n' +
      '    "displayName": "Second federation module plugin",\n' +
      '    "routePath": "secondModule",\n' +
      '    "moduleName": "BusinessModule"\n' +
      '  },\n' +
      '  {\n' +
      '    "type": "react",\n' +
      '    "remoteEntry": "http://localhost:8080/remoteEntry.js",\n' +
      '    "remoteName": "react_app",\n' +
      '    "exposedModule": "ShopApp",\n' +
      '    "displayName": "React shop application",\n' +
      '    "routePath": "reactShop",\n' +
      '    "moduleName": "MainApplicationPlugin"\n' +
      '  }\n' +
      ']\n'));
  }

  loadRoutesConfig(): Observable<ReadonlyArray<Microfrontend>> {
    return of(window.sessionStorage.getItem("routes_configuration"))
      .pipe(
        switchMap((routesConfigurationItem: string) => {
          if (routesConfigurationItem) {
            const routesConfiguration: ReadonlyArray<Microfrontend> = JSON.parse(routesConfigurationItem);
            return of(routesConfiguration);
          }
          return MicrofrontendService.loadConfiguration().pipe(
            tap((routes: ReadonlyArray<Microfrontend>) => {
              window.sessionStorage.setItem("routes_configuration", JSON.stringify(routes));
            })
          );
        }),
        tap((routes: ReadonlyArray<Microfrontend>) => {
          this.router.resetConfig(buildRoutes(routes));
          this.loadRemoteContainersByRoutes(routes);
        }),
        shareReplay(1)
      )

  }

  async loadRemoteContainersByRoutes(routes: ReadonlyArray<Microfrontend>) {
    return Promise.all(routes.map((route: Microfrontend) => {
      return loadRemoteEntry(route.remoteEntry);
    }))
  }

}