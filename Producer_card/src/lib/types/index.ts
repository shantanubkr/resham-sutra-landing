export type UserRole =
  | "producer"
  | "buyer"
  | "field_operator"
  | "cluster_head"
  | "admin";
export type Locale = "en" | "hi" | "as";

export type SilkVariety = "muga" | "eri" | "mulberry" | "tassar";
export type QualityGrade = "A" | "B" | "C";

/** Official producer categories */
export type ProducerCategory =
  | "farmer"
  | "cocoon_rearer"
  | "spinner"
  | "weaver"
  | "yarn_dyer"
  | "designer";

/** Per-category skill attributes (quality / quantity / years) */
export interface ProducerCategoryEntry {
  category: ProducerCategory;
  silkType: SilkVariety;
  quality: QualityGrade;
  quantity: number;
  years: number;
}

export type OfflineManagerRole =
  | "community_resource_person"
  | "aggregator"
  | "master_trainer"
  | "quality_check_officer"
  | "packaging_dispatch_manager"
  | "accountant"
  | "procurement_inventory_manager";

export interface ClusterManagerContact {
  role: OfflineManagerRole;
  name: string;
  contact: string;
}

export interface StaffProfile {
  gender?: Gender;
  dateOfBirth?: string;
  photoUrl?: string;
  employmentType?: string;
  languagePreference?: Locale;
  homeDistrict?: string;
  educationLevel?: string;
  yearsOfExperience?: number;
  /** Resham Doot only — not shown for Cluster Head */
  kras?: string;
}

export type Gender = "female" | "male" | "other" | "prefer_not_to_say";
export type IncomeBaseline =
  | "below_5k"
  | "5k-10k"
  | "10k-20k"
  | "above_20k";
export type BuyerType = "individual" | "organisation";
export type BuyerProductType =
  | "eri_yarn"
  | "muga_yarn"
  | "mulberry_yarn"
  | "tassar_yarn"
  | "eri_fabric"
  | "muga_fabric"
  | "mulberry_fabric"
  | "tassar_fabric"
  | "eri_cocoons"
  | "muga_cocoons"
  | "mulberry_cocoons"
  | "tassar_cocoons"
  | "dyed_finished"
  | "stitched_goods";
export type SchemeTaggedBy = "auto_match" | "admin_manual";
export type EligibilityGender = "any" | "female" | "male";

/** Monthly output reported by Resham Doot per artisan */
export interface ProducerMonthlyOutput {
  silkWovenMeters: number;
  produceKg: number;
  cocoonsKg: number;
  /** Granular catalog product volumes (yarn, fabric, cocoons by silk variety) */
  products?: Partial<Record<BuyerProductType, number>>;
}

export interface User {
  id: string;
  phone: string;
  email: string | null;
  role: UserRole;
  clusterIds: string[];
  producerId: string | null;
  buyerId: string | null;
  name: string;
  isActive: boolean;
  createdAt: string;
  staffProfile?: StaffProfile | null;
}

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface Cluster {
  id: string;
  name: string;
  villageNames: string[];
  district?: string;
  state?: string;
  pinCode?: string;
  assignedClusterHeadId: string | null;
  assignedReshamDootId: string | null;
  assignedReshamDootIds: string[];
  offlineManagers: ClusterManagerContact[];
}

export interface Training {
  id: string;
  producerId: string;
  trainingName: string;
  organisation: string;
  dateAttended: string;
  durationDays: number;
  certificationText: string | null;
  certificationFileUrl: string | null;
}

export interface ProducerSchemeLink {
  producerId: string;
  schemeId: string;
  taggedBy: SchemeTaggedBy;
  taggedAt: string;
}

export interface Scheme {
  id: string;
  name: string;
  administeringBody: string;
  description: string;
  referenceUrl: string;
  eligibilityGender: EligibilityGender | null;
  eligibilitySkillCategories: ProducerCategory[];
  eligibilityAgeMin: number | null;
  eligibilityAgeMax: number | null;
  isActive: boolean;
}

