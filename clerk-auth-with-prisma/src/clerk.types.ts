/* eslint-disable */

export type ClerkEventT = "user.created" | "user.deleted";

export interface ClerkDeleteUserWebhookPayload {
  deleted: boolean;
  id: string;
  object: "user";
}

export interface ClerkCreateUserWebhookPayload {
  id: string;
  object: "user";
  created_at: number;
  updated_at: number;
  email_addresses: ClerkEmailAddress[];
  external_accounts: ClerkExternalAccount[];
  enterprise_accounts: any[];
  external_id: string | null;
  first_name: string;
  last_name: string;
  has_image: boolean;
  image_url: string;
  profile_image_url: string;
  last_active_at: number;
  last_sign_in_at: number | null;
  legal_accepted_at: number | null;
  locked: boolean;
  lockout_expires_in_seconds: number | null;
  mfa_disabled_at: number | null;
  mfa_enabled_at: number | null;
  password_enabled: boolean;
  passkeys: any[];
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  private_metadata: Record<string, any>;
  public_metadata: Record<string, any>;
  unsafe_metadata: Record<string, any>;
  saml_accounts: any[];
  totp_enabled: boolean;
  two_factor_enabled: boolean;
  username: string | null;
  verification_attempts_remaining: number;
  web3_wallets: any[];
  backup_code_enabled: boolean;
  banned: boolean;
  create_organization_enabled: boolean;
  delete_self_enabled: boolean;
}

export interface ClerkEmailAddress {
  id: string;
  object: "email_address";
  email_address: string;
  created_at: number;
  updated_at: number;
  linked_to?: any[]; // Add type if known
  matches_sso_connection: boolean;
  reserved: boolean;
  verification?: Record<string, any>; // Add detailed type if needed
}

export interface ClerkExternalAccount {
  id: string;
  object: "google_account" | string;
  provider: "oauth_google" | string;
  provider_user_id: string;
  approved_scopes: string;
  avatar_url: string;
  email_address: string;
  external_account_id: string;
  family_name: string;
  first_name: string;
  given_name: string;
  google_id: string;
  identification_id: string;
  image_url: string;
  label: string | null;
  last_name: string;
  picture: string;
  public_metadata: Record<string, any>;
  updated_at: number;
  username: string | null;
  verification?: Record<string, any>; // Add detailed type if needed
}
