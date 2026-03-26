export const stageOptions = ['all', 'new', 'contacted', 'proposal', 'negotiating', 'won', 'lost']

export const industryOptions = ['all', 'beauty', 'beverage', 'technology', 'food', 'lifestyle', 'fashion']

export const priorityOptions = ['all', 'high', 'medium', 'low']

export const collaborationOptions = [
  'all',
  'titleSponsor',
  'sponsor',
  'specialSponsor',
  'productPlacement',
  'coCreatedContent',
]

export const programStatusOptions = ['existingLicensed', 'planning', 'clientOwned']

export const contactChannelOptions = ['phone', 'email', 'wechat', 'inPerson', 'other']

export const sameFrameTypeOptions = ['notRequired', 'productOnly', 'talentAndProduct', 'multiTalent']

export const sampleRecords = [
  {
    id: 1,
    brandName: 'Lumiere Beauty',
    contactPerson: 'Ava Chen',
    contactChannel: 'email',
    contactDetail: 'ava.chen@lumierebeauty.com',
    industry: 'beauty',
    productName: 'Radiance Serum',
    productFeature: 'Barrier-repair serum with fast absorption and visible glow support.',
    targetAudience: 'Women aged 25-35 focused on premium skincare and daily routines.',
    intendedProgram: 'Glow Journal Season 2',
    programStatus: 'existingLicensed',
    collaborationTypes: ['titleSponsor', 'coCreatedContent'],
    budget: '$120,000',
    sameFrameRequired: 'yes',
    sameFrameType: 'talentAndProduct',
    specialRequirements:
      'Needs two hero shots with talent plus a short teaser cut for paid social usage.',
    stage: 'negotiating',
    priority: 'high',
    nextFollowUpDate: '2026-03-28',
    notes:
      'Legal team is reviewing exclusivity language. Business team wants to confirm production slots this week.',
  },
  {
    id: 2,
    brandName: 'NorthPeak Sparkling',
    contactPerson: 'Marcus Reed',
    contactChannel: 'wechat',
    contactDetail: 'northpeak_marcus',
    industry: 'beverage',
    productName: 'Citrus Spark Zero',
    productFeature: 'Zero-sugar sparkling drink positioned around clean taste and summer refreshment.',
    targetAudience: 'Urban young professionals looking for low-calorie beverage alternatives.',
    intendedProgram: 'Weekend Escape',
    programStatus: 'planning',
    collaborationTypes: ['sponsor', 'productPlacement'],
    budget: '$85,000',
    sameFrameRequired: 'no',
    sameFrameType: 'notRequired',
    specialRequirements:
      'Requests sparkling beverage category exclusivity during the campaign run.',
    stage: 'proposal',
    priority: 'high',
    nextFollowUpDate: '2026-03-27',
    notes:
      'Proposal already sent. Client is waiting for regional audience proof points before internal approval.',
  },
  {
    id: 3,
    brandName: 'Orbit Mobile',
    contactPerson: 'Daniel Wu',
    contactChannel: 'phone',
    contactDetail: '+86 138 1024 8899',
    industry: 'technology',
    productName: 'Orbit X Fold',
    productFeature: 'Foldable flagship phone highlighting productivity and creator-friendly camera workflows.',
    targetAudience: 'Tech-forward creators, gadget enthusiasts, and premium Android switchers.',
    intendedProgram: 'Creator Lab',
    programStatus: 'clientOwned',
    collaborationTypes: ['specialSponsor', 'coCreatedContent'],
    budget: '$160,000',
    sameFrameRequired: 'yes',
    sameFrameType: 'multiTalent',
    specialRequirements:
      'Deliverables must include both 16:9 and 9:16 formats with pre-approved demo angles.',
    stage: 'won',
    priority: 'medium',
    nextFollowUpDate: '2026-04-02',
    notes:
      'Commercial terms are signed. Waiting for the client team to lock the production calendar.',
  },
  {
    id: 4,
    brandName: 'Harvest Bowl',
    contactPerson: 'Nina Patel',
    contactChannel: 'inPerson',
    contactDetail: 'Shanghai office meeting',
    industry: 'food',
    productName: 'Protein Grain Bowl',
    productFeature: 'Ready-to-eat healthy lunch product with office convenience and balanced nutrition.',
    targetAudience: 'Office workers seeking quick weekday meal options with wellness positioning.',
    intendedProgram: 'Office Lunch Notes',
    programStatus: 'planning',
    collaborationTypes: ['productPlacement'],
    budget: '$28,000',
    sameFrameRequired: 'no',
    sameFrameType: 'notRequired',
    specialRequirements:
      'Wants office-friendly storytelling with a strong employee wellness angle.',
    stage: 'contacted',
    priority: 'low',
    nextFollowUpDate: '2026-04-05',
    notes:
      'Intro meeting completed. Brand is open to a trial integration if sample feedback is positive.',
  },
  {
    id: 5,
    brandName: 'Canvas Home',
    contactPerson: 'Olivia Park',
    contactChannel: 'other',
    contactDetail: 'LinkedIn: olivia-park-canvas-home',
    industry: 'lifestyle',
    productName: 'Modular Storage Set',
    productFeature: 'Flexible home organization system designed for small apartments and family spaces.',
    targetAudience: 'Home organizers, young families, and renters interested in storage solutions.',
    intendedProgram: 'Reset Your Space',
    programStatus: 'existingLicensed',
    collaborationTypes: ['sponsor'],
    budget: '$52,000',
    sameFrameRequired: 'no',
    sameFrameType: 'notRequired',
    specialRequirements:
      'Prefers evergreen YouTube content with brand mention included in the description copy.',
    stage: 'new',
    priority: 'medium',
    nextFollowUpDate: '2026-03-31',
    notes: 'Need a warm introduction to the marketing director before sharing a first proposal.',
  },
  {
    id: 6,
    brandName: 'Maison Thread',
    contactPerson: 'Sophie Laurent',
    contactChannel: 'email',
    contactDetail: 's.laurent@maisonthread.com',
    industry: 'fashion',
    productName: 'Spring Capsule Collection',
    productFeature: 'Seasonal wardrobe line centered on versatile styling and visible brand design language.',
    targetAudience: 'Fashion-conscious women aged 22-34 following premium styling and trend content.',
    intendedProgram: 'City Edit',
    programStatus: 'existingLicensed',
    collaborationTypes: ['specialSponsor', 'productPlacement'],
    budget: '$98,000',
    sameFrameRequired: 'yes',
    sameFrameType: 'talentAndProduct',
    specialRequirements:
      'Requests logo visibility moments and two still images for retail partner newsletters.',
    stage: 'negotiating',
    priority: 'high',
    nextFollowUpDate: '2026-03-26',
    notes:
      'Budget approval is expected this week. Creative team already likes the wardrobe integration angle.',
  },
]
