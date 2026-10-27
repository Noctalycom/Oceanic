"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTypes = exports.ConnectionServices = exports.ConnectionVisibilityTypes = exports.ThreadAutoArchiveDurations = exports.VideoQualityModes = exports.OverwriteTypes = exports.ThreadOnlyChannelTypes = exports.InteractionChannelTypes = exports.InviteChannelTypes = exports.DMInviteChannelTypes = exports.GuildInviteChannelTypes = exports.VoiceChannelTypes = exports.TextableGuildChannelsWithoutThreadsTypes = exports.TextableChannelsWithoutThreadsTypes = exports.TextableGuildChannelTypes = exports.TextableChannelTypes = exports.EditableChannelTypes = exports.PrivateChannelTypes = exports.GuildChannelsWithoutThreadsTypes = exports.ThreadChannelTypes = exports.GuildChannelTypes = exports.ImplementedChannelTypes = exports.NotImplementedChannelTypes = exports.AnyChannelTypes = exports.ChannelTypes = exports.StickerFormatTypes = exports.StickerTypes = exports.SystemChannelFlags = exports.PremiumTiers = exports.GuildNSFWLevels = exports.VerificationLevels = exports.MFALevels = exports.ExplicitContentFilterLevels = exports.DefaultMessageNotificationLevels = exports.GuildFeatures = exports.ApplicationFlags = exports.InteractionContextTypes = exports.ApplicationIntegrationTypes = exports.UserFlags = exports.PremiumTypes = exports.WebhookTypes = exports.ImageFormats = exports.RESTMethods = exports.MEDIA_PROXY_SIZES = exports.USER_AGENT = exports.VERSION = exports.API_URL = exports.BASE_URL = exports.REST_VERSION = exports.GATEWAY_VERSION = void 0;
exports.PrivilegedIntents = exports.AllNonPrivilegedIntents = exports.NonPrivilegedIntents = exports.Intents = exports.EntryPointCommandHandlerTypes = exports.InteractionResponseTypes = exports.ApplicationCommandPermissionTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.AuditLogActionTypes = exports.AutoModerationActionTypes = exports.AutoModerationKeywordPresetTypes = exports.AutoModerationTriggerTypes = exports.AutoModerationEventTypes = exports.StageInstancePrivacyLevels = exports.GuildScheduledEventEntityTypes = exports.GuildScheduledEventStatuses = exports.GuildScheduledEventPrivacyLevels = exports.InviteTargetTypes = exports.InviteTypes = exports.InteractionTypes = exports.MessageActivityTypes = exports.UndeletableMessageTypes = exports.MessageTypes = exports.MessageFlags = exports.TextInputStyles = exports.ButtonStyles = exports.ComponentTypes = exports.OAuthScopes = exports.TeamMembershipState = exports.ForumLayoutTypes = exports.SortOrderTypes = exports.ChannelFlags = exports.PermissionNames = exports.AllModeratorPermissionNames = exports.AllModeratorPermissions = exports.ModeratorPermissions = exports.AllStagePermissionNames = exports.AllStagePermissions = exports.StagePermissions = exports.AllVoicePermissionNames = exports.AllVoicePermissions = exports.VoicePermissions = exports.AllTextPermissionNames = exports.AllTextPermissions = exports.TextPermissions = exports.AllPermissions = exports.PermissionValueToName = exports.Permissions = exports.IntegrationExpireBehaviors = void 0;
exports.EmbeddedActivityLabelType = exports.EmbeddedActivityOrientationLockStateType = exports.ApplicationInternalGuildRestriction = exports.InviteTargetUsersJobStatus = exports.DisplayNameEffect = exports.DisplayNameFont = exports.SeparatorSpacingSize = exports.EmbedMediaFlags = exports.EmbedFlags = exports.ApplicationEventWebhookEventTypes = exports.ApplicationEventWebhookStatus = exports.ActivityLocationKind = exports.MemberJoinSourceType = exports.MemberSearchSortType = exports.RoleFlags = exports.ApplicationVerificationState = exports.StoreApplicationState = exports.RPCApplicationState = exports.ApplicationMonetizationEligibilityFlags = exports.ApplicationInteractionsVersion = exports.ApplicationExplicitContentFilterLevel = exports.ApplicationDiscoveryEligibilityFlags = exports.ApplicationDiscoverabilityState = exports.ApplicationMonetizationState = exports.PollLayoutType = exports.SubscriptionStatuses = exports.SKUAccessTypes = exports.EntitlementOwnerTypes = exports.EntitlementTypes = exports.SKUFlags = exports.SKUTypes = exports.AttachmentFlags = exports.ReactionType = exports.InviteFlags = exports.OnboardingModes = exports.AnimationTypes = exports.OnboardingPromptTypes = exports.GuildMemberFlags = exports.RoleConnectionMetadataTypes = exports.ThreadMemberFlags = exports.ActivityFlags = exports.ActivityTypes = exports.HubTypes = exports.VoiceCloseCodes = exports.VoiceOPCodes = exports.GatewayCloseCodes = exports.GatewayOPCodes = exports.PrivilegedIntentMapping = exports.AllIntents = exports.AllPrivilegedIntents = void 0;
exports.JSONErrorCodes = exports.StatusDisplayType = exports.MessageReferenceType = exports.LobbyMemberFlags = exports.ApplicationType = exports.TeamPayoutGateway = exports.TeamPayoutAccountStatus = exports.OverlayMethodFlags = exports.ApprovableConsoleType = exports.TeamMemberRoleTypes = exports.OperatingSystemTypes = exports.PricingLocalizationStrategies = exports.EmbeddedActivityPlatformTypes = exports.EmbeddedActivitySurfaces = exports.EmbeddedActivityReleasePhases = void 0;
const tslib_1 = require("tslib");
const package_json_1 = tslib_1.__importDefault(require("../package.json"));
exports.GATEWAY_VERSION = 10;
exports.REST_VERSION = 10;
exports.BASE_URL = "https://discord.com";
exports.API_URL = `${exports.BASE_URL}/api/v${exports.REST_VERSION}`;
exports.VERSION = package_json_1.default.version;
exports.USER_AGENT = `Oceanic/${exports.VERSION} (https://github.com/OceanicJS/Oceanic)`;
exports.MEDIA_PROXY_SIZES = [
    16, 20, 22, 24, 28, 32, 40, 44, 48, 56, 60, 64, 80, 96, 100,
    128, 160, 240, 256, 300, 320, 480, 512, 600, 640, 1024, 1280, 1536,
    2048, 3072, 4096,
];
exports.RESTMethods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
];
exports.ImageFormats = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
];
var WebhookTypes;
(function (WebhookTypes) {
    /** Incoming webhooks can post messages to channels with a generated token */
    WebhookTypes[WebhookTypes["INCOMING"] = 1] = "INCOMING";
    /** Channel Follower webhooks are internal webhooks used to post new messages into channels */
    WebhookTypes[WebhookTypes["CHANNEL_FOLLOWER"] = 2] = "CHANNEL_FOLLOWER";
    /** Application webhooks are webhooks used with interactions */
    WebhookTypes[WebhookTypes["APPLICATION"] = 3] = "APPLICATION";
})(WebhookTypes || (exports.WebhookTypes = WebhookTypes = {}));
var PremiumTypes;
(function (PremiumTypes) {
    /** No Nitro. Also returned when the OAuth request did not include the approved `identify.premium` scope. */
    PremiumTypes[PremiumTypes["NONE"] = 0] = "NONE";
    /** Nitro Classic */
    PremiumTypes[PremiumTypes["NITRO_CLASSIC"] = 1] = "NITRO_CLASSIC";
    /** Nitro */
    PremiumTypes[PremiumTypes["NITRO"] = 2] = "NITRO";
    /** Nitro Basic */
    PremiumTypes[PremiumTypes["NITRO_BASIC"] = 3] = "NITRO_BASIC";
})(PremiumTypes || (exports.PremiumTypes = PremiumTypes = {}));
// @TODO: bigints?
var UserFlags;
(function (UserFlags) {
    /** Discord Staff */
    UserFlags[UserFlags["STAFF"] = 1] = "STAFF";
    /** Partnered Server Owner */
    UserFlags[UserFlags["PARTNER"] = 2] = "PARTNER";
    /** HypeSquad Events */
    UserFlags[UserFlags["HYPESQUAD"] = 4] = "HYPESQUAD";
    /** Level 1 Discord Bug Hunter */
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_1"] = 8] = "BUG_HUNTER_LEVEL_1";
    /** SMS enabled as a multi-factor authentication backup */
    UserFlags[UserFlags["MFA_SMS"] = 16] = "MFA_SMS";
    /** User has dismissed the current premium (Nitro) promotion */
    UserFlags[UserFlags["PREMIUM_PROMO_DISMISSED"] = 32] = "PREMIUM_PROMO_DISMISSED";
    UserFlags[UserFlags["HYPESQUAD_BRAVERY"] = 64] = "HYPESQUAD_BRAVERY";
    UserFlags[UserFlags["HYPESQUAD_BRILLIANCE"] = 128] = "HYPESQUAD_BRILLIANCE";
    UserFlags[UserFlags["HYPESQUAD_BALANCE"] = 256] = "HYPESQUAD_BALANCE";
    UserFlags[UserFlags["EARLY_SUPPORTER"] = 512] = "EARLY_SUPPORTER";
    UserFlags[UserFlags["PSEUDO_TEAM_USER"] = 1024] = "PSEUDO_TEAM_USER";
    /** User is registered on Discord's HubSpot customer platform, used for official Discord programs (e.g. partner) */
    UserFlags[UserFlags["IS_HUBSPOT_CONTACT"] = 2048] = "IS_HUBSPOT_CONTACT";
    /** @deprecated User is a system user (i.e. official Discord account) */
    UserFlags[UserFlags["SYSTEM"] = 4096] = "SYSTEM";
    /** User has unread urgent system messages; an urgent message is one sent from Trust and Safety */
    UserFlags[UserFlags["HAS_UNREAD_URGENT_MESSAGES"] = 8192] = "HAS_UNREAD_URGENT_MESSAGES";
    /** Level 2 Discord Bug Hunter */
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_2"] = 16384] = "BUG_HUNTER_LEVEL_2";
    /** User is scheduled for deletion for being under the minimum required age */
    UserFlags[UserFlags["UNDERAGE_DELETED"] = 32768] = "UNDERAGE_DELETED";
    /** Verified Bot */
    UserFlags[UserFlags["VERIFIED_BOT"] = 65536] = "VERIFIED_BOT";
    /** Early Verified Bot Developer */
    UserFlags[UserFlags["VERIFIED_DEVELOPER"] = 131072] = "VERIFIED_DEVELOPER";
    /** Moderator Programs Alumni */
    UserFlags[UserFlags["CERTIFIED_MODERATOR"] = 262144] = "CERTIFIED_MODERATOR";
    /** Bot uses only HTTP interactions and is shown in the online member list */
    UserFlags[UserFlags["BOT_HTTP_INTERACTIONS"] = 524288] = "BOT_HTTP_INTERACTIONS";
    /** User is marked as a spammer and has their messages collapsed in the UI */
    UserFlags[UserFlags["SPAMMER"] = 1048576] = "SPAMMER";
    /** @deprecated User has manually disabled premium (Nitro) features */
    UserFlags[UserFlags["DISABLE_PREMIUM"] = 2097152] = "DISABLE_PREMIUM";
    /** @deprecated Active Developer */
    UserFlags[UserFlags["ACTIVE_DEVELOPER"] = 4194304] = "ACTIVE_DEVELOPER";
    /** User is a provisional account used with the social layer integration */
    UserFlags[UserFlags["PROVISIONAL_ACCOUNT"] = 8388608] = "PROVISIONAL_ACCOUNT";
    /** User has their global ratelimit raised to 1,200 requests per second */
    UserFlags[UserFlags["HIGH_GLOBAL_RATE_LIMIT"] = 8589934592] = "HIGH_GLOBAL_RATE_LIMIT";
    /** User's account is deleted */
    UserFlags[UserFlags["DELETED"] = 17179869184] = "DELETED";
    /** User's account is disabled for suspicious activity and must reset their password to regain access */
    UserFlags[UserFlags["DISABLED_SUSPICIOUS_ACTIVITY"] = 34359738368] = "DISABLED_SUSPICIOUS_ACTIVITY";
    /** User deleted their own account */
    UserFlags[UserFlags["SELF_DELETED"] = 68719476736] = "SELF_DELETED";
    /** @deprecated User has a premium (Nitro) custom discriminator */
    UserFlags[UserFlags["PREMIUM_DISCRIMINATOR"] = 137438953472] = "PREMIUM_DISCRIMINATOR";
    /** User has used the desktop client */
    UserFlags[UserFlags["USED_DESKTOP_CLIENT"] = 274877906944] = "USED_DESKTOP_CLIENT";
    /** User has used the web client */
    UserFlags[UserFlags["USED_WEB_CLIENT"] = 549755813888] = "USED_WEB_CLIENT";
    /** User has used the mobile client */
    UserFlags[UserFlags["USED_MOBILE_CLIENT"] = 1099511627776] = "USED_MOBILE_CLIENT";
    /** User's account is disabled */
    UserFlags[UserFlags["DISABLED"] = 2199023255552] = "DISABLED";
    UserFlags[UserFlags["VERIFIED_EMAIL"] = 8796093022208] = "VERIFIED_EMAIL";
    /** User is quarantined and cannot create DMs or accept invites */
    UserFlags[UserFlags["QUARANTINED"] = 17592186044416] = "QUARANTINED";
    /** User is eligible for early access to unique usernames */
    UserFlags[UserFlags["PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME"] = 140737488355328] = "PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME";
    /** User is a collaborator and is considered staff */
    UserFlags[UserFlags["COLLABORATOR"] = 1125899906842624] = "COLLABORATOR";
    /** User is a restricted collaborator and is considered staff */
    UserFlags[UserFlags["RESTRICTED_COLLABORATOR"] = 2251799813685248] = "RESTRICTED_COLLABORATOR";
})(UserFlags || (exports.UserFlags = UserFlags = {}));
var ApplicationIntegrationTypes;
(function (ApplicationIntegrationTypes) {
    /** Guild installation context */
    ApplicationIntegrationTypes[ApplicationIntegrationTypes["GUILD_INSTALL"] = 0] = "GUILD_INSTALL";
    /** User installation context */
    ApplicationIntegrationTypes[ApplicationIntegrationTypes["USER_INSTALL"] = 1] = "USER_INSTALL";
})(ApplicationIntegrationTypes || (exports.ApplicationIntegrationTypes = ApplicationIntegrationTypes = {}));
var InteractionContextTypes;
(function (InteractionContextTypes) {
    /** The interaction can be triggered within guilds */
    InteractionContextTypes[InteractionContextTypes["GUILD"] = 0] = "GUILD";
    /** The interaction can be triggered within DM channel with the application */
    InteractionContextTypes[InteractionContextTypes["BOT_DM"] = 1] = "BOT_DM";
    /** The interaction can be triggered in all DM and group DMs */
    InteractionContextTypes[InteractionContextTypes["PRIVATE_CHANNEL"] = 2] = "PRIVATE_CHANNEL";
})(InteractionContextTypes || (exports.InteractionContextTypes = InteractionContextTypes = {}));
var ApplicationFlags;
(function (ApplicationFlags) {
    /** Embedded application is released to the public (see also release phases) */
    ApplicationFlags[ApplicationFlags["EMBEDDED_RELEASED"] = 2] = "EMBEDDED_RELEASED";
    /** Application can create managed emoji */
    ApplicationFlags[ApplicationFlags["MANAGED_EMOJI"] = 4] = "MANAGED_EMOJI";
    /** Embedded application can use in-app purchases */
    ApplicationFlags[ApplicationFlags["EMBEDDED_IAP"] = 8] = "EMBEDDED_IAP";
    /** Application can create group DMs without limit */
    ApplicationFlags[ApplicationFlags["GROUP_DM_CREATE"] = 16] = "GROUP_DM_CREATE";
    /** Application can use the `rpc` scope without limitation */
    ApplicationFlags[ApplicationFlags["RPC_PRIVATE_BETA"] = 32] = "RPC_PRIVATE_BETA";
    ApplicationFlags[ApplicationFlags["APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE"] = 64] = "APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE";
    /** Application has its game profile page disabled */
    ApplicationFlags[ApplicationFlags["GAME_PROFILE_DISABLED"] = 128] = "GAME_PROFILE_DISABLED";
    /** @deprecated Application can use activity assets */
    ApplicationFlags[ApplicationFlags["ALLOW_ASSETS"] = 256] = "ALLOW_ASSETS";
    /** Application's OAuth2 credentials are considered public and a client secret is not required */
    ApplicationFlags[ApplicationFlags["PUBLIC_OAUTH2_CLIENT"] = 256] = "PUBLIC_OAUTH2_CLIENT";
    /** @deprecated Application can enable spectating activities */
    ApplicationFlags[ApplicationFlags["ALLOW_ACTIVITY_ACTION_SPECTATE"] = 512] = "ALLOW_ACTIVITY_ACTION_SPECTATE";
    /** Embedded application's activity can be launched without a context */
    ApplicationFlags[ApplicationFlags["CONTEXTLESS_ACTIVITY"] = 512] = "CONTEXTLESS_ACTIVITY";
    /** @deprecated Application can enable activity join requests */
    ApplicationFlags[ApplicationFlags["ALLOW_ACTIVITY_ACTION_JOIN_REQUEST"] = 1024] = "ALLOW_ACTIVITY_ACTION_JOIN_REQUEST";
    /** Application has limited access to the social layer SDK */
    ApplicationFlags[ApplicationFlags["SOCIAL_LAYER_INTEGRATION_LIMITED"] = 1024] = "SOCIAL_LAYER_INTEGRATION_LIMITED";
    /** Application is trialing cloud gaming features */
    ApplicationFlags[ApplicationFlags["CLOUD_GAMING_DEMO"] = 2048] = "CLOUD_GAMING_DEMO";
    /** Intent required for bots in 100 or more guilds to receive Presence Update Gateway events */
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE"] = 4096] = "GATEWAY_PRESENCE";
    /** Intent required for bots in under 100 guilds to receive Presence Update Gateway events */
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE_LIMITED"] = 8192] = "GATEWAY_PRESENCE_LIMITED";
    /** Intent required for bots in 100 or more guilds to receive guild member-related events like Guild Member Add */
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS"] = 16384] = "GATEWAY_GUILD_MEMBERS";
    /** Intent required for bots in under 100 guilds to receive guild member-related events like Guild Member Add */
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS_LIMITED"] = 32768] = "GATEWAY_GUILD_MEMBERS_LIMITED";
    /** Indicates unusual growth of an application that prevents verification */
    ApplicationFlags[ApplicationFlags["VERIFICATION_PENDING_GUILD_LIMIT"] = 65536] = "VERIFICATION_PENDING_GUILD_LIMIT";
    /** Application can be embedded within the Discord client */
    ApplicationFlags[ApplicationFlags["EMBEDDED"] = 131072] = "EMBEDDED";
    /** Intent required for bots in 100 or more guilds to receive message content */
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT"] = 262144] = "GATEWAY_MESSAGE_CONTENT";
    /** Intent required for bots in under 100 guilds to receive message content */
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT_LIMITED"] = 524288] = "GATEWAY_MESSAGE_CONTENT_LIMITED";
    /** Embedded application is created by Discord */
    ApplicationFlags[ApplicationFlags["EMBEDDED_FIRST_PARTY"] = 1048576] = "EMBEDDED_FIRST_PARTY";
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_MIGRATED"] = 2097152] = "APPLICATION_COMMAND_MIGRATED";
    /** Application has registered global application commands */
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_BADGE"] = 8388608] = "APPLICATION_COMMAND_BADGE";
    /** Application has had at least one global application command used in the last 30 days */
    ApplicationFlags[ApplicationFlags["ACTIVE"] = 16777216] = "ACTIVE";
    /** Application has not had any global application commands used in the last 30 days and has lost the `ACTIVE` flag */
    ApplicationFlags[ApplicationFlags["ACTIVE_GRACE_PERIOD"] = 33554432] = "ACTIVE_GRACE_PERIOD";
    /** Application can use IFrames within modals */
    ApplicationFlags[ApplicationFlags["IFRAME_MODAL"] = 67108864] = "IFRAME_MODAL";
    /** Application can use the social layer SDK */
    ApplicationFlags[ApplicationFlags["SOCIAL_LAYER_INTEGRATION"] = 134217728] = "SOCIAL_LAYER_INTEGRATION";
    /** Application is promoted by Discord in the application directory */
    ApplicationFlags[ApplicationFlags["PROMOTED"] = 268435456] = "PROMOTED";
    /** Application is a Discord partner */
    ApplicationFlags[ApplicationFlags["PARTNER"] = 536870912] = "PARTNER";
    /** Application is a parent of a child application */
    ApplicationFlags[ApplicationFlags["PARENT"] = 8589934592] = "PARENT";
    /** Application cannot access relationship information */
    ApplicationFlags[ApplicationFlags["DISABLE_RELATIONSHIP_ACCESS"] = 17179869184] = "DISABLE_RELATIONSHIP_ACCESS";
})(ApplicationFlags || (exports.ApplicationFlags = ApplicationFlags = {}));
exports.GuildFeatures = [
    "ACTIVITIES_ALPHA",
    "ACTIVITIES_EMPLOYEE",
    "ACTIVITIES_INTERNAL_DEV",
    "ANIMATED_BANNER",
    "ANIMATED_ICON",
    "APPLICATION_COMMAND_PERMISSIONS_V2",
    "AUTO_MODERATION",
    "AUTOMOD_TRIGGER_USER_PROFILE",
    "BANNER",
    "BOT_DEVELOPER_EARLY_ACCESS",
    "BURST_REACTIONS",
    "CHANNEL_HIGHLIGHTS_DISABLED",
    "CHANNEL_HIGHLIGHTS",
    "CHANNEL_ICON_EMOJIS_GENERATED",
    "CLYDE_DISABLED",
    "CLYDE_ENABLED",
    "CLYDE_EXPERIMENT_ENABLED",
    "COMMERCE",
    "COMMUNITY_CANARY",
    "COMMUNITY_EXP_LARGE_GATED",
    "COMMUNITY_EXP_LARGE_UNGATED",
    "COMMUNITY_EXP_MEDIUM",
    "COMMUNITY",
    "CREATOR_ACCEPTED_NEW_TERMS",
    "CREATOR_MONETIZABLE_DISABLED",
    "CREATOR_MONETIZABLE_PENDING_NEW_OWNER_ONBOARDING",
    "CREATOR_MONETIZABLE_PROVISIONAL",
    "CREATOR_MONETIZABLE_RESTRICTED",
    "CREATOR_MONETIZABLE_WHITEGLOVE",
    "CREATOR_MONETIZABLE",
    "CREATOR_STORE_PAGE",
    "DEVELOPER_SUPPORT_SERVER",
    "DISCOVERABLE_DISABLED",
    "DISCOVERABLE",
    "ENABLED_DISCOVERABLE_BEFORE",
    "ENABLED_MODERATION_EXPERIENCE_FOR_NON_COMMUNITY",
    "ENHANCED_ROLE_COLORS",
    "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT",
    "FEATURABLE",
    "GUESTS_ENABLED",
    "GUILD_HOME_DEPRECATION_OVERRIDE",
    "GUILD_HOME_OVERRIDE",
    "GUILD_HOME_TEST",
    "GUILD_ONBOARDING_EVER_ENABLED",
    "GUILD_ONBOARDING_HAS_PROMPTS",
    "GUILD_ONBOARDING",
    "GUILD_ROLE_SUBSCRIPTION_TIER_TEMPLATE",
    "GUILD_SERVER_GUIDE",
    "GUILD_WEB_PAGE_VANITY_URL",
    "HAD_EARLY_ACTIVITIES_ACCESS",
    "HAS_DIRECTORY_ENTRY",
    "HUB",
    "INCREASED_THREAD_LIMIT",
    "INTERNAL_EMPLOYEE_ONLY",
    "INVITE_SPLASH",
    "INVITES_DISABLED",
    "LINKED_TO_HUB",
    "MARKETPLACES_CONNECTION_ROLES",
    "MEMBER_PROFILES",
    "MEMBER_SAFETY_PAGE_ROLLOUT",
    "MEMBER_VERIFICATION_GATE_ENABLED",
    "MONETIZATION_ENABLED",
    "MORE_EMOJI",
    "MORE_EMOJIS",
    "MORE_SOUNDBOARD",
    "MORE_STICKERS",
    "NEW_THREAD_PERMISSIONS",
    "NEWS",
    "NON_COMMUNITY_RAID_ALERTS",
    "PARTNERED",
    "PREVIEW_ENABLED",
    "PREVIOUSLY_DISCOVERABLE",
    "PRIVATE_THREADS",
    "PRODUCTS_AVAILABLE_FOR_PURCHASE",
    "RAID_ALERTS_DISABLED",
    "RAID_ALERTS_ENABLED",
    "ROLE_ICONS",
    "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    "ROLE_SUBSCRIPTIONS_ENABLED",
    "SEVEN_DAY_THREAD_ARCHIVE",
    "SHARD",
    "SOUNDBOARD",
    "SUMMARIES_DISABLED_BY_USER",
    "SUMMARIES_ENABLED_BY_USER",
    "SUMMARIES_ENABLED_GA",
    "SUMMARIES_ENABLED",
    "SUMMARIES_OPT_OUT_EXPERIENCE",
    "SUMMARIES_PAUSED",
    "TEXT_IN_STAGE_ENABLED",
    "TEXT_IN_VOICE_ENABLED",
    "THREADS_ENABLED_TESTING",
    "THREADS_ENABLED",
    "THREE_DAY_THREAD_ARCHIVE",
    "TICKETED_EVENTS_ENABLED",
    "VANITY_URL",
    "VERIFIED",
    "VIP_REGIONS",
    "VOICE_IN_THREADS",
    "WELCOME_SCREEN_ENABLED",
];
var DefaultMessageNotificationLevels;
(function (DefaultMessageNotificationLevels) {
    /** Receive notifications for all messages */
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    /** Receive notifications only for messages that @mention you */
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
    /** Don't receive notifications */
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NO_MESSAGES"] = 2] = "NO_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NULL"] = 3] = "NULL";
})(DefaultMessageNotificationLevels || (exports.DefaultMessageNotificationLevels = DefaultMessageNotificationLevels = {}));
var ExplicitContentFilterLevels;
(function (ExplicitContentFilterLevels) {
    /** Media content will not be scanned */
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["DISABLED"] = 0] = "DISABLED";
    /** Media content sent by members without roles will be scanned */
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    /** Media content sent by all members will be scanned */
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilterLevels || (exports.ExplicitContentFilterLevels = ExplicitContentFilterLevels = {}));
var MFALevels;
(function (MFALevels) {
    /** Guild has no MFA requirement for moderation actions */
    MFALevels[MFALevels["NONE"] = 0] = "NONE";
    /** Guild has a MFA requirement for moderation actions */
    MFALevels[MFALevels["ELEVATED"] = 1] = "ELEVATED";
})(MFALevels || (exports.MFALevels = MFALevels = {}));
var VerificationLevels;
(function (VerificationLevels) {
    /** Unrestricted */
    VerificationLevels[VerificationLevels["NONE"] = 0] = "NONE";
    /** Must have a verified email on file */
    VerificationLevels[VerificationLevels["LOW"] = 1] = "LOW";
    /** Must be registered on Discord for longer than 5 minutes */
    VerificationLevels[VerificationLevels["MEDIUM"] = 2] = "MEDIUM";
    /** Must be a member of the server for longer than 10 minutes */
    VerificationLevels[VerificationLevels["HIGH"] = 3] = "HIGH";
    /** Must have a verified phone number on file */
    VerificationLevels[VerificationLevels["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevels || (exports.VerificationLevels = VerificationLevels = {}));
var GuildNSFWLevels;
(function (GuildNSFWLevels) {
    /** Guild is not yet rated by Discord */
    GuildNSFWLevels[GuildNSFWLevels["DEFAULT"] = 0] = "DEFAULT";
    /** Guild has mature content only suitable for users over 18 */
    GuildNSFWLevels[GuildNSFWLevels["EXPLICIT"] = 1] = "EXPLICIT";
    /** Guild is safe for work */
    GuildNSFWLevels[GuildNSFWLevels["SAFE"] = 2] = "SAFE";
    /** Guild has mildly mature content that may not be suitable for users under 18 */
    GuildNSFWLevels[GuildNSFWLevels["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevels || (exports.GuildNSFWLevels = GuildNSFWLevels = {}));
var PremiumTiers;
(function (PremiumTiers) {
    /** Guild has not unlocked any Server Boost perks */
    PremiumTiers[PremiumTiers["NONE"] = 0] = "NONE";
    /** Guild has unlocked Server Boost level 1 perks */
    PremiumTiers[PremiumTiers["TIER_1"] = 1] = "TIER_1";
    /** Guild has unlocked Server Boost level 2 perks */
    PremiumTiers[PremiumTiers["TIER_2"] = 2] = "TIER_2";
    /** Guild has unlocked Server Boost level 3 perks */
    PremiumTiers[PremiumTiers["TIER_3"] = 3] = "TIER_3";
})(PremiumTiers || (exports.PremiumTiers = PremiumTiers = {}));
var SystemChannelFlags;
(function (SystemChannelFlags) {
    /** Suppress member join notifications */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    /** Suppress premium subscription (boost) notifications */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    /** Suppress guild setup tips */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    /** Hide member join sticker reply buttons */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
    /** Suppress role subscription purchase and renewal notifications */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS"] = 16] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS";
    /** Hide role subscription sticker reply buttons */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES"] = 32] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES";
    /** Suppress dead chat channel prompts */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_CHANNEL_PROMPT_DEADCHAT"] = 128] = "SUPPRESS_CHANNEL_PROMPT_DEADCHAT";
})(SystemChannelFlags || (exports.SystemChannelFlags = SystemChannelFlags = {}));
var StickerTypes;
(function (StickerTypes) {
    /** An official sticker in a current or legacy purchasable pack */
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    /** A sticker uploaded to a guild for the guild's members */
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes || (exports.StickerTypes = StickerTypes = {}));
var StickerFormatTypes;
(function (StickerFormatTypes) {
    /** A PNG image */
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    /** An animated PNG image, using the APNG format */
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    /** A lottie animation; requires the `VERIFIED` and/or `PARTNERED` guild feature */
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
    /** An animated GIF image */
    StickerFormatTypes[StickerFormatTypes["GIF"] = 4] = "GIF";
})(StickerFormatTypes || (exports.StickerFormatTypes = StickerFormatTypes = {}));
var ChannelTypes;
(function (ChannelTypes) {
    /** A text channel within a guild */
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    /** A private channel between two users */
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    /** A voice channel within a guild */
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    /** A private channel between multiple users */
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    /** An organizational category that contains up to 50 channels */
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    /** Almost identical to `GUILD_TEXT`, a channel that users can follow and crosspost into their own guild */
    ChannelTypes[ChannelTypes["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
    /** @deprecated A channel in which developers can showcase their SKUs */
    ChannelTypes[ChannelTypes["GUILD_STORE"] = 6] = "GUILD_STORE";
    /** @deprecated A channel where users can match up for various games */
    ChannelTypes[ChannelTypes["GUILD_LFG"] = 7] = "GUILD_LFG";
    /** @deprecated A private channel between multiple users for a group within an LFG channel */
    ChannelTypes[ChannelTypes["LFG_GROUP_DM"] = 8] = "LFG_GROUP_DM";
    /** @deprecated The first iteration of the threads feature, never widely used */
    ChannelTypes[ChannelTypes["THREAD_ALPHA"] = 9] = "THREAD_ALPHA";
    /** A temporary sub-channel within a `GUILD_NEWS` channel */
    ChannelTypes[ChannelTypes["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    /** a temporary sub-channel within a `GUILD_TEXT`, `GUILD_FORUM`, or `GUILD_MEDIA` channel */
    ChannelTypes[ChannelTypes["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    /** a temporary sub-channel within a `GUILD_TEXT` channel that is only viewable by those invited and those with the `MANAGE_THREADS` permission */
    ChannelTypes[ChannelTypes["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    /** A voice channel for hosting events with an audience in a guild */
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    /** The main channel in a hub containing the listed guilds */
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    /** A channel that can only contain threads */
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
    /** A channel that can only contain threads in a gallery view */
    ChannelTypes[ChannelTypes["GUILD_MEDIA"] = 16] = "GUILD_MEDIA";
    /** A game lobby channel */
    ChannelTypes[ChannelTypes["LOBBY"] = 17] = "LOBBY";
    /** A private channel created by the social layer SDK */
    ChannelTypes[ChannelTypes["EPHEMERAL_DM"] = 18] = "EPHEMERAL_DM";
})(ChannelTypes || (exports.ChannelTypes = ChannelTypes = {}));
function exclude(original, excludeTypes) {
    return original.filter((value) => !excludeTypes.includes(value));
}
exports.AnyChannelTypes = Object.values(ChannelTypes).filter(v => typeof v === "number");
exports.NotImplementedChannelTypes = [ChannelTypes.GUILD_STORE, ChannelTypes.GUILD_LFG, ChannelTypes.LFG_GROUP_DM, ChannelTypes.THREAD_ALPHA, ChannelTypes.GUILD_DIRECTORY, ChannelTypes.LOBBY, ChannelTypes.EPHEMERAL_DM];
exports.ImplementedChannelTypes = exclude(exports.AnyChannelTypes, exports.NotImplementedChannelTypes);
exports.GuildChannelTypes = [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_CATEGORY, ChannelTypes.GUILD_ANNOUNCEMENT, ChannelTypes.ANNOUNCEMENT_THREAD, ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD, ChannelTypes.GUILD_STAGE_VOICE, ChannelTypes.GUILD_DIRECTORY, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
exports.ThreadChannelTypes = [ChannelTypes.ANNOUNCEMENT_THREAD, ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD];
exports.GuildChannelsWithoutThreadsTypes = exclude(exports.GuildChannelTypes, exports.ThreadChannelTypes);
exports.PrivateChannelTypes = [ChannelTypes.DM, ChannelTypes.GROUP_DM];
exports.EditableChannelTypes = exclude([ChannelTypes.GROUP_DM, ...exports.GuildChannelTypes], exports.NotImplementedChannelTypes);
exports.TextableChannelTypes = exclude([ChannelTypes.DM, ...exports.GuildChannelTypes], [...exports.NotImplementedChannelTypes, ChannelTypes.GUILD_CATEGORY, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA]);
exports.TextableGuildChannelTypes = exclude(exports.TextableChannelTypes, [ChannelTypes.DM]);
exports.TextableChannelsWithoutThreadsTypes = exclude(exports.TextableChannelTypes, exports.ThreadChannelTypes);
exports.TextableGuildChannelsWithoutThreadsTypes = exclude(exports.TextableGuildChannelTypes, exports.ThreadChannelTypes);
exports.VoiceChannelTypes = [ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_STAGE_VOICE];
exports.GuildInviteChannelTypes = [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_ANNOUNCEMENT, ...exports.VoiceChannelTypes, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
exports.DMInviteChannelTypes = [ChannelTypes.GROUP_DM];
exports.InviteChannelTypes = [...exports.GuildInviteChannelTypes, ...exports.DMInviteChannelTypes];
exports.InteractionChannelTypes = [...exports.TextableChannelTypes, ChannelTypes.GROUP_DM];
exports.ThreadOnlyChannelTypes = [ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
/* eslint-enable @typescript-eslint/member-ordering */
var OverwriteTypes;
(function (OverwriteTypes) {
    OverwriteTypes[OverwriteTypes["ROLE"] = 0] = "ROLE";
    OverwriteTypes[OverwriteTypes["MEMBER"] = 1] = "MEMBER";
})(OverwriteTypes || (exports.OverwriteTypes = OverwriteTypes = {}));
var VideoQualityModes;
(function (VideoQualityModes) {
    /** Discord chooses the quality for optimal performance */
    VideoQualityModes[VideoQualityModes["AUTO"] = 1] = "AUTO";
    /** 720p quality */
    VideoQualityModes[VideoQualityModes["FULL"] = 2] = "FULL";
})(VideoQualityModes || (exports.VideoQualityModes = VideoQualityModes = {}));
exports.ThreadAutoArchiveDurations = [
    60,
    1440,
    4320,
    10080,
];
var ConnectionVisibilityTypes;
(function (ConnectionVisibilityTypes) {
    /** Connection is not visible. */
    ConnectionVisibilityTypes[ConnectionVisibilityTypes["NONE"] = 0] = "NONE";
    /** Connection is visible to everyone. */
    ConnectionVisibilityTypes[ConnectionVisibilityTypes["EVERYONE"] = 1] = "EVERYONE";
})(ConnectionVisibilityTypes || (exports.ConnectionVisibilityTypes = ConnectionVisibilityTypes = {}));
exports.ConnectionServices = [
    "battlenet",
    "bluesky",
    "crunchyroll",
    "domain",
    "ebay",
    "epicgames",
    "facebook",
    "github",
    "instagram",
    "leagueoflegends",
    "mastodon",
    "paypal",
    "playstation",
    "reddit",
    "riotgames",
    "skype",
    "spotify",
    "steam",
    "tiktok",
    "twitch",
    "twitter_legacy",
    "twitter",
    "xbox",
    "youtube",
];
exports.IntegrationTypes = [
    "twitch",
    "youtube",
    "discord",
    "guild_subscription",
];
var IntegrationExpireBehaviors;
(function (IntegrationExpireBehaviors) {
    /** Remove the integration role when a subscription lapses. */
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["REMOVE_ROLE"] = 0] = "REMOVE_ROLE";
    /** Kick the member when a subscription lapses. */
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["KICK"] = 1] = "KICK";
})(IntegrationExpireBehaviors || (exports.IntegrationExpireBehaviors = IntegrationExpireBehaviors = {}));
// values won't be statically typed if we use bit shifting, and enums can't use bigints
// eslint-disable-next-line @typescript-eslint/no-namespace
var Permissions;
(function (Permissions) {
    Permissions.CREATE_INSTANT_INVITE = 1n; // 1 << 0
    Permissions.KICK_MEMBERS = 2n; // 1 << 1
    Permissions.BAN_MEMBERS = 4n; // 1 << 2
    Permissions.ADMINISTRATOR = 8n; // 1 << 3
    Permissions.MANAGE_CHANNELS = 16n; // 1 << 4
    Permissions.MANAGE_GUILD = 32n; // 1 << 5
    Permissions.ADD_REACTIONS = 64n; // 1 << 6
    Permissions.VIEW_AUDIT_LOG = 128n; // 1 << 7
    Permissions.PRIORITY_SPEAKER = 256n; // 1 << 8
    Permissions.STREAM = 512n; // 1 << 9
    Permissions.VIEW_CHANNEL = 1024n; // 1 << 10
    Permissions.SEND_MESSAGES = 2048n; // 1 << 11
    Permissions.SEND_TTS_MESSAGES = 4096n; // 1 << 12
    Permissions.MANAGE_MESSAGES = 8192n; // 1 << 13
    Permissions.EMBED_LINKS = 16384n; // 1 << 14
    Permissions.ATTACH_FILES = 32768n; // 1 << 15
    Permissions.READ_MESSAGE_HISTORY = 65536n; // 1 << 16
    Permissions.MENTION_EVERYONE = 131072n; // 1 << 17
    Permissions.USE_EXTERNAL_EMOJIS = 262144n; // 1 << 18
    Permissions.VIEW_GUILD_INSIGHTS = 524288n; // 1 << 19
    Permissions.CONNECT = 1048576n; // 1 << 20
    Permissions.SPEAK = 2097152n; // 1 << 21
    Permissions.MUTE_MEMBERS = 4194304n; // 1 << 22
    Permissions.DEAFEN_MEMBERS = 8388608n; // 1 << 23
    Permissions.MOVE_MEMBERS = 16777216n; // 1 << 24
    Permissions.USE_VAD = 33554432n; // 1 << 25
    Permissions.CHANGE_NICKNAME = 67108864n; // 1 << 26
    Permissions.MANAGE_NICKNAMES = 134217728n; // 1 << 27
    Permissions.MANAGE_ROLES = 268435456n; // 1 << 28
    Permissions.MANAGE_WEBHOOKS = 536870912n; // 1 << 29
    Permissions.MANAGE_GUILD_EXPRESSIONS = 1073741824n; // 1 << 30
    Permissions.USE_APPLICATION_COMMANDS = 2147483648n; // 1 << 31
    Permissions.REQUEST_TO_SPEAK = 4294967296n; // 1 << 32
    Permissions.MANAGE_EVENTS = 8589934592n; // 1 << 33
    Permissions.MANAGE_THREADS = 17179869184n; // 1 << 34
    Permissions.CREATE_PUBLIC_THREADS = 34359738368n; // 1 << 35
    Permissions.CREATE_PRIVATE_THREADS = 68719476736n; // 1 << 36
    Permissions.USE_EXTERNAL_STICKERS = 137438953472n; // 1 << 37
    Permissions.SEND_MESSAGES_IN_THREADS = 274877906944n; // 1 << 38
    Permissions.USE_EMBEDDED_ACTIVITIES = 549755813888n; // 1 << 39
    Permissions.MODERATE_MEMBERS = 1099511627776n; // 1 << 40
    Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS = 2199023255552n; // 1 << 41
    Permissions.USE_SOUNDBOARD = 4398046511104n; // 1 << 42
    Permissions.CREATE_GUILD_EXPRESSIONS = 8796093022208n; // 1 << 43
    Permissions.CREATE_EVENTS = 17592186044416n; // 1 << 44
    Permissions.USE_EXTERNAL_SOUNDS = 35184372088832n; // 1 << 45
    Permissions.SEND_VOICE_MESSAGES = 70368744177664n; // 1 << 46
    /** @deprecated Allows members to interact with the Clyde AI integration. */
    Permissions.USE_CLYDE_AI = 140737488355328n; // 1 << 47
    Permissions.SET_VOICE_CHANNEL_STATUS = 281474976710656n; // 1 << 48
    Permissions.SEND_POLLS = 562949953421312n; // 1 << 49
    Permissions.USE_EXTERNAL_APPS = 1125899906842624n; // 1 << 50
    Permissions.PIN_MESSAGES = 2251799813685248n; // 1 << 51
    Permissions.BYPASS_SLOWMODE = 4503599627370496n; // 1 << 52
    /** Allows members to mark messages as official in verified guilds */
    Permissions.MANAGE_OFFICIAL_MESSAGES = 9007199254740992n; // 1 << 53
})(Permissions || (exports.Permissions = Permissions = {}));
// bigints can't be used as object keys, so we need to convert them to strings
exports.PermissionValueToName = Object.fromEntries(Object.entries(Permissions).map(([k, v]) => [String(v), k]));
exports.AllPermissions = Object.values(Permissions).reduce((a, b) => a | b, 0n);
exports.TextPermissions = [
    Permissions.CREATE_INSTANT_INVITE,
    Permissions.MANAGE_CHANNELS,
    Permissions.ADD_REACTIONS,
    Permissions.VIEW_CHANNEL,
    Permissions.SEND_MESSAGES,
    Permissions.SEND_TTS_MESSAGES,
    Permissions.MANAGE_MESSAGES,
    Permissions.EMBED_LINKS,
    Permissions.ATTACH_FILES,
    Permissions.READ_MESSAGE_HISTORY,
    Permissions.MENTION_EVERYONE,
    Permissions.USE_EXTERNAL_EMOJIS,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.USE_APPLICATION_COMMANDS,
    Permissions.MANAGE_THREADS,
    Permissions.CREATE_PUBLIC_THREADS,
    Permissions.CREATE_PRIVATE_THREADS,
    Permissions.USE_EXTERNAL_STICKERS,
    Permissions.SEND_MESSAGES_IN_THREADS,
    Permissions.SEND_VOICE_MESSAGES,
    Permissions.USE_CLYDE_AI,
    Permissions.SEND_POLLS,
    Permissions.USE_EXTERNAL_APPS,
    Permissions.PIN_MESSAGES,
    Permissions.BYPASS_SLOWMODE,
];
exports.AllTextPermissions = exports.TextPermissions.reduce((all, p) => all | p, 0n);
exports.AllTextPermissionNames = exports.TextPermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.VoicePermissions = [
    Permissions.CREATE_INSTANT_INVITE,
    Permissions.MANAGE_CHANNELS,
    Permissions.ADD_REACTIONS,
    Permissions.PRIORITY_SPEAKER,
    Permissions.STREAM,
    Permissions.VIEW_CHANNEL,
    Permissions.SEND_MESSAGES,
    Permissions.SEND_TTS_MESSAGES,
    Permissions.MANAGE_MESSAGES,
    Permissions.EMBED_LINKS,
    Permissions.ATTACH_FILES,
    Permissions.READ_MESSAGE_HISTORY,
    Permissions.MENTION_EVERYONE,
    Permissions.USE_EXTERNAL_EMOJIS,
    Permissions.CONNECT,
    Permissions.SPEAK,
    Permissions.MUTE_MEMBERS,
    Permissions.DEAFEN_MEMBERS,
    Permissions.MOVE_MEMBERS,
    Permissions.USE_VAD,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.USE_APPLICATION_COMMANDS,
    Permissions.MANAGE_EVENTS,
    Permissions.USE_EXTERNAL_STICKERS,
    Permissions.USE_EMBEDDED_ACTIVITIES,
    Permissions.USE_SOUNDBOARD,
    Permissions.USE_EXTERNAL_SOUNDS,
    Permissions.SEND_VOICE_MESSAGES,
    Permissions.USE_CLYDE_AI,
    Permissions.SET_VOICE_CHANNEL_STATUS,
    Permissions.SEND_POLLS,
    Permissions.USE_EXTERNAL_APPS,
    Permissions.BYPASS_SLOWMODE,
];
exports.AllVoicePermissions = exports.VoicePermissions.reduce((all, p) => all | p, 0n);
exports.AllVoicePermissionNames = exports.VoicePermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.StagePermissions = [
    Permissions.CREATE_INSTANT_INVITE,
    Permissions.MANAGE_CHANNELS,
    Permissions.ADD_REACTIONS,
    Permissions.STREAM,
    Permissions.VIEW_CHANNEL,
    Permissions.SEND_MESSAGES,
    Permissions.SEND_TTS_MESSAGES,
    Permissions.MANAGE_MESSAGES,
    Permissions.EMBED_LINKS,
    Permissions.ATTACH_FILES,
    Permissions.READ_MESSAGE_HISTORY,
    Permissions.MENTION_EVERYONE,
    Permissions.USE_EXTERNAL_EMOJIS,
    Permissions.CONNECT,
    Permissions.MUTE_MEMBERS,
    Permissions.MOVE_MEMBERS,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.USE_APPLICATION_COMMANDS,
    Permissions.REQUEST_TO_SPEAK,
    Permissions.MANAGE_EVENTS,
    Permissions.USE_EXTERNAL_STICKERS,
    Permissions.SEND_VOICE_MESSAGES,
    Permissions.USE_CLYDE_AI,
    Permissions.SEND_POLLS,
    Permissions.USE_EXTERNAL_APPS,
    Permissions.BYPASS_SLOWMODE,
];
exports.AllStagePermissions = exports.StagePermissions.reduce((all, p) => all | p, 0n);
exports.AllStagePermissionNames = exports.StagePermissions.map(p => exports.PermissionValueToName[String(p)]);
/** These permissions require the bot owner's account to have 2FA enabled in guilds where 2FA is a requirement. */
exports.ModeratorPermissions = [
    Permissions.KICK_MEMBERS,
    Permissions.BAN_MEMBERS,
    Permissions.ADMINISTRATOR,
    Permissions.MANAGE_CHANNELS,
    Permissions.MANAGE_GUILD,
    Permissions.MANAGE_MESSAGES,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.MANAGE_GUILD_EXPRESSIONS,
    Permissions.MANAGE_THREADS,
    Permissions.MODERATE_MEMBERS,
    Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS,
];
exports.AllModeratorPermissions = exports.ModeratorPermissions.reduce((all, p) => all | p, 0n);
exports.AllModeratorPermissionNames = exports.ModeratorPermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.PermissionNames = Object.keys(Permissions);
var ChannelFlags;
(function (ChannelFlags) {
    /** Guild channel is hidden from the guild's feed */
    ChannelFlags[ChannelFlags["GUILD_FEED_REMOVED"] = 1] = "GUILD_FEED_REMOVED";
    /** Thread is pinned to the top of its parent thread-only channel */
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
    /** Guild channel has been removed from the guild's active channels */
    ChannelFlags[ChannelFlags["ACTIVE_CHANNELS_REMOVED"] = 4] = "ACTIVE_CHANNELS_REMOVED";
    /** Thread-only channel requires a tag to create threads in */
    ChannelFlags[ChannelFlags["REQUIRE_TAG"] = 16] = "REQUIRE_TAG";
    /** Channel is marked as spam */
    ChannelFlags[ChannelFlags["IS_SPAM"] = 32] = "IS_SPAM";
    /** Guild channel is used as a read-only resource for onboarding and is not shown in the channel list */
    ChannelFlags[ChannelFlags["IS_GUILD_RESOURCE_CHANNEL"] = 128] = "IS_GUILD_RESOURCE_CHANNEL";
    /** Channel is created by Clyde AI, which has full access to all message content */
    ChannelFlags[ChannelFlags["CLYDE_AI"] = 256] = "CLYDE_AI";
    /** Guild channel is scheduled for deletion and is not shown in the UI */
    ChannelFlags[ChannelFlags["IS_SCHEDULED_FOR_DELETION"] = 512] = "IS_SCHEDULED_FOR_DELETION";
    /** @deprecated Forum channel is a media channel */
    ChannelFlags[ChannelFlags["IS_MEDIA_CHANNEL"] = 1024] = "IS_MEDIA_CHANNEL";
    /** Guild channel has summaries disabled */
    ChannelFlags[ChannelFlags["SUMMARIES_DISABLED"] = 2048] = "SUMMARIES_DISABLED";
    /** @deprecated Private channel's recipients consented to the application shelf */
    ChannelFlags[ChannelFlags["APPLICATION_SHELF_CONSENT"] = 4096] = "APPLICATION_SHELF_CONSENT";
    /** Role subscription tier for this guild channel has not been published yet */
    ChannelFlags[ChannelFlags["IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL"] = 8192] = "IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL";
    /** Group DM is used for broadcasting a live stream */
    ChannelFlags[ChannelFlags["IS_BROADCASTING"] = 16384] = "IS_BROADCASTING";
    /** Media channel has the embedded download options hidden for media attachments */
    ChannelFlags[ChannelFlags["HIDE_MEDIA_DOWNLOAD_OPTIONS"] = 32768] = "HIDE_MEDIA_DOWNLOAD_OPTIONS";
    /** Group DM is used for guild join request interviews */
    ChannelFlags[ChannelFlags["IS_JOIN_REQUEST_INTERVIEW_CHANNEL"] = 65536] = "IS_JOIN_REQUEST_INTERVIEW_CHANNEL";
    /** User does not have permission to view the channel */
    ChannelFlags[ChannelFlags["OBFUSCATED"] = 131072] = "OBFUSCATED";
    /** Forum channel is the guild's moderator queue */
    ChannelFlags[ChannelFlags["IS_MODERATOR_REPORT_CHANNEL"] = 524288] = "IS_MODERATOR_REPORT_CHANNEL";
    /** Channel is marked as a spoiler channel */
    ChannelFlags[ChannelFlags["IS_SPOILER_CHANNEL"] = 2097152] = "IS_SPOILER_CHANNEL";
})(ChannelFlags || (exports.ChannelFlags = ChannelFlags = {}));
var SortOrderTypes;
(function (SortOrderTypes) {
    /** Sort by the most recently active threads */
    SortOrderTypes[SortOrderTypes["LATEST_ACTIVITY"] = 0] = "LATEST_ACTIVITY";
    SortOrderTypes[SortOrderTypes["CREATION_DATE"] = 1] = "CREATION_DATE";
})(SortOrderTypes || (exports.SortOrderTypes = SortOrderTypes = {}));
var ForumLayoutTypes;
(function (ForumLayoutTypes) {
    /** No layout type explicitly set */
    ForumLayoutTypes[ForumLayoutTypes["DEFAULT"] = 0] = "DEFAULT";
    /** Threads are displayed in a list */
    ForumLayoutTypes[ForumLayoutTypes["LIST"] = 1] = "LIST";
    /** Threads are displayed in a collection of tiles */
    ForumLayoutTypes[ForumLayoutTypes["GRID"] = 2] = "GRID";
})(ForumLayoutTypes || (exports.ForumLayoutTypes = ForumLayoutTypes = {}));
var TeamMembershipState;
(function (TeamMembershipState) {
    /** The user is invited */
    TeamMembershipState[TeamMembershipState["INVITED"] = 1] = "INVITED";
    /** The user has accepted the invite */
    TeamMembershipState[TeamMembershipState["ACCEPTED"] = 2] = "ACCEPTED";
})(TeamMembershipState || (exports.TeamMembershipState = TeamMembershipState = {}));
var OAuthScopes;
(function (OAuthScopes) {
    /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval */
    OAuthScopes["ACTIVITIES_READ"] = "activities.read";
    /** allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR [GAMESDK ACTIVITY MANAGER](https://discord.com/developers/docs/game-sdk/activities)) */
    OAuthScopes["ACTIVITIES_WRITE"] = "activities.write";
    /** allows your app to read build data for a user's applications */
    OAuthScopes["APPLICATIONS_BUILDS_READ"] = "applications.builds.read";
    /** allows your app to upload/update builds for a user's applications - requires Discord approval */
    OAuthScopes["APPLICATIONS_BUILDS_UPLOAD"] = "applications.builds.upload";
    /** allows your app to use [commands](https://discord.com/developers/docs/interactions/application-commands) in a guild */
    OAuthScopes["APPLICATIONS_COMMANDS"] = "applications.commands";
    OAuthScopes["APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE"] = "applications.commands.permissions.update";
    /** allows your app to update its [commands](https://discord.com/developers/docs/interactions/application-commands) using a Bearer token - [client credentials grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant) only */
    OAuthScopes["APPLICATIONS_COMMANDS_UPDATE"] = "applications.commands.update";
    /** allows your app to read entitlements for a user's applications */
    OAuthScopes["APPLICATIONS_ENTITLEMENTS"] = "applications.entitlements";
    /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
    OAuthScopes["APPLICATIONS_STORE_UPDATE"] = "applications.store.update";
    /** for oauth2 bots, this puts the bot in the user's selected guild by default */
    OAuthScopes["BOT"] = "bot";
    /** allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) to return linked third-party accounts */
    OAuthScopes["CONNECTIONS"] = "connections";
    /** allows your app to see information about the user's DMs and group DMs - requires Discord approval */
    OAuthScopes["DM_CHANNELS_READ"] = "dm_channels.read";
    /** enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email` */
    OAuthScopes["EMAIL"] = "email";
    /** allows your app to [join users to a group dm](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) */
    OAuthScopes["GDM_JOIN"] = "gdm.join";
    /** allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) to return basic information about all of a user's guilds */
    OAuthScopes["GUILDS"] = "guilds";
    /** allows [/guilds/\{guild.id\}/members/\{user.id\}](https://discord.com/developers/docs/resources/guild#add-guild-member) to be used for joining users to a guild */
    OAuthScopes["GUILDS_JOIN"] = "guilds.join";
    /** allows [/users/@me/guilds/\{guild.id\}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) to return a user's member information in a guild */
    OAuthScopes["GUILDS_MEMBERS_READ"] = "guilds.members.read";
    /** allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email` */
    OAuthScopes["IDENTIFY"] = "identify";
    /** allows your app to read a user's Nitro subscription type as defined by `premium_type` on the User object - only available to approved partners */
    OAuthScopes["IDENTIFY_PREMIUM"] = "identify.premium";
    /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    OAuthScopes["MESSAGES_READ"] = "messages.read";
    /** enables OpenID Connect endpoints and ID token claims */
    OAuthScopes["OPENID"] = "openid";
    /** allows your app to know a user's friends and implicit relationships */
    OAuthScopes["RELATIONSHIPS_READ"] = "relationships.read";
    /** allows your app to update a user's connection and metadata for the app */
    OAuthScopes["ROLE_CONNECTIONS_WRITE"] = "role_connections.write";
    /** for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval */
    OAuthScopes["RPC"] = "rpc";
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    OAuthScopes["RPC_ACTIVITIES_READ"] = "rpc.activities.read";
    /** for local rpc server access, this allows you to update a user's activity - requires Discord approval */
    OAuthScopes["RPC_ACTIVITIES_WRITE"] = "rpc.activities.write";
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    OAuthScopes["RPC_NOTIFICATIONS_READ"] = "rpc.notifications.read";
    /** for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval */
    OAuthScopes["RPC_VOICE_READ"] = "rpc.voice.read";
    /** for local rpc server access, this allows you to update a user's voice settings - requires Discord approval */
    OAuthScopes["RPC_VOICE_WRITE"] = "rpc.voice.write";
    /** allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval */
    OAuthScopes["VOICE"] = "voice";
    /** This generates a webhook that is returned in the oauth token response for authorization code grants. */
    OAuthScopes["WEBHOOK_INCOMING"] = "webhook.incoming";
})(OAuthScopes || (exports.OAuthScopes = OAuthScopes = {}));
var ComponentTypes;
(function (ComponentTypes) {
    /** A container for other components */
    ComponentTypes[ComponentTypes["ACTION_ROW"] = 1] = "ACTION_ROW";
    /** A button object */
    ComponentTypes[ComponentTypes["BUTTON"] = 2] = "BUTTON";
    /** Select menu for picking from defined text options */
    ComponentTypes[ComponentTypes["STRING_SELECT"] = 3] = "STRING_SELECT";
    /** Text input object */
    ComponentTypes[ComponentTypes["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    /** Select menu for users */
    ComponentTypes[ComponentTypes["USER_SELECT"] = 5] = "USER_SELECT";
    /** Select menu for roles */
    ComponentTypes[ComponentTypes["ROLE_SELECT"] = 6] = "ROLE_SELECT";
    /** Select menu for mentionables (users and roles) */
    ComponentTypes[ComponentTypes["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
    /** Select menu for channels */
    ComponentTypes[ComponentTypes["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
    /** Container to display text alongside an accessory component */
    ComponentTypes[ComponentTypes["SECTION"] = 9] = "SECTION";
    /** Markdown text */
    ComponentTypes[ComponentTypes["TEXT_DISPLAY"] = 10] = "TEXT_DISPLAY";
    /** Small image that can be used as an accessory */
    ComponentTypes[ComponentTypes["THUMBNAIL"] = 11] = "THUMBNAIL";
    /** Display images and other media */
    ComponentTypes[ComponentTypes["MEDIA_GALLERY"] = 12] = "MEDIA_GALLERY";
    /** Displays an attached file */
    ComponentTypes[ComponentTypes["FILE"] = 13] = "FILE";
    /** Component to add vertical padding between other components */
    ComponentTypes[ComponentTypes["SEPARATOR"] = 14] = "SEPARATOR";
    /** Displays an activity feed entry */
    ComponentTypes[ComponentTypes["CONTENT_INVENTORY_ENTRY"] = 16] = "CONTENT_INVENTORY_ENTRY";
    /** Container that visually groups a set of components */
    ComponentTypes[ComponentTypes["CONTAINER"] = 17] = "CONTAINER";
    /** Container associating a label and description with a component */
    ComponentTypes[ComponentTypes["LABEL"] = 18] = "LABEL";
    /** Component to upload one or more files */
    ComponentTypes[ComponentTypes["FILE_UPLOAD"] = 19] = "FILE_UPLOAD";
    /** Single-choice set of radio options */
    ComponentTypes[ComponentTypes["RADIO_GROUP"] = 21] = "RADIO_GROUP";
    /** Multi-select group of checkboxes */
    ComponentTypes[ComponentTypes["CHECKBOX_GROUP"] = 22] = "CHECKBOX_GROUP";
    /** Single checkbox for binary choice */
    ComponentTypes[ComponentTypes["CHECKBOX"] = 23] = "CHECKBOX";
})(ComponentTypes || (exports.ComponentTypes = ComponentTypes = {}));
var ButtonStyles;
(function (ButtonStyles) {
    /** The most important or recommended action in a group of options */
    ButtonStyles[ButtonStyles["PRIMARY"] = 1] = "PRIMARY";
    /** Alternative or supporting actions */
    ButtonStyles[ButtonStyles["SECONDARY"] = 2] = "SECONDARY";
    /** Positive confirmation or completion actions */
    ButtonStyles[ButtonStyles["SUCCESS"] = 3] = "SUCCESS";
    /** An action with irreversible consequences */
    ButtonStyles[ButtonStyles["DANGER"] = 4] = "DANGER";
    /** Navigates to a URL */
    ButtonStyles[ButtonStyles["LINK"] = 5] = "LINK";
    /** Purchase */
    ButtonStyles[ButtonStyles["PREMIUM"] = 6] = "PREMIUM";
})(ButtonStyles || (exports.ButtonStyles = ButtonStyles = {}));
var TextInputStyles;
(function (TextInputStyles) {
    /** Single-line input */
    TextInputStyles[TextInputStyles["SHORT"] = 1] = "SHORT";
    /** Multi-line input */
    TextInputStyles[TextInputStyles["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyles || (exports.TextInputStyles = TextInputStyles = {}));
var MessageFlags;
(function (MessageFlags) {
    /** Message has been published to subscribed channels (via Channel Following) */
    MessageFlags[MessageFlags["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    /** Message originated from a message in another channel (via Channel Following) */
    MessageFlags[MessageFlags["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    /** Embeds will not be included when serializing this message */
    MessageFlags[MessageFlags["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    /** Source message for this crosspost has been deleted (via Channel Following) */
    MessageFlags[MessageFlags["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    /** Message came from the urgent message system */
    MessageFlags[MessageFlags["URGENT"] = 16] = "URGENT";
    /** Message has an associated thread, with the same ID as the message */
    MessageFlags[MessageFlags["HAS_THREAD"] = 32] = "HAS_THREAD";
    /** Message is only visible to the user who invoked the interaction */
    MessageFlags[MessageFlags["EPHEMERAL"] = 64] = "EPHEMERAL";
    /** Message is an interaction response and the bot is "thinking" */
    MessageFlags[MessageFlags["LOADING"] = 128] = "LOADING";
    /** Some roles were not mentioned and added to the thread (caps at 250) */
    MessageFlags[MessageFlags["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
    /** Message is hidden from the guild's feed */
    MessageFlags[MessageFlags["GUILD_FEED_HIDDEN"] = 512] = "GUILD_FEED_HIDDEN";
    /** Message contains a link that impersonates Discord */
    MessageFlags[MessageFlags["SHOULD_SHOW_LINK_NOT_DISCORD_WARNING"] = 1024] = "SHOULD_SHOW_LINK_NOT_DISCORD_WARNING";
    /** Message will not trigger push and desktop notifications */
    MessageFlags[MessageFlags["SUPPRESS_NOTIFICATIONS"] = 4096] = "SUPPRESS_NOTIFICATIONS";
    /** Message's audio attachment is rendered as a voice message */
    MessageFlags[MessageFlags["IS_VOICE_MESSAGE"] = 8192] = "IS_VOICE_MESSAGE";
    /** Message has a forwarded message snapshot attached */
    MessageFlags[MessageFlags["HAS_SNAPSHOT"] = 16384] = "HAS_SNAPSHOT";
    /** Message contains components from version 2 of the UI kit */
    MessageFlags[MessageFlags["IS_COMPONENTS_V2"] = 32768] = "IS_COMPONENTS_V2";
    /** Message was triggered by the social layer integration */
    MessageFlags[MessageFlags["SENT_BY_SOCIAL_LAYER_INTEGRATION"] = 65536] = "SENT_BY_SOCIAL_LAYER_INTEGRATION";
    /** Message is hidden because the author is suspended */
    MessageFlags[MessageFlags["HIDDEN_SUSPENDED_USER"] = 131072] = "HIDDEN_SUSPENDED_USER";
    /** Marks guild boosted message as the first person to boost the guild */
    MessageFlags[MessageFlags["IS_FIRST_BOOSTER"] = 262144] = "IS_FIRST_BOOSTER";
    /** Message is marked as official for the verified guild */
    MessageFlags[MessageFlags["IS_GUILD_OFFICIAL"] = 524288] = "IS_GUILD_OFFICIAL";
})(MessageFlags || (exports.MessageFlags = MessageFlags = {}));
var MessageTypes;
(function (MessageTypes) {
    /** A default message (see below) */
    MessageTypes[MessageTypes["DEFAULT"] = 0] = "DEFAULT";
    /** A message sent when a user is added to a group DM or thread */
    MessageTypes[MessageTypes["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    /** A message sent when a user is removed from a group DM or thread */
    MessageTypes[MessageTypes["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    /** A message sent when a user creates a call in a private channel */
    MessageTypes[MessageTypes["CALL"] = 3] = "CALL";
    /** A message sent when a group DM or thread's name is changed */
    MessageTypes[MessageTypes["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    /** A message sent when a group DM's icon is changed */
    MessageTypes[MessageTypes["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    /** A message sent when a message is pinned in a channel */
    MessageTypes[MessageTypes["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    /** A message sent when a user joins a guild */
    MessageTypes[MessageTypes["USER_JOIN"] = 7] = "USER_JOIN";
    /** A message sent when a user subscribes to (boosts) a guild */
    MessageTypes[MessageTypes["GUILD_BOOST"] = 8] = "GUILD_BOOST";
    /** A message sent when a user subscribes to (boosts) a guild to tier 1 */
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_1"] = 9] = "GUILD_BOOST_TIER_1";
    /** A message sent when a user subscribes to (boosts) a guild to tier 2 */
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_2"] = 10] = "GUILD_BOOST_TIER_2";
    /** A message sent when a user subscribes to (boosts) a guild to tier 3 */
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_3"] = 11] = "GUILD_BOOST_TIER_3";
    /** A message sent when a news channel is followed */
    MessageTypes[MessageTypes["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    /** @deprecated A message sent when a user starts streaming in a guild */
    MessageTypes[MessageTypes["GUILD_STREAM"] = 13] = "GUILD_STREAM";
    /** A message sent when a guild is disqualified from discovery */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    /** A message sent when a guild requalifies for discovery */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    /** A message sent when a guild has failed discovery requirements for a week */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    /** A message sent when a guild has failed discovery requirements for 3 weeks */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    /** A message sent when a thread is created */
    MessageTypes[MessageTypes["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    /** A message sent when a user replies to a message */
    MessageTypes[MessageTypes["REPLY"] = 19] = "REPLY";
    /** A message sent when a user uses a slash command */
    MessageTypes[MessageTypes["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    /** A message sent when a thread starter message is added to a thread */
    MessageTypes[MessageTypes["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    /** A message sent to remind users to invite friends to a guild */
    MessageTypes[MessageTypes["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    /** A message sent when a user uses a context menu command */
    MessageTypes[MessageTypes["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
    /** A message sent when auto moderation takes an action */
    MessageTypes[MessageTypes["AUTO_MODERATION_ACTION"] = 24] = "AUTO_MODERATION_ACTION";
    /** A message sent when a user purchases or renews a role subscription */
    MessageTypes[MessageTypes["ROLE_SUBSCRIPTION_PURCHASE"] = 25] = "ROLE_SUBSCRIPTION_PURCHASE";
    /** A message sent when a user is upsold to a premium interaction */
    MessageTypes[MessageTypes["INTERACTION_PREMIUM_UPSELL"] = 26] = "INTERACTION_PREMIUM_UPSELL";
    /** A message sent when a stage channel starts */
    MessageTypes[MessageTypes["STAGE_START"] = 27] = "STAGE_START";
    /** A message sent when a stage channel ends */
    MessageTypes[MessageTypes["STAGE_END"] = 28] = "STAGE_END";
    /** A message sent when a user starts speaking in a stage channel */
    MessageTypes[MessageTypes["STAGE_SPEAKER"] = 29] = "STAGE_SPEAKER";
    /** A message sent when a user raises their hand in a stage channel */
    MessageTypes[MessageTypes["STAGE_RAISE_HAND"] = 30] = "STAGE_RAISE_HAND";
    /** A message sent when a stage channel's topic is changed */
    MessageTypes[MessageTypes["STAGE_TOPIC_CHANGE"] = 31] = "STAGE_TOPIC_CHANGE";
    /** A message sent when a user purchases an application premium subscription */
    MessageTypes[MessageTypes["GUILD_APPLICATION_PREMIUM_SUBSCRIPTION"] = 32] = "GUILD_APPLICATION_PREMIUM_SUBSCRIPTION";
    /** @deprecated A message sent when a user adds an application to group DM */
    MessageTypes[MessageTypes["PRIVATE_CHANNEL_INTEGRATION_ADDED"] = 33] = "PRIVATE_CHANNEL_INTEGRATION_ADDED";
    /** @deprecated A message sent when a user removed an application from a group DM */
    MessageTypes[MessageTypes["PRIVATE_CHANNEL_INTEGRATION_REMOVED"] = 34] = "PRIVATE_CHANNEL_INTEGRATION_REMOVED";
    /** A message sent when a user gifts a premium (Nitro) referral */
    MessageTypes[MessageTypes["PREMIUM_REFERRAL"] = 35] = "PREMIUM_REFERRAL";
    /** A message sent when a user enabled lockdown for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_ALERT_MODE_ENABLED"] = 36] = "GUILD_INCIDENT_ALERT_MODE_ENABLED";
    /** A message sent when a user disables lockdown for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_ALERT_MODE_DISABLED"] = 37] = "GUILD_INCIDENT_ALERT_MODE_DISABLED";
    /** A message sent when a user reports a raid for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_REPORT_RAID"] = 38] = "GUILD_INCIDENT_REPORT_RAID";
    /** A message sent when a user reports a false alarm for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_REPORT_FALSE_ALARM"] = 39] = "GUILD_INCIDENT_REPORT_FALSE_ALARM";
    /** A message sent when no one sends a message in the current channel for 1 hour */
    MessageTypes[MessageTypes["GUILD_DEADCHAT_REVIVE_PROMPT"] = 40] = "GUILD_DEADCHAT_REVIVE_PROMPT";
    /** A message sent when a user buys another user a gift */
    MessageTypes[MessageTypes["CUSTOM_GIFT"] = 41] = "CUSTOM_GIFT";
    MessageTypes[MessageTypes["GUILD_GAMING_STATS_PROMPT"] = 42] = "GUILD_GAMING_STATS_PROMPT";
    /** @deprecated A message sent when a user posts a poll */
    MessageTypes[MessageTypes["POLL"] = 43] = "POLL";
    /** A message sent when a user purchases a guild product */
    MessageTypes[MessageTypes["PURCHASE_NOTIFICATION"] = 44] = "PURCHASE_NOTIFICATION";
    /** @deprecated A message sent when a user invites another user to hangout in a voice channel */
    MessageTypes[MessageTypes["VOICE_HANGOUT_INVITE"] = 45] = "VOICE_HANGOUT_INVITE";
    /** A message sent when a poll is finalized */
    MessageTypes[MessageTypes["POLL_RESULT"] = 46] = "POLL_RESULT";
    /** A message sent by the Discord Updates account when a new changelog is posted */
    MessageTypes[MessageTypes["CHANGELOG"] = 47] = "CHANGELOG";
    /** A message sent when a Nitro promotion is triggered */
    MessageTypes[MessageTypes["NITRO_NOTIFICATION"] = 48] = "NITRO_NOTIFICATION";
    /** A message sent when a voice channel is linked to a lobby */
    MessageTypes[MessageTypes["CHANNEL_LINKED_TO_LOBBY"] = 49] = "CHANNEL_LINKED_TO_LOBBY";
    /** A local-only ephemeral message sent when a user is prompted to gift Nitro to a friend on their friendship anniversary */
    MessageTypes[MessageTypes["GIFTING_PROMPT"] = 50] = "GIFTING_PROMPT";
    /** A local-only message sent when a user receives an in-game message NUX */
    MessageTypes[MessageTypes["IN_GAME_MESSAGE_NUX"] = 51] = "IN_GAME_MESSAGE_NUX";
    /** A message sent when a user accepts a guild join request */
    MessageTypes[MessageTypes["GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION"] = 52] = "GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION";
    /** A message sent when a user rejects a guild join request */
    MessageTypes[MessageTypes["GUILD_JOIN_REQUEST_REJECT_NOTIFICATION"] = 53] = "GUILD_JOIN_REQUEST_REJECT_NOTIFICATION";
    /** A message sent when a user withdraws a guild join request */
    MessageTypes[MessageTypes["GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION"] = 54] = "GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION";
    /** A message sent when a user upgrades to HD streaming */
    MessageTypes[MessageTypes["HD_STREAMING_UPGRADED"] = 55] = "HD_STREAMING_UPGRADED";
    /** @deprecated A message sent when a user sets a DM wallpaper */
    MessageTypes[MessageTypes["CHAT_WALLPAPER_SET"] = 56] = "CHAT_WALLPAPER_SET";
    /** @deprecated A message sent when a user removes a DM wallpaper */
    MessageTypes[MessageTypes["CHAT_WALLPAPER_REMOVE"] = 57] = "CHAT_WALLPAPER_REMOVE";
    /** A message sent when a user resolves a moderation report by deleting the offending message */
    MessageTypes[MessageTypes["REPORT_TO_MOD_DELETED_MESSAGE"] = 58] = "REPORT_TO_MOD_DELETED_MESSAGE";
    /** A message sent when a user resolves a moderation report by timing out the offending user */
    MessageTypes[MessageTypes["REPORT_TO_MOD_TIMEOUT_USER"] = 59] = "REPORT_TO_MOD_TIMEOUT_USER";
    /** A message sent when a user resolves a moderation report by kicking the offending user */
    MessageTypes[MessageTypes["REPORT_TO_MOD_KICK_USER"] = 60] = "REPORT_TO_MOD_KICK_USER";
    /** A message sent when a user resolves a moderation report by banning the offending user */
    MessageTypes[MessageTypes["REPORT_TO_MOD_BAN_USER"] = 61] = "REPORT_TO_MOD_BAN_USER";
    /** A message sent when a user resolves a moderation report */
    MessageTypes[MessageTypes["REPORT_TO_MOD_CLOSED_REPORT"] = 62] = "REPORT_TO_MOD_CLOSED_REPORT";
    /** @deprecated A message sent when a user adds a new emoji to a guild */
    MessageTypes[MessageTypes["EMOJI_ADDED"] = 63] = "EMOJI_ADDED";
    /** A message sent when a user invites another user to join a group Nitro subscription */
    MessageTypes[MessageTypes["PREMIUM_GROUP_INVITE"] = 64] = "PREMIUM_GROUP_INVITE";
    /** A message sent when a user starts a voice channel in a small guild */
    MessageTypes[MessageTypes["VOICE_SESSION"] = 65] = "VOICE_SESSION";
    /** A local-only ephemeral message asking the user to be the first to boost a guild */
    MessageTypes[MessageTypes["GUILD_BOOST_UPSELL"] = 66] = "GUILD_BOOST_UPSELL";
    /** A message sent when a user accepts another user's friend request */
    MessageTypes[MessageTypes["FRIEND_REQUEST_ACCEPTED"] = 67] = "FRIEND_REQUEST_ACCEPTED";
    MessageTypes[MessageTypes["MEDIA_MENTION_MESSAGE"] = 68] = "MEDIA_MENTION_MESSAGE";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
/** Messages of these types cannot be deleted. */
exports.UndeletableMessageTypes = [
    MessageTypes.RECIPIENT_ADD,
    MessageTypes.RECIPIENT_REMOVE,
    MessageTypes.CALL,
    MessageTypes.CHANNEL_NAME_CHANGE,
    MessageTypes.CHANNEL_ICON_CHANGE,
    MessageTypes.THREAD_STARTER_MESSAGE,
];
var MessageActivityTypes;
(function (MessageActivityTypes) {
    /** Join activity invite. */
    MessageActivityTypes[MessageActivityTypes["JOIN"] = 1] = "JOIN";
    /** Spectate activity invite. */
    MessageActivityTypes[MessageActivityTypes["SPECTATE"] = 2] = "SPECTATE";
    /** Listen activity invite. */
    MessageActivityTypes[MessageActivityTypes["LISTEN"] = 3] = "LISTEN";
    /** Watch activity invite. */
    MessageActivityTypes[MessageActivityTypes["WATCH"] = 4] = "WATCH";
    /** Join request activity invite. */
    MessageActivityTypes[MessageActivityTypes["JOIN_REQUEST"] = 5] = "JOIN_REQUEST";
})(MessageActivityTypes || (exports.MessageActivityTypes = MessageActivityTypes = {}));
var InteractionTypes;
(function (InteractionTypes) {
    /** Discord is pinging the application */
    InteractionTypes[InteractionTypes["PING"] = 1] = "PING";
    /** User uses an application command */
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    /** User triggers a message component */
    InteractionTypes[InteractionTypes["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    /** User is requesting an application command option to be auto-completed */
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    /** User submits a modal */
    InteractionTypes[InteractionTypes["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionTypes || (exports.InteractionTypes = InteractionTypes = {}));
var InviteTypes;
(function (InviteTypes) {
    /** Joins the user to a guild */
    InviteTypes[InviteTypes["GUILD"] = 0] = "GUILD";
    /** Joins the user to a group DM */
    InviteTypes[InviteTypes["GROUP_DM"] = 1] = "GROUP_DM";
    /** Adds the user as a friend to the inviter */
    InviteTypes[InviteTypes["FRIEND"] = 2] = "FRIEND";
})(InviteTypes || (exports.InviteTypes = InviteTypes = {}));
var InviteTargetTypes;
(function (InviteTargetTypes) {
    /** The invite is for a stream in a voice channel */
    InviteTargetTypes[InviteTargetTypes["STREAM"] = 1] = "STREAM";
    /** The invite is for an embedded application (activity) in a voice channel */
    InviteTargetTypes[InviteTargetTypes["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
    InviteTargetTypes[InviteTargetTypes["ROLE_SUBSCRIPTIONS_PURCHASE"] = 3] = "ROLE_SUBSCRIPTIONS_PURCHASE";
})(InviteTargetTypes || (exports.InviteTargetTypes = InviteTargetTypes = {}));
var GuildScheduledEventPrivacyLevels;
(function (GuildScheduledEventPrivacyLevels) {
    /** Scheduled event or stage instance is only visible to guild members */
    GuildScheduledEventPrivacyLevels[GuildScheduledEventPrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(GuildScheduledEventPrivacyLevels || (exports.GuildScheduledEventPrivacyLevels = GuildScheduledEventPrivacyLevels = {}));
var GuildScheduledEventStatuses;
(function (GuildScheduledEventStatuses) {
    /** Scheduled event has not started. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["SCHEDULED"] = 1] = "SCHEDULED";
    /** Scheduled event is currently active. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["ACTIVE"] = 2] = "ACTIVE";
    /** Scheduled event completed. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["COMPLETED"] = 3] = "COMPLETED";
    /** Scheduled event was canceled. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["CANCELED"] = 4] = "CANCELED";
})(GuildScheduledEventStatuses || (exports.GuildScheduledEventStatuses = GuildScheduledEventStatuses = {}));
var GuildScheduledEventEntityTypes;
(function (GuildScheduledEventEntityTypes) {
    /** Scheduled event is for a stage instance. */
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["STAGE_INSTANCE"] = 1] = "STAGE_INSTANCE";
    /** Scheduled event is for a voice channel. */
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["VOICE"] = 2] = "VOICE";
    /** Scheduled event is external. */
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["EXTERNAL"] = 3] = "EXTERNAL";
})(GuildScheduledEventEntityTypes || (exports.GuildScheduledEventEntityTypes = GuildScheduledEventEntityTypes = {}));
var StageInstancePrivacyLevels;
(function (StageInstancePrivacyLevels) {
    /** @deprecated Scheduled event or stage instance is visible publicly */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["PUBLIC"] = 1] = "PUBLIC";
    /** Scheduled event or stage instance is only visible to guild members */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(StageInstancePrivacyLevels || (exports.StageInstancePrivacyLevels = StageInstancePrivacyLevels = {}));
var AutoModerationEventTypes;
(function (AutoModerationEventTypes) {
    /** When a member sends or edits a message in the guild */
    AutoModerationEventTypes[AutoModerationEventTypes["MESSAGE_SEND"] = 1] = "MESSAGE_SEND";
    AutoModerationEventTypes[AutoModerationEventTypes["MEMBER_UPDATE"] = 2] = "MEMBER_UPDATE";
})(AutoModerationEventTypes || (exports.AutoModerationEventTypes = AutoModerationEventTypes = {}));
var AutoModerationTriggerTypes;
(function (AutoModerationTriggerTypes) {
    /** When message content contains words from a user defined list of keywords (max 6) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["KEYWORD"] = 1] = "KEYWORD";
    /** When message content represents generic spam (max 1) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["SPAM"] = 3] = "SPAM";
    /** When message content contains words from internal predefined wordsets (max 1) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["KEYWORD_PRESET"] = 4] = "KEYWORD_PRESET";
    /** When message content contains more unique mentions than allowed (max 1) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["MENTION_SPAM"] = 5] = "MENTION_SPAM";
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["MEMBER_PROFILE"] = 6] = "MEMBER_PROFILE";
})(AutoModerationTriggerTypes || (exports.AutoModerationTriggerTypes = AutoModerationTriggerTypes = {}));
var AutoModerationKeywordPresetTypes;
(function (AutoModerationKeywordPresetTypes) {
    /** Words that may be considered forms of swearing or cursing */
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["PROFANITY"] = 1] = "PROFANITY";
    /** Words that refer to sexually explicit behavior or activity */
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["SEXUAL_CONTENT"] = 2] = "SEXUAL_CONTENT";
    /** Personal insults or words that may be considered hate speech */
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["SLURS"] = 3] = "SLURS";
})(AutoModerationKeywordPresetTypes || (exports.AutoModerationKeywordPresetTypes = AutoModerationKeywordPresetTypes = {}));
var AutoModerationActionTypes;
(function (AutoModerationActionTypes) {
    /** Block a member's message and prevent it from being posted; a custom explanation can be specified and shown to members whenever their message is blocked */
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MESSAGE"] = 1] = "BLOCK_MESSAGE";
    /** Log user content to a specified channel */
    AutoModerationActionTypes[AutoModerationActionTypes["SEND_ALERT_MESSAGE"] = 2] = "SEND_ALERT_MESSAGE";
    AutoModerationActionTypes[AutoModerationActionTypes["TIMEOUT"] = 3] = "TIMEOUT";
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MEMBER_INTERACTION"] = 4] = "BLOCK_MEMBER_INTERACTION";
})(AutoModerationActionTypes || (exports.AutoModerationActionTypes = AutoModerationActionTypes = {}));
var AuditLogActionTypes;
(function (AuditLogActionTypes) {
    /** Guild settings were updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_UPDATE"] = 1] = "GUILD_UPDATE";
    /** Channel was created */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_CREATE"] = 10] = "CHANNEL_CREATE";
    /** Channel settings were updated */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_UPDATE"] = 11] = "CHANNEL_UPDATE";
    /** Channel was deleted */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_DELETE"] = 12] = "CHANNEL_DELETE";
    /** Permission overwrite was added to a channel */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_CREATE"] = 13] = "CHANNEL_OVERWRITE_CREATE";
    /** Permission overwrite was updated for a channel */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_UPDATE"] = 14] = "CHANNEL_OVERWRITE_UPDATE";
    /** Permission overwrite was deleted from a channel */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_DELETE"] = 15] = "CHANNEL_OVERWRITE_DELETE";
    /** Member was removed from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_KICK"] = 20] = "MEMBER_KICK";
    /** Members were pruned from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_PRUNE"] = 21] = "MEMBER_PRUNE";
    /** Member was banned from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_BAN_ADD"] = 22] = "MEMBER_BAN_ADD";
    /** Member was unbanned from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_BAN_REMOVE"] = 23] = "MEMBER_BAN_REMOVE";
    /** Member was updated in guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_UPDATE"] = 24] = "MEMBER_UPDATE";
    /** Member was added or removed from a role */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_ROLE_UPDATE"] = 25] = "MEMBER_ROLE_UPDATE";
    /** Member was moved to a different voice channel */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_MOVE"] = 26] = "MEMBER_MOVE";
    /** Member was disconnected from a voice channel */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_DISCONNECT"] = 27] = "MEMBER_DISCONNECT";
    /** Bot user was added to guild */
    AuditLogActionTypes[AuditLogActionTypes["BOT_ADD"] = 28] = "BOT_ADD";
    /** Role was created */
    AuditLogActionTypes[AuditLogActionTypes["ROLE_CREATE"] = 30] = "ROLE_CREATE";
    /** Role was edited */
    AuditLogActionTypes[AuditLogActionTypes["ROLE_UPDATE"] = 31] = "ROLE_UPDATE";
    /** Role was deleted */
    AuditLogActionTypes[AuditLogActionTypes["ROLE_DELETE"] = 32] = "ROLE_DELETE";
    /** Guild invite was created */
    AuditLogActionTypes[AuditLogActionTypes["INVITE_CREATE"] = 40] = "INVITE_CREATE";
    /** Guild invite was updated */
    AuditLogActionTypes[AuditLogActionTypes["INVITE_UPDATE"] = 41] = "INVITE_UPDATE";
    /** Guild invite was deleted */
    AuditLogActionTypes[AuditLogActionTypes["INVITE_DELETE"] = 42] = "INVITE_DELETE";
    /** Webhook was created */
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_CREATE"] = 50] = "WEBHOOK_CREATE";
    /** Webhook properties or channel were updated */
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_UPDATE"] = 51] = "WEBHOOK_UPDATE";
    /** Webhook was deleted */
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_DELETE"] = 52] = "WEBHOOK_DELETE";
    /** Emoji was created */
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_CREATE"] = 60] = "EMOJI_CREATE";
    /** Emoji name was updated */
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_UPDATE"] = 61] = "EMOJI_UPDATE";
    /** Emoji was deleted */
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_DELETE"] = 62] = "EMOJI_DELETE";
    /** Single message was deleted */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_DELETE"] = 72] = "MESSAGE_DELETE";
    /** Multiple messages were deleted */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_BULK_DELETE"] = 73] = "MESSAGE_BULK_DELETE";
    /** Message was pinned to a channel */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_PIN"] = 74] = "MESSAGE_PIN";
    /** Message was unpinned from a channel */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_UNPIN"] = 75] = "MESSAGE_UNPIN";
    /** Integration was added to guild */
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_CREATE"] = 80] = "INTEGRATION_CREATE";
    /** Integration was updated (e.g. its scopes were updated) */
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_UPDATE"] = 81] = "INTEGRATION_UPDATE";
    /** Integration was removed from guild */
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_DELETE"] = 82] = "INTEGRATION_DELETE";
    /** Stage instance was created (stage channel becomes live) */
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_CREATE"] = 83] = "STAGE_INSTANCE_CREATE";
    /** Stage instance details were updated */
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_UPDATE"] = 84] = "STAGE_INSTANCE_UPDATE";
    /** Stage instance was deleted (stage channel no longer live) */
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_DELETE"] = 85] = "STAGE_INSTANCE_DELETE";
    /** Sticker was created */
    AuditLogActionTypes[AuditLogActionTypes["STICKER_CREATE"] = 90] = "STICKER_CREATE";
    /** Sticker details were updated */
    AuditLogActionTypes[AuditLogActionTypes["STICKER_UPDATE"] = 91] = "STICKER_UPDATE";
    /** Sticker was deleted */
    AuditLogActionTypes[AuditLogActionTypes["STICKER_DELETE"] = 92] = "STICKER_DELETE";
    /** Event was created */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_CREATE"] = 100] = "GUILD_SCHEDULED_EVENT_CREATE";
    /** Event was updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_UPDATE"] = 101] = "GUILD_SCHEDULED_EVENT_UPDATE";
    /** Event was cancelled */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_DELETE"] = 102] = "GUILD_SCHEDULED_EVENT_DELETE";
    /** Thread was created in a channel */
    AuditLogActionTypes[AuditLogActionTypes["THREAD_CREATE"] = 110] = "THREAD_CREATE";
    /** Thread was updated */
    AuditLogActionTypes[AuditLogActionTypes["THREAD_UPDATE"] = 111] = "THREAD_UPDATE";
    /** Thread was deleted */
    AuditLogActionTypes[AuditLogActionTypes["THREAD_DELETE"] = 112] = "THREAD_DELETE";
    /** Permissions were updated for a command */
    AuditLogActionTypes[AuditLogActionTypes["APPLICATION_COMMAND_PERMISSION_UPDATE"] = 121] = "APPLICATION_COMMAND_PERMISSION_UPDATE";
    /** Soundboard sound was created */
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_CREATE"] = 130] = "SOUNDBOARD_SOUND_CREATE";
    /** Soundboard sound was updated */
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_UPDATE"] = 131] = "SOUNDBOARD_SOUND_UPDATE";
    /** Soundboard sound was deleted */
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_DELETE"] = 132] = "SOUNDBOARD_SOUND_DELETE";
    /** AutoMod rule was created */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_CREATE"] = 140] = "AUTO_MODERATION_RULE_CREATE";
    /** AutoMod rule was updated */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_UPDATE"] = 141] = "AUTO_MODERATION_RULE_UPDATE";
    /** AutoMod rule was deleted */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_DELETE"] = 142] = "AUTO_MODERATION_RULE_DELETE";
    /** Message was blocked by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_BLOCK_MESSAGE"] = 143] = "AUTO_MODERATION_BLOCK_MESSAGE";
    /** Message was flagged by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_FLAG_TO_CHANNEL"] = 144] = "AUTO_MODERATION_FLAG_TO_CHANNEL";
    /** Member was timed out by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_USER_COMMUNICATION_DISABLED"] = 145] = "AUTO_MODERATION_USER_COMMUNICATION_DISABLED";
    /** Member was quarantined by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_QUARANTINE_USER"] = 146] = "AUTO_MODERATION_QUARANTINE_USER";
    /** Creator monetization request was created */
    AuditLogActionTypes[AuditLogActionTypes["CREATOR_MONETIZATION_REQUEST_CREATED"] = 150] = "CREATOR_MONETIZATION_REQUEST_CREATED";
    /** Creator monetization terms were accepted */
    AuditLogActionTypes[AuditLogActionTypes["CREATOR_MONETIZATION_TERMS_ACCEPTED"] = 151] = "CREATOR_MONETIZATION_TERMS_ACCEPTED";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_CREATE"] = 160] = "ROLE_PROMPT_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_UPDATE"] = 161] = "ROLE_PROMPT_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_DELETE"] = 162] = "ROLE_PROMPT_DELETE";
    /** Onboarding prompt was created */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_CREATE"] = 163] = "ONBOARDING_PROMPT_CREATE";
    /** Onboarding prompt was updated */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_UPDATE"] = 164] = "ONBOARDING_PROMPT_UPDATE";
    /** Onboarding prompt was deleted */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_DELETE"] = 165] = "ONBOARDING_PROMPT_DELETE";
    /** Onboarding was initialized */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_CREATE"] = 166] = "ONBOARDING_CREATE";
    /** Onboarding was updated */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_UPDATE"] = 167] = "ONBOARDING_UPDATE";
    /** Message was featured in guild home */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_HOME_FEATURE_ITEM"] = 171] = "GUILD_HOME_FEATURE_ITEM";
    /** Message was removed from guild home */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_HOME_REMOVE_ITEM"] = 172] = "GUILD_HOME_REMOVE_ITEM";
    /** @deprecated Message blocked by harmful links filter */
    AuditLogActionTypes[AuditLogActionTypes["HARMFUL_LINKS_BLOCKED_MESSAGE"] = 180] = "HARMFUL_LINKS_BLOCKED_MESSAGE";
    /** New member welcome was initialized */
    AuditLogActionTypes[AuditLogActionTypes["HOME_SETTINGS_CREATE"] = 190] = "HOME_SETTINGS_CREATE";
    /** New member welcome was updated */
    AuditLogActionTypes[AuditLogActionTypes["HOME_SETTINGS_UPDATE"] = 191] = "HOME_SETTINGS_UPDATE";
    /** Voice channel status was updated */
    AuditLogActionTypes[AuditLogActionTypes["VOICE_CHANNEL_STATUS_CREATE"] = 192] = "VOICE_CHANNEL_STATUS_CREATE";
    /** Voice channel status was deleted */
    AuditLogActionTypes[AuditLogActionTypes["VOICE_CHANNEL_STATUS_DELETE"] = 193] = "VOICE_CHANNEL_STATUS_DELETE";
    /** @deprecated Clyde AI profile was updated */
    AuditLogActionTypes[AuditLogActionTypes["CLYDE_AI_PROFILE_UPDATE"] = 194] = "CLYDE_AI_PROFILE_UPDATE";
    /** Exception was created for a guild scheduled event */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE"] = 200] = "GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE";
    /** Exception was updated for a guild scheduled event */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE"] = 201] = "GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE";
    /** Exception was deleted for a guild scheduled event */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE"] = 202] = "GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE";
    /** Member verification settings were updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_MEMBER_VERIFICATION_UPDATE"] = 210] = "GUILD_MEMBER_VERIFICATION_UPDATE";
    /** Guild profile was updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_PROFILE_UPDATE"] = 211] = "GUILD_PROFILE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["PIN_PERMISSION_MIGRATION_COMPLETE"] = 212] = "PIN_PERMISSION_MIGRATION_COMPLETE";
    AuditLogActionTypes[AuditLogActionTypes["BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM"] = 213] = "BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM";
})(AuditLogActionTypes || (exports.AuditLogActionTypes = AuditLogActionTypes = {}));
var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    /** Slash commands; a text-based command that shows up when a user types `/` */
    ApplicationCommandTypes[ApplicationCommandTypes["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    /** An UI-based command that shows up when you right click or tap on an user */
    ApplicationCommandTypes[ApplicationCommandTypes["USER"] = 2] = "USER";
    /** An UI-based command that shows up when you right click or tap on a message */
    ApplicationCommandTypes[ApplicationCommandTypes["MESSAGE"] = 3] = "MESSAGE";
    /** An UI-based command that represents the primary way to invoke an app's activity */
    ApplicationCommandTypes[ApplicationCommandTypes["PRIMARY_ENTRY_POINT"] = 4] = "PRIMARY_ENTRY_POINT";
})(ApplicationCommandTypes || (exports.ApplicationCommandTypes = ApplicationCommandTypes = {}));
var ApplicationCommandOptionTypes;
(function (ApplicationCommandOptionTypes) {
    /** A subcommand */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    /** A group of subcommands */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    /** A string */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["STRING"] = 3] = "STRING";
    /** An integer between -253 and */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["INTEGER"] = 4] = "INTEGER";
    /** A boolean */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["BOOLEAN"] = 5] = "BOOLEAN";
    /** An user */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["USER"] = 6] = "USER";
    /** A channel (includes all channel types by default) */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["CHANNEL"] = 7] = "CHANNEL";
    /** A role */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ROLE"] = 8] = "ROLE";
    /** A mentionable entity (currently only users and roles) */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["MENTIONABLE"] = 9] = "MENTIONABLE";
    /** A float/integer between -253 and */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["NUMBER"] = 10] = "NUMBER";
    /** An attachment */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionTypes || (exports.ApplicationCommandOptionTypes = ApplicationCommandOptionTypes = {}));
var ApplicationCommandPermissionTypes;
(function (ApplicationCommandPermissionTypes) {
    /** A role within a guild */
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["ROLE"] = 1] = "ROLE";
    /** A guild member */
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["USER"] = 2] = "USER";
    /** A channel within a guild */
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionTypes || (exports.ApplicationCommandPermissionTypes = ApplicationCommandPermissionTypes = {}));
var InteractionResponseTypes;
(function (InteractionResponseTypes) {
    /** Acknowledge a `PING` interaction */
    InteractionResponseTypes[InteractionResponseTypes["PONG"] = 1] = "PONG";
    /** Respond to an interaction with a message */
    InteractionResponseTypes[InteractionResponseTypes["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    /** Acknowledge an interaction and send a message later; the user sees a loading state */
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    /** Acknowledge an interaction and edit the original message later; the user does not see a loading state */
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    /** Edit the message that the interacted component was attached to */
    InteractionResponseTypes[InteractionResponseTypes["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    /** Respond to an autocomplete interaction with suggested choices */
    InteractionResponseTypes[InteractionResponseTypes["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    /** Respond to an interaction with a popup modal */
    InteractionResponseTypes[InteractionResponseTypes["MODAL"] = 9] = "MODAL";
    /** @deprecated */
    InteractionResponseTypes[InteractionResponseTypes["PREMIUM_REQUIRED"] = 10] = "PREMIUM_REQUIRED";
    /** Launch an embedded activity associated with the application */
    InteractionResponseTypes[InteractionResponseTypes["LAUNCH_ACTIVITY"] = 12] = "LAUNCH_ACTIVITY";
})(InteractionResponseTypes || (exports.InteractionResponseTypes = InteractionResponseTypes = {}));
var EntryPointCommandHandlerTypes;
(function (EntryPointCommandHandlerTypes) {
    /** The application handles the interaction using an interaction token */
    EntryPointCommandHandlerTypes[EntryPointCommandHandlerTypes["APP_HANDLER"] = 1] = "APP_HANDLER";
    /** Discord handles the interaction by launching an embedded activity and sending a follow-up message without coordinating with the app */
    EntryPointCommandHandlerTypes[EntryPointCommandHandlerTypes["DISCORD_LAUNCH_ACTIVITY"] = 2] = "DISCORD_LAUNCH_ACTIVITY";
})(EntryPointCommandHandlerTypes || (exports.EntryPointCommandHandlerTypes = EntryPointCommandHandlerTypes = {}));
var Intents;
(function (Intents) {
    /** Guilds and unavailable guild events. */
    Intents[Intents["GUILDS"] = 1] = "GUILDS";
    /** Guild member events. */
    Intents[Intents["GUILD_MEMBERS"] = 2] = "GUILD_MEMBERS";
    /** Guild moderation events, including bans. */
    Intents[Intents["GUILD_MODERATION"] = 4] = "GUILD_MODERATION";
    /** @deprecated Guild emoji and sticker events. Use `GUILD_EXPRESSIONS`. */
    Intents[Intents["GUILD_EMOJIS_AND_STICKERS"] = 8] = "GUILD_EMOJIS_AND_STICKERS";
    /** Guild emoji, sticker, and soundboard expression events. */
    Intents[Intents["GUILD_EXPRESSIONS"] = 8] = "GUILD_EXPRESSIONS";
    /** Guild integration events. */
    Intents[Intents["GUILD_INTEGRATIONS"] = 16] = "GUILD_INTEGRATIONS";
    /** Guild webhook events. */
    Intents[Intents["GUILD_WEBHOOKS"] = 32] = "GUILD_WEBHOOKS";
    /** Guild invite events. */
    Intents[Intents["GUILD_INVITES"] = 64] = "GUILD_INVITES";
    /** Guild voice state events. */
    Intents[Intents["GUILD_VOICE_STATES"] = 128] = "GUILD_VOICE_STATES";
    /** Guild presence events. */
    Intents[Intents["GUILD_PRESENCES"] = 256] = "GUILD_PRESENCES";
    /** Guild message create/update/delete events. */
    Intents[Intents["GUILD_MESSAGES"] = 512] = "GUILD_MESSAGES";
    /** Guild message reaction events. */
    Intents[Intents["GUILD_MESSAGE_REACTIONS"] = 1024] = "GUILD_MESSAGE_REACTIONS";
    /** Guild message typing events. */
    Intents[Intents["GUILD_MESSAGE_TYPING"] = 2048] = "GUILD_MESSAGE_TYPING";
    /** Direct message create/update/delete events. */
    Intents[Intents["DIRECT_MESSAGES"] = 4096] = "DIRECT_MESSAGES";
    /** Direct message reaction events. */
    Intents[Intents["DIRECT_MESSAGE_REACTIONS"] = 8192] = "DIRECT_MESSAGE_REACTIONS";
    /** Direct message typing events. */
    Intents[Intents["DIRECT_MESSAGE_TYPING"] = 16384] = "DIRECT_MESSAGE_TYPING";
    /** Message content fields for message events. */
    Intents[Intents["MESSAGE_CONTENT"] = 32768] = "MESSAGE_CONTENT";
    /** Guild scheduled event events. */
    Intents[Intents["GUILD_SCHEDULED_EVENTS"] = 65536] = "GUILD_SCHEDULED_EVENTS";
    /** Auto Moderation rule create/update/delete events. */
    Intents[Intents["AUTO_MODERATION_CONFIGURATION"] = 1048576] = "AUTO_MODERATION_CONFIGURATION";
    /** Auto Moderation action execution events. */
    Intents[Intents["AUTO_MODERATION_EXECUTION"] = 2097152] = "AUTO_MODERATION_EXECUTION";
    /** Guild poll vote events. */
    Intents[Intents["GUILD_MESSAGE_POLLS"] = 16777216] = "GUILD_MESSAGE_POLLS";
    /** Direct message poll vote events. */
    Intents[Intents["DIRECT_MESSAGE_POLLS"] = 33554432] = "DIRECT_MESSAGE_POLLS";
})(Intents || (exports.Intents = Intents = {}));
// @TODO: find a way to make the above not manual, if possible
exports.NonPrivilegedIntents = [
    Intents.GUILDS,
    Intents.GUILD_MODERATION,
    Intents.GUILD_EXPRESSIONS,
    Intents.GUILD_INTEGRATIONS,
    Intents.GUILD_WEBHOOKS,
    Intents.GUILD_INVITES,
    Intents.GUILD_VOICE_STATES,
    Intents.GUILD_MESSAGES,
    Intents.GUILD_MESSAGE_REACTIONS,
    Intents.GUILD_MESSAGE_TYPING,
    Intents.DIRECT_MESSAGES,
    Intents.DIRECT_MESSAGE_REACTIONS,
    Intents.DIRECT_MESSAGE_TYPING,
    Intents.GUILD_SCHEDULED_EVENTS,
    Intents.AUTO_MODERATION_CONFIGURATION,
    Intents.AUTO_MODERATION_EXECUTION,
    Intents.GUILD_MESSAGE_POLLS,
    Intents.DIRECT_MESSAGE_POLLS,
];
exports.AllNonPrivilegedIntents = exports.NonPrivilegedIntents.reduce((all, p) => all | p, 0);
exports.PrivilegedIntents = [
    Intents.GUILD_MEMBERS,
    Intents.GUILD_PRESENCES,
    Intents.MESSAGE_CONTENT,
];
exports.AllPrivilegedIntents = exports.PrivilegedIntents.reduce((all, p) => all | p, 0);
exports.AllIntents = exports.AllNonPrivilegedIntents | exports.AllPrivilegedIntents;
exports.PrivilegedIntentMapping = [
    [Intents.GUILD_PRESENCES, [ApplicationFlags.GATEWAY_PRESENCE, ApplicationFlags.GATEWAY_PRESENCE_LIMITED]],
    [Intents.GUILD_MEMBERS, [ApplicationFlags.GATEWAY_GUILD_MEMBERS, ApplicationFlags.GATEWAY_GUILD_MEMBERS_LIMITED]],
    [Intents.MESSAGE_CONTENT, [ApplicationFlags.GATEWAY_MESSAGE_CONTENT, ApplicationFlags.GATEWAY_MESSAGE_CONTENT_LIMITED]],
];
var GatewayOPCodes;
(function (GatewayOPCodes) {
    /** An event was dispatched */
    GatewayOPCodes[GatewayOPCodes["DISPATCH"] = 0] = "DISPATCH";
    /** Keep the WebSocket connection alive */
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT"] = 1] = "HEARTBEAT";
    /** Start a new session during the initial handshake */
    GatewayOPCodes[GatewayOPCodes["IDENTIFY"] = 2] = "IDENTIFY";
    /** Update the client's presence */
    GatewayOPCodes[GatewayOPCodes["PRESENCE_UPDATE"] = 3] = "PRESENCE_UPDATE";
    /** Join/leave or move between voice channels and calls */
    GatewayOPCodes[GatewayOPCodes["VOICE_STATE_UPDATE"] = 4] = "VOICE_STATE_UPDATE";
    /** Resume a previous session that was disconnected */
    GatewayOPCodes[GatewayOPCodes["RESUME"] = 6] = "RESUME";
    /** You should attempt to reconnect and resume immediately */
    GatewayOPCodes[GatewayOPCodes["RECONNECT"] = 7] = "RECONNECT";
    /** Request information about guild members */
    GatewayOPCodes[GatewayOPCodes["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    /** The session has been invalidated. You should reconnect and identify/resume accordingly */
    GatewayOPCodes[GatewayOPCodes["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    /** Sent immediately after connecting, contains the `heartbeat_interval` to use */
    GatewayOPCodes[GatewayOPCodes["HELLO"] = 10] = "HELLO";
    /** Acknowledge a received heartbeat */
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
    /** Request soundboard sounds for guilds */
    GatewayOPCodes[GatewayOPCodes["REQUEST_SOUNDBOARD_SOUNDS"] = 31] = "REQUEST_SOUNDBOARD_SOUNDS";
    /** Request extra voice channel fields for a guild */
    GatewayOPCodes[GatewayOPCodes["REQUEST_CHANNEL_INFO"] = 43] = "REQUEST_CHANNEL_INFO";
})(GatewayOPCodes || (exports.GatewayOPCodes = GatewayOPCodes = {}));
var GatewayCloseCodes;
(function (GatewayCloseCodes) {
    /** We're not sure what went wrong. Try reconnecting? */
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_ERROR"] = 4000] = "UNKNOWN_ERROR";
    /** You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that! */
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    /** You sent an invalid payload. Don't do that! */
    GatewayCloseCodes[GatewayCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    /** You sent us a payload prior to identifying, or this session has been invalidated */
    GatewayCloseCodes[GatewayCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    /** The account token sent with your identify payload is incorrect */
    GatewayCloseCodes[GatewayCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    /** You sent more than one identify payload. Don't do that! */
    GatewayCloseCodes[GatewayCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    /** The sequence sent when resuming the session was invalid. Reconnect and start a new session */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SEQUENCE"] = 4007] = "INVALID_SEQUENCE";
    /** Woah nelly! You're sending payloads too quickly. Slow it down! You will be disconnected on receiving this */
    GatewayCloseCodes[GatewayCloseCodes["RATE_LIMITED"] = 4008] = "RATE_LIMITED";
    /** Your session timed out. Reconnect and start a new one */
    GatewayCloseCodes[GatewayCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    /** You sent us an invalid shard when identifying */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SHARD"] = 4010] = "INVALID_SHARD";
    /** The session would have handled too many guilds—you are required to shard your connection in order to connect */
    GatewayCloseCodes[GatewayCloseCodes["SHARDING_REQUIRED"] = 4011] = "SHARDING_REQUIRED";
    /** You sent an invalid version for the Gateway */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_API_VERSION"] = 4012] = "INVALID_API_VERSION";
    /** You sent an invalid intent for a Gateway intent. You may have incorrectly calculated the bitwise value */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_INTENTS"] = 4013] = "INVALID_INTENTS";
    /** You sent a disallowed intent for a Gateway intent. You may have tried to specify an intent that you have not enabled or are not approved for */
    GatewayCloseCodes[GatewayCloseCodes["DISALLOWED_INTENTS"] = 4014] = "DISALLOWED_INTENTS";
})(GatewayCloseCodes || (exports.GatewayCloseCodes = GatewayCloseCodes = {}));
var VoiceOPCodes;
(function (VoiceOPCodes) {
    /** Start a new voice WebSocket connection */
    VoiceOPCodes[VoiceOPCodes["IDENTIFY"] = 0] = "IDENTIFY";
    /** Select the voice protocol */
    VoiceOPCodes[VoiceOPCodes["SELECT_PROTOCOL"] = 1] = "SELECT_PROTOCOL";
    /** Complete the WebSocket handshake */
    VoiceOPCodes[VoiceOPCodes["READY"] = 2] = "READY";
    /** Keep the WebSocket connection alive */
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT"] = 3] = "HEARTBEAT";
    /** Describe the session */
    VoiceOPCodes[VoiceOPCodes["SESSION_DESCRIPTION"] = 4] = "SESSION_DESCRIPTION";
    /** Indicate which users are speaking */
    VoiceOPCodes[VoiceOPCodes["SPEAKING"] = 5] = "SPEAKING";
    /** Acknowledge a received heartbeat */
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT_ACK"] = 6] = "HEARTBEAT_ACK";
    /** Resume a previous session that was disconnected */
    VoiceOPCodes[VoiceOPCodes["RESUME"] = 7] = "RESUME";
    /** Sent immediately after connecting, contains the `heartbeat_interval` to use */
    VoiceOPCodes[VoiceOPCodes["HELLO"] = 8] = "HELLO";
    /** Response to acknowledging a successful resume */
    VoiceOPCodes[VoiceOPCodes["RESUMED"] = 9] = "RESUMED";
    /** Indicate that clients have connected to the voice channel */
    VoiceOPCodes[VoiceOPCodes["CLIENTS_CONNECT"] = 11] = "CLIENTS_CONNECT";
    /** Indicate that a client has disconnected from the voice channel */
    VoiceOPCodes[VoiceOPCodes["CLIENT_DISCONNECT"] = 13] = "CLIENT_DISCONNECT";
})(VoiceOPCodes || (exports.VoiceOPCodes = VoiceOPCodes = {}));
var VoiceCloseCodes;
(function (VoiceCloseCodes) {
    /** You sent an invalid opcode */
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    /** You sent a invalid payload in your identifying to the Gateway */
    VoiceCloseCodes[VoiceCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    /** You sent a payload before identifying with the Gateway */
    VoiceCloseCodes[VoiceCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    /** The token you sent in your identify payload is incorrect */
    VoiceCloseCodes[VoiceCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    /** You sent more than one identify payload. Stahp */
    VoiceCloseCodes[VoiceCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    /** Your session is no longer valid */
    VoiceCloseCodes[VoiceCloseCodes["INVALID_SESSION"] = 4006] = "INVALID_SESSION";
    /** Your session has timed out */
    VoiceCloseCodes[VoiceCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    /** We can't find the server you're trying to connect to */
    VoiceCloseCodes[VoiceCloseCodes["SERVER_NOT_FOUND"] = 4011] = "SERVER_NOT_FOUND";
    /** We didn't recognize the protocol you sent */
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_PROTOCOL"] = 4012] = "UNKNOWN_PROTOCOL";
    /** Disconnect individual client (you were kicked, the main Gateway session was dropped, etc.). Should not reconnect */
    VoiceCloseCodes[VoiceCloseCodes["DISCONNECTED"] = 4013] = "DISCONNECTED";
    /** The server crashed. Our bad! Try resuming */
    VoiceCloseCodes[VoiceCloseCodes["VOICE_SERVER_CRASHED"] = 4014] = "VOICE_SERVER_CRASHED";
    /** We didn't recognize your encryption */
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_ENCRYPTION_MODE"] = 4015] = "UNKNOWN_ENCRYPTION_MODE";
})(VoiceCloseCodes || (exports.VoiceCloseCodes = VoiceCloseCodes = {}));
var HubTypes;
(function (HubTypes) {
    /** Student hub is not categorized as a high school or post-secondary institution */
    HubTypes[HubTypes["DEFAULT"] = 0] = "DEFAULT";
    /** Student hub is for a high school */
    HubTypes[HubTypes["HIGH_SCHOOL"] = 1] = "HIGH_SCHOOL";
    /** Student hub is for a post-secondary institution (college or university) */
    HubTypes[HubTypes["COLLEGE"] = 2] = "COLLEGE";
})(HubTypes || (exports.HubTypes = HubTypes = {}));
var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes[ActivityTypes["GAME"] = 0] = "GAME";
    ActivityTypes[ActivityTypes["STREAMING"] = 1] = "STREAMING";
    ActivityTypes[ActivityTypes["LISTENING"] = 2] = "LISTENING";
    ActivityTypes[ActivityTypes["WATCHING"] = 3] = "WATCHING";
    ActivityTypes[ActivityTypes["CUSTOM"] = 4] = "CUSTOM";
    ActivityTypes[ActivityTypes["COMPETING"] = 5] = "COMPETING";
    ActivityTypes[ActivityTypes["HANG_STATUS"] = 6] = "HANG_STATUS";
})(ActivityTypes || (exports.ActivityTypes = ActivityTypes = {}));
var ActivityFlags;
(function (ActivityFlags) {
    /** Activity is an instanced game session (a match that will end) */
    ActivityFlags[ActivityFlags["INSTANCE"] = 1] = "INSTANCE";
    /** Activity can be joined by other users */
    ActivityFlags[ActivityFlags["JOIN"] = 2] = "JOIN";
    ActivityFlags[ActivityFlags["SPECTATE"] = 4] = "SPECTATE";
    /** @deprecated Activity requires a request to join */
    ActivityFlags[ActivityFlags["JOIN_REQUEST"] = 8] = "JOIN_REQUEST";
    /** Activity can be synced */
    ActivityFlags[ActivityFlags["SYNC"] = 16] = "SYNC";
    /** Activity can be played */
    ActivityFlags[ActivityFlags["PLAY"] = 32] = "PLAY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_FRIENDS_ONLY"] = 64] = "PARTY_PRIVACY_FRIENDS_ONLY";
    /** Activity's party can be joined by users in the same voice channel */
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_VOICE_CHANNEL"] = 128] = "PARTY_PRIVACY_VOICE_CHANNEL";
    /** Activity is embedded within the Discord client */
    ActivityFlags[ActivityFlags["EMBEDDED"] = 256] = "EMBEDDED";
})(ActivityFlags || (exports.ActivityFlags = ActivityFlags = {}));
var ThreadMemberFlags;
(function (ThreadMemberFlags) {
    /** User has interacted with the thread */
    ThreadMemberFlags[ThreadMemberFlags["HAS_INTERACTED"] = 1] = "HAS_INTERACTED";
    /** User receives notifications for all messages */
    ThreadMemberFlags[ThreadMemberFlags["ALL_MESSAGES"] = 2] = "ALL_MESSAGES";
    /** User receives notifications only for messages that @mention them */
    ThreadMemberFlags[ThreadMemberFlags["ONLY_MENTIONS"] = 4] = "ONLY_MENTIONS";
    /** User does not receive any notifications */
    ThreadMemberFlags[ThreadMemberFlags["NO_MESSAGES"] = 8] = "NO_MESSAGES";
})(ThreadMemberFlags || (exports.ThreadMemberFlags = ThreadMemberFlags = {}));
var RoleConnectionMetadataTypes;
(function (RoleConnectionMetadataTypes) {
    /** The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_LESS_THAN_OR_EQUAL"] = 1] = "INTEGER_LESS_THAN_OR_EQUAL";
    /** The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_GREATER_THAN_OR_EQUAL"] = 2] = "INTEGER_GREATER_THAN_OR_EQUAL";
    /** The metadata value (`integer`) is equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_EQUAL"] = 3] = "INTEGER_EQUAL";
    /** The metadata value (`integer`) is not equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_NOT_EQUAL"] = 4] = "INTEGER_NOT_EQUAL";
    /** The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; `days before current date`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_LESS_THAN_OR_EQUAL"] = 5] = "DATETIME_LESS_THAN_OR_EQUAL";
    /** The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; `days before current date`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_GREATER_THAN_OR_EQUAL"] = 6] = "DATETIME_GREATER_THAN_OR_EQUAL";
    /** The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_EQUAL"] = 7] = "BOOLEAN_EQUAL";
    /** The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_NOT_EQUAL"] = 8] = "BOOLEAN_NOT_EQUAL";
})(RoleConnectionMetadataTypes || (exports.RoleConnectionMetadataTypes = RoleConnectionMetadataTypes = {}));
var GuildMemberFlags;
(function (GuildMemberFlags) {
    /** Guild member has left and rejoined the guild */
    GuildMemberFlags[GuildMemberFlags["DID_REJOIN"] = 1] = "DID_REJOIN";
    /** Guild member has completed onboarding */
    GuildMemberFlags[GuildMemberFlags["COMPLETED_ONBOARDING"] = 2] = "COMPLETED_ONBOARDING";
    /** Guild member bypasses guild verification requirements and member verification */
    GuildMemberFlags[GuildMemberFlags["BYPASSES_VERIFICATION"] = 4] = "BYPASSES_VERIFICATION";
    /** Guild member has started onboarding */
    GuildMemberFlags[GuildMemberFlags["STARTED_ONBOARDING"] = 8] = "STARTED_ONBOARDING";
    /** Guild member is a guest and not a true member */
    GuildMemberFlags[GuildMemberFlags["IS_GUEST"] = 16] = "IS_GUEST";
    /** Guild member has started the new member actions in the server guide */
    GuildMemberFlags[GuildMemberFlags["STARTED_HOME_ACTIONS"] = 32] = "STARTED_HOME_ACTIONS";
    /** Guild member has completed all of the new member actions in the server guide */
    GuildMemberFlags[GuildMemberFlags["COMPLETED_HOME_ACTIONS"] = 64] = "COMPLETED_HOME_ACTIONS";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME"] = 128] = "AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME";
    /** @deprecated Guild member has been indefinitely quarantined by an AutoMod Rule for their bio */
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_BIO"] = 256] = "AUTOMOD_QUARANTINED_BIO";
    /** Guild member has acknowledged the DM privacy settings upsell modal */
    GuildMemberFlags[GuildMemberFlags["DM_SETTINGS_UPSELL_ACKNOWLEDGED"] = 512] = "DM_SETTINGS_UPSELL_ACKNOWLEDGED";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_CLAN_TAG"] = 1024] = "AUTOMOD_QUARANTINED_CLAN_TAG";
})(GuildMemberFlags || (exports.GuildMemberFlags = GuildMemberFlags = {}));
var OnboardingPromptTypes;
(function (OnboardingPromptTypes) {
    /** Prompt offers multiple options to select from */
    OnboardingPromptTypes[OnboardingPromptTypes["MULTIPLE_CHOICE"] = 0] = "MULTIPLE_CHOICE";
    /** Prompt offers a dropdown menu to select from */
    OnboardingPromptTypes[OnboardingPromptTypes["DROPDOWN"] = 1] = "DROPDOWN";
})(OnboardingPromptTypes || (exports.OnboardingPromptTypes = OnboardingPromptTypes = {}));
var AnimationTypes;
(function (AnimationTypes) {
    /** Premium animation type. */
    AnimationTypes[AnimationTypes["PREMIUM"] = 0] = "PREMIUM";
    /** Basic animation type. */
    AnimationTypes[AnimationTypes["BASIC"] = 1] = "BASIC";
})(AnimationTypes || (exports.AnimationTypes = AnimationTypes = {}));
var OnboardingModes;
(function (OnboardingModes) {
    OnboardingModes[OnboardingModes["DEFAULT"] = 0] = "DEFAULT";
    OnboardingModes[OnboardingModes["ADVANCED"] = 1] = "ADVANCED";
})(OnboardingModes || (exports.OnboardingModes = OnboardingModes = {}));
var InviteFlags;
(function (InviteFlags) {
    /** Invite grants one-time access to a voice channel in the guild */
    InviteFlags[InviteFlags["IS_GUEST_INVITE"] = 1] = "IS_GUEST_INVITE";
})(InviteFlags || (exports.InviteFlags = InviteFlags = {}));
var ReactionType;
(function (ReactionType) {
    /** A normal reaction */
    ReactionType[ReactionType["NORMAL"] = 0] = "NORMAL";
    ReactionType[ReactionType["SUPER"] = 1] = "SUPER";
})(ReactionType || (exports.ReactionType = ReactionType = {}));
var AttachmentFlags;
(function (AttachmentFlags) {
    /** Attachment is a clipped recording of a stream */
    AttachmentFlags[AttachmentFlags["IS_CLIP"] = 1] = "IS_CLIP";
    /** Attachment is a thumbnail */
    AttachmentFlags[AttachmentFlags["IS_THUMBNAIL"] = 2] = "IS_THUMBNAIL";
    /** Attachment has been remixed */
    AttachmentFlags[AttachmentFlags["IS_REMIX"] = 4] = "IS_REMIX";
    /** Attachment is a spoiler */
    AttachmentFlags[AttachmentFlags["IS_SPOILER"] = 8] = "IS_SPOILER";
    /** Attachment was flagged as sensitive content */
    AttachmentFlags[AttachmentFlags["CONTAINS_EXPLICIT_MEDIA"] = 16] = "CONTAINS_EXPLICIT_MEDIA";
    /** Attachment is an animated image */
    AttachmentFlags[AttachmentFlags["IS_ANIMATED"] = 32] = "IS_ANIMATED";
})(AttachmentFlags || (exports.AttachmentFlags = AttachmentFlags = {}));
var SKUTypes;
(function (SKUTypes) {
    /** Primary durable item */
    SKUTypes[SKUTypes["DURABLE_PRIMARY"] = 1] = "DURABLE_PRIMARY";
    /** Durable item */
    SKUTypes[SKUTypes["DURABLE"] = 2] = "DURABLE";
    /** Consumable item */
    SKUTypes[SKUTypes["CONSUMABLE"] = 3] = "CONSUMABLE";
    /** Bundle of items */
    SKUTypes[SKUTypes["BUNDLE"] = 4] = "BUNDLE";
    /** Subscription item */
    SKUTypes[SKUTypes["SUBSCRIPTION"] = 5] = "SUBSCRIPTION";
    /** Group of subscription items */
    SKUTypes[SKUTypes["SUBSCRIPTION_GROUP"] = 6] = "SUBSCRIPTION_GROUP";
})(SKUTypes || (exports.SKUTypes = SKUTypes = {}));
var SKUFlags;
(function (SKUFlags) {
    /** SKU is available for free to premium users */
    SKUFlags[SKUFlags["PREMIUM_PURCHASE"] = 1] = "PREMIUM_PURCHASE";
    /** SKU has free content for premium users */
    SKUFlags[SKUFlags["HAS_FREE_PREMIUM_CONTENT"] = 2] = "HAS_FREE_PREMIUM_CONTENT";
    /** SKU is available for purchase */
    SKUFlags[SKUFlags["AVAILABLE"] = 4] = "AVAILABLE";
    /** SKU is available for free to premium users and purchasable normally */
    SKUFlags[SKUFlags["PREMIUM_AND_DISTRIBUTION"] = 8] = "PREMIUM_AND_DISTRIBUTION";
    SKUFlags[SKUFlags["STICKER_PACK"] = 16] = "STICKER_PACK";
    /** SKU is a guild role subscription or ticketed event */
    SKUFlags[SKUFlags["GUILD_ROLE"] = 32] = "GUILD_ROLE";
    /** SKU is a giftable Discord premium subscription */
    SKUFlags[SKUFlags["AVAILABLE_FOR_SUBSCRIPTION_GIFTING"] = 64] = "AVAILABLE_FOR_SUBSCRIPTION_GIFTING";
    /** SKU is an application subscription for guilds */
    SKUFlags[SKUFlags["APPLICATION_GUILD_SUBSCRIPTION"] = 128] = "APPLICATION_GUILD_SUBSCRIPTION";
    SKUFlags[SKUFlags["GUILD_SUBSCRIPTION"] = 128] = "GUILD_SUBSCRIPTION";
    /** SKU is an application subscription for users */
    SKUFlags[SKUFlags["APPLICATION_USER_SUBSCRIPTION"] = 256] = "APPLICATION_USER_SUBSCRIPTION";
    SKUFlags[SKUFlags["USER_SUBSCRIPTION"] = 256] = "USER_SUBSCRIPTION";
})(SKUFlags || (exports.SKUFlags = SKUFlags = {}));
var EntitlementTypes;
(function (EntitlementTypes) {
    /** Entitlement was purchased by a user */
    EntitlementTypes[EntitlementTypes["PURCHASE"] = 1] = "PURCHASE";
    /** Entitlement is for a premium (Nitro) subscription */
    EntitlementTypes[EntitlementTypes["PREMIUM_SUBSCRIPTION"] = 2] = "PREMIUM_SUBSCRIPTION";
    /** Entitlement was gifted by a developer */
    EntitlementTypes[EntitlementTypes["DEVELOPER_GIFT"] = 3] = "DEVELOPER_GIFT";
    /** Entitlement was purchased by a developer in application test mode */
    EntitlementTypes[EntitlementTypes["TEST_MODE_PURCHASE"] = 4] = "TEST_MODE_PURCHASE";
    /** Entitlement was granted when the SKU was free */
    EntitlementTypes[EntitlementTypes["FREE_PURCHASE"] = 5] = "FREE_PURCHASE";
    /** Entitlement was gifted by another user */
    EntitlementTypes[EntitlementTypes["USER_GIFT"] = 6] = "USER_GIFT";
    /** Entitlement was claimed for free via a premium subscription */
    EntitlementTypes[EntitlementTypes["PREMIUM_PURCHASE"] = 7] = "PREMIUM_PURCHASE";
    /** Entitlement is for an application subscription */
    EntitlementTypes[EntitlementTypes["APPLICATION_SUBSCRIPTION"] = 8] = "APPLICATION_SUBSCRIPTION";
})(EntitlementTypes || (exports.EntitlementTypes = EntitlementTypes = {}));
var EntitlementOwnerTypes;
(function (EntitlementOwnerTypes) {
    /** Entitlement is for a guild */
    EntitlementOwnerTypes[EntitlementOwnerTypes["GUILD"] = 1] = "GUILD";
    /** Entitlement is for a user */
    EntitlementOwnerTypes[EntitlementOwnerTypes["USER"] = 2] = "USER";
})(EntitlementOwnerTypes || (exports.EntitlementOwnerTypes = EntitlementOwnerTypes = {}));
var SKUAccessTypes;
(function (SKUAccessTypes) {
    SKUAccessTypes[SKUAccessTypes["PUBLIC"] = 1] = "PUBLIC";
})(SKUAccessTypes || (exports.SKUAccessTypes = SKUAccessTypes = {}));
var SubscriptionStatuses;
(function (SubscriptionStatuses) {
    /** Subscription is active */
    SubscriptionStatuses[SubscriptionStatuses["ACTIVE"] = 0] = "ACTIVE";
    SubscriptionStatuses[SubscriptionStatuses["INACTIVE"] = 1] = "INACTIVE";
    SubscriptionStatuses[SubscriptionStatuses["ENDING"] = 2] = "ENDING";
})(SubscriptionStatuses || (exports.SubscriptionStatuses = SubscriptionStatuses = {}));
var PollLayoutType;
(function (PollLayoutType) {
    /** The default layout type */
    PollLayoutType[PollLayoutType["DEFAULT"] = 1] = "DEFAULT";
})(PollLayoutType || (exports.PollLayoutType = PollLayoutType = {}));
var ApplicationMonetizationState;
(function (ApplicationMonetizationState) {
    /** This application does not have monetization set up */
    ApplicationMonetizationState[ApplicationMonetizationState["NONE"] = 1] = "NONE";
    /** This application has monetization set up */
    ApplicationMonetizationState[ApplicationMonetizationState["ENABLED"] = 2] = "ENABLED";
    /** This application has been blocked from monetizing */
    ApplicationMonetizationState[ApplicationMonetizationState["BLOCKED"] = 3] = "BLOCKED";
})(ApplicationMonetizationState || (exports.ApplicationMonetizationState = ApplicationMonetizationState = {}));
var ApplicationDiscoverabilityState;
(function (ApplicationDiscoverabilityState) {
    /** This application is ineligible for the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["INELIGIBLE"] = 1] = "INELIGIBLE";
    /** This application is not listed in the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["NOT_DISCOVERABLE"] = 2] = "NOT_DISCOVERABLE";
    /** This application is listed in the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["DISCOVERABLE"] = 3] = "DISCOVERABLE";
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["FEATURABLE"] = 4] = "FEATURABLE";
    /** This application has been blocked from appearing in the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["BLOCKED"] = 5] = "BLOCKED";
})(ApplicationDiscoverabilityState || (exports.ApplicationDiscoverabilityState = ApplicationDiscoverabilityState = {}));
var ApplicationDiscoveryEligibilityFlags;
(function (ApplicationDiscoveryEligibilityFlags) {
    /** Application is verified */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["VERIFIED"] = 1] = "VERIFIED";
    /** Application has at least one tag set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["TAG"] = 2] = "TAG";
    /** Application has a description */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["DESCRIPTION"] = 4] = "DESCRIPTION";
    /** Application has terms of service set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["TERMS_OF_SERVICE"] = 8] = "TERMS_OF_SERVICE";
    /** Application has a privacy policy set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["PRIVACY_POLICY"] = 16] = "PRIVACY_POLICY";
    /** Application has a custom install URL or install parameters */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["INSTALL_PARAMS"] = 32] = "INSTALL_PARAMS";
    /** Application's name is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_NAME"] = 64] = "SAFE_NAME";
    /** Application's description is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_DESCRIPTION"] = 128] = "SAFE_DESCRIPTION";
    /** Application has the message content intent approved or utilizes application commands */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["APPROVED_COMMANDS"] = 256] = "APPROVED_COMMANDS";
    /** Application has a support guild set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SUPPORT_GUILD"] = 512] = "SUPPORT_GUILD";
    /** Application's commands are safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_COMMANDS"] = 1024] = "SAFE_COMMANDS";
    /** Application's owner has MFA enabled */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["MFA"] = 2048] = "MFA";
    /** Application's directory long description is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_DIRECTORY_OVERVIEW"] = 4096] = "SAFE_DIRECTORY_OVERVIEW";
    /** Application has at least one supported locale set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SUPPORTED_LOCALES"] = 8192] = "SUPPORTED_LOCALES";
    /** Application's directory short description is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_SHORT_DESCRIPTION"] = 16384] = "SAFE_SHORT_DESCRIPTION";
    /** Application's role connections metadata is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_ROLE_CONNECTIONS"] = 32768] = "SAFE_ROLE_CONNECTIONS";
})(ApplicationDiscoveryEligibilityFlags || (exports.ApplicationDiscoveryEligibilityFlags = ApplicationDiscoveryEligibilityFlags = {}));
var ApplicationExplicitContentFilterLevel;
(function (ApplicationExplicitContentFilterLevel) {
    ApplicationExplicitContentFilterLevel[ApplicationExplicitContentFilterLevel["DISABLED"] = 0] = "DISABLED";
    ApplicationExplicitContentFilterLevel[ApplicationExplicitContentFilterLevel["ENABLED"] = 1] = "ENABLED";
})(ApplicationExplicitContentFilterLevel || (exports.ApplicationExplicitContentFilterLevel = ApplicationExplicitContentFilterLevel = {}));
var ApplicationInteractionsVersion;
(function (ApplicationInteractionsVersion) {
    /** Only Interaction Create events are sent as documented (default) */
    ApplicationInteractionsVersion[ApplicationInteractionsVersion["VERSION_1"] = 1] = "VERSION_1";
    /** A selection of chosen events are sent */
    ApplicationInteractionsVersion[ApplicationInteractionsVersion["VERSION_2"] = 2] = "VERSION_2";
})(ApplicationInteractionsVersion || (exports.ApplicationInteractionsVersion = ApplicationInteractionsVersion = {}));
var ApplicationMonetizationEligibilityFlags;
(function (ApplicationMonetizationEligibilityFlags) {
    /** Application is verified */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["VERIFIED"] = 1] = "VERIFIED";
    /** Application is owned by a team */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["HAS_TEAM"] = 2] = "HAS_TEAM";
    /** Application has the message content intent approved or utilizes application commands */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["APPROVED_COMMANDS"] = 4] = "APPROVED_COMMANDS";
    /** Application has terms of service set */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TERMS_OF_SERVICE"] = 8] = "TERMS_OF_SERVICE";
    /** Application has a privacy policy set */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["PRIVACY_POLICY"] = 16] = "PRIVACY_POLICY";
    /** Application's name is safe for work */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_NAME"] = 32] = "SAFE_NAME";
    /** Application's description is safe for work */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_DESCRIPTION"] = 64] = "SAFE_DESCRIPTION";
    /** Application's role connections metadata is safe for work */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_ROLE_CONNECTIONS"] = 128] = "SAFE_ROLE_CONNECTIONS";
    /** Application is not quarantined */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["NOT_QUARANTINED"] = 512] = "NOT_QUARANTINED";
    /** User's locale is supported by monetization */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_LOCALE_SUPPORTED"] = 1024] = "USER_LOCALE_SUPPORTED";
    /** User is old enough to use monetization */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_AGE_SUPPORTED"] = 2048] = "USER_AGE_SUPPORTED";
    /** User has a date of birth defined on their account */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_DATE_OF_BIRTH_DEFINED"] = 4096] = "USER_DATE_OF_BIRTH_DEFINED";
    /** User has MFA enabled */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_MFA_ENABLED"] = 8192] = "USER_MFA_ENABLED";
    /** User's email is verified */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_EMAIL_VERIFIED"] = 16384] = "USER_EMAIL_VERIFIED";
    /** All members of the team that owns the application have verified emails */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TEAM_MEMBERS_EMAIL_VERIFIED"] = 32768] = "TEAM_MEMBERS_EMAIL_VERIFIED";
    /** All members of the team that owns the application have MFA enabled */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TEAM_MEMBERS_MFA_ENABLED"] = 65536] = "TEAM_MEMBERS_MFA_ENABLED";
    /** This application has no issues blocking monetization */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["NO_BLOCKING_ISSUES"] = 131072] = "NO_BLOCKING_ISSUES";
    /** Owning team has a valid payout status */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["VALID_PAYOUT_STATUS"] = 262144] = "VALID_PAYOUT_STATUS";
})(ApplicationMonetizationEligibilityFlags || (exports.ApplicationMonetizationEligibilityFlags = ApplicationMonetizationEligibilityFlags = {}));
var RPCApplicationState;
(function (RPCApplicationState) {
    /** This application does not have access to RPC */
    RPCApplicationState[RPCApplicationState["DISABLED"] = 0] = "DISABLED";
    /** This application has not yet been applied for RPC access */
    RPCApplicationState[RPCApplicationState["UNSUBMITTED"] = 1] = "UNSUBMITTED";
    /** This application has submitted a RPC access request */
    RPCApplicationState[RPCApplicationState["SUBMITTED"] = 2] = "SUBMITTED";
    /** This application has been approved for RPC access */
    RPCApplicationState[RPCApplicationState["APPROVED"] = 3] = "APPROVED";
    /** This application has been rejected from RPC access */
    RPCApplicationState[RPCApplicationState["REJECTED"] = 4] = "REJECTED";
})(RPCApplicationState || (exports.RPCApplicationState = RPCApplicationState = {}));
var StoreApplicationState;
(function (StoreApplicationState) {
    /** This application does not have a commerce license */
    StoreApplicationState[StoreApplicationState["NONE"] = 1] = "NONE";
    /** This application has a commerce license but has not yet submitted a store approval request */
    StoreApplicationState[StoreApplicationState["PAID"] = 2] = "PAID";
    /** This application has submitted a store approval request */
    StoreApplicationState[StoreApplicationState["SUBMITTED"] = 3] = "SUBMITTED";
    /** This application has been approved for the store */
    StoreApplicationState[StoreApplicationState["APPROVED"] = 4] = "APPROVED";
    /** This application has been rejected from the store */
    StoreApplicationState[StoreApplicationState["REJECTED"] = 5] = "REJECTED";
})(StoreApplicationState || (exports.StoreApplicationState = StoreApplicationState = {}));
var ApplicationVerificationState;
(function (ApplicationVerificationState) {
    /** This application is ineligible for verification */
    ApplicationVerificationState[ApplicationVerificationState["INELIGIBLE"] = 1] = "INELIGIBLE";
    /** This application has not yet been applied for verification */
    ApplicationVerificationState[ApplicationVerificationState["UNSUBMITTED"] = 2] = "UNSUBMITTED";
    /** This application has submitted a verification request */
    ApplicationVerificationState[ApplicationVerificationState["SUBMITTED"] = 3] = "SUBMITTED";
    ApplicationVerificationState[ApplicationVerificationState["SUCCEEDED"] = 4] = "SUCCEEDED";
})(ApplicationVerificationState || (exports.ApplicationVerificationState = ApplicationVerificationState = {}));
var RoleFlags;
(function (RoleFlags) {
    /** Role is part of an onboarding prompt option */
    RoleFlags[RoleFlags["IN_PROMPT"] = 1] = "IN_PROMPT";
})(RoleFlags || (exports.RoleFlags = RoleFlags = {}));
var MemberSearchSortType;
(function (MemberSearchSortType) {
    /** Sort by when the user joined the guild descending (default) */
    MemberSearchSortType[MemberSearchSortType["JOINED_AT_DESC"] = 1] = "JOINED_AT_DESC";
    /** Sort by when the user joined the guild ascending */
    MemberSearchSortType[MemberSearchSortType["JOINED_AT_ASC"] = 2] = "JOINED_AT_ASC";
    /** Sort by when the user joined Discord descending */
    MemberSearchSortType[MemberSearchSortType["USER_ID_DESC"] = 3] = "USER_ID_DESC";
    /** Sort by when the user joined Discord ascending */
    MemberSearchSortType[MemberSearchSortType["USER_ID_ASC"] = 4] = "USER_ID_ASC";
})(MemberSearchSortType || (exports.MemberSearchSortType = MemberSearchSortType = {}));
var MemberJoinSourceType;
(function (MemberJoinSourceType) {
    /** The user joined the guild through an unknown source */
    MemberJoinSourceType[MemberJoinSourceType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /** The user was added to the guild by a bot using the `guilds.join` OAuth2 scope */
    MemberJoinSourceType[MemberJoinSourceType["BOT"] = 1] = "BOT";
    /** The user was added to the guild by an integration (e.g. Twitch) */
    MemberJoinSourceType[MemberJoinSourceType["INTEGRATION"] = 2] = "INTEGRATION";
    /** The user joined the guild through guild discovery */
    MemberJoinSourceType[MemberJoinSourceType["DISCOVERY"] = 3] = "DISCOVERY";
    /** The user joined the guild through a student hub */
    MemberJoinSourceType[MemberJoinSourceType["HUB"] = 4] = "HUB";
    /** The user joined the guild through an invite */
    MemberJoinSourceType[MemberJoinSourceType["INVITE"] = 5] = "INVITE";
    /** The user joined the guild through a vanity URL */
    MemberJoinSourceType[MemberJoinSourceType["VANITY_URL"] = 6] = "VANITY_URL";
    /** The user was accepted into the guild after applying for membership */
    MemberJoinSourceType[MemberJoinSourceType["MANUAL_MEMBER_VERIFICATION"] = 7] = "MANUAL_MEMBER_VERIFICATION";
})(MemberJoinSourceType || (exports.MemberJoinSourceType = MemberJoinSourceType = {}));
var ActivityLocationKind;
(function (ActivityLocationKind) {
    ActivityLocationKind["GUILD_CHANNEL"] = "gc";
    ActivityLocationKind["PRIVATE_CHANNEL"] = "pc";
})(ActivityLocationKind || (exports.ActivityLocationKind = ActivityLocationKind = {}));
var ApplicationEventWebhookStatus;
(function (ApplicationEventWebhookStatus) {
    /** Event webhooks are disabled */
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["DISABLED"] = 1] = "DISABLED";
    /** Event webhooks are enabled */
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["ENABLED"] = 2] = "ENABLED";
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["DISABLED_BY_DISCORD"] = 3] = "DISABLED_BY_DISCORD";
})(ApplicationEventWebhookStatus || (exports.ApplicationEventWebhookStatus = ApplicationEventWebhookStatus = {}));
exports.ApplicationEventWebhookEventTypes = [
    "APPLICATION_AUTHORIZED",
    "APPLICATION_DEAUTHORIZED",
    "ENTITLEMENT_CREATE",
    "QUEST_USER_ENROLLMENT",
];
var EmbedFlags;
(function (EmbedFlags) {
    /** Embed was flagged as sensitive content */
    EmbedFlags[EmbedFlags["CONTAINS_EXPLICIT_MEDIA"] = 16] = "CONTAINS_EXPLICIT_MEDIA";
    EmbedFlags[EmbedFlags["IS_CONTENT_INVENTORY_ENTRY"] = 32] = "IS_CONTENT_INVENTORY_ENTRY";
})(EmbedFlags || (exports.EmbedFlags = EmbedFlags = {}));
var EmbedMediaFlags;
(function (EmbedMediaFlags) {
    EmbedMediaFlags[EmbedMediaFlags["IS_ANIMATED"] = 32] = "IS_ANIMATED";
})(EmbedMediaFlags || (exports.EmbedMediaFlags = EmbedMediaFlags = {}));
var SeparatorSpacingSize;
(function (SeparatorSpacingSize) {
    /** 8px gap between elements, 16px with divider hidden */
    SeparatorSpacingSize[SeparatorSpacingSize["SMALL"] = 1] = "SMALL";
    /** 16px gap between elements, 32px with divider hidden */
    SeparatorSpacingSize[SeparatorSpacingSize["LARGE"] = 2] = "LARGE";
})(SeparatorSpacingSize || (exports.SeparatorSpacingSize = SeparatorSpacingSize = {}));
var DisplayNameFont;
(function (DisplayNameFont) {
    /** Bangers */
    DisplayNameFont[DisplayNameFont["BANGERS"] = 1] = "BANGERS";
    /** BioRhyme */
    DisplayNameFont[DisplayNameFont["BIO_RHYME"] = 2] = "BIO_RHYME";
    /** Cherry Bomb One */
    DisplayNameFont[DisplayNameFont["CHERRY_BOMB"] = 3] = "CHERRY_BOMB";
    /** Chicle */
    DisplayNameFont[DisplayNameFont["CHICLE"] = 4] = "CHICLE";
    /** Compagnon */
    DisplayNameFont[DisplayNameFont["COMPAGNON"] = 5] = "COMPAGNON";
    /** MuseoModerno */
    DisplayNameFont[DisplayNameFont["MUSEO_MODERNO"] = 6] = "MUSEO_MODERNO";
    /** Néo-Castel */
    DisplayNameFont[DisplayNameFont["NEO_CASTEL"] = 7] = "NEO_CASTEL";
    DisplayNameFont[DisplayNameFont["PIXELFY"] = 8] = "PIXELFY";
    /** Ribes */
    DisplayNameFont[DisplayNameFont["RIBES"] = 9] = "RIBES";
    /** Sinistre */
    DisplayNameFont[DisplayNameFont["SINISTRE"] = 10] = "SINISTRE";
    /** Default font */
    DisplayNameFont[DisplayNameFont["DEFAULT"] = 11] = "DEFAULT";
    /** Zilla Slab */
    DisplayNameFont[DisplayNameFont["ZILLA_SLAB"] = 12] = "ZILLA_SLAB";
})(DisplayNameFont || (exports.DisplayNameFont = DisplayNameFont = {}));
var DisplayNameEffect;
(function (DisplayNameEffect) {
    /** Displays the first color provided */
    DisplayNameEffect[DisplayNameEffect["SOLID"] = 1] = "SOLID";
    /** Two color gradient */
    DisplayNameEffect[DisplayNameEffect["GRADIENT"] = 2] = "GRADIENT";
    /** Glow around the name */
    DisplayNameEffect[DisplayNameEffect["NEON"] = 3] = "NEON";
    /** Subtle vertical gradient and stroke */
    DisplayNameEffect[DisplayNameEffect["TOON"] = 4] = "TOON";
    /** Colored dropshadow */
    DisplayNameEffect[DisplayNameEffect["POP"] = 5] = "POP";
    /** Alternate gradient style */
    DisplayNameEffect[DisplayNameEffect["GLOW"] = 6] = "GLOW";
})(DisplayNameEffect || (exports.DisplayNameEffect = DisplayNameEffect = {}));
var InviteTargetUsersJobStatus;
(function (InviteTargetUsersJobStatus) {
    /** Job status is unspecified */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /** Job is currently being processed */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["PROCESSING"] = 1] = "PROCESSING";
    /** Job has been completed */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["COMPLETED"] = 2] = "COMPLETED";
    /** Job has failed (see `error_message`) */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["FAILED"] = 3] = "FAILED";
})(InviteTargetUsersJobStatus || (exports.InviteTargetUsersJobStatus = InviteTargetUsersJobStatus = {}));
var ApplicationInternalGuildRestriction;
(function (ApplicationInternalGuildRestriction) {
    ApplicationInternalGuildRestriction[ApplicationInternalGuildRestriction["JOIN_ALL"] = 1] = "JOIN_ALL";
    ApplicationInternalGuildRestriction[ApplicationInternalGuildRestriction["JOIN_EXTERNAL_ONLY"] = 2] = "JOIN_EXTERNAL_ONLY";
    ApplicationInternalGuildRestriction[ApplicationInternalGuildRestriction["JOIN_INTERNAL_ONLY"] = 3] = "JOIN_INTERNAL_ONLY";
})(ApplicationInternalGuildRestriction || (exports.ApplicationInternalGuildRestriction = ApplicationInternalGuildRestriction = {}));
var EmbeddedActivityOrientationLockStateType;
(function (EmbeddedActivityOrientationLockStateType) {
    /** Unrestricted orientation */
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["UNLOCKED"] = 1] = "UNLOCKED";
    /** Portrait only */
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["PORTRAIT"] = 2] = "PORTRAIT";
    /** Landscape only */
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["LANDSCAPE"] = 3] = "LANDSCAPE";
})(EmbeddedActivityOrientationLockStateType || (exports.EmbeddedActivityOrientationLockStateType = EmbeddedActivityOrientationLockStateType = {}));
var EmbeddedActivityLabelType;
(function (EmbeddedActivityLabelType) {
    /** No special label */
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["NONE"] = 0] = "NONE";
    /** The activity is new */
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["NEW"] = 1] = "NEW";
    /** The activity has been recently updated */
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["UPDATED"] = 2] = "UPDATED";
})(EmbeddedActivityLabelType || (exports.EmbeddedActivityLabelType = EmbeddedActivityLabelType = {}));
exports.EmbeddedActivityReleasePhases = ["in_development", "activities_team", "employee_release", "soft_launch", "soft_launch_multi_geo", "global_launch"];
exports.EmbeddedActivitySurfaces = ["voice_launcher", "text_launcher"];
exports.EmbeddedActivityPlatformTypes = ["web", "android", "ios"];
exports.PricingLocalizationStrategies = ["localized_price_sets"];
exports.OperatingSystemTypes = ["windows", "osx", "linux", "android", "ios", "playstation", "xbox", "unknown"];
exports.TeamMemberRoleTypes = ["admin", "developer", "read_only"];
var ApprovableConsoleType;
(function (ApprovableConsoleType) {
    /** Xbox */
    ApprovableConsoleType[ApprovableConsoleType["XBOX"] = 1] = "XBOX";
    /** PlayStation */
    ApprovableConsoleType[ApprovableConsoleType["PLAYSTATION_5"] = 2] = "PLAYSTATION_5";
    /** PlayStation */
    ApprovableConsoleType[ApprovableConsoleType["PLAYSTATION_4"] = 3] = "PLAYSTATION_4";
})(ApprovableConsoleType || (exports.ApprovableConsoleType = ApprovableConsoleType = {}));
var OverlayMethodFlags;
(function (OverlayMethodFlags) {
    /** Overlay can be rendered out of process */
    OverlayMethodFlags[OverlayMethodFlags["OUT_OF_PROCESS"] = 1] = "OUT_OF_PROCESS";
})(OverlayMethodFlags || (exports.OverlayMethodFlags = OverlayMethodFlags = {}));
var TeamPayoutAccountStatus;
(function (TeamPayoutAccountStatus) {
    /** Team has not submitted a payout account application */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["UNSUBMITTED"] = 1] = "UNSUBMITTED";
    /** Team's payout account application is pending approval */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["PENDING"] = 2] = "PENDING";
    /** Team's payout account requires action to receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["ACTION_REQUIRED"] = 3] = "ACTION_REQUIRED";
    /** Team's payout account is active and can receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["ACTIVE"] = 4] = "ACTIVE";
    /** Team's payout account is blocked and cannot receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["BLOCKED"] = 5] = "BLOCKED";
    /** Team's payout account is suspended and cannot receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["SUSPENDED"] = 6] = "SUSPENDED";
})(TeamPayoutAccountStatus || (exports.TeamPayoutAccountStatus = TeamPayoutAccountStatus = {}));
var TeamPayoutGateway;
(function (TeamPayoutGateway) {
    /** Stripe Top-Up */
    TeamPayoutGateway[TeamPayoutGateway["STRIPE_TOPUP"] = 1] = "STRIPE_TOPUP";
    /** Tipalti */
    TeamPayoutGateway[TeamPayoutGateway["TIPALTI"] = 2] = "TIPALTI";
    /** Stripe */
    TeamPayoutGateway[TeamPayoutGateway["STRIPE_PRIMARY"] = 3] = "STRIPE_PRIMARY";
})(TeamPayoutGateway || (exports.TeamPayoutGateway = TeamPayoutGateway = {}));
var ApplicationType;
(function (ApplicationType) {
    /** A game integrating with Discord through the legacy GameSDK or sold on the defunct game store */
    ApplicationType[ApplicationType["DEPRECATED_GAME"] = 1] = "DEPRECATED_GAME";
    /** @deprecated A music service integrating with Discord */
    ApplicationType[ApplicationType["MUSIC"] = 2] = "MUSIC";
    /** A limited application used for ticketed event SKUs */
    ApplicationType[ApplicationType["TICKETED_EVENTS"] = 3] = "TICKETED_EVENTS";
    /** A limited application used for creator monetization (e.g. role subscription) SKUs */
    ApplicationType[ApplicationType["CREATOR_MONETIZATION"] = 4] = "CREATOR_MONETIZATION";
    /** A game integrating with Discord */
    ApplicationType[ApplicationType["GAME"] = 5] = "GAME";
})(ApplicationType || (exports.ApplicationType = ApplicationType = {}));
var LobbyMemberFlags;
(function (LobbyMemberFlags) {
    LobbyMemberFlags[LobbyMemberFlags["CAN_LINK_LOBBY"] = 1] = "CAN_LINK_LOBBY";
})(LobbyMemberFlags || (exports.LobbyMemberFlags = LobbyMemberFlags = {}));
var MessageReferenceType;
(function (MessageReferenceType) {
    /** A standard reference used by replies and system messages */
    MessageReferenceType[MessageReferenceType["DEFAULT"] = 0] = "DEFAULT";
    /** A reference used to point to a message at a point in time */
    MessageReferenceType[MessageReferenceType["FORWARD"] = 1] = "FORWARD";
})(MessageReferenceType || (exports.MessageReferenceType = MessageReferenceType = {}));
var StatusDisplayType;
(function (StatusDisplayType) {
    /** Display the `name` field */
    StatusDisplayType[StatusDisplayType["NAME"] = 0] = "NAME";
    /** Display the `state` field */
    StatusDisplayType[StatusDisplayType["STATE"] = 1] = "STATE";
    /** Display the `details` field */
    StatusDisplayType[StatusDisplayType["DETAILS"] = 2] = "DETAILS";
})(StatusDisplayType || (exports.StatusDisplayType = StatusDisplayType = {}));
// entries are intentionally not aligned
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
var JSONErrorCodes;
(function (JSONErrorCodes) {
    JSONErrorCodes[JSONErrorCodes["GENERAL_ERROR"] = 0] = "GENERAL_ERROR";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ACCOUNT"] = 10001] = "UNKNOWN_ACCOUNT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION"] = 10002] = "UNKNOWN_APPLICATION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_CHANNEL"] = 10003] = "UNKNOWN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD"] = 10004] = "UNKNOWN_GUILD";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INTEGRATION"] = 10005] = "UNKNOWN_INTEGRATION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INVITE"] = 10006] = "UNKNOWN_INVITE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_MEMBER"] = 10007] = "UNKNOWN_MEMBER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_MESSAGE"] = 10008] = "UNKNOWN_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_OVERWRITE"] = 10009] = "UNKNOWN_OVERWRITE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PROVIDER"] = 10010] = "UNKNOWN_PROVIDER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PLATFORM"] = 10010] = "UNKNOWN_PLATFORM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ROLE"] = 10011] = "UNKNOWN_ROLE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_TOKEN"] = 10012] = "UNKNOWN_TOKEN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_USER"] = 10013] = "UNKNOWN_USER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_EMOJI"] = 10014] = "UNKNOWN_EMOJI";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_WEBHOOK"] = 10015] = "UNKNOWN_WEBHOOK";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_WEBHOOK_SERVICE"] = 10016] = "UNKNOWN_WEBHOOK_SERVICE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SESSION"] = 10020] = "UNKNOWN_SESSION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ASSET"] = 10021] = "UNKNOWN_ASSET";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BAN"] = 10026] = "UNKNOWN_BAN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SKU"] = 10027] = "UNKNOWN_SKU";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STORE_LISTING"] = 10028] = "UNKNOWN_STORE_LISTING";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ENTITLEMENT"] = 10029] = "UNKNOWN_ENTITLEMENT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BUILD"] = 10030] = "UNKNOWN_BUILD";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_LOBBY"] = 10031] = "UNKNOWN_LOBBY";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BRANCH"] = 10032] = "UNKNOWN_BRANCH";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STORE_DIRECTORY_LAYOUT"] = 10036] = "UNKNOWN_STORE_DIRECTORY_LAYOUT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_REDISTRIBUTABLE"] = 10037] = "UNKNOWN_REDISTRIBUTABLE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GIFT_CODE"] = 10038] = "UNKNOWN_GIFT_CODE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STREAM"] = 10049] = "UNKNOWN_STREAM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN"] = 10050] = "UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_TEMPLATE"] = 10057] = "UNKNOWN_GUILD_TEMPLATE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_DISCOVERABLE_SERVER_CATEGORY"] = 10059] = "UNKNOWN_DISCOVERABLE_SERVER_CATEGORY";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STICKER"] = 10060] = "UNKNOWN_STICKER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INTERACTION"] = 10062] = "UNKNOWN_INTERACTION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION_COMMAND"] = 10063] = "UNKNOWN_APPLICATION_COMMAND";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION_COMMAND_PERMISSIONS"] = 10066] = "UNKNOWN_APPLICATION_COMMAND_PERMISSIONS";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STAGE_INSTANCE"] = 10067] = "UNKNOWN_STAGE_INSTANCE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM"] = 10068] = "UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_WELCOME_SCREEN"] = 10069] = "UNKNOWN_GUILD_WELCOME_SCREEN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_SCHEDULED_EVENT"] = 10070] = "UNKNOWN_GUILD_SCHEDULED_EVENT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_SCHEDULED_EVENT_USER"] = 10071] = "UNKNOWN_GUILD_SCHEDULED_EVENT_USER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_TAG"] = 10087] = "UNKNOWN_TAG";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SOUND"] = 10097] = "UNKNOWN_SOUND";
    JSONErrorCodes[JSONErrorCodes["BOT_DISALLOWED"] = 20001] = "BOT_DISALLOWED";
    JSONErrorCodes[JSONErrorCodes["BOTS_CANNOT_USE_THIS_ENDPOINT"] = 20001] = "BOTS_CANNOT_USE_THIS_ENDPOINT";
    JSONErrorCodes[JSONErrorCodes["BOT_REQUIRED"] = 20002] = "BOT_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["ONLY_BOTS_CAN_USE_THIS_ENDPOINT"] = 20002] = "ONLY_BOTS_CAN_USE_THIS_ENDPOINT";
    JSONErrorCodes[JSONErrorCodes["RPC_PROXY_DISALLOWED"] = 20003] = "RPC_PROXY_DISALLOWED";
    JSONErrorCodes[JSONErrorCodes["EXPLICIT_CONTENT"] = 20009] = "EXPLICIT_CONTENT";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_SCHEDULED_FOR_DELETION"] = 20011] = "ACCOUNT_SCHEDULED_FOR_DELETION";
    JSONErrorCodes[JSONErrorCodes["NOT_AUTHORIZED_FOR_APPLICATION"] = 20012] = "NOT_AUTHORIZED_FOR_APPLICATION";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_DISABLED"] = 20013] = "ACCOUNT_DISABLED";
    JSONErrorCodes[JSONErrorCodes["SLOWMODE_RATE_LIMITED"] = 20016] = "SLOWMODE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_OWNER_ONLY"] = 20018] = "ACCOUNT_OWNER_ONLY";
    JSONErrorCodes[JSONErrorCodes["CHANNEL_FOLLOWING_EDIT_RATE_LIMITED"] = 20022] = "CHANNEL_FOLLOWING_EDIT_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["UNDER_MINIMUM_AGE"] = 20024] = "UNDER_MINIMUM_AGE";
    JSONErrorCodes[JSONErrorCodes["QUARANTINED"] = 20026] = "QUARANTINED";
    JSONErrorCodes[JSONErrorCodes["CHANNEL_WRITE_RATE_LIMIT"] = 20028] = "CHANNEL_WRITE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["GUILD_WRITE_RATE_LIMIT"] = 20029] = "GUILD_WRITE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["WORDS_NOT_ALLOWED"] = 20031] = "WORDS_NOT_ALLOWED";
    JSONErrorCodes[JSONErrorCodes["VANITY_URL_REQUIRED_FOR_PUBLISHED_GUILDS"] = 20040] = "VANITY_URL_REQUIRED_FOR_PUBLISHED_GUILDS";
    JSONErrorCodes[JSONErrorCodes["VANITY_URL_EMPLOYEE_ONLY_GUILD_DISABLED"] = 20044] = "VANITY_URL_EMPLOYEE_ONLY_GUILD_DISABLED";
    JSONErrorCodes[JSONErrorCodes["VANITY_URL_REQUIREMENTS_NOT_MET"] = 20045] = "VANITY_URL_REQUIREMENTS_NOT_MET";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILDS"] = 30001] = "TOO_MANY_GUILDS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_FRIENDS"] = 30002] = "TOO_MANY_FRIENDS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PINS_IN_CHANNEL"] = 30003] = "TOO_MANY_PINS_IN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_RECIPIENTS"] = 30004] = "TOO_MANY_RECIPIENTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILD_ROLES"] = 30005] = "TOO_MANY_GUILD_ROLES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_USING_USERNAME"] = 30006] = "TOO_MANY_USING_USERNAME";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_WEBHOOKS"] = 30007] = "TOO_MANY_WEBHOOKS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_EMOJI"] = 30008] = "TOO_MANY_EMOJI";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_REACTIONS"] = 30010] = "TOO_MANY_REACTIONS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GROUP_CHANNELS"] = 30011] = "TOO_MANY_GROUP_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_CHANNELS"] = 30013] = "TOO_MANY_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_ATTACHMENTS"] = 30015] = "TOO_MANY_ATTACHMENTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_INVITES"] = 30016] = "TOO_MANY_INVITES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_ANIMATED_EMOJI"] = 30018] = "TOO_MANY_ANIMATED_EMOJI";
    JSONErrorCodes[JSONErrorCodes["GUILD_AT_CAPACITY"] = 30019] = "GUILD_AT_CAPACITY";
    JSONErrorCodes[JSONErrorCodes["NOT_ENOUGH_GUILD_MEMBERS"] = 30029] = "NOT_ENOUGH_GUILD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_SERVER_CATEGORIES"] = 30030] = "TOO_MANY_SERVER_CATEGORIES";
    JSONErrorCodes[JSONErrorCodes["GUILD_ALREADY_HAS_TEMPLATE"] = 30031] = "GUILD_ALREADY_HAS_TEMPLATE";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_APPLICATION_COMMANDS"] = 30032] = "TOO_MANY_APPLICATION_COMMANDS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_THREAD_MEMBERS"] = 30033] = "TOO_MANY_THREAD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_APPLICATION_COMMAND_CREATES"] = 30034] = "TOO_MANY_APPLICATION_COMMAND_CREATES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_BANS_FOR_NON_GUILD_MEMBERS"] = 30035] = "TOO_MANY_BANS_FOR_NON_GUILD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_BAN_FETCHES"] = 30037] = "TOO_MANY_BAN_FETCHES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_UNCOMPLETED_GUILD_SCHEDULED_EVENTS"] = 30038] = "TOO_MANY_UNCOMPLETED_GUILD_SCHEDULED_EVENTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_STICKERS"] = 30039] = "TOO_MANY_STICKERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PRUNE_REQUESTS"] = 30040] = "TOO_MANY_PRUNE_REQUESTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILD_WIDGET_SETTINGS_UPDATES"] = 30042] = "TOO_MANY_GUILD_WIDGET_SETTINGS_UPDATES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_SOUNDBOARD_SOUNDS"] = 30045] = "TOO_MANY_SOUNDBOARD_SOUNDS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR"] = 30046] = "MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PINNED_THREADS"] = 30047] = "TOO_MANY_PINNED_THREADS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_FORUM_TAGS"] = 30048] = "TOO_MANY_FORUM_TAGS";
    JSONErrorCodes[JSONErrorCodes["BITRATE_TOO_HIGH"] = 30052] = "BITRATE_TOO_HIGH";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PREMIUM_EMOJIS"] = 30056] = "TOO_MANY_PREMIUM_EMOJIS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILD_WEBHOOKS"] = 30058] = "TOO_MANY_GUILD_WEBHOOKS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_BLOCKED_USERS"] = 30059] = "TOO_MANY_BLOCKED_USERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PUBLISHED_PRODUCT_LISTINGS"] = 30065] = "TOO_MANY_PUBLISHED_PRODUCT_LISTINGS";
    JSONErrorCodes[JSONErrorCodes["RESOURCE_RATE_LIMITED"] = 31002] = "RESOURCE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["UNAUTHORIZED"] = 40001] = "UNAUTHORIZED";
    JSONErrorCodes[JSONErrorCodes["EMAIL_VERIFICATION_REQUIRED"] = 40002] = "EMAIL_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["RATE_LIMIT_DM_OPEN"] = 40003] = "RATE_LIMIT_DM_OPEN";
    JSONErrorCodes[JSONErrorCodes["DIRECT_MESSAGES_RATE_LIMIT"] = 40003] = "DIRECT_MESSAGES_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["SENDING_MESSAGES_TEMPORARILY_DISABLED"] = 40004] = "SENDING_MESSAGES_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["ENTITY_TOO_LARGE"] = 40005] = "ENTITY_TOO_LARGE";
    JSONErrorCodes[JSONErrorCodes["REQUEST_ENTITY_TOO_LARGE"] = 40005] = "REQUEST_ENTITY_TOO_LARGE";
    JSONErrorCodes[JSONErrorCodes["ENTITY_EMPTY"] = 40006] = "ENTITY_EMPTY";
    JSONErrorCodes[JSONErrorCodes["FEATURE_TEMPORARILY_DISABLED"] = 40006] = "FEATURE_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["USER_BANNED"] = 40007] = "USER_BANNED";
    JSONErrorCodes[JSONErrorCodes["CONNECTION_REVOKED"] = 40012] = "CONNECTION_REVOKED";
    JSONErrorCodes[JSONErrorCodes["DELETE_ACCOUNT_TRANSFER_TEAM_OWNERSHIP"] = 40028] = "DELETE_ACCOUNT_TRANSFER_TEAM_OWNERSHIP";
    JSONErrorCodes[JSONErrorCodes["TARGET_USER_NOT_CONNECTED_TO_VOICE"] = 40032] = "TARGET_USER_NOT_CONNECTED_TO_VOICE";
    JSONErrorCodes[JSONErrorCodes["ALREADY_CROSSPOSTED"] = 40033] = "ALREADY_CROSSPOSTED";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_COMMAND_ALREADY_EXISTS"] = 40041] = "APPLICATION_COMMAND_ALREADY_EXISTS";
    JSONErrorCodes[JSONErrorCodes["INTERACTION_FAILED_TO_SEND"] = 40043] = "INTERACTION_FAILED_TO_SEND";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL"] = 40058] = "CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["INTERACTION_ALREADY_ACKNOWLEDGED"] = 40060] = "INTERACTION_ALREADY_ACKNOWLEDGED";
    JSONErrorCodes[JSONErrorCodes["TAG_NAMES_MUST_BE_UNIQUE"] = 40061] = "TAG_NAMES_MUST_BE_UNIQUE";
    JSONErrorCodes[JSONErrorCodes["SERVICE_RESOURCE_RATE_LIMITED"] = 40062] = "SERVICE_RESOURCE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["NON_MODERATED_TAG_REQUIRED"] = 40066] = "NON_MODERATED_TAG_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["TAG_REQUIRED"] = 40067] = "TAG_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["USER_QUARANTINED"] = 40068] = "USER_QUARANTINED";
    JSONErrorCodes[JSONErrorCodes["INVITES_DISABLED"] = 40069] = "INVITES_DISABLED";
    JSONErrorCodes[JSONErrorCodes["ENTITLEMENT_ALREADY_GRANTED"] = 40074] = "ENTITLEMENT_ALREADY_GRANTED";
    JSONErrorCodes[JSONErrorCodes["CLOUDFLARE_BLOCKING_REQUEST"] = 40333] = "CLOUDFLARE_BLOCKING_REQUEST";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACCESS"] = 50001] = "INVALID_ACCESS";
    JSONErrorCodes[JSONErrorCodes["MISSING_ACCESS"] = 50001] = "MISSING_ACCESS";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACCOUNT_TYPE"] = 50002] = "INVALID_ACCOUNT_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTION_DM"] = 50003] = "INVALID_ACTION_DM";
    JSONErrorCodes[JSONErrorCodes["INVALID_EMBED_DISABLED"] = 50004] = "INVALID_EMBED_DISABLED";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_AUTHOR"] = 50005] = "INVALID_MESSAGE_AUTHOR";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_EMPTY"] = 50006] = "INVALID_MESSAGE_EMPTY";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_SEND_USER"] = 50007] = "INVALID_MESSAGE_SEND_USER";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_SEND_NON_TEXT"] = 50008] = "INVALID_MESSAGE_SEND_NON_TEXT";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_VERIFICATION_LEVEL"] = 50009] = "INVALID_MESSAGE_VERIFICATION_LEVEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_APP_BOT"] = 50010] = "INVALID_OAUTH_APP_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_APP_LIMIT"] = 50011] = "INVALID_OAUTH_APP_LIMIT";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_STATE"] = 50012] = "INVALID_OAUTH_STATE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PERMISSIONS"] = 50013] = "INVALID_PERMISSIONS";
    JSONErrorCodes[JSONErrorCodes["INVALID_TOKEN"] = 50014] = "INVALID_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_NOTE"] = 50015] = "INVALID_NOTE";
    JSONErrorCodes[JSONErrorCodes["INVALID_BULK_DELETE_COUNT"] = 50016] = "INVALID_BULK_DELETE_COUNT";
    JSONErrorCodes[JSONErrorCodes["INVALID_MFA_LEVEL"] = 50017] = "INVALID_MFA_LEVEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_PASSWORD"] = 50018] = "INVALID_PASSWORD";
    JSONErrorCodes[JSONErrorCodes["INVALID_PIN_MESSAGE_CHANNEL"] = 50019] = "INVALID_PIN_MESSAGE_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_INVITE_CODE"] = 50020] = "INVALID_INVITE_CODE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXECUTE_ON_SYSTEM_MESSAGE"] = 50021] = "CANNOT_EXECUTE_ON_SYSTEM_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PHONE_NUMBER"] = 50022] = "INVALID_PHONE_NUMBER";
    JSONErrorCodes[JSONErrorCodes["INVALID_CLIENT_ID"] = 50023] = "INVALID_CLIENT_ID";
    JSONErrorCodes[JSONErrorCodes["INVALID_CHANNEL_TYPE"] = 50024] = "INVALID_CHANNEL_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH2_ACCESS_TOKEN"] = 50025] = "INVALID_OAUTH2_ACCESS_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH2_MISSING_SCOPE"] = 50026] = "INVALID_OAUTH2_MISSING_SCOPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_WEBHOOK_TOKEN"] = 50027] = "INVALID_WEBHOOK_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_ROLE"] = 50028] = "INVALID_ROLE";
    JSONErrorCodes[JSONErrorCodes["INVALID_RECIPIENTS"] = 50033] = "INVALID_RECIPIENTS";
    JSONErrorCodes[JSONErrorCodes["BULK_DELETE_MESSAGE_TOO_OLD"] = 50034] = "BULK_DELETE_MESSAGE_TOO_OLD";
    JSONErrorCodes[JSONErrorCodes["INVALID_FORM_BODY"] = 50035] = "INVALID_FORM_BODY";
    JSONErrorCodes[JSONErrorCodes["INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT"] = 50036] = "INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_ACTION"] = 500039] = "INVALID_ACTIVITY_ACTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_API_VERSION"] = 50041] = "INVALID_API_VERSION";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_ASSET_SIZE"] = 50045] = "INVALID_FILE_ASSET_SIZE";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_ASSET"] = 50046] = "INVALID_FILE_ASSET";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_EXHAUSTED"] = 50050] = "INVALID_GIFT_REDEMPTION_EXHAUSTED";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_OWNED"] = 50051] = "INVALID_GIFT_REDEMPTION_OWNED";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_SELF_REDEMPTION"] = 50054] = "INVALID_GIFT_SELF_REDEMPTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_GUILD"] = 50055] = "INVALID_GUILD";
    JSONErrorCodes[JSONErrorCodes["INVALID_REQUEST_ORIGIN"] = 50067] = "INVALID_REQUEST_ORIGIN";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_TYPE"] = 50068] = "INVALID_MESSAGE_TYPE";
    JSONErrorCodes[JSONErrorCodes["PAYMENT_SOURCE_REQUIRED"] = 50070] = "PAYMENT_SOURCE_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MODIFY_SYSTEM_WEBHOOK"] = 50073] = "CANNOT_MODIFY_SYSTEM_WEBHOOK";
    JSONErrorCodes[JSONErrorCodes["CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL"] = 50074] = "CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EDIT_MESSAGE_STICKERS"] = 50080] = "CANNOT_EDIT_MESSAGE_STICKERS";
    JSONErrorCodes[JSONErrorCodes["INVALID_STICKER_SENT"] = 50081] = "INVALID_STICKER_SENT";
    JSONErrorCodes[JSONErrorCodes["THREAD_ARCHIVED"] = 50083] = "THREAD_ARCHIVED";
    JSONErrorCodes[JSONErrorCodes["INVALID_THREAD_NOTIFICATION_SETTINGS"] = 50084] = "INVALID_THREAD_NOTIFICATION_SETTINGS";
    JSONErrorCodes[JSONErrorCodes["BEFORE_EARLIER_THAN_THREAD_CREATION_DATE"] = 50085] = "BEFORE_EARLIER_THAN_THREAD_CREATION_DATE";
    JSONErrorCodes[JSONErrorCodes["COMMUNITY_CHANNELS_MUST_BE_TEXT"] = 50086] = "COMMUNITY_CHANNELS_MUST_BE_TEXT";
    JSONErrorCodes[JSONErrorCodes["INVALID_COUNTRY_CODE"] = 50095] = "INVALID_COUNTRY_CODE";
    JSONErrorCodes[JSONErrorCodes["INVALID_CANNOT_FRIEND_SELF"] = 50096] = "INVALID_CANNOT_FRIEND_SELF";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_FRAUD_REJECTED"] = 50097] = "INVALID_GIFT_REDEMPTION_FRAUD_REJECTED";
    JSONErrorCodes[JSONErrorCodes["MONETIZATION_REQUIRED"] = 50097] = "MONETIZATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["BOOSTS_REQUIRED"] = 50101] = "BOOSTS_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["INVALID_USER_SETTINGS_DATA"] = 50105] = "INVALID_USER_SETTINGS_DATA";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_NO_ACCESS"] = 50106] = "INVALID_ACTIVITY_LAUNCH_NO_ACCESS";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_PREMIUM_TIER"] = 50107] = "INVALID_ACTIVITY_LAUNCH_PREMIUM_TIER";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_CONCURRENT_ACTIVITIES"] = 50108] = "INVALID_ACTIVITY_LAUNCH_CONCURRENT_ACTIVITIES";
    JSONErrorCodes[JSONErrorCodes["INVALID_JSON"] = 50109] = "INVALID_JSON";
    JSONErrorCodes[JSONErrorCodes["INVALID_PROVIDED_FILE"] = 50110] = "INVALID_PROVIDED_FILE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PROVIDED_FILE_TYPE"] = 50123] = "INVALID_PROVIDED_FILE_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PROVIDED_FILE_DURATION"] = 50124] = "INVALID_PROVIDED_FILE_DURATION";
    JSONErrorCodes[JSONErrorCodes["OWNER_CANNOT_BE_PENDING_MEMBER"] = 50131] = "OWNER_CANNOT_BE_PENDING_MEMBER";
    JSONErrorCodes[JSONErrorCodes["OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT"] = 50132] = "OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_ASSET_SIZE_RESIZE_GIF"] = 50138] = "INVALID_FILE_ASSET_SIZE_RESIZE_GIF";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES"] = 50144] = "CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES";
    JSONErrorCodes[JSONErrorCodes["CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI"] = 50145] = "CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI";
    JSONErrorCodes[JSONErrorCodes["UPLOADED_FILE_NOT_FOUND"] = 50146] = "UPLOADED_FILE_NOT_FOUND";
    JSONErrorCodes[JSONErrorCodes["INVALID_SPECIFIED_EMOJI"] = 50151] = "INVALID_SPECIFIED_EMOJI";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_AFK_CHANNEL"] = 50148] = "INVALID_ACTIVITY_LAUNCH_AFK_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_DO_NOT_SUPPORT_ADDITIONAL_CONTENT"] = 50159] = "VOICE_MESSAGES_DO_NOT_SUPPORT_ADDITIONAL_CONTENT";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_MUST_HAVE_A_SINGLE_AUDIO_ATTACHMENT"] = 50160] = "VOICE_MESSAGES_MUST_HAVE_A_SINGLE_AUDIO_ATTACHMENT";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_MUST_HAVE_SUPPORTING_METADATA"] = 50161] = "VOICE_MESSAGES_MUST_HAVE_SUPPORTING_METADATA";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_CANNOT_BE_EDITED"] = 50162] = "VOICE_MESSAGES_CANNOT_BE_EDITED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_DELETE_GUILD_SUBSCRIPTION_INTEGRATION"] = 50163] = "CANNOT_DELETE_GUILD_SUBSCRIPTION_INTEGRATION";
    JSONErrorCodes[JSONErrorCodes["NEW_OWNER_INELIGIBLE_FOR_SERVER_SUBSCRIPTION"] = 50164] = "NEW_OWNER_INELIGIBLE_FOR_SERVER_SUBSCRIPTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_AGE_GATED"] = 50165] = "INVALID_ACTIVITY_LAUNCH_AGE_GATED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_VOICE_MESSAGES_IN_CHANNEL"] = 50173] = "CANNOT_SEND_VOICE_MESSAGES_IN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["USER_MUST_FIRST_BE_VERIFIED"] = 50178] = "USER_MUST_FIRST_BE_VERIFIED";
    JSONErrorCodes[JSONErrorCodes["PROVIDED_FILE_HAS_INVALID_DURATION"] = 50192] = "PROVIDED_FILE_HAS_INVALID_DURATION";
    JSONErrorCodes[JSONErrorCodes["INVALID_SKU_ATTACHMENT_NO_ARCHIVES"] = 50186] = "INVALID_SKU_ATTACHMENT_NO_ARCHIVES";
    JSONErrorCodes[JSONErrorCodes["NO_PERMISSION_TO_SEND_STICKER"] = 50600] = "NO_PERMISSION_TO_SEND_STICKER";
    JSONErrorCodes[JSONErrorCodes["MFA_ENABLED"] = 60001] = "MFA_ENABLED";
    JSONErrorCodes[JSONErrorCodes["MFA_DISABLED"] = 60002] = "MFA_DISABLED";
    JSONErrorCodes[JSONErrorCodes["MFA_REQUIRED"] = 60003] = "MFA_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["MFA_UNVERIFIED"] = 60004] = "MFA_UNVERIFIED";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_SECRET"] = 60005] = "MFA_INVALID_SECRET";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_TICKET"] = 60006] = "MFA_INVALID_TICKET";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_CODE"] = 60008] = "MFA_INVALID_CODE";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_SESSION"] = 60009] = "MFA_INVALID_SESSION";
    JSONErrorCodes[JSONErrorCodes["PHONE_NUMBER_UNABLE_TO_SEND"] = 70003] = "PHONE_NUMBER_UNABLE_TO_SEND";
    JSONErrorCodes[JSONErrorCodes["PHONE_VERIFICATION_REQUIRED"] = 70007] = "PHONE_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INCOMING_DISABLED"] = 80000] = "RELATIONSHIP_INCOMING_DISABLED";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INCOMING_BLOCKED"] = 80001] = "RELATIONSHIP_INCOMING_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INVALID_USER_BOT"] = 80002] = "RELATIONSHIP_INVALID_USER_BOT";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INVALID_SELF"] = 80003] = "RELATIONSHIP_INVALID_SELF";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INVALID_DISCORD_TAG"] = 80004] = "RELATIONSHIP_INVALID_DISCORD_TAG";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_ALREADY_FRIENDS"] = 80007] = "RELATIONSHIP_ALREADY_FRIENDS";
    JSONErrorCodes[JSONErrorCodes["REACTION_BLOCKED"] = 90001] = "REACTION_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["USER_CANNOT_USE_BURST_REACTIONS"] = 90002] = "USER_CANNOT_USE_BURST_REACTIONS";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_SUBSCRIPTION_MANAGED"] = 100021] = "INVALID_GIFT_REDEMPTION_SUBSCRIPTION_MANAGED";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_SUBSCRIPTION_INCOMPATIBLE"] = 100023] = "INVALID_GIFT_REDEMPTION_SUBSCRIPTION_INCOMPATIBLE";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_INVOICE_OPEN"] = 100024] = "INVALID_GIFT_REDEMPTION_INVOICE_OPEN";
    JSONErrorCodes[JSONErrorCodes["INELIGIBLE_FOR_SUBSCRIPTION"] = 100053] = "INELIGIBLE_FOR_SUBSCRIPTION";
    JSONErrorCodes[JSONErrorCodes["BILLING_NON_REFUNDABLE_PAYMENT_SOURCE"] = 100060] = "BILLING_NON_REFUNDABLE_PAYMENT_SOURCE";
    JSONErrorCodes[JSONErrorCodes["INDEX_NOT_YET_AVAILABLE"] = 110000] = "INDEX_NOT_YET_AVAILABLE";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_NOT_AVAILABLE"] = 110001] = "APPLICATION_NOT_AVAILABLE";
    JSONErrorCodes[JSONErrorCodes["LISTING_ALREADY_JOINED"] = 120000] = "LISTING_ALREADY_JOINED";
    JSONErrorCodes[JSONErrorCodes["LISTING_TOO_MANY_MEMBERS"] = 120001] = "LISTING_TOO_MANY_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["LISTING_JOIN_BLOCKED"] = 120002] = "LISTING_JOIN_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["API_RESOURCE_IS_CURRENTLY_OVERLOADED"] = 130000] = "API_RESOURCE_IS_CURRENTLY_OVERLOADED";
    JSONErrorCodes[JSONErrorCodes["STAGE_ALREADY_OPEN"] = 150006] = "STAGE_ALREADY_OPEN";
    JSONErrorCodes[JSONErrorCodes["CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY"] = 160002] = "CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY";
    JSONErrorCodes[JSONErrorCodes["THREAD_ALREADY_CREATED_FOR_MESSAGE"] = 160004] = "THREAD_ALREADY_CREATED_FOR_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["THREAD_IS_LOCKED"] = 160005] = "THREAD_IS_LOCKED";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_THREADS"] = 160006] = "TOO_MANY_THREADS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_ANNOUNCEMENT_THREADS"] = 160007] = "TOO_MANY_ANNOUNCEMENT_THREADS";
    JSONErrorCodes[JSONErrorCodes["INVALID_LOTTIE_JSON"] = 170001] = "INVALID_LOTTIE_JSON";
    JSONErrorCodes[JSONErrorCodes["UPLOADED_LOTTIE_RASTERIZED"] = 170002] = "UPLOADED_LOTTIE_RASTERIZED";
    JSONErrorCodes[JSONErrorCodes["STICKER_MAXIMUM_FRAMERATE_EXCEEDED"] = 170003] = "STICKER_MAXIMUM_FRAMERATE_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM"] = 170004] = "STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM";
    JSONErrorCodes[JSONErrorCodes["LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED"] = 170005] = "LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE"] = 170006] = "STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE";
    JSONErrorCodes[JSONErrorCodes["STICKER_ANIMATION_DURATION_TOO_LONG"] = 170007] = "STICKER_ANIMATION_DURATION_TOO_LONG";
    JSONErrorCodes[JSONErrorCodes["POGGERMODE_TEMPORARILY_DISABLED"] = 170008] = "POGGERMODE_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_UPDATE_FINISHED_EVENT"] = 180000] = "CANNOT_UPDATE_FINISHED_EVENT";
    JSONErrorCodes[JSONErrorCodes["FAILED_TO_CREATE_STAGE_INSTANCE"] = 180002] = "FAILED_TO_CREATE_STAGE_INSTANCE";
    JSONErrorCodes[JSONErrorCodes["AUTOMOD_MESSAGE_BLOCKED"] = 200000] = "AUTOMOD_MESSAGE_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["AUTOMOD_TITLE_BLOCKED"] = 200001] = "AUTOMOD_TITLE_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["AUTOMOD_INVALID_RUST_SERVICE_RESPONSE"] = 200002] = "AUTOMOD_INVALID_RUST_SERVICE_RESPONSE";
    JSONErrorCodes[JSONErrorCodes["MONETIZATION_TERMS_NOT_ACCEPTED"] = 210003] = "MONETIZATION_TERMS_NOT_ACCEPTED";
    JSONErrorCodes[JSONErrorCodes["TWO_FA_NOT_ENABLED"] = 210011] = "TWO_FA_NOT_ENABLED";
    JSONErrorCodes[JSONErrorCodes["GUILD_PRODUCT_LISTING_CANNOT_PUBLISH_WITHOUT_BENEFIT"] = 210021] = "GUILD_PRODUCT_LISTING_CANNOT_PUBLISH_WITHOUT_BENEFIT";
    JSONErrorCodes[JSONErrorCodes["CREATOR_MONETIZATION_PAYMENT_TEAM_REQUIRED"] = 210026] = "CREATOR_MONETIZATION_PAYMENT_TEAM_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CREATOR_MONETIZATION_PAYMENT_ACCOUNT_VERIFICATION_REQUIRED"] = 210027] = "CREATOR_MONETIZATION_PAYMENT_ACCOUNT_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID"] = 220001] = "WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID"] = 220002] = "WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS"] = 220003] = "WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS"] = 220004] = "WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER"] = 220005] = "MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER";
    JSONErrorCodes[JSONErrorCodes["HARMFUL_LINK_MESSAGE_BLOCKED"] = 240000] = "HARMFUL_LINK_MESSAGE_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["CLYDE_CONSENT_REQUIRED"] = 310000] = "CLYDE_CONSENT_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CLYDE_UNSAFE_PERSONALITY"] = 310003] = "CLYDE_UNSAFE_PERSONALITY";
    JSONErrorCodes[JSONErrorCodes["USER_LIMITED_ACCESS_DEFAULT"] = 340000] = "USER_LIMITED_ACCESS_DEFAULT";
    JSONErrorCodes[JSONErrorCodes["USER_FRIEND_REQUEST_LIMITED_ACCESS"] = 340007] = "USER_FRIEND_REQUEST_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["USER_LIMITED_ACCESS_MAX"] = 349999] = "USER_LIMITED_ACCESS_MAX";
    JSONErrorCodes[JSONErrorCodes["CANNOT_ENABLE_ONBOARDING_REQUIREMENTS_NOT_MET"] = 350000] = "CANNOT_ENABLE_ONBOARDING_REQUIREMENTS_NOT_MET";
    JSONErrorCodes[JSONErrorCodes["CANNOT_ENABLE_ONBOARDING_BELOW_REQUIREMENTS"] = 350001] = "CANNOT_ENABLE_ONBOARDING_BELOW_REQUIREMENTS";
    JSONErrorCodes[JSONErrorCodes["GUILD_LIMITED_ACCESS_DEFAULT"] = 400000] = "GUILD_LIMITED_ACCESS_DEFAULT";
    JSONErrorCodes[JSONErrorCodes["GUILD_FILE_UPLOAD_RATE_LIMITED_ACCESS"] = 400001] = "GUILD_FILE_UPLOAD_RATE_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["GUILD_JOIN_INVITE_LIMITED_ACCESS"] = 400002] = "GUILD_JOIN_INVITE_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["GUILD_GO_LIVE_LIMITED_ACCESS"] = 400003] = "GUILD_GO_LIVE_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["GUILD_LIMITED_ACCESS_MAX"] = 409999] = "GUILD_LIMITED_ACCESS_MAX";
    JSONErrorCodes[JSONErrorCodes["FAILED_TO_BAN_USERS"] = 500000] = "FAILED_TO_BAN_USERS";
    JSONErrorCodes[JSONErrorCodes["POLL_VOTING_BLOCKED"] = 520000] = "POLL_VOTING_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["POLL_EXPIRED"] = 520001] = "POLL_EXPIRED";
    JSONErrorCodes[JSONErrorCodes["INVALID_CHANNEL_TYPE_FOR_POLL_CREATION"] = 520002] = "INVALID_CHANNEL_TYPE_FOR_POLL_CREATION";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EDIT_POLL_MESSAGE"] = 520003] = "CANNOT_EDIT_POLL_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_USE_AN_EMOJI_INCLUDED_WITH_THE_POLL"] = 520004] = "CANNOT_USE_AN_EMOJI_INCLUDED_WITH_THE_POLL";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXPIRE_A_NON_POLL_MESSAGE"] = 520006] = "CANNOT_EXPIRE_A_NON_POLL_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["POLL_IS_ALREADY_EXPIRED"] = 520007] = "POLL_IS_ALREADY_EXPIRED";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_PROVISIONAL_ACCOUNTS_NOT_GRANTED"] = 530000] = "APPLICATION_PROVISIONAL_ACCOUNTS_NOT_GRANTED";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_EXPIRED"] = 530001] = "JWT_TOKEN_EXPIRED";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_ISSUER_MISMATCH"] = 530002] = "JWT_TOKEN_ISSUER_MISMATCH";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_AUDIENCE_MISMATCH"] = 530003] = "JWT_TOKEN_AUDIENCE_MISMATCH";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_ISSUED_TOO_LONG_AGO"] = 530004] = "JWT_TOKEN_ISSUED_TOO_LONG_AGO";
    JSONErrorCodes[JSONErrorCodes["UNIQUE_USERNAME_GENERATION_FAILED"] = 530006] = "UNIQUE_USERNAME_GENERATION_FAILED";
    JSONErrorCodes[JSONErrorCodes["CLIENT_SECRET_INVALID"] = 530007] = "CLIENT_SECRET_INVALID";
})(JSONErrorCodes || (exports.JSONErrorCodes = JSONErrorCodes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMkVBQWtDO0FBa0JyQixRQUFBLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDckIsUUFBQSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFFBQUEsUUFBUSxHQUFHLHFCQUFxQixDQUFDO0FBQ2pDLFFBQUEsT0FBTyxHQUFHLEdBQUcsZ0JBQVEsU0FBUyxvQkFBWSxFQUFFLENBQUM7QUFDN0MsUUFBQSxPQUFPLEdBQUcsc0JBQUcsQ0FBQyxPQUFPLENBQUM7QUFDdEIsUUFBQSxVQUFVLEdBQUcsV0FBVyxlQUFPLHlDQUF5QyxDQUFDO0FBQ3pFLFFBQUEsaUJBQWlCLEdBQUc7SUFDN0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHO0lBQzNELEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDbEUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0NBQ25CLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN2QixLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7SUFDTCxPQUFPO0lBQ1AsUUFBUTtDQUNGLENBQUM7QUFHRSxRQUFBLFlBQVksR0FBRztJQUN4QixLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztDQUNDLENBQUM7QUFLWCxJQUFZLFlBT1g7QUFQRCxXQUFZLFlB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