# ActivityInfo-SDK ![npm](https://img.shields.io/npm/v/activityinfo-sdk)

TypeScript SDK to interact with the [ActivityInfo](https://www.activityinfo.org/) API.
Includes a TypeScript interface builder that facilitates data submission to a database using a human-readable structure.

## ⬇️ Install
```ts
npm install activityinfo-sdk
```

## 🛜  Submitting an Activity Record
The SDK provides pre-built interfaces for Humanitarian Ukraine databases (2025).
The example below demonstrates submitting a record to the SNFI RMM database.

> [!TIP]
> To generate additional schemas, see the next section: [Generating a schema](#-generating-a-schema).

You can specify a `Record ID`, which will appear under the same column name in ActivityInfo.

> [!IMPORTANT]  
> **Note:** If a `Record ID` is provided, repeated submissions will update the existing record instead of creating duplicates.

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
const client = new AiClient('<YOUR_ACTIVITYINFO_TOKEN>')

// Submit the record to ActivityInfo
await client.submit(AiTypeSnfiRmm.buildRequest(submission, 'mycustomid002'))
```

## ⚙️ Generating a Schema

The library already exports schemas from the Humanitarian Ukraine databases for 2025.
```ts
import {AiBuilder} from 'activityinfo-sdk'

const builder = new AiBuilder({
  activityInfoToken: 'TOKEN',
  outDir: './' // Directory where the generated schema will be saved
})
// Generate a TypeScript interface for a specific ActivityInfo form
builder.generateInterface({
  // The form ID is extracted from the URL of the form in ActivityInfo.
  // Example URL: https://www.activityinfo.org/app#form/cmasgbem5w7pgf02/display/c4l7nlem74zbq7erg
  formId: 'c4l7nlem74zbq7erg',

  // Optional settings to customize how specific questions are handled
  questionSettings: {
    'Raion': {
      // If true, this question will be excluded from the generated schema
      skip: false,

      // If true, an autocomplete question will be treated as a free-text input
      skipChoices: false,

      // Filters choices by text; only options containing "DRC" will be included
      filterChoices: _ => _.includes('DRC'),

      // For multi-input questions, specify which input labels to include in the generated choices
      selectColumnByLabels: ['SNFI Activity', 'SNFI Indicator'],
    }
  }
})
```

## 🖥️ API Client

The SDK exposes a client interfacing some API endpoints. 
```ts
import {AiClient} from 'activityinfo-sdk'
const client = new AiClient('<YOUR_ACTIVITYINFO_TOKEN>')
client...
```