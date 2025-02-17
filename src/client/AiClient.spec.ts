import {describe, it} from 'node:test'
import assert from 'node:assert'
import {AiClient} from './AiClient'
import {env} from '../utils/Env'
import {AiTypeProtectionRmm} from '../schema/2024/AiTypeProtectionRmm'
import {AiTypeSnfiRmm} from '../schema/2025/AiTypeSnfiRmm'

describe('AiClient', () => {
  const client = new AiClient(env.ACTIVITY_INFO_API_TOKEN)
  // it('Nested interface', async () => {
  //   const data: AiTypeProtectionRmm = {
  //     org_rep: 'Danish Refugee Council (DRC)',
  //     plan_code: '' as any,
  //     adm1: 'Chernihivska_Чернігівська',
  //     adm2: 'Chernihivskyi_Чернігівськии',
  //     adm3: 'Chernihivska_UA2302015_Чернігівська',
  //     adm4: 'adm4',
  //     theme: 'No specific theme',
  //     Activities_and_people: [
  //       {
  //         month_rep: '2025-01',
  //         popgroup: 'Internally Displaced',
  //         indicator: 'Assessments (community level) > # of protection assessments conducted',
  //         ind_total: 1,
  //         ind_girls: 1,
  //         ind_boys: 1,
  //         ind_adwomen: 1,
  //         ind_admen: 1,
  //         ind_oldwomen: 1,
  //         ind_oldmen: 1,
  //         nonind: 1,
  //         ind_pwd: 1,
  //         hnrp_scope: 'Outside HNRP Scope',
  //         outscope_type: 'Delivered outside HNRP​ mechanism',
  //       },
  //       {
  //         month_rep: '2025-01',
  //         popgroup: 'Internally Displaced',
  //         indicator: 'Assessments (community level) > # of protection assessments conducted',
  //         ind_total: 11,
  //         ind_girls: 11,
  //         ind_boys: 11,
  //         ind_adwomen: 11,
  //         ind_admen: 11,
  //         ind_oldwomen: 11,
  //         ind_oldmen: 11,
  //         nonind: 11,
  //         ind_pwd: 11,
  //         hnrp_scope: 'Outside HNRP Scope',
  //         outscope_type: 'Delivered outside HNRP​ mechanism',
  //       },
  //     ],
  //   }
  //   const request = AiTypeProtectionRmm.buildRequest(data, 'deleteme202502')
  //   assert.deepEqual(request, [
  //     {
  //       formId: 'czd5jf7lqf2zv4r4r',
  //       recordId: 'deleteme202502',
  //       parentRecordId: null,
  //       fields: {
  //         cvb0gcplqf3085j4s: undefined,
  //         c1g03yllqf3085j4t: 'czbgrslpwg36j52:cloyih3lpwhjdsu2r0',
  //         ct68whplqf3085j4u: undefined,
  //         cz796xnlqf3085j4v: undefined,
  //         ctn2ej8lqf3085j4w: undefined,
  //         c6bulw2lqf3085j4y: 'cemuxawlq3kfmqf2:c7jz1shlq3kjj6hf',
  //         cb39ganlqf3085j4z: 'cd5q9sdlq3kklo314:chjhfwtlq3kose057',
  //         cmdrqq8lqf3085j50: 'cwlaxxlq3kp2bu5a:cjdu9g3lq3lagbr2ns',
  //         cn43jajlqf3085j51: 'adm4',
  //         ce0zvlllqf3085j52: undefined,
  //         c18374vlqf3085j54: 'c40c4vklqf3085j55',
  //       },
  //     },
  //     {
  //       formId: 'c4u0d3glqf3085j58',
  //       recordId: 'deleteme202502i0',
  //       parentRecordId: 'deleteme202502',
  //       fields: {
  //         c3qgzazlqf3umfi5q: '2025-01',
  //         cfk8s3wlqf3umfi5r: 'cf8ig2alq6dbe8t2:cvw4on6lq6dgcoj5',
  //         cdy5p8nlqf3umfi5s: 'c8uhbuclqb1fjlg2:cckhamclqmgu66v24',
  //         c91ka88lqf3umfi5w: 1,
  //         cehoaaplqf3umfi5x: 1,
  //         co2cpjrlqf3umfi5y: 1,
  //         cosf9hmlqf3umfi5z: 1,
  //         cug19qulqf3umfi60: 1,
  //         cdrd176lqf3umfi61: 1,
  //         c81tgzdlqf3umfi62: 1,
  //         cnaij95lqf3umfi63: 1,
  //         cz8i6pylqf3umfi64: 1,
  //         cpzldoslw6fmn973: 'ckx98ielw6fmn962',
  //         cfjmcc9lw6fyn0w4: 'cs4astklw6ftd2y2:cj4y1s3lw6furva6',
  //       },
  //     },
  //     {
  //       formId: 'c4u0d3glqf3085j58',
  //       recordId: 'deleteme202502i1',
  //       parentRecordId: 'deleteme202502',
  //       fields: {
  //         c3qgzazlqf3umfi5q: '2025-01',
  //         cfk8s3wlqf3umfi5r: 'cf8ig2alq6dbe8t2:cvw4on6lq6dgcoj5',
  //         cdy5p8nlqf3umfi5s: 'c8uhbuclqb1fjlg2:cckhamclqmgu66v24',
  //         c91ka88lqf3umfi5w: 11,
  //         cehoaaplqf3umfi5x: 11,
  //         co2cpjrlqf3umfi5y: 11,
  //         cosf9hmlqf3umfi5z: 11,
  //         cug19qulqf3umfi60: 11,
  //         cdrd176lqf3umfi61: 11,
  //         c81tgzdlqf3umfi62: 11,
  //         cnaij95lqf3umfi63: 11,
  //         cz8i6pylqf3umfi64: 11,
  //         cpzldoslw6fmn973: 'ckx98ielw6fmn962',
  //         cfjmcc9lw6fyn0w4: 'cs4astklw6ftd2y2:cj4y1s3lw6furva6',
  //       },
  //     },
  //   ])
  // })

  it('Simple interface', () => {
    const data: AiTypeSnfiRmm = {
      'Reporting Organization': 'Danish Refugee Council (DRC)',
      Oblast: 'Chernihivska_Чернігівська',
      Raion: 'Chernihivskyi_Чернігівськии',
      Hromada: 'Chernihivska_UA2302015_Чернігівська',
      Settlement: 'Chernihiv_UA7410039001_Чернігів',
      'Plan/Project Code': 'SNFI-DRC-001' as never,
      'Indicators - SNFI':
        'Emergency NFI support > # reached through donation of NFIs (Invincibility Points, bomb shelters, transit centers) > in-kind',
      Theme: 'No specific theme',
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

    const request = AiTypeSnfiRmm.buildRequest(data, 'deletemesnfi2025')
    assert.deepEqual(request, [
      {
        formId: 'cmasgbem5w7pgf02',
        recordId: 'deletemesnfi2025',
        parentRecordId: null,
        fields: {
          c5i3wifm5w7q3vq4: 'cideet6m4jy2m0fy3x:cjmwszwm4s8hlkyrae',
          cn33ikom5w7q3vq5: undefined,
          cx8b8s5m6ul1gml2: 'ctgic3km6ukvzc22:undefined',
          ceiqk7wm697ng7n2: 'cxff543m4r94qi4d:c5gtxa7m6f3xnh28',
          cx1f1xtm5w7q3vqb: 'cu5nj6em5w7q3vqc',
          czi6xi7m5w7q3vqe: 'ciok70dm4r8lp7f2:c59kitcm4r8z2zgh',
          c9jdhgpm5w7q3vqf: 'c1v215km4s71ndl22:cw0oma4m5mo1opi3y',
          cuzmwpvm5w7q3vsh: 'cu8n0g0m4s7y2p16b:cxv57e2m5mp72a8g5w',
          c42av3m5w7q3vsj: 'cyr4ry4m4s81hdd6v:cbvvjepm5mqeqhhmxa',
          cukxnnum73gr39e2: undefined,
          cwy07nvm5w7q3vsm: '2025-01',
          cxukplim5w7q3vsn: undefined,
          cyrbergm5w7q3vso: undefined,
          c34r0rcm5w7q3vsq: 'cknn1yzm4s6xuox1x:c3yfomom4s6zizi20',
          cec1r1cm5w7q3vss: 10,
          cptm3phm5w7q3vst: 20,
          cxchrp3m5w7q3vsu: 5,
          cwhznqsm5w7q3vtv: 5,
          cqxytp7m5w7q3vtw: 5,
          c905xm4m5w7q3vtx: 5,
          cmt1lkxm5w7q3vty: 0,
          c8qlzrcm5w7q3vtz: 0,
          cdn7buym5w7q3vt10: 2,
          c1vmga5m5w7q3vt11: undefined,
          ct2ezbgm5w7q3vt13: 'ch0e182m4vgc05r2:c3ap6l0m4vgd4ov4',
        },
      },
    ])
  })
})