export interface Producer {
  id: string;
  userId: string | null;
  producerCode: string;
  fullName: string;
  photoUrl: string;
  phone: string;
  village: string;
  clusterId: string;
  category: ProducerCategory;
  categoryIds: ProducerCategory[];
  primaryCategoryId: ProducerCategory | null;
  isSeller: boolean;
  gender: Gender;
  dateOfBirth: string;
  householdSize: number;
  dependentsCount: number;
  incomeBaseline: IncomeBaseline;
  primaryLivelihood: string;
  yearsOfExperience: number;
  machineAccess: boolean;
  growthPathwayNotes: string;
  /** @deprecated use categoryEntries */
  skillIds: string[];
  categoryEntries: ProducerCategoryEntry[];
  enrolledBy: string | null;
  enrolledAt: string;
  editRequestPending: boolean;
  editRequestNotes: string | null;
  /** Last reported monthly output (Resham Doot entry) */
  monthlyOutput: ProducerMonthlyOutput;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Buyer {
  id: string;
  userId: string;
  fullName: string;
  buyerType: BuyerType;
  organisationName: string | null;
  phone: string;
  email: string;
  interestCategories: ProducerCategory[];
  createdAt: string;
}

export interface ClusterInventoryItem {
  id: string;
  clusterId: string;
  productType: BuyerProductType;
  quantityAvailable: number;
  pricePerUnit: number;
  isListed: boolean;
  notes: string | null;
  updatedBy: string;
  updatedAt: string;
}

export interface SavedProducer {
  id: string;
  buyerId: string;
  producerId: string;
  notes: string | null;
  savedAt: string;
}

export interface SavedListing {
  id: string;
  buyerId: string;
  clusterId: string;
  productType: BuyerProductType;
  notes: string | null;
  savedAt: string;
}

export interface InterestRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  producerId: string | null;
  producerName: string | null;
  clusterId: string;
  clusterName: string;
  productType: BuyerProductType | null;
  productLabel: string | null;
  message: string | null;
  createdAt: string;
  readByAdmin: boolean;
  readByDoot: boolean;
}

export interface BuyerCatalogListing {
  id: string;
  inventoryId: string;
  clusterId: string;
  clusterName: string;
  villageNames: string[];
  productType: BuyerProductType;
  productLabel: string;
  productGroup: string;
  unit: string;
  quantityAvailable: number;
  pricePerUnit: number;
  artisanCount: number;
}

export interface BuyerCatalogCluster {
  id: string;
  name: string;
  villageNames: string[];
  reshamDootName: string | null;
  artisanCount: number;
  listings: BuyerCatalogListing[];
  production: ProductionMetrics;
}

export interface GovToken {
  token: string;
  label: string;
  createdAt: string;
  expiresAt: string | null;
}

export interface Database {
  users: User[];
  sessions: Session[];
  clusters: Cluster[];
  skills: Skill[];
  producers: Producer[];
  trainings: Training[];
  schemes: Scheme[];
  producerSchemes: ProducerSchemeLink[];
  buyers: Buyer[];
  savedProducers: SavedProducer[];
  savedListings: SavedListing[];
  interestRequests: InterestRequest[];
  govTokens: GovToken[];
  clusterInventory: ClusterInventoryItem[];
  producerCodeCounter: number;
}

export interface PublicProducer {
  producerCode: string;
  fullName: string;
  photoUrl: string;
  village: string;
  category: ProducerCategory;
  categories: ProducerCategory[];
  categoryEntries: ProducerCategoryEntry[];
  isSeller: boolean;
  yearsOfExperience: number;
  skills: Skill[];
  trainings: Training[];
  enrolledAt: string;
  showPhone: boolean;
  phone?: string;
}

export interface ProductionMetrics {
  artisanCount: number;
  weaverCount: number;
  spinnerCount: number;
  silkFarmerCount: number;
  dyerCount: number;
  totalSilkWovenMeters: number;
  totalProduceKg: number;
  totalCocoonsKg: number;
  reportingLabel: string;
}

export interface Metrics {
  totalProducers: number;
  sellerCount: number;
  nonSellerCount: number;
  byCategory: Record<string, number>;
  byVillage: Record<string, number>;
  byGender: Record<string, number>;
  topSkills: { name: string; count: number }[];
  schemesTagged: number;
  newEnrolments30Days: number;
  incompleteProfiles: number;
  schemeCoverage: { schemeName: string; count: number }[];
  pendingInterests: number;
  production: ProductionMetrics;
}

export interface ClusterSummary {
  id: string;
  name: string;
  villageNames: string[];
  reshamDootName: string | null;
  metrics: Metrics;
}

export interface AuthUser {
  id: string;
  phone: string;
  email: string | null;
  role: UserRole;
  name: string;
  clusterIds: string[];
  producerId: string | null;
  buyerId: string | null;
}
