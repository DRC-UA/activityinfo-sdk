import {AiBuilder} from './AiBuilder'
import {env} from '../utils/Env'

describe('AiBuilder', () => {
  it('Run 2024', async () => {
    const builder24 = new AiBuilder({
      activityInfoToken: env.ACTIVITY_INFO_API_TOKEN,
      outDir: env.ROOT_DIR + '/ua/2024/',
    })
    //   await builder24.generateInterface({
    //     formId: 'c95ky7klr95z6ia3v',
    //     questionSettings: {
    //       // Oblast: {},
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //       'Reporting Organization': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Implementing Partner': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //     },
    //   })
    //   await builder24.generateInterface({
    //     formId: 'cmasgbem5w7pgf02',
    //     questionSettings: {
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //       'Reporting Organization': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Implementing Partner': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //     },
    //   })
    //   await builder24.generateInterface({
    //     formId: 'cz86p3tlqc7h66y2',
    //     questionSettings: {
    //       'Reporting Organization': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Implementing Partner': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Donor Name': {
    //         skipChoices: true,
    //       },
    //       'Sub-Implementing Partner': {
    //         skipChoices: true,
    //       },
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //     },
    //   })
    //   await builder24.generateInterface({
    //     formId: 'chxr3zlqc5qatg2',
    //     questionSettings: {
    //       'Reporting Organization': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Implementing Partner': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //     },
    //   })
    await builder24.generateSchema({
      useQuestionCode: true,
      formId: 'czd5jf7lqf2zv4r4r',
      questionSettings: {
        'Reporting Organization': {
          filterChoices: _ => _.includes('Danish Refugee Council'),
        },
        'Implementing Partner': {
          skipChoices: true,
        },
        'Implementing Partner 2': {
          skipChoices: true,
        },
        // Raion: {skipChoices: true},
        // Hromada: {skipChoices: true},
        Settlement: {skipChoices: true},
        'Collective Site': {skipChoices: true},
      },
    })
    //   await builder24.generateInterface({
    //     formId: 'c6mrp6dlqv1q7q243w',
    //     questionSettings: {
    //       'Reporting Organization': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Implementing Partner': {skipChoices: true},
    //       'Implementing Partner 2': {skipChoices: true},
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //     },
    //   })
    //
    //   await builder24.generateInterface({
    //     formId: 'cmnzatklqv1q3s243u',
    //     questionSettings: {
    //       'Reporting Organization': {
    //         filterChoices: _ => _.includes('Danish Refugee Council'),
    //       },
    //       'Implementing Partner': {skipChoices: true},
    //       'Implementing Partner 2': {skipChoices: true},
    //       OblastIndex: {skipChoices: true},
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //     },
    //   })
    //   await builder24.generateInterface({
    //     formId: 'c9vv9j8lqm633lj1tm',
    //     questionSettings: {
    //       Donor: {
    //         skipChoices: true,
    //       },
    //       'Implementing Partner': {filterChoices: _ => _.includes('Danish Refugee Council')},
    //       'Reporting Organization': {filterChoices: _ => _.includes('Danish Refugee Council')},
    //       Raion: {skipChoices: true},
    //       Hromada: {skipChoices: true},
    //       Settlement: {skipChoices: true},
    //       'Collective Site': {skipChoices: true},
    //     },
    //   })
  })

  it.only('Build 2025 location map', async () => {
    // Once build it requires some manual refacto:
    // - Rename from `AiTypeLocationMap` -> `AiLocationMap`
    // - Delete everything except `options`
    // - Rename options from `options` => `aiLocationMap`
    const enableGenerationOfAiLocationMap = false
    if (!enableGenerationOfAiLocationMap) return
    await new AiBuilder({
      activityInfoToken: env.ACTIVITY_INFO_API_TOKEN,
      outDir: env.ROOT_DIR + '/ua/2025/',
    }).generateSchema({
      formId: 'c95ky7klr95z6ia3v',
      fileName: 'LocationMap',
      questionSettings: {
        Oblast: {
          selectColumnByLabels: ['Admin1 Pcode'],
        },
        Raion: {
          selectColumnByLabels: ['Admin2 Pcode'],
        },
        Hromada: {
          selectColumnByLabels: ['Admin3 Pcode'],
        },
        Settlement: {
          selectColumnByLabels: ['Admin4 Pcode'],
        },
        'Collective Site': {skip: true},
        'Date of completion/ distribution (YYYY-MM-DD)': {skip: true},
        Comment: {skip: true},
        'Outside HNRP Scope sub-categories': {skip: true},
        'Reporting Organization': {skip: true},
        'Implementing Partner': {skip: true},
        'Plan/Project Code': {skip: true},
        'Indicators - SNFI': {skip: true},
        'Distribution through Common Pipeline': {skip: true},
        Theme: {skip: true},
        'Collective Sites': {skip: true},
        'Reporting Month': {skip: true},
        'Activity Start month': {skip: true},
        'Activity End month': {skip: true},
        'Population Group': {skip: true},
        'Non-individuals Reached': {skip: true},
        'Total Individuals Reached': {skip: true},
        'Girls (0-17)': {skip: true},
        'Boys (0-17)': {skip: true},
        'Adult Women (18-59)': {skip: true},
        'Adult Men (18-59)': {skip: true},
        'Older Women (60+)': {skip: true},
        'Older Men (60+)': {skip: true},
        'People with disability': {skip: true},
        'HNRP Scope': {skip: true},
        'Outside HNRP Scope sub-category': {skip: true},
      },
    })
  })

  it('Build 2025 form', async () => {
    const builder25 = new AiBuilder({
      activityInfoToken: env.ACTIVITY_INFO_API_TOKEN,
      outDir: env.ROOT_DIR + '/ua/2025/',
    })
    await builder25.generateSchema({
      formId: 'cvgj28ym513hkiph7y',
    })
    await builder25.generateSchema({
      formId: 'co7iurtm513bt64h7u',
    })
    await builder25.generateSchema({
      formId: 'c1viqabm4whwvwo3',
    })
    await builder25.generateSchema({
      formId: 'cmasgbem5w7pgf02',
      questionSettings: {
        Oblast: {},
        Settlement: {
          // skipChoices: true,
        },
        // 'Collective Site': {skipChoices: true},
        // 'Reporting Organization': {
        //   filterChoices: _ => _.includes('Danish Refugee Council'),
        // },
        // 'Implementing Partner': {
        //   filterChoices: _ => _.includes('Danish Refugee Council'),
        // },
      },
    })
  })
})
