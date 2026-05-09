export type FeatureFlagKey =
  | 'officeHistoryPanel'
  | 'calculatorReadonlyShare'
  | 'galleryUploadPipeline'
  | 'guidesAttachmentUpload'
  | 'lighthouseCiGate'
  | 'siteBuilderV2Canary';

type FeatureFlagDefinition = {
  key: FeatureFlagKey;
  envVar: string;
  rolloutEnvVar?: string;
  defaultValue: boolean;
  defaultRolloutPercent?: number;
  title: string;
  description: string;
};

const DEFINITIONS = [
  {
    key: 'officeHistoryPanel',
    envVar: 'FF_OFFICE_HISTORY_PANEL',
    defaultValue: true,
    title: 'Office history panel',
    description: 'Enables Office change-history endpoint and admin panel action.',
  },
  {
    key: 'calculatorReadonlyShare',
    envVar: 'FF_CALCULATOR_READONLY_SHARE',
    defaultValue: true,
    title: 'Calculator read-only share',
    description: 'Allows creating and consuming read-only calculator share links.',
  },
  {
    key: 'galleryUploadPipeline',
    envVar: 'FF_GALLERY_UPLOAD_PIPELINE',
    defaultValue: false,
    title: 'Gallery upload pipeline',
    description: 'Controls rollout of next-generation gallery upload pipeline.',
  },
  {
    key: 'guidesAttachmentUpload',
    envVar: 'FF_GUIDES_ATTACHMENT_UPLOAD',
    defaultValue: false,
    title: 'Guides attachment upload',
    description: 'Controls rollout of guides attachment upload workflow.',
  },
  {
    key: 'lighthouseCiGate',
    envVar: 'FF_LIGHTHOUSE_CI_GATE',
    defaultValue: true,
    title: 'Lighthouse CI gate',
    description: 'Turns on Lighthouse budget checks in CI/CD pipelines.',
  },
  {
    key: 'siteBuilderV2Canary',
    envVar: 'FF_SITE_BUILDER_V2_CANARY',
    rolloutEnvVar: 'FF_SITE_BUILDER_V2_CANARY_ROLLOUT',
    defaultValue: true,
    defaultRolloutPercent: 100,
    title: 'Site Builder V2 canary',
    description: 'Gradual rollout gate for Site Builder V2 (lower rollout % for staged release).',
  },
] as const satisfies readonly FeatureFlagDefinition[];

type RuntimeOverrideMap = Partial<Record<FeatureFlagKey, boolean>>;
type RuntimeRolloutMap = Partial<Record<FeatureFlagKey, number>>;

function parseEnvBool(raw: string | undefined, fallback: boolean) {
  if (raw == null) return fallback;
  const normalized = raw.trim().toLowerCase();
  if (normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on') return true;
  if (normalized === '0' || normalized === 'false' || normalized === 'no' || normalized === 'off') return false;
  return fallback;
}

function getRuntimeStore(): RuntimeOverrideMap {
  const g = globalThis as typeof globalThis & { __featureFlagOverrides?: RuntimeOverrideMap };
  if (!g.__featureFlagOverrides) g.__featureFlagOverrides = {};
  return g.__featureFlagOverrides;
}

function getRuntimeRolloutStore(): RuntimeRolloutMap {
  const g = globalThis as typeof globalThis & { __featureFlagRollout?: RuntimeRolloutMap };
  if (!g.__featureFlagRollout) g.__featureFlagRollout = {};
  return g.__featureFlagRollout;
}

function getDefaultFor(def: FeatureFlagDefinition) {
  return parseEnvBool(process.env[def.envVar], def.defaultValue);
}

function parseRollout(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(100, Math.round(parsed)));
}

function getRolloutFor(def: FeatureFlagDefinition): number {
  const runtime = getRuntimeRolloutStore();
  if (typeof runtime[def.key] === 'number') return runtime[def.key] as number;
  return parseRollout(def.rolloutEnvVar ? process.env[def.rolloutEnvVar] : undefined, def.defaultRolloutPercent ?? 100);
}

export function isFeatureEnabled(key: FeatureFlagKey): boolean {
  const def = DEFINITIONS.find((x) => x.key === key);
  if (!def) return false;
  const runtime = getRuntimeStore();
  if (typeof runtime[key] === 'boolean') return runtime[key] as boolean;
  return getDefaultFor(def);
}

export function listFeatureFlags() {
  const runtime = getRuntimeStore();
  return DEFINITIONS.map((def) => {
    const defaultValue = getDefaultFor(def);
    const override = runtime[def.key];
    const enabled = typeof override === 'boolean' ? override : defaultValue;
    const rolloutPercent = getRolloutFor(def);
    return {
      key: def.key,
      title: def.title,
      description: def.description,
      envVar: def.envVar,
      defaultValue,
      enabled,
      rolloutPercent,
      source: typeof override === 'boolean' ? 'runtime_override' : 'env_default',
    };
  });
}

export function setFeatureFlagOverride(key: FeatureFlagKey, enabled: boolean) {
  const runtime = getRuntimeStore();
  runtime[key] = enabled;
}

export function setFeatureFlagRolloutPercent(key: FeatureFlagKey, percent: number) {
  const runtime = getRuntimeRolloutStore();
  runtime[key] = Math.max(0, Math.min(100, Math.round(percent)));
}

export function isFeatureEnabledForIdentity(key: FeatureFlagKey, identity: string): boolean {
  const def = DEFINITIONS.find((x) => x.key === key);
  if (!def) return false;
  if (!isFeatureEnabled(key)) return false;
  const rollout = getRolloutFor(def);
  if (rollout >= 100) return true;
  if (rollout <= 0) return false;
  const bucket = hashToBucket(`${key}:${identity}`);
  return bucket < rollout;
}

function hashToBucket(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h % 100);
}
