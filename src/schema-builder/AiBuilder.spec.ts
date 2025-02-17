import {describe, it} from 'node:test'
import {AiBuilder} from './AiBuilder'
import {env} from '../utils/Env'

describe('AiBuilder', () => {
  it('Run 2024', async () => {
    const builder24 = new AiBuilder({
      activityInfoToken: env.ACTIVITY_INFO_API_TOKEN,
      outDir: env.ROOT_DIR + '/2024/',
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

  it('Run 2025', async () => {
    const builder25 = new AiBuilder({
      activityInfoToken: env.ACTIVITY_INFO_API_TOKEN,
      outDir: env.ROOT_DIR + '/2025/',
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
