export interface terms_section {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export const terms_version = '1.0';
export const terms_effective_date = '18 July 2026';

export const terms_sections: terms_section[] = [
  {
    id: 'acceptance',
    number: '01',
    title: 'Acceptance and precedence',
    paragraphs: [
      'By commissioning me, accepting a quote, asking me to begin, or making a payment, you acknowledge these Terms of Service and the project-specific quote.',
      'The written quote controls the agreed scope, price, payment method, and schedule if it differs from this general policy. Nothing here removes rights that cannot legally be waived.',
    ],
  },
  {
    id: 'scope',
    number: '02',
    title: 'Services and scope',
    paragraphs: [
      'My service covers programming. Art, models, animation, VFX, UI design, audio, and other production work are excluded unless the quote explicitly includes them.',
      'You are responsible for supplying the specifications, assets, access, test requirements, and feedback needed to complete the commission. New features or changed requirements are outside the original scope.',
    ],
  },
  {
    id: 'quotes',
    number: '03',
    title: 'Quotes and scheduling',
    paragraphs: [
      'A quote is fixed once accepted unless the scope changes. Work begins after the 50% upfront payment has cleared and I have received the materials needed to start.',
      'Timelines are good-faith estimates. Client delays, missing dependencies, platform incidents, or changes outside my control may move the delivery date.',
    ],
  },
  {
    id: 'payment',
    number: '04',
    title: 'Payment',
    paragraphs: [
      'Unless the quote says otherwise, 50% is due upfront and the remaining 50% is due after a recorded demonstration but before any playable access, editable source code, or final files are handed over.',
    ],
    bullets: [
      'PayPal or Robux is accepted only when the chosen method is written in the quote.',
      'You cover transaction and platform fees so the amount I receive equals the accepted quote.',
      'A Robux quote states an exact amount and a Roblox-compliant payment method. Robux is not represented as cash or guaranteed DevEx value.',
      'You confirm that you are authorized to commission the work and use the selected payment account or method.',
    ],
  },
  {
    id: 'revision',
    number: '05',
    title: 'Demo, revision, and approval',
    paragraphs: [
      'Before the final balance is requested, I send a recorded demonstration of the working system. This is a review opportunity, not access to the test place, playable build, project, or source code.',
      'One reasonable revision round within the original written scope is included.',
      'New systems, redesigned behavior, or requests that contradict the accepted specification require a separate quote and may change the schedule.',
    ],
  },
  {
    id: 'delivery',
    number: '06',
    title: 'Delivery',
    paragraphs: [
      'Playable or test-place access, project access, editable source code, and final files are delivered only after full cleared payment. A reversed or disputed payment suspends delivery and the usage licence until the payment issue is resolved.',
      'Progress messages and recorded demonstrations are previews. They are not delivery and do not grant access to or a licence to use the work.',
      'After handover, you are responsible for keeping backups of the delivered files and credentials.',
    ],
  },
  {
    id: 'bugs',
    number: '07',
    title: 'Bug-fix period',
    paragraphs: [
      'Verified defects that cause the delivered work to fail the accepted specification are fixed free for seven calendar days after delivery.',
      'Client edits, third-party code, misuse, new requirements, and later Roblox or API changes are not included. Continued maintenance is quoted separately.',
    ],
  },
  {
    id: 'cancellation',
    number: '08',
    title: 'Cancellation and refunds',
    paragraphs: [
      'If either side cancels, completed work is measured against agreed milestones or documented progress. You pay for completed work, and unused prepaid amounts are returned through the original method where possible.',
      'Nonrecoverable platform fees may be excluded from a refund unless mandatory law requires otherwise. If I cancel, unearned amounts are returned and paid completed work may still be delivered.',
      'Applicable consumer withdrawal, refund, and other mandatory rights remain unaffected.',
    ],
  },
  {
    id: 'inactivity',
    number: '09',
    title: 'Inactivity',
    paragraphs: [
      'The schedule pauses after seven days without required communication, feedback, access, or assets from you.',
      'After thirty days, I may close the commission and bill completed work. Restarting depends on my availability and may require a new timeline.',
    ],
  },
  {
    id: 'licence',
    number: '10',
    title: 'Code licence and ownership',
    paragraphs: [
      'After full payment, you receive a non-exclusive licence to use and modify the delivered code in the Roblox experience named in the quote.',
    ],
    bullets: [
      'You may not resell, sublicense, publish, or redistribute the commissioned system as standalone code.',
      'I retain ownership and may reuse or relicense techniques, architecture, utilities, and similar code.',
      'Client-provided and third-party assets keep their existing ownership and licence terms.',
    ],
  },
  {
    id: 'confidentiality',
    number: '11',
    title: 'Portfolio and confidentiality',
    paragraphs: [
      'I will not show commissioned work publicly without your written permission. Permission can limit exactly what may be shown, and refusing permission does not affect the service you receive.',
      'Private assets, unreleased projects, credentials, and confidential project information will not be disclosed.',
    ],
  },
  {
    id: 'responsibilities',
    number: '12',
    title: 'Client responsibilities and prohibited work',
    paragraphs: [
      'You confirm that you have the rights and permissions needed for the assets, access, and instructions you provide.',
      'I refuse exploits, malware, credential theft, stolen content, deceptive systems, and work that violates Roblox rules. Abuse, fraud, or unauthorized chargebacks may end the commission.',
    ],
  },
  {
    id: 'limitations',
    number: '13',
    title: 'Limitations',
    paragraphs: [
      'Work is built and tested professionally, but I do not promise revenue, popularity, permanent compatibility, zero downtime, or complete immunity from exploitation.',
      'To the extent mandatory law allows, I am not responsible for indirect losses or failures caused by client changes, third parties, supplied assets, or later platform changes.',
    ],
  },
  {
    id: 'updates',
    number: '14',
    title: 'Updates and contact',
    paragraphs: [
      'Later versions of these terms apply to future commissions, not active ones, unless both sides agree otherwise in writing.',
      'Questions or disputes should be raised through my listed Discord account first so there is a chance to resolve them directly.',
    ],
  },
];
