/**
 * Canonical metrics for the marketing site.
 *
 * Operational scale — company reporting (2022 web content baseline; field totals
 * unchanged until newer audited figures are provided).
 *
 * Research-backed outcomes — `assets/reference/research/`:
 * - 60 Decibels Impact Performance Report (Jul–Aug 2025, n=201 spinners)
 * - CEEW Impact Assessment findings (N=277 machine users)
 * - CEEW Powering Livelihoods market study (2021, sector context)
 */
export const SITE_METRICS = {
  foundedYear: 2012,
  programsSinceYear: 2019,
  machinesDeployed: 13000,
  villages: 350,
  states: 16,
  womenProducers: 15000,
  ruralProducers: 18000,
  peopleBenefited: 40000,
  productivityRange: "200–400%",
  /** CEEW impact assessment: share of RS users reporting higher income (N=277). */
  incomeIncreasePercent: 88,
  co2TonnesAnnual: 6000,
  unnatiMachinesInstalled: 6000,
  silkySpinMachinesInstalled: 2000,
  teamSize: 22,
  fieldTechnicians: 20,
  visionProducersTarget: 500000,
} as const;

/** Verified survey findings from independent research (2021–2025). */
export const RESEARCH_METRICS = {
  decibelsSurveyYear: 2025,
  spinnersInterviewed: 201,
  machineUsersInterviewed: 103,
  ceeewSampleSize: 277,
  qualityOfLifeImprovedPercent: 83,
  qualityOfLifeGreatlyImprovedPercent: 24,
  confidenceImprovedPercent: 95,
  financialDecisionImprovedPercent: 75,
  incomeIncreasedMachineUsersPercent: 78,
  incomeIncreasedAllUsersPercent: 88,
  netPromoterScore: 58,
  promoterPercent: 70,
  firstTimeMachineAccessPercent: 78,
  silkUnder500gBeforePercent: 72,
  silkOver500gAfterPercent: 56,
  spinnersMajorIncomeFromSilkPercent: 33,
  technicalTrainingReceivedPercent: 88,
  easierToSellSilkPercent: 96,
  typicalSellPriceInrPerKg: "₹2,000–3,000",
  medianUsageMonthsPerYear: 10,
  medianUsageHoursPerDay: 5,
  shgMembershipPercent: 47,
  gridAtUsageSitePercent: 93,
  machineChallengesPercent: 34,
  incomeIncreaseReasons: {
    yarnQuality: 61,
    technicalTraining: 54,
    productivity: 40,
    businessTraining: 28,
    marketAccess: 19,
  },
} as const;

export const RESEARCH_SOURCES = [
  {
    title: "Resham Sutra Impact Performance Report",
    publisher: "60 Decibels",
    year: 2025,
    note: "201 phone interviews (103 machine users), Jul–Aug 2025",
  },
  {
    title: "Resham Sutra Impact Assessment findings",
    publisher: "CEEW / Emotive Lens",
    year: null,
    note: "277 machine users surveyed",
  },
  {
    title: "Energy-Efficient Silk Spinning and Reeling Machines",
    publisher: "CEEW & Villgro (Powering Livelihoods)",
    year: 2021,
    note: "Sector market sizing and value-chain analysis",
  },
] as const;
