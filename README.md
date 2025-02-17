# ActivityInfo-SDK ![npm](https://img.shields.io/npm/v/activityinfo-sdk)

TypeScript SDK to interact with the [ActivityInfo](https://www.activityinfo.org/) API.
Includes a TypeScript interface builder that facilitates data submission to a database using a human-readable structure.

## Install
```ts
npm install activityinfo-sdk
```

## Generate schema


## Submit an activity using pre-built interfaces
The example below use the pre-generated `AiTypeSnfiRmm` schema  example shows how to submit an activity to the database:

`2025 Ukraine Response Planning & Monitoring` **/** `Response Monitoring Module (RMM)` **/** `SNFI RMM`

```ts
import {AiClient} from 'activityinfo-sdk'
import {AiTypeSnfiRmm} from 'activityinfo-sdk/schema'

// Define an activity record
const submission: AiTypeSnfiRmm = {
  org_rep: 'Danish Refugee Council (DRC)',
  adm1: 'Chernihivska_Чернігівська',
  adm2: 'Chernihivskyi_Чернігівськии',
  adm3: 'Chernihivska_UA2302015_Чернігівська',
  adm4: 'Chernihiv_UA7410039001_Чернігів',
  plan_code: 'SNFI-DRC-00001' as never,
  indicator: 'Emergency NFI support > # reached through donation of NFIs (Invincibility Points, bomb shelters, transit centers) > in-kind',
  theme: 'No specific theme',
  month_rep: '2025-01',
  popgroup: 'Internally Displaced',
  nonind: 10,
  ind_total: 20,
  ind_girls: 5,
  ind_boys: 5,
  ind_admen: 5,
  ind_adwomen: 5,
  ind_oldmen: 0,
  ind_oldwomen: 0,
  ind_pwd: 2,
  outscope_type: 'Outside priority areas',
}

// Convert the submission into a request format compatible with the ActivityInfo API
const request = AiTypeSnfiRmm.buildRequest(submission, 'mycustomid002')

// Initialize client to interact with API
const client = new AiClient('<PRIVATE ACTIVITYINFO TOKEN>')

// Submit the record to ActivityInfo
await client.submit(AiTypeSnfiRmm.buildRequest(submission, 'mycustomid002'))
```

## API Client