# ActivityInfo-SDK ![npm](https://img.shields.io/npm/v/activityinfo-sdk)

TypeScript SDK to interact with the [ActivityInfo](https://www.activityinfo.org/) API.
Includes a TypeScript interface builder that facilitates data submission to a database using a human-readable structure.

## ⬇️ Install
```bash
npm install activityinfo-sdk
```

## 🛜  Submitting an Activity Record

### Simple schema 

The SDK provides pre-built interfaces for Humanitarian Ukraine databases (2025).
The example below demonstrates submitting a record to the SNFI RMM database.

> [!TIP]
> To generate additional schemas, see the next section: [Generating a schema](#-generating-a-schema).

You can specify a `Record ID`, which will appear under the same column name in ActivityInfo.

> [!IMPORTANT]  
> **Note:** If a `Record ID` is provided, repeated submissions will update the existing record instead of creating duplicates.

```ts
import {AiClient} from 'activityinfo-sdk'
import {schema} from 'activityinfo-sdk/schema'

// Define an activity record
const submission: schema.ua2025.AiTypeSnfiRmm = {
  'Reporting Organization': 'Danish Refugee Council (DRC)',
  'Oblast': 'Chernihivska_Чернігівська',
  'Raion': 'Chernihivskyi_Чернігівськии',
  'Hromada': 'Chernihivska_UA2302015_Чернігівська',
  'Settlement': 'Chernihiv_UA7410039001_Чернігів',
  'Plan/Project Code': 'SNFI-DRC-001', // If using pre-generated interfaces, this property must be set manually based on your current plan codes.
  'Indicators - SNFI': 'Emergency NFI support > # reached through donation of NFIs (Invincibility Points, bomb shelters, transit centers) > in-kind',
  'Theme': 'No specific theme',
  'Reporting Month': '2025-01',
  'Population Group': 'Internally Displaced',
  'Non-individuals Reached': 10,
  'Total Individuals Reached': 20,
  'Boys (0-17)': 5,
  'Girls (0-17)': 5,
  'Adult Women (18-59)': 5,
  'Adult Men (18-59)': 5,
  'Older Women (60+)': 0,
  'Older Men (60+)': 0,
  'People with disability': 2,
  'Outside HNRP Scope sub-category': 'Outside priority areas',
}

// Convert the submission into a request format compatible with the ActivityInfo API
const request = schema.ua2025.AiTypeSnfiRmm.buildRequest(submission, 'mycustomid002')

// Initialize the client to interact with API
const client = new AiClient('<YOUR_ACTIVITYINFO_TOKEN>')

// Submit the record to ActivityInfo
await client.submit(request)
```

### Nested schema

```ts
import {AiClient} from 'activityinfo-sdk'
import {schema} from 'activityinfo-sdk/schema'

// Define an activity record
const data: schema.ua2025.AiTypeProtectionRmm = {
  'Reporting Organization': 'Danish Refugee Council (DRC)',
  'Plan/Project Code': 'DRC-PROT-001' as '',
  'Oblast': 'Chernihivska_Чернігівська',
  'Raion': 'Chernihivskyi_Чернігівськии',
  'Hromada': 'Chernihivska_UA2302015_Чернігівська',
  'Response Theme': 'No specific theme',
  'Activities and People': [
    {
      'Adult Men (18-59)': 0,
      'Adult Women (18-59)': 1,
      'Boys (0-17)': 2,
      'Girls (0-17)': 3,
      'Indicators': 'Advocacy - Protection > # of advocacy interventions undertaken on protection issues',
      'Non-individuals Reached/Quantity': 1,
      'Older Men (60+)': 4,
      'Older Women (60+)': 5,
      'People with Disability': 1,
      'Reporting Month': '2025-01',
      'Total Individuals Reached': 16,
      'Population Group': 'Internally Displaced',
    }, {
      'Adult Men (18-59)': 0,
      'Adult Women (18-59)': 1,
      'Boys (0-17)': 2,
      'Girls (0-17)': 3,
      'Indicators': 'Advocacy - Protection > # of advocacy interventions undertaken on protection issues',
      'Non-individuals Reached/Quantity': 1,
      'Older Men (60+)': 4,
      'Older Women (60+)': 5,
      'People with Disability': 1,
      'Reporting Month': '2025-01',
      'Total Individuals Reached': 16,
      'Population Group': 'Non-Displaced',
    },
  ],
}

// Convert the submission into a request format compatible with the ActivityInfo API
const request = schema.ua2025.AiTypeProtectionRmm.buildRequest(data, 'prot202501')

// Initialize the client to interact with API
const client = new AiClient('<YOUR_ACTIVITYINFO_TOKEN>')

// Submit the record to ActivityInfo
await client.submit(request)
```

## ⚙️ Generating a Schema

The library already exports schemas from the Humanitarian Ukraine databases for 2025.
```ts
import {AiBuilder} from 'activityinfo-sdk'

const builder = new AiBuilder({
  activityInfoToken: 'TOKEN',
  outDir: './' // Directory where the generated schema will be saved
})

builder.generateInterface({
  // The form ID is extracted from the URL of the form in ActivityInfo.
  // Example URL: https://www.activityinfo.org/app#form/cmasgbem5w7pgf02/display/c4l7nlem74zbq7erg
  formId: 'c4l7nlem74zbq7erg',

  // Some forms contain multiple questions with the same label but different meanings.  
  // To avoid conflicts in the generated interface, use question codes instead of labels.  
  useQuestionCode: true,
  
  // Optional settings to customize how specific questions are handled
  questionSettings: {
    'Raion': {
      // If true, this question will be excluded from the generated schema
      skip: false,

      // If true, an autocomplete question will be treated as a free-text input
      skipChoices: false,

      // Filters choices; only options containing "DRC" will be included
      filterChoices: _ => _.includes('DRC'),

      // For multi-input questions, specify which input labels to include in the generated choices
      selectColumnByLabels: ['SNFI Activity', 'SNFI Indicator'],
    }
  }
})
```

## 🖥️ API Client

The SDK provides a client for interacting with various API endpoints.

```ts
import {AiClient} from 'activityinfo-sdk'
const client = new AiClient('<YOUR_ACTIVITYINFO_TOKEN>')
client...
```