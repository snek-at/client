<p align="center">
  <a href="https://snek.at/" target="_blank" rel="noopener noreferrer">
    <img src="https://avatars2.githubusercontent.com/u/55870326?s=400&u=c6c7f06305ddc94747d474850fde7b2044f53838&v=4" alt="SNEK Logo" height="150">
  </a>
</p>

<h3 align="center">SNEK - Social Network for Engineers and Knowledged</h3>
<p align="center">
The SNEK project is an attempt to create a transparent, open-source non-profit platform that allows engineers to categorize and compare. It should enable engineers from adjacent fields to visualize each other's skills through visualization and project identification.
  <br>
The client unifies the way external data is handled and unites it under a clean, well documented, modular, plug and play API written in beautiful typescript :)
  <br>
  <br>
  <a href="https://github.com/snek-at/client/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/snek-at/client/issues/new?template=feature_request.md">Request feature</a>
  ·
  <a href="https://www.overleaf.com/read/bcxwhwbhrmps">Documentation</a>
  <br>
  <br>
  <a href="https://www.codacy.com/app/kleberbaum/client">
    <img src="https://api.codacy.com/project/badge/Grade/20d80a1790c44c90a3376e77d34a99ff" />
  </a>
</p>

## Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Set up](#set-up)
  - [Sessions](#sessions)
  - [Tasks](#tasks)
  - [Custom Tasks](#custom-tasks)
- [Extend Project (Add new specific session with template set)](#extend-project-add-new-specific-session-with-template-set)
- [Contributing](#contributing)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Versioning](#versioning)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## [](#installation)Installation
The system can be installed using the ```npm install``` command:
```bash
$ npm install snek-client
```

## [](#usage)Usage
### Set up
```typescript
import SnekClient from "snek-client";

const headers = {}
const type = "testclient"

/* Init snekclient */
const snekclient = new SnekClient(""https://engine.snek.at/api/graphiql", headers, type)
```

### Sessions
Session are completely handled by the Intel. 
```typescript
/* 
 * Starts the session for an anonymous user or maintains the session if
 * a user is logged in.
 */
await snekclient.session.begin();

/*
 * Overrides an active session with a new session using the credential
 * pair.
 */
await snekclient.session.begin({
  username: "schettn",
  password: "tschischkotschicko",
});

/* Ends the session */
await snekclient.session.end();
```
### Tasks
All tasks are session aware! Every task has the capability of token handling. Modifying a token is not suggested.
```typescript
/** Authorization Tasks */
/* Login an anonymous user on the snek-engine */
let userData =
    await snekclient.session.tasks.auth.anon();

/* Login a real user on the snek-engine */
let userData =
    await snekclient.session.tasks.auth.nonanon();

/* Refresh the user tokens on the snek-engine */
let refreshState =
    await snekclient.session.tasks.auth.refresh();

/* Revoke the user tokens on the snek-engine */
let revokeState =
    await snekclient.session.tasks.auth.revoke();


/** General Tasks */
/* Get all profile pages from snek-engine */
let pagesData =
    await snekclient.session.tasks.general.allPageUrls();

/* Get all GitLab servers from the snek-engine */
let gitlabServerData =
    await snekclient.session.tasks.general.gitlabServer();

/** User Tasks */
/* Get all GitLab servers from the snek-engine */
let cachePageData =
    await snekclient.session.tasks.user.cache();

/* Get the profile page data from the snek-engine */
let profilePageData =
    await snekclient.session.tasks.user.profile();

/* Get the registration data from snek-engine */
let registrationData =
    await snekclient.session.tasks.user.registration();

/* Get the whoami data from snek-engine */
let whoamiData =
    await snekclient.session.tasks.user.whoami();
```

### Custom Tasks
```typescript
/* 
 * Performs a custom session aware task. Authorization is handled via the session.
 */
await snekclient.session.customTask<{ data: { foo: string; bar: string } }>(
      "query",
      documentNode,
      variables
    );
```

## Extend Project (Add new specific session with template set)
Ref: github.com/snek-at/client/blob/master/src/session/sessions.ts
```typescript
//> Tasks
// Contains SNEK tasks
import CustomTasks from "../templates/customsnek/gql/tasks/index";

class CustomSession extends CookieSession {
  public tasks = CustomTasks;

  /**
   * Initializes a custom session.
   *
   * @constructor
   * @extends CookieSession Tokens are handled via cookies
   * @author Nico Schett <contact@schett.net>
   * @param {string} sId A session name
   * @param {Endpoint} ep A endpoint
   * @param {SnekTemplate} template A template set
   */
  constructor(
    sId: string,
    public ep: ApolloEndpoint,
    public template: SnekTemplate
  ) {
    super(sId);

    this.tokenName = sId + "-" + this.tokenName;
    this.refreshTokenName = sId + "-" + this.refreshTokenName;
    this.tasks = new CustomTasks(this);
  }

  //> Methods
}


/* Custom Client*/
class CustomClient extends Client {
  gql: ApolloEndpoint;
  template: IMainTemplate;
  session: SnekSession;

  /**
   * Initializes a SNEK client.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param url The base URL the SnekClient should be working on.
   *            Default: "https://engine.snek.at/api/graphiql".
   * @param headers A object containing various request headers
   * @param type A type description to differ between multiple instances
   */
  constructor(
    url: string = "https://engine.snek.at/api/graphiql",
    headers: object = {},
    type: string = "graphql"
  ) {
    super({ type, url, headers });

    this.template = new MainTemplate();
    this.gql = new Apollo(url, { headers });
    this.session = new CustomSession("snek", this.gql, this.template.snek);
  }
}
```

## [](#contributing)Contributing
![GitHub last commit](https://img.shields.io/github/last-commit/snek-at/intel) ![GitHub issues](https://img.shields.io/github/issues-raw/snek-at/intel) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/snek-at/intel?color=green)

Please read through our [contributing guidelines](https://github.com/snek-at/front/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

All code should conform to the [Code Guide](https://github.com/snek-at/tonic/blob/master/STYLE_GUIDE.md), maintained by [SNEK](https://github.com/snek-at).

## [](#bug-and-feature-requests)Bugs and feature requests

Do you have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea has not been addressed yet, [please open a new issue](https://github.com/snek-at/package-template/issues/new/choose).

## [](#versioning)Versioning
![GitHub package.json version](https://img.shields.io/github/package-json/v/snek-at/intel)

For reasons of transparency concering our release cycle and in striving to maintain backward compatibility, this repository is maintained under [the Semantic Versioning guidelines](https://semver.org/). Some minor screw ups aside, we try to adhere to those rules whenever possible.

## [](#creators)Creators
<table border="0">
	<tr>
		<td>
		<a href="https://github.com/schettn">
			<img src="https://avatars.githubusercontent.com/schettn?s=100" alt="Avatar schettn">
		</a>
		</td>
		<td>
			<a href="https://github.com/pinterid">
				<img src="https://avatars.githubusercontent.com/pinterid?s=100" alt="Avatar pinterid">
			</a>
		</td>	
		<td>
			<a href="https://github.com/kleberbaum">
				<img src="https://avatars.githubusercontent.com/kleberbaum?s=100" alt="Avatar kleberbaum">
			</a>
		</td>
	</tr>
	<tr>
		<td><a href="https://github.com/schettn">Nico Schett</a></td>
		<td><a href="https://github.com/pinterid">David Pinterics</a></td>
		<td><a href="https://github.com/kleberbaum">Florian Kleber</a></td>
	</tr>
</table>

## [](#thanks)Thanks
We do not have any external contributors yet, but if you want your name to be here, feel free to [contribute to our project](#contributing).

## [](#copyright-and-license)Copyright and license
![GitHub repository license](https://img.shields.io/badge/license-EUPL--1.2-blue)

SPDX-License-Identifier: (EUPL-1.2)
Copyright © 2019-2020 Simon Prast
Copyright © Simon Prast
