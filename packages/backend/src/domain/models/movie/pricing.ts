export enum PricingPlatform {
  MEGOGO = 'MEGOGO',
}

export enum PricingType {
  FREE = 'FREE',
  PURCHASE = 'PURCHASE',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export class MoviePricing {
  platform: PricingPlatform;

  type: PricingType;

  subscriptionType?: string;

  price?: string;
}
