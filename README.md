# SharePoint CRUD

## Summary

This WebPart provides CRUD functions to access and modify data on a SharePoint list.
It is separated on two profiles, EPS and ADM, based on SharePoint groups.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

| Dependency | Version | 
|------|---------|
|NODE: |![version](https://img.shields.io/badge/version-10.24.2-green.svg)|
|Yo: |![version](https://img.shields.io/badge/version-3.1.1-green.svg)|
|SPFx: |![version](https://img.shields.io/badge/version-1.11-green.svg)|
|React: |![version](https://img.shields.io/badge/version-16.8.5-green.svg)|

## Version history

Version|Date|Comments
-------|----|--------
1.0| September 02, 2021| Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## Features
- SharePoint Lists </br>
This WebPart consumes two list of data
  - CadastroEPS: list of companies, used on picklists.
  - CadastroBlocklist: main CRUD list

- SharePoint Groups </br>
  - Blocklist_ADM
  - Blocklist_EPS

- EPS features </br>
  Members of the group EPS can only READ data from de List.

- ADM features </br>
  Members of the group ADM can use all CRUD options.


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
