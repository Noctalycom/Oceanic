"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTypes = exports.ConnectionServices = exports.ConnectionVisibilityTypes = exports.ThreadAutoArchiveDurations = exports.VideoQualityModes = exports.OverwriteTypes = exports.ThreadOnlyChannelTypes = exports.InteractionChannelTypes = exports.InviteChannelTypes = exports.DMInviteChannelTypes = exports.GuildInviteChannelTypes = exports.VoiceChannelTypes = exports.TextableGuildChannelsWithoutThreadsTypes = exports.TextableChannelsWithoutThreadsTypes = exports.TextableGuildChannelTypes = exports.TextableChannelTypes = exports.EditableChannelTypes = exports.PrivateChannelTypes = exports.GuildChannelsWithoutThreadsTypes = exports.ThreadChannelTypes = exports.GuildChannelTypes = exports.ImplementedChannelTypes = exports.NotImplementedChannelTypes = exports.AnyChannelTypes = exports.ChannelTypes = exports.StickerFormatTypes = exports.StickerTypes = exports.SystemChannelFlags = exports.PremiumTiers = exports.GuildNSFWLevels = exports.VerificationLevels = exports.MFALevels = exports.ExplicitContentFilterLevels = exports.DefaultMessageNotificationLevels = exports.GuildFeatures = exports.ApplicationFlags = exports.InteractionContextTypes = exports.ApplicationIntegrationTypes = exports.UserFlags = exports.PremiumTypes = exports.WebhookTypes = exports.ImageFormats = exports.RESTMethods = exports.MEDIA_PROXY_SIZES = exports.USER_AGENT = exports.VERSION = exports.API_URL = exports.BASE_URL = exports.REST_VERSION = exports.GATEWAY_VERSION = void 0;
exports.PrivilegedIntents = exports.AllNonPrivilegedIntents = exports.NonPrivilegedIntents = exports.Intents = exports.EntryPointCommandHandlerTypes = exports.InteractionResponseTypes = exports.ApplicationCommandPermissionTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.AuditLogActionTypes = exports.AutoModerationActionTypes = exports.AutoModerationKeywordPresetTypes = exports.AutoModerationTriggerTypes = exports.AutoModerationEventTypes = exports.StageInstancePrivacyLevels = exports.GuildScheduledEventEntityTypes = exports.GuildScheduledEventStatuses = exports.GuildScheduledEventPrivacyLevels = exports.InviteTargetTypes = exports.InviteTypes = exports.InteractionTypes = exports.MessageActivityTypes = exports.UndeletableMessageTypes = exports.MessageTypes = exports.MessageFlags = exports.TextInputStyles = exports.ButtonStyles = exports.ComponentTypes = exports.OAuthScopes = exports.TeamMembershipState = exports.ForumLayoutTypes = exports.SortOrderTypes = exports.ChannelFlags = exports.PermissionNames = exports.AllModeratorPermissionNames = exports.AllModeratorPermissions = exports.ModeratorPermissions = exports.AllStagePermissionNames = exports.AllStagePermissions = exports.StagePermissions = exports.AllVoicePermissionNames = exports.AllVoicePermissions = exports.VoicePermissions = exports.AllTextPermissionNames = exports.AllTextPermissions = exports.TextPermissions = exports.AllPermissions = exports.PermissionValueToName = exports.Permissions = exports.IntegrationExpireBehaviors = void 0;
exports.EmbeddedActivityLabelType = exports.EmbeddedActivityOrientationLockStateType = exports.ApplicationInternalGuildRestriction = exports.InviteTargetUsersJobStatus = exports.DisplayNameEffect = exports.DisplayNameFont = exports.SeparatorSpacingSize = exports.EmbedMediaFlags = exports.EmbedFlags = exports.ApplicationEventWebhookEventTypes = exports.ApplicationEventWebhookStatus = exports.ActivityLocationKind = exports.MemberJoinSourceType = exports.MemberSearchSortType = exports.RoleFlags = exports.ApplicationVerificationState = exports.StoreApplicationState = exports.RPCApplicationState = exports.ApplicationMonetizationEligibilityFlags = exports.ApplicationInteractionsVersion = exports.ApplicationExplicitContentFilterLevel = exports.ApplicationDiscoveryEligibilityFlags = exports.ApplicationDiscoverabilityState = exports.ApplicationMonetizationState = exports.PollLayoutType = exports.SubscriptionStatuses = exports.SKUAccessTypes = exports.EntitlementOwnerTypes = exports.EntitlementTypes = exports.SKUFlags = exports.SKUTypes = exports.AttachmentFlags = exports.ReactionType = exports.InviteFlags = exports.OnboardingModes = exports.AnimationTypes = exports.OnboardingPromptTypes = exports.GuildMemberFlags = exports.RoleConnectionMetadataTypes = exports.ThreadMemberFlags = exports.ActivityFlags = exports.ActivityTypes = exports.HubTypes = exports.VoiceCloseCodes = exports.VoiceOPCodes = exports.GatewayCloseCodes = exports.GatewayOPCodes = exports.PrivilegedIntentMapping = exports.AllIntents = exports.AllPrivilegedIntents = void 0;
exports.JSONErrorCodes = exports.LobbyMemberFlags = exports.ApplicationType = exports.TeamPayoutGateway = exports.TeamPayoutAccountStatus = exports.OverlayMethodFlags = exports.ApprovableConsoleType = exports.TeamMemberRoleTypes = exports.OperatingSystemTypes = exports.PricingLocalizationStrategies = exports.EmbeddedActivityPlatformTypes = exports.EmbeddedActivitySurfaces = exports.EmbeddedActivityReleasePhases = void 0;
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
    2048, 3072, 4096
];
exports.RESTMethods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];
exports.ImageFormats = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif"
];
var WebhookTypes;
(function (WebhookTypes) {
    WebhookTypes[WebhookTypes["INCOMING"] = 1] = "INCOMING";
    WebhookTypes[WebhookTypes["CHANNEL_FOLLOWER"] = 2] = "CHANNEL_FOLLOWER";
    WebhookTypes[WebhookTypes["APPLICATION"] = 3] = "APPLICATION";
})(WebhookTypes || (exports.WebhookTypes = WebhookTypes = {}));
var PremiumTypes;
(function (PremiumTypes) {
    PremiumTypes[PremiumTypes["NONE"] = 0] = "NONE";
    PremiumTypes[PremiumTypes["NITRO_CLASSIC"] = 1] = "NITRO_CLASSIC";
    PremiumTypes[PremiumTypes["NITRO"] = 2] = "NITRO";
    PremiumTypes[PremiumTypes["NITRO_BASIC"] = 3] = "NITRO_BASIC";
})(PremiumTypes || (exports.PremiumTypes = PremiumTypes = {}));
// @TODO: bigints?
var UserFlags;
(function (UserFlags) {
    UserFlags[UserFlags["STAFF"] = 1] = "STAFF";
    UserFlags[UserFlags["PARTNER"] = 2] = "PARTNER";
    UserFlags[UserFlags["HYPESQUAD"] = 4] = "HYPESQUAD";
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_1"] = 8] = "BUG_HUNTER_LEVEL_1";
    UserFlags[UserFlags["MFA_SMS"] = 16] = "MFA_SMS";
    UserFlags[UserFlags["PREMIUM_PROMO_DISMISSED"] = 32] = "PREMIUM_PROMO_DISMISSED";
    UserFlags[UserFlags["HYPESQUAD_BRAVERY"] = 64] = "HYPESQUAD_BRAVERY";
    UserFlags[UserFlags["HYPESQUAD_BRILLIANCE"] = 128] = "HYPESQUAD_BRILLIANCE";
    UserFlags[UserFlags["HYPESQUAD_BALANCE"] = 256] = "HYPESQUAD_BALANCE";
    UserFlags[UserFlags["EARLY_SUPPORTER"] = 512] = "EARLY_SUPPORTER";
    UserFlags[UserFlags["PSEUDO_TEAM_USER"] = 1024] = "PSEUDO_TEAM_USER";
    /** @deprecated Use `IS_HUBSPOT_CONTACT`. This will be removed in `1.15.0` */
    UserFlags[UserFlags["INTERNAL_APPLICATION"] = 2048] = "INTERNAL_APPLICATION";
    UserFlags[UserFlags["IS_HUBSPOT_CONTACT"] = 2048] = "IS_HUBSPOT_CONTACT";
    /** @deprecated */
    UserFlags[UserFlags["SYSTEM"] = 4096] = "SYSTEM";
    UserFlags[UserFlags["HAS_UNREAD_URGENT_MESSAGES"] = 8192] = "HAS_UNREAD_URGENT_MESSAGES";
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_2"] = 16384] = "BUG_HUNTER_LEVEL_2";
    UserFlags[UserFlags["UNDERAGE_DELETED"] = 32768] = "UNDERAGE_DELETED";
    UserFlags[UserFlags["VERIFIED_BOT"] = 65536] = "VERIFIED_BOT";
    UserFlags[UserFlags["VERIFIED_DEVELOPER"] = 131072] = "VERIFIED_DEVELOPER";
    UserFlags[UserFlags["CERTIFIED_MODERATOR"] = 262144] = "CERTIFIED_MODERATOR";
    UserFlags[UserFlags["BOT_HTTP_INTERACTIONS"] = 524288] = "BOT_HTTP_INTERACTIONS";
    UserFlags[UserFlags["SPAMMER"] = 1048576] = "SPAMMER";
    /** @deprecated */
    UserFlags[UserFlags["DISABLE_PREMIUM"] = 2097152] = "DISABLE_PREMIUM";
    /** @deprecated */
    UserFlags[UserFlags["ACTIVE_DEVELOPER"] = 4194304] = "ACTIVE_DEVELOPER";
    UserFlags[UserFlags["PROVISIONAL_ACCOUNT"] = 8388608] = "PROVISIONAL_ACCOUNT";
    UserFlags[UserFlags["HIGH_GLOBAL_RATE_LIMIT"] = 8589934592] = "HIGH_GLOBAL_RATE_LIMIT";
    UserFlags[UserFlags["DELETED"] = 17179869184] = "DELETED";
    UserFlags[UserFlags["DISABLED_SUSPICIOUS_ACTIVITY"] = 34359738368] = "DISABLED_SUSPICIOUS_ACTIVITY";
    UserFlags[UserFlags["SELF_DELETED"] = 68719476736] = "SELF_DELETED";
    /** @deprecated */
    UserFlags[UserFlags["PREMIUM_DISCRIMINATOR"] = 137438953472] = "PREMIUM_DISCRIMINATOR";
    UserFlags[UserFlags["USED_DESKTOP_CLIENT"] = 274877906944] = "USED_DESKTOP_CLIENT";
    UserFlags[UserFlags["USED_WEB_CLIENT"] = 549755813888] = "USED_WEB_CLIENT";
    UserFlags[UserFlags["USED_MOBILE_CLIENT"] = 1099511627776] = "USED_MOBILE_CLIENT";
    UserFlags[UserFlags["DISABLED"] = 2199023255552] = "DISABLED";
    UserFlags[UserFlags["VERIFIED_EMAIL"] = 8796093022208] = "VERIFIED_EMAIL";
    UserFlags[UserFlags["QUARANTINED"] = 17592186044416] = "QUARANTINED";
    UserFlags[UserFlags["PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME"] = 140737488355328] = "PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME";
    UserFlags[UserFlags["COLLABORATOR"] = 1125899906842624] = "COLLABORATOR";
    UserFlags[UserFlags["RESTRICTED_COLLABORATOR"] = 2251799813685248] = "RESTRICTED_COLLABORATOR";
})(UserFlags || (exports.UserFlags = UserFlags = {}));
var ApplicationIntegrationTypes;
(function (ApplicationIntegrationTypes) {
    ApplicationIntegrationTypes[ApplicationIntegrationTypes["GUILD_INSTALL"] = 0] = "GUILD_INSTALL";
    ApplicationIntegrationTypes[ApplicationIntegrationTypes["USER_INSTALL"] = 1] = "USER_INSTALL";
})(ApplicationIntegrationTypes || (exports.ApplicationIntegrationTypes = ApplicationIntegrationTypes = {}));
var InteractionContextTypes;
(function (InteractionContextTypes) {
    InteractionContextTypes[InteractionContextTypes["GUILD"] = 0] = "GUILD";
    InteractionContextTypes[InteractionContextTypes["BOT_DM"] = 1] = "BOT_DM";
    InteractionContextTypes[InteractionContextTypes["PRIVATE_CHANNEL"] = 2] = "PRIVATE_CHANNEL";
})(InteractionContextTypes || (exports.InteractionContextTypes = InteractionContextTypes = {}));
var ApplicationFlags;
(function (ApplicationFlags) {
    ApplicationFlags[ApplicationFlags["EMBEDDED_RELEASED"] = 2] = "EMBEDDED_RELEASED";
    ApplicationFlags[ApplicationFlags["MANAGED_EMOJI"] = 4] = "MANAGED_EMOJI";
    ApplicationFlags[ApplicationFlags["EMBEDDED_IAP"] = 8] = "EMBEDDED_IAP";
    ApplicationFlags[ApplicationFlags["GROUP_DM_CREATE"] = 16] = "GROUP_DM_CREATE";
    ApplicationFlags[ApplicationFlags["RPC_PRIVATE_BETA"] = 32] = "RPC_PRIVATE_BETA";
    /** Indicates if an app uses the {@link https://discord.com/developers/docs/resources/auto-moderation | Auto Moderation API}. Applications must have at least 100 enabled auto moderation rules to get the badge. */
    ApplicationFlags[ApplicationFlags["APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE"] = 64] = "APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE";
    ApplicationFlags[ApplicationFlags["GAME_PROFILE_DISABLED"] = 128] = "GAME_PROFILE_DISABLED";
    /** @deprecated Use `PUBLIC_OAUTH2_CLIENT`. This will be removed in `1.15.0`. */
    ApplicationFlags[ApplicationFlags["ALLOW_ASSETS"] = 256] = "ALLOW_ASSETS";
    ApplicationFlags[ApplicationFlags["PUBLIC_OAUTH2_CLIENT"] = 256] = "PUBLIC_OAUTH2_CLIENT";
    /** @deprecated Use `CONTEXTLESS_ACTIVITY`. This will be removed in `1.15.0`. */
    ApplicationFlags[ApplicationFlags["ALLOW_ACTIVITY_ACTION_SPECTATE"] = 512] = "ALLOW_ACTIVITY_ACTION_SPECTATE";
    ApplicationFlags[ApplicationFlags["CONTEXTLESS_ACTIVITY"] = 512] = "CONTEXTLESS_ACTIVITY";
    /** @deprecated Use `SOCIAL_LAYER_INTEGRATION_LIMITED`. This will be removed in `1.15.0`. */
    ApplicationFlags[ApplicationFlags["ALLOW_ACTIVITY_ACTION_JOIN_REQUEST"] = 1024] = "ALLOW_ACTIVITY_ACTION_JOIN_REQUEST";
    ApplicationFlags[ApplicationFlags["SOCIAL_LAYER_INTEGRATION_LIMITED"] = 1024] = "SOCIAL_LAYER_INTEGRATION_LIMITED";
    /** @deprecated Use `CLOUD_GAMING_DEMO`. This will be removed in `1.15.0`. */
    ApplicationFlags[ApplicationFlags["RPC_HAS_CONNECTED_ACCOUNT"] = 2048] = "RPC_HAS_CONNECTED_ACCOUNT";
    ApplicationFlags[ApplicationFlags["CLOUD_GAMING_DEMO"] = 2048] = "CLOUD_GAMING_DEMO";
    /** Intent required for bots in **100 or more servers** to receive {@link ClientEvents.presenceUpdate | `presenceUpdate`} events. */
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE"] = 4096] = "GATEWAY_PRESENCE";
    /** Intent required for bots in **under 100 servers** to receive {@link ClientEvents.presenceUpdate | `presenceUpdate`} events. */
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE_LIMITED"] = 8192] = "GATEWAY_PRESENCE_LIMITED";
    /** Intent required for bots in **100 or more servers** to receive member-related events like {@link ClientEvents.guildMemberAdd | `guildMemberAdd`}. */
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS"] = 16384] = "GATEWAY_GUILD_MEMBERS";
    /** Intent required for bots in **under 100 servers** to receive member-related events like {@link ClientEvents.guildMemberAdd | `guildMemberAdd`}. */
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS_LIMITED"] = 32768] = "GATEWAY_GUILD_MEMBERS_LIMITED";
    /** Indicates unusual growth of an app that prevents verification */
    ApplicationFlags[ApplicationFlags["VERIFICATION_PENDING_GUILD_LIMIT"] = 65536] = "VERIFICATION_PENDING_GUILD_LIMIT";
    /** Indicates if an app is embedded within the Discord client (currently unavailable publicly) */
    ApplicationFlags[ApplicationFlags["EMBEDDED"] = 131072] = "EMBEDDED";
    /** Intent required for bots in **100 or more servers** to receive {@link https://support-dev.discord.com/hc/en-us/articles/4404772028055 | message content}. */
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT"] = 262144] = "GATEWAY_MESSAGE_CONTENT";
    /** Intent required for bots in **under 100 servers** to receive {@link https://support-dev.discord.com/hc/en-us/articles/4404772028055 | message content}. */
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT_LIMITED"] = 524288] = "GATEWAY_MESSAGE_CONTENT_LIMITED";
    ApplicationFlags[ApplicationFlags["EMBEDDED_FIRST_PARTY"] = 1048576] = "EMBEDDED_FIRST_PARTY";
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_MIGRATED"] = 2097152] = "APPLICATION_COMMAND_MIGRATED";
    /** Indicates if an app has registered global {@link https://discord.com/developers/docs/interactions/application-commands | application commands}. */
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_BADGE"] = 8388608] = "APPLICATION_COMMAND_BADGE";
    ApplicationFlags[ApplicationFlags["ACTIVE"] = 16777216] = "ACTIVE";
    ApplicationFlags[ApplicationFlags["ACTIVE_GRACE_PERIOD"] = 33554432] = "ACTIVE_GRACE_PERIOD";
    ApplicationFlags[ApplicationFlags["IFRAME_MODAL"] = 67108864] = "IFRAME_MODAL";
    ApplicationFlags[ApplicationFlags["SOCIAL_LAYER_INTEGRATION"] = 134217728] = "SOCIAL_LAYER_INTEGRATION";
    ApplicationFlags[ApplicationFlags["PROMOTED"] = 268435456] = "PROMOTED";
    ApplicationFlags[ApplicationFlags["PARTNER"] = 536870912] = "PARTNER";
    ApplicationFlags[ApplicationFlags["PARENT"] = 8589934592] = "PARENT";
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
    "WELCOME_SCREEN_ENABLED"
];
var DefaultMessageNotificationLevels;
(function (DefaultMessageNotificationLevels) {
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NO_MESSAGES"] = 2] = "NO_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NULL"] = 3] = "NULL";
})(DefaultMessageNotificationLevels || (exports.DefaultMessageNotificationLevels = DefaultMessageNotificationLevels = {}));
var ExplicitContentFilterLevels;
(function (ExplicitContentFilterLevels) {
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["DISABLED"] = 0] = "DISABLED";
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilterLevels || (exports.ExplicitContentFilterLevels = ExplicitContentFilterLevels = {}));
var MFALevels;
(function (MFALevels) {
    MFALevels[MFALevels["NONE"] = 0] = "NONE";
    MFALevels[MFALevels["ELEVATED"] = 1] = "ELEVATED";
})(MFALevels || (exports.MFALevels = MFALevels = {}));
var VerificationLevels;
(function (VerificationLevels) {
    VerificationLevels[VerificationLevels["NONE"] = 0] = "NONE";
    VerificationLevels[VerificationLevels["LOW"] = 1] = "LOW";
    VerificationLevels[VerificationLevels["MEDIUM"] = 2] = "MEDIUM";
    VerificationLevels[VerificationLevels["HIGH"] = 3] = "HIGH";
    VerificationLevels[VerificationLevels["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevels || (exports.VerificationLevels = VerificationLevels = {}));
var GuildNSFWLevels;
(function (GuildNSFWLevels) {
    GuildNSFWLevels[GuildNSFWLevels["DEFAULT"] = 0] = "DEFAULT";
    GuildNSFWLevels[GuildNSFWLevels["EXPLICIT"] = 1] = "EXPLICIT";
    GuildNSFWLevels[GuildNSFWLevels["SAFE"] = 2] = "SAFE";
    GuildNSFWLevels[GuildNSFWLevels["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevels || (exports.GuildNSFWLevels = GuildNSFWLevels = {}));
var PremiumTiers;
(function (PremiumTiers) {
    PremiumTiers[PremiumTiers["NONE"] = 0] = "NONE";
    PremiumTiers[PremiumTiers["TIER_1"] = 1] = "TIER_1";
    PremiumTiers[PremiumTiers["TIER_2"] = 2] = "TIER_2";
    PremiumTiers[PremiumTiers["TIER_3"] = 3] = "TIER_3";
})(PremiumTiers || (exports.PremiumTiers = PremiumTiers = {}));
var SystemChannelFlags;
(function (SystemChannelFlags) {
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS"] = 16] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES"] = 32] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_CHANNEL_PROMPT_DEADCHAT"] = 128] = "SUPPRESS_CHANNEL_PROMPT_DEADCHAT";
})(SystemChannelFlags || (exports.SystemChannelFlags = SystemChannelFlags = {}));
var StickerTypes;
(function (StickerTypes) {
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes || (exports.StickerTypes = StickerTypes = {}));
var StickerFormatTypes;
(function (StickerFormatTypes) {
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
    StickerFormatTypes[StickerFormatTypes["GIF"] = 4] = "GIF";
})(StickerFormatTypes || (exports.StickerFormatTypes = StickerFormatTypes = {}));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelTypes[ChannelTypes["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
    /** @deprecated Doesn't exist anymore. */
    ChannelTypes[ChannelTypes["GUILD_STORE"] = 6] = "GUILD_STORE";
    /** @deprecated Doesn't exist anymore. */
    ChannelTypes[ChannelTypes["GUILD_LFG"] = 7] = "GUILD_LFG";
    /** @deprecated Doesn't exist anymore. */
    ChannelTypes[ChannelTypes["LFG_GROUP_DM"] = 8] = "LFG_GROUP_DM";
    /** @deprecated Doesn't exist anymore. */
    ChannelTypes[ChannelTypes["THREAD_ALPHA"] = 9] = "THREAD_ALPHA";
    ChannelTypes[ChannelTypes["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    ChannelTypes[ChannelTypes["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    ChannelTypes[ChannelTypes["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
    ChannelTypes[ChannelTypes["GUILD_MEDIA"] = 16] = "GUILD_MEDIA";
})(ChannelTypes || (exports.ChannelTypes = ChannelTypes = {}));
function exclude(original, excludeTypes) {
    return original.filter((value) => !excludeTypes.includes(value));
}
exports.AnyChannelTypes = Object.values(ChannelTypes).filter(v => typeof v === "number");
exports.NotImplementedChannelTypes = [ChannelTypes.GUILD_STORE, ChannelTypes.GUILD_LFG, ChannelTypes.LFG_GROUP_DM, ChannelTypes.THREAD_ALPHA, ChannelTypes.GUILD_DIRECTORY];
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
    VideoQualityModes[VideoQualityModes["AUTO"] = 1] = "AUTO";
    VideoQualityModes[VideoQualityModes["FULL"] = 2] = "FULL";
})(VideoQualityModes || (exports.VideoQualityModes = VideoQualityModes = {}));
exports.ThreadAutoArchiveDurations = [
    60,
    1440,
    4320,
    10080
];
var ConnectionVisibilityTypes;
(function (ConnectionVisibilityTypes) {
    ConnectionVisibilityTypes[ConnectionVisibilityTypes["NONE"] = 0] = "NONE";
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
    "youtube"
];
exports.IntegrationTypes = [
    "twitch",
    "youtube",
    "discord",
    "guild_subscription"
];
var IntegrationExpireBehaviors;
(function (IntegrationExpireBehaviors) {
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["REMOVE_ROLE"] = 0] = "REMOVE_ROLE";
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
    Permissions.USE_CLYDE_AI = 140737488355328n; // 1 << 47
    Permissions.SET_VOICE_CHANNEL_STATUS = 281474976710656n; // 1 << 48
    Permissions.SEND_POLLS = 562949953421312n; // 1 << 49
    Permissions.USE_EXTERNAL_APPS = 1125899906842624n; // 1 << 50
    Permissions.PIN_MESSAGES = 2251799813685248n; // 1 << 51
    Permissions.BYPASS_SLOWMODE = 4503599627370496n; // 1 << 52
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
    Permissions.BYPASS_SLOWMODE
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
    Permissions.BYPASS_SLOWMODE
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
    Permissions.BYPASS_SLOWMODE
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
    Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS
];
exports.AllModeratorPermissions = exports.ModeratorPermissions.reduce((all, p) => all | p, 0n);
exports.AllModeratorPermissionNames = exports.ModeratorPermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.PermissionNames = Object.keys(Permissions);
var ChannelFlags;
(function (ChannelFlags) {
    ChannelFlags[ChannelFlags["GUILD_FEED_REMOVED"] = 1] = "GUILD_FEED_REMOVED";
    /** For threads, if this thread is pinned in a forum channel. */
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
    ChannelFlags[ChannelFlags["ACTIVE_CHANNELS_REMOVED"] = 4] = "ACTIVE_CHANNELS_REMOVED";
    /** For forums, if tags are required when creating threads. */
    ChannelFlags[ChannelFlags["REQUIRE_TAG"] = 16] = "REQUIRE_TAG";
    ChannelFlags[ChannelFlags["IS_SPAM"] = 32] = "IS_SPAM";
    ChannelFlags[ChannelFlags["IS_GUILD_RESOURCE_CHANNEL"] = 128] = "IS_GUILD_RESOURCE_CHANNEL";
    ChannelFlags[ChannelFlags["CLYDE_AI"] = 256] = "CLYDE_AI";
    ChannelFlags[ChannelFlags["IS_SCHEDULED_FOR_DELETION"] = 512] = "IS_SCHEDULED_FOR_DELETION";
    ChannelFlags[ChannelFlags["IS_MEDIA_CHANNEL"] = 1024] = "IS_MEDIA_CHANNEL";
    ChannelFlags[ChannelFlags["SUMMARIES_DISABLED"] = 2048] = "SUMMARIES_DISABLED";
    ChannelFlags[ChannelFlags["APPLICATION_SHELF_CONSENT"] = 4096] = "APPLICATION_SHELF_CONSENT";
    ChannelFlags[ChannelFlags["IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL"] = 8192] = "IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL";
    ChannelFlags[ChannelFlags["IS_BROADCASTING"] = 16384] = "IS_BROADCASTING";
    /** For media channls, hides the embedded media download options. */
    ChannelFlags[ChannelFlags["HIDE_MEDIA_DOWNLOAD_OPTIONS"] = 32768] = "HIDE_MEDIA_DOWNLOAD_OPTIONS";
    ChannelFlags[ChannelFlags["IS_JOIN_REQUEST_INTERVIEW_CHANNEL"] = 65536] = "IS_JOIN_REQUEST_INTERVIEW_CHANNEL";
})(ChannelFlags || (exports.ChannelFlags = ChannelFlags = {}));
var SortOrderTypes;
(function (SortOrderTypes) {
    /** Sort forum threads by activity. */
    SortOrderTypes[SortOrderTypes["LATEST_ACTIVITY"] = 0] = "LATEST_ACTIVITY";
    /** Sort forum threads by creation time (from most recent to oldest). */
    SortOrderTypes[SortOrderTypes["CREATION_DATE"] = 1] = "CREATION_DATE";
})(SortOrderTypes || (exports.SortOrderTypes = SortOrderTypes = {}));
var ForumLayoutTypes;
(function (ForumLayoutTypes) {
    /** A preferred forum layout hasn't been set by a server admin. */
    ForumLayoutTypes[ForumLayoutTypes["DEFAULT"] = 0] = "DEFAULT";
    /** List View: display forum posts in a text-focused list. */
    ForumLayoutTypes[ForumLayoutTypes["LIST"] = 1] = "LIST";
    /** Gallery View: display forum posts in a media-focused gallery. */
    ForumLayoutTypes[ForumLayoutTypes["GRID"] = 2] = "GRID";
})(ForumLayoutTypes || (exports.ForumLayoutTypes = ForumLayoutTypes = {}));
var TeamMembershipState;
(function (TeamMembershipState) {
    TeamMembershipState[TeamMembershipState["INVITED"] = 1] = "INVITED";
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
    /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    OAuthScopes["MESSAGES_READ"] = "messages.read";
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
    ComponentTypes[ComponentTypes["ACTION_ROW"] = 1] = "ACTION_ROW";
    ComponentTypes[ComponentTypes["BUTTON"] = 2] = "BUTTON";
    ComponentTypes[ComponentTypes["STRING_SELECT"] = 3] = "STRING_SELECT";
    ComponentTypes[ComponentTypes["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    ComponentTypes[ComponentTypes["USER_SELECT"] = 5] = "USER_SELECT";
    ComponentTypes[ComponentTypes["ROLE_SELECT"] = 6] = "ROLE_SELECT";
    ComponentTypes[ComponentTypes["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
    ComponentTypes[ComponentTypes["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
    ComponentTypes[ComponentTypes["SECTION"] = 9] = "SECTION";
    ComponentTypes[ComponentTypes["TEXT_DISPLAY"] = 10] = "TEXT_DISPLAY";
    ComponentTypes[ComponentTypes["THUMBNAIL"] = 11] = "THUMBNAIL";
    ComponentTypes[ComponentTypes["MEDIA_GALLERY"] = 12] = "MEDIA_GALLERY";
    ComponentTypes[ComponentTypes["FILE"] = 13] = "FILE";
    ComponentTypes[ComponentTypes["SEPARATOR"] = 14] = "SEPARATOR";
    ComponentTypes[ComponentTypes["CONTENT_INVENTORY_ENTRY"] = 16] = "CONTENT_INVENTORY_ENTRY";
    ComponentTypes[ComponentTypes["CONTAINER"] = 17] = "CONTAINER";
    ComponentTypes[ComponentTypes["LABEL"] = 18] = "LABEL";
    ComponentTypes[ComponentTypes["FILE_UPLOAD"] = 19] = "FILE_UPLOAD";
})(ComponentTypes || (exports.ComponentTypes = ComponentTypes = {}));
var ButtonStyles;
(function (ButtonStyles) {
    ButtonStyles[ButtonStyles["PRIMARY"] = 1] = "PRIMARY";
    ButtonStyles[ButtonStyles["SECONDARY"] = 2] = "SECONDARY";
    ButtonStyles[ButtonStyles["SUCCESS"] = 3] = "SUCCESS";
    ButtonStyles[ButtonStyles["DANGER"] = 4] = "DANGER";
    ButtonStyles[ButtonStyles["LINK"] = 5] = "LINK";
    ButtonStyles[ButtonStyles["PREMIUM"] = 6] = "PREMIUM";
})(ButtonStyles || (exports.ButtonStyles = ButtonStyles = {}));
var TextInputStyles;
(function (TextInputStyles) {
    TextInputStyles[TextInputStyles["SHORT"] = 1] = "SHORT";
    TextInputStyles[TextInputStyles["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyles || (exports.TextInputStyles = TextInputStyles = {}));
var MessageFlags;
(function (MessageFlags) {
    MessageFlags[MessageFlags["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    MessageFlags[MessageFlags["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    MessageFlags[MessageFlags["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    MessageFlags[MessageFlags["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    MessageFlags[MessageFlags["URGENT"] = 16] = "URGENT";
    MessageFlags[MessageFlags["HAS_THREAD"] = 32] = "HAS_THREAD";
    MessageFlags[MessageFlags["EPHEMERAL"] = 64] = "EPHEMERAL";
    MessageFlags[MessageFlags["LOADING"] = 128] = "LOADING";
    MessageFlags[MessageFlags["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
    MessageFlags[MessageFlags["SHOULD_SHOW_LINK_NOT_DISCORD_WARNING"] = 1024] = "SHOULD_SHOW_LINK_NOT_DISCORD_WARNING";
    MessageFlags[MessageFlags["SUPPRESS_NOTIFICATIONS"] = 4096] = "SUPPRESS_NOTIFICATIONS";
    MessageFlags[MessageFlags["IS_VOICE_MESSAGE"] = 8192] = "IS_VOICE_MESSAGE";
    MessageFlags[MessageFlags["HAS_SNAPSHOT"] = 16384] = "HAS_SNAPSHOT";
    MessageFlags[MessageFlags["IS_COMPONENTS_V2"] = 32768] = "IS_COMPONENTS_V2";
})(MessageFlags || (exports.MessageFlags = MessageFlags = {}));
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["DEFAULT"] = 0] = "DEFAULT";
    MessageTypes[MessageTypes["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    MessageTypes[MessageTypes["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    MessageTypes[MessageTypes["CALL"] = 3] = "CALL";
    MessageTypes[MessageTypes["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    MessageTypes[MessageTypes["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    MessageTypes[MessageTypes["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    MessageTypes[MessageTypes["USER_JOIN"] = 7] = "USER_JOIN";
    MessageTypes[MessageTypes["GUILD_BOOST"] = 8] = "GUILD_BOOST";
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_1"] = 9] = "GUILD_BOOST_TIER_1";
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_2"] = 10] = "GUILD_BOOST_TIER_2";
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_3"] = 11] = "GUILD_BOOST_TIER_3";
    MessageTypes[MessageTypes["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    MessageTypes[MessageTypes["GUILD_STREAM"] = 13] = "GUILD_STREAM";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    MessageTypes[MessageTypes["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    MessageTypes[MessageTypes["REPLY"] = 19] = "REPLY";
    MessageTypes[MessageTypes["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    MessageTypes[MessageTypes["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    MessageTypes[MessageTypes["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    MessageTypes[MessageTypes["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
    MessageTypes[MessageTypes["AUTO_MODERATION_ACTION"] = 24] = "AUTO_MODERATION_ACTION";
    MessageTypes[MessageTypes["ROLE_SUBSCRIPTION_PURCHASE"] = 25] = "ROLE_SUBSCRIPTION_PURCHASE";
    MessageTypes[MessageTypes["INTERACTION_PREMIUM_UPSELL"] = 26] = "INTERACTION_PREMIUM_UPSELL";
    MessageTypes[MessageTypes["STAGE_START"] = 27] = "STAGE_START";
    MessageTypes[MessageTypes["STAGE_END"] = 28] = "STAGE_END";
    MessageTypes[MessageTypes["STAGE_SPEAKER"] = 29] = "STAGE_SPEAKER";
    MessageTypes[MessageTypes["STAGE_RAISE_HAND"] = 30] = "STAGE_RAISE_HAND";
    MessageTypes[MessageTypes["STAGE_TOPIC_CHANGE"] = 31] = "STAGE_TOPIC_CHANGE";
    MessageTypes[MessageTypes["GUILD_APPLICATION_PREMIUM_SUBSCRIPTION"] = 32] = "GUILD_APPLICATION_PREMIUM_SUBSCRIPTION";
    MessageTypes[MessageTypes["PRIVATE_CHANNEL_INTEGRATION_ADDED"] = 33] = "PRIVATE_CHANNEL_INTEGRATION_ADDED";
    MessageTypes[MessageTypes["PRIVATE_CHANNEL_INTEGRATION_REMOVED"] = 34] = "PRIVATE_CHANNEL_INTEGRATION_REMOVED";
    MessageTypes[MessageTypes["PREMIUM_REFERRAL"] = 35] = "PREMIUM_REFERRAL";
    MessageTypes[MessageTypes["GUILD_INCIDENT_ALERT_MODE_ENABLED"] = 36] = "GUILD_INCIDENT_ALERT_MODE_ENABLED";
    MessageTypes[MessageTypes["GUILD_INCIDENT_ALERT_MODE_DISABLED"] = 37] = "GUILD_INCIDENT_ALERT_MODE_DISABLED";
    MessageTypes[MessageTypes["GUILD_INCIDENT_REPORT_RAID"] = 38] = "GUILD_INCIDENT_REPORT_RAID";
    MessageTypes[MessageTypes["GUILD_INCIDENT_REPORT_FALSE_ALARM"] = 39] = "GUILD_INCIDENT_REPORT_FALSE_ALARM";
    MessageTypes[MessageTypes["GUILD_DEADCHAT_REVIVE_PROMPT"] = 40] = "GUILD_DEADCHAT_REVIVE_PROMPT";
    MessageTypes[MessageTypes["CUSTOM_GIFT"] = 41] = "CUSTOM_GIFT";
    MessageTypes[MessageTypes["GUILD_GAMING_STATS_PROMPT"] = 42] = "GUILD_GAMING_STATS_PROMPT";
    MessageTypes[MessageTypes["POLL"] = 43] = "POLL";
    MessageTypes[MessageTypes["PURCHASE_NOTIFICATION"] = 44] = "PURCHASE_NOTIFICATION";
    MessageTypes[MessageTypes["VOICE_HANGOUT_INVITE"] = 45] = "VOICE_HANGOUT_INVITE";
    MessageTypes[MessageTypes["POLL_RESULT"] = 46] = "POLL_RESULT";
    MessageTypes[MessageTypes["CHANGELOG"] = 47] = "CHANGELOG";
    MessageTypes[MessageTypes["NITRO_NOTIFICATION"] = 48] = "NITRO_NOTIFICATION";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
/** Messages of these types cannot be deleted. */
exports.UndeletableMessageTypes = [
    MessageTypes.RECIPIENT_ADD,
    MessageTypes.RECIPIENT_REMOVE,
    MessageTypes.CALL,
    MessageTypes.CHANNEL_NAME_CHANGE,
    MessageTypes.CHANNEL_ICON_CHANGE,
    MessageTypes.THREAD_STARTER_MESSAGE
];
var MessageActivityTypes;
(function (MessageActivityTypes) {
    MessageActivityTypes[MessageActivityTypes["JOIN"] = 1] = "JOIN";
    MessageActivityTypes[MessageActivityTypes["SPECTATE"] = 2] = "SPECTATE";
    MessageActivityTypes[MessageActivityTypes["LISTEN"] = 3] = "LISTEN";
    MessageActivityTypes[MessageActivityTypes["WATCH"] = 4] = "WATCH";
    MessageActivityTypes[MessageActivityTypes["JOIN_REQUEST"] = 5] = "JOIN_REQUEST";
})(MessageActivityTypes || (exports.MessageActivityTypes = MessageActivityTypes = {}));
var InteractionTypes;
(function (InteractionTypes) {
    InteractionTypes[InteractionTypes["PING"] = 1] = "PING";
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    InteractionTypes[InteractionTypes["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    InteractionTypes[InteractionTypes["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionTypes || (exports.InteractionTypes = InteractionTypes = {}));
var InviteTypes;
(function (InviteTypes) {
    InviteTypes[InviteTypes["GUILD"] = 0] = "GUILD";
    InviteTypes[InviteTypes["GROUP_DM"] = 1] = "GROUP_DM";
    InviteTypes[InviteTypes["FRIEND"] = 2] = "FRIEND";
})(InviteTypes || (exports.InviteTypes = InviteTypes = {}));
var InviteTargetTypes;
(function (InviteTargetTypes) {
    InviteTargetTypes[InviteTargetTypes["STREAM"] = 1] = "STREAM";
    InviteTargetTypes[InviteTargetTypes["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
    InviteTargetTypes[InviteTargetTypes["ROLE_SUBSCRIPTIONS_PURCHASE"] = 3] = "ROLE_SUBSCRIPTIONS_PURCHASE";
})(InviteTargetTypes || (exports.InviteTargetTypes = InviteTargetTypes = {}));
var GuildScheduledEventPrivacyLevels;
(function (GuildScheduledEventPrivacyLevels) {
    GuildScheduledEventPrivacyLevels[GuildScheduledEventPrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(GuildScheduledEventPrivacyLevels || (exports.GuildScheduledEventPrivacyLevels = GuildScheduledEventPrivacyLevels = {}));
var GuildScheduledEventStatuses;
(function (GuildScheduledEventStatuses) {
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["SCHEDULED"] = 1] = "SCHEDULED";
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["ACTIVE"] = 2] = "ACTIVE";
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["COMPLETED"] = 3] = "COMPLETED";
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["CANCELED"] = 4] = "CANCELED";
})(GuildScheduledEventStatuses || (exports.GuildScheduledEventStatuses = GuildScheduledEventStatuses = {}));
var GuildScheduledEventEntityTypes;
(function (GuildScheduledEventEntityTypes) {
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["STAGE_INSTANCE"] = 1] = "STAGE_INSTANCE";
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["VOICE"] = 2] = "VOICE";
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["EXTERNAL"] = 3] = "EXTERNAL";
})(GuildScheduledEventEntityTypes || (exports.GuildScheduledEventEntityTypes = GuildScheduledEventEntityTypes = {}));
var StageInstancePrivacyLevels;
(function (StageInstancePrivacyLevels) {
    /** @deprecated */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["PUBLIC"] = 1] = "PUBLIC";
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(StageInstancePrivacyLevels || (exports.StageInstancePrivacyLevels = StageInstancePrivacyLevels = {}));
var AutoModerationEventTypes;
(function (AutoModerationEventTypes) {
    AutoModerationEventTypes[AutoModerationEventTypes["MESSAGE_SEND"] = 1] = "MESSAGE_SEND";
    AutoModerationEventTypes[AutoModerationEventTypes["MEMBER_UPDATE"] = 2] = "MEMBER_UPDATE";
})(AutoModerationEventTypes || (exports.AutoModerationEventTypes = AutoModerationEventTypes = {}));
var AutoModerationTriggerTypes;
(function (AutoModerationTriggerTypes) {
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["KEYWORD"] = 1] = "KEYWORD";
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["SPAM"] = 3] = "SPAM";
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["KEYWORD_PRESET"] = 4] = "KEYWORD_PRESET";
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["MENTION_SPAM"] = 5] = "MENTION_SPAM";
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["MEMBER_PROFILE"] = 6] = "MEMBER_PROFILE";
})(AutoModerationTriggerTypes || (exports.AutoModerationTriggerTypes = AutoModerationTriggerTypes = {}));
var AutoModerationKeywordPresetTypes;
(function (AutoModerationKeywordPresetTypes) {
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["PROFANITY"] = 1] = "PROFANITY";
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["SEXUAL_CONTENT"] = 2] = "SEXUAL_CONTENT";
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["SLURS"] = 3] = "SLURS";
})(AutoModerationKeywordPresetTypes || (exports.AutoModerationKeywordPresetTypes = AutoModerationKeywordPresetTypes = {}));
var AutoModerationActionTypes;
(function (AutoModerationActionTypes) {
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MESSAGE"] = 1] = "BLOCK_MESSAGE";
    AutoModerationActionTypes[AutoModerationActionTypes["SEND_ALERT_MESSAGE"] = 2] = "SEND_ALERT_MESSAGE";
    AutoModerationActionTypes[AutoModerationActionTypes["TIMEOUT"] = 3] = "TIMEOUT";
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MEMBER_INTERACTION"] = 4] = "BLOCK_MEMBER_INTERACTION";
})(AutoModerationActionTypes || (exports.AutoModerationActionTypes = AutoModerationActionTypes = {}));
var AuditLogActionTypes;
(function (AuditLogActionTypes) {
    AuditLogActionTypes[AuditLogActionTypes["GUILD_UPDATE"] = 1] = "GUILD_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_CREATE"] = 10] = "CHANNEL_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_UPDATE"] = 11] = "CHANNEL_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_DELETE"] = 12] = "CHANNEL_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_CREATE"] = 13] = "CHANNEL_OVERWRITE_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_UPDATE"] = 14] = "CHANNEL_OVERWRITE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_DELETE"] = 15] = "CHANNEL_OVERWRITE_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_KICK"] = 20] = "MEMBER_KICK";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_PRUNE"] = 21] = "MEMBER_PRUNE";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_BAN_ADD"] = 22] = "MEMBER_BAN_ADD";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_BAN_REMOVE"] = 23] = "MEMBER_BAN_REMOVE";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_UPDATE"] = 24] = "MEMBER_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_ROLE_UPDATE"] = 25] = "MEMBER_ROLE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_MOVE"] = 26] = "MEMBER_MOVE";
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_DISCONNECT"] = 27] = "MEMBER_DISCONNECT";
    AuditLogActionTypes[AuditLogActionTypes["BOT_ADD"] = 28] = "BOT_ADD";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_CREATE"] = 30] = "ROLE_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_UPDATE"] = 31] = "ROLE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_DELETE"] = 32] = "ROLE_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["INVITE_CREATE"] = 40] = "INVITE_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["INVITE_UPDATE"] = 41] = "INVITE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["INVITE_DELETE"] = 42] = "INVITE_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_CREATE"] = 50] = "WEBHOOK_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_UPDATE"] = 51] = "WEBHOOK_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_DELETE"] = 52] = "WEBHOOK_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_CREATE"] = 60] = "EMOJI_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_UPDATE"] = 61] = "EMOJI_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_DELETE"] = 62] = "EMOJI_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_DELETE"] = 72] = "MESSAGE_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_BULK_DELETE"] = 73] = "MESSAGE_BULK_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_PIN"] = 74] = "MESSAGE_PIN";
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_UNPIN"] = 75] = "MESSAGE_UNPIN";
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_CREATE"] = 80] = "INTEGRATION_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_UPDATE"] = 81] = "INTEGRATION_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_DELETE"] = 82] = "INTEGRATION_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_CREATE"] = 83] = "STAGE_INSTANCE_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_UPDATE"] = 84] = "STAGE_INSTANCE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_DELETE"] = 85] = "STAGE_INSTANCE_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["STICKER_CREATE"] = 90] = "STICKER_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["STICKER_UPDATE"] = 91] = "STICKER_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["STICKER_DELETE"] = 92] = "STICKER_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_CREATE"] = 100] = "GUILD_SCHEDULED_EVENT_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_UPDATE"] = 101] = "GUILD_SCHEDULED_EVENT_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_DELETE"] = 102] = "GUILD_SCHEDULED_EVENT_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["THREAD_CREATE"] = 110] = "THREAD_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["THREAD_UPDATE"] = 111] = "THREAD_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["THREAD_DELETE"] = 112] = "THREAD_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["APPLICATION_COMMAND_PERMISSION_UPDATE"] = 121] = "APPLICATION_COMMAND_PERMISSION_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_CREATE"] = 130] = "SOUNDBOARD_SOUND_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_UPDATE"] = 131] = "SOUNDBOARD_SOUND_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_DELETE"] = 132] = "SOUNDBOARD_SOUND_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_CREATE"] = 140] = "AUTO_MODERATION_RULE_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_UPDATE"] = 141] = "AUTO_MODERATION_RULE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_DELETE"] = 142] = "AUTO_MODERATION_RULE_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_BLOCK_MESSAGE"] = 143] = "AUTO_MODERATION_BLOCK_MESSAGE";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_FLAG_TO_CHANNEL"] = 144] = "AUTO_MODERATION_FLAG_TO_CHANNEL";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_USER_COMMUNICATION_DISABLED"] = 145] = "AUTO_MODERATION_USER_COMMUNICATION_DISABLED";
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_QUARANTINE_USER"] = 146] = "AUTO_MODERATION_QUARANTINE_USER";
    AuditLogActionTypes[AuditLogActionTypes["CREATOR_MONETIZATION_REQUEST_CREATED"] = 150] = "CREATOR_MONETIZATION_REQUEST_CREATED";
    AuditLogActionTypes[AuditLogActionTypes["CREATOR_MONETIZATION_TERMS_ACCEPTED"] = 151] = "CREATOR_MONETIZATION_TERMS_ACCEPTED";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_CREATE"] = 160] = "ROLE_PROMPT_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_UPDATE"] = 161] = "ROLE_PROMPT_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_DELETE"] = 162] = "ROLE_PROMPT_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_CREATE"] = 163] = "ONBOARDING_PROMPT_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_UPDATE"] = 164] = "ONBOARDING_PROMPT_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_DELETE"] = 165] = "ONBOARDING_PROMPT_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_CREATE"] = 166] = "ONBOARDING_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_UPDATE"] = 167] = "ONBOARDING_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_HOME_FEATURE_ITEM"] = 171] = "GUILD_HOME_FEATURE_ITEM";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_HOME_REMOVE_ITEM"] = 172] = "GUILD_HOME_REMOVE_ITEM";
    /** @deprecated */
    AuditLogActionTypes[AuditLogActionTypes["HARMFUL_LINKS_BLOCKED_MESSAGE"] = 180] = "HARMFUL_LINKS_BLOCKED_MESSAGE";
    AuditLogActionTypes[AuditLogActionTypes["HOME_SETTINGS_CREATE"] = 190] = "HOME_SETTINGS_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["HOME_SETTINGS_UPDATE"] = 191] = "HOME_SETTINGS_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["VOICE_CHANNEL_STATUS_CREATE"] = 192] = "VOICE_CHANNEL_STATUS_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["VOICE_CHANNEL_STATUS_DELETE"] = 193] = "VOICE_CHANNEL_STATUS_DELETE";
    /** @deprecated */
    AuditLogActionTypes[AuditLogActionTypes["CLYDE_AI_PROFILE_UPDATE"] = 194] = "CLYDE_AI_PROFILE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE"] = 200] = "GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE"] = 201] = "GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE"] = 202] = "GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_MEMBER_VERIFICATION_UPDATE"] = 210] = "GUILD_MEMBER_VERIFICATION_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["GUILD_PROFILE_UPDATE"] = 211] = "GUILD_PROFILE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["PIN_PERMISSION_MIGRATION_COMPLETE"] = 212] = "PIN_PERMISSION_MIGRATION_COMPLETE";
    AuditLogActionTypes[AuditLogActionTypes["BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM"] = 213] = "BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM";
})(AuditLogActionTypes || (exports.AuditLogActionTypes = AuditLogActionTypes = {}));
var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    ApplicationCommandTypes[ApplicationCommandTypes["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    ApplicationCommandTypes[ApplicationCommandTypes["USER"] = 2] = "USER";
    ApplicationCommandTypes[ApplicationCommandTypes["MESSAGE"] = 3] = "MESSAGE";
    ApplicationCommandTypes[ApplicationCommandTypes["PRIMARY_ENTRY_POINT"] = 4] = "PRIMARY_ENTRY_POINT";
})(ApplicationCommandTypes || (exports.ApplicationCommandTypes = ApplicationCommandTypes = {}));
var ApplicationCommandOptionTypes;
(function (ApplicationCommandOptionTypes) {
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["STRING"] = 3] = "STRING";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["USER"] = 6] = "USER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ROLE"] = 8] = "ROLE";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["MENTIONABLE"] = 9] = "MENTIONABLE";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["NUMBER"] = 10] = "NUMBER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionTypes || (exports.ApplicationCommandOptionTypes = ApplicationCommandOptionTypes = {}));
var ApplicationCommandPermissionTypes;
(function (ApplicationCommandPermissionTypes) {
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["ROLE"] = 1] = "ROLE";
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["USER"] = 2] = "USER";
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionTypes || (exports.ApplicationCommandPermissionTypes = ApplicationCommandPermissionTypes = {}));
var InteractionResponseTypes;
(function (InteractionResponseTypes) {
    InteractionResponseTypes[InteractionResponseTypes["PONG"] = 1] = "PONG";
    InteractionResponseTypes[InteractionResponseTypes["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    InteractionResponseTypes[InteractionResponseTypes["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    InteractionResponseTypes[InteractionResponseTypes["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    InteractionResponseTypes[InteractionResponseTypes["MODAL"] = 9] = "MODAL";
    /** @deprecated */
    InteractionResponseTypes[InteractionResponseTypes["PREMIUM_REQUIRED"] = 10] = "PREMIUM_REQUIRED";
    InteractionResponseTypes[InteractionResponseTypes["LAUNCH_ACTIVITY"] = 12] = "LAUNCH_ACTIVITY";
})(InteractionResponseTypes || (exports.InteractionResponseTypes = InteractionResponseTypes = {}));
var EntryPointCommandHandlerTypes;
(function (EntryPointCommandHandlerTypes) {
    EntryPointCommandHandlerTypes[EntryPointCommandHandlerTypes["APP_HANDLER"] = 1] = "APP_HANDLER";
    EntryPointCommandHandlerTypes[EntryPointCommandHandlerTypes["DISCORD_LAUNCH_ACTIVITY"] = 2] = "DISCORD_LAUNCH_ACTIVITY";
})(EntryPointCommandHandlerTypes || (exports.EntryPointCommandHandlerTypes = EntryPointCommandHandlerTypes = {}));
var Intents;
(function (Intents) {
    Intents[Intents["GUILDS"] = 1] = "GUILDS";
    Intents[Intents["GUILD_MEMBERS"] = 2] = "GUILD_MEMBERS";
    Intents[Intents["GUILD_MODERATION"] = 4] = "GUILD_MODERATION";
    /** @deprecated */
    Intents[Intents["GUILD_EMOJIS_AND_STICKERS"] = 8] = "GUILD_EMOJIS_AND_STICKERS";
    Intents[Intents["GUILD_EXPRESSIONS"] = 8] = "GUILD_EXPRESSIONS";
    Intents[Intents["GUILD_INTEGRATIONS"] = 16] = "GUILD_INTEGRATIONS";
    Intents[Intents["GUILD_WEBHOOKS"] = 32] = "GUILD_WEBHOOKS";
    Intents[Intents["GUILD_INVITES"] = 64] = "GUILD_INVITES";
    Intents[Intents["GUILD_VOICE_STATES"] = 128] = "GUILD_VOICE_STATES";
    Intents[Intents["GUILD_PRESENCES"] = 256] = "GUILD_PRESENCES";
    Intents[Intents["GUILD_MESSAGES"] = 512] = "GUILD_MESSAGES";
    Intents[Intents["GUILD_MESSAGE_REACTIONS"] = 1024] = "GUILD_MESSAGE_REACTIONS";
    Intents[Intents["GUILD_MESSAGE_TYPING"] = 2048] = "GUILD_MESSAGE_TYPING";
    Intents[Intents["DIRECT_MESSAGES"] = 4096] = "DIRECT_MESSAGES";
    Intents[Intents["DIRECT_MESSAGE_REACTIONS"] = 8192] = "DIRECT_MESSAGE_REACTIONS";
    Intents[Intents["DIRECT_MESSAGE_TYPING"] = 16384] = "DIRECT_MESSAGE_TYPING";
    Intents[Intents["MESSAGE_CONTENT"] = 32768] = "MESSAGE_CONTENT";
    Intents[Intents["GUILD_SCHEDULED_EVENTS"] = 65536] = "GUILD_SCHEDULED_EVENTS";
    Intents[Intents["AUTO_MODERATION_CONFIGURATION"] = 1048576] = "AUTO_MODERATION_CONFIGURATION";
    Intents[Intents["AUTO_MODERATION_EXECUTION"] = 2097152] = "AUTO_MODERATION_EXECUTION";
    Intents[Intents["GUILD_MESSAGE_POLLS"] = 16777216] = "GUILD_MESSAGE_POLLS";
    Intents[Intents["DIRECT_MESSAGE_POLLS"] = 33554432] = "DIRECT_MESSAGE_POLLS";
})(Intents || (exports.Intents = Intents = {}));
// TODO: find a way to make the above not manual, if possible
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
    Intents.DIRECT_MESSAGE_POLLS
];
exports.AllNonPrivilegedIntents = exports.NonPrivilegedIntents.reduce((all, p) => all | p, 0);
exports.PrivilegedIntents = [
    Intents.GUILD_MEMBERS,
    Intents.GUILD_PRESENCES,
    Intents.MESSAGE_CONTENT
];
exports.AllPrivilegedIntents = exports.PrivilegedIntents.reduce((all, p) => all | p, 0);
exports.AllIntents = exports.AllNonPrivilegedIntents | exports.AllPrivilegedIntents;
exports.PrivilegedIntentMapping = [
    [Intents.GUILD_PRESENCES, [ApplicationFlags.GATEWAY_PRESENCE, ApplicationFlags.GATEWAY_PRESENCE_LIMITED]],
    [Intents.GUILD_MEMBERS, [ApplicationFlags.GATEWAY_GUILD_MEMBERS, ApplicationFlags.GATEWAY_GUILD_MEMBERS_LIMITED]],
    [Intents.MESSAGE_CONTENT, [ApplicationFlags.GATEWAY_MESSAGE_CONTENT, ApplicationFlags.GATEWAY_MESSAGE_CONTENT_LIMITED]]
];
var GatewayOPCodes;
(function (GatewayOPCodes) {
    GatewayOPCodes[GatewayOPCodes["DISPATCH"] = 0] = "DISPATCH";
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT"] = 1] = "HEARTBEAT";
    GatewayOPCodes[GatewayOPCodes["IDENTIFY"] = 2] = "IDENTIFY";
    GatewayOPCodes[GatewayOPCodes["PRESENCE_UPDATE"] = 3] = "PRESENCE_UPDATE";
    GatewayOPCodes[GatewayOPCodes["VOICE_STATE_UPDATE"] = 4] = "VOICE_STATE_UPDATE";
    GatewayOPCodes[GatewayOPCodes["RESUME"] = 6] = "RESUME";
    GatewayOPCodes[GatewayOPCodes["RECONNECT"] = 7] = "RECONNECT";
    GatewayOPCodes[GatewayOPCodes["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    GatewayOPCodes[GatewayOPCodes["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    GatewayOPCodes[GatewayOPCodes["HELLO"] = 10] = "HELLO";
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
    GatewayOPCodes[GatewayOPCodes["REQUEST_SOUNDBOARD_SOUNDS"] = 31] = "REQUEST_SOUNDBOARD_SOUNDS";
})(GatewayOPCodes || (exports.GatewayOPCodes = GatewayOPCodes = {}));
var GatewayCloseCodes;
(function (GatewayCloseCodes) {
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_ERROR"] = 4000] = "UNKNOWN_ERROR";
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    GatewayCloseCodes[GatewayCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    GatewayCloseCodes[GatewayCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    GatewayCloseCodes[GatewayCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    GatewayCloseCodes[GatewayCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SEQUENCE"] = 4007] = "INVALID_SEQUENCE";
    GatewayCloseCodes[GatewayCloseCodes["RATE_LIMITED"] = 4008] = "RATE_LIMITED";
    GatewayCloseCodes[GatewayCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SHARD"] = 4010] = "INVALID_SHARD";
    GatewayCloseCodes[GatewayCloseCodes["SHARDING_REQUIRED"] = 4011] = "SHARDING_REQUIRED";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_API_VERSION"] = 4012] = "INVALID_API_VERSION";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_INTENTS"] = 4013] = "INVALID_INTENTS";
    GatewayCloseCodes[GatewayCloseCodes["DISALLOWED_INTENTS"] = 4014] = "DISALLOWED_INTENTS";
})(GatewayCloseCodes || (exports.GatewayCloseCodes = GatewayCloseCodes = {}));
var VoiceOPCodes;
(function (VoiceOPCodes) {
    VoiceOPCodes[VoiceOPCodes["IDENTIFY"] = 0] = "IDENTIFY";
    VoiceOPCodes[VoiceOPCodes["SELECT_PROTOCOL"] = 1] = "SELECT_PROTOCOL";
    VoiceOPCodes[VoiceOPCodes["READY"] = 2] = "READY";
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT"] = 3] = "HEARTBEAT";
    VoiceOPCodes[VoiceOPCodes["SESSION_DESCRIPTION"] = 4] = "SESSION_DESCRIPTION";
    VoiceOPCodes[VoiceOPCodes["SPEAKING"] = 5] = "SPEAKING";
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT_ACK"] = 6] = "HEARTBEAT_ACK";
    VoiceOPCodes[VoiceOPCodes["RESUME"] = 7] = "RESUME";
    VoiceOPCodes[VoiceOPCodes["HELLO"] = 8] = "HELLO";
    VoiceOPCodes[VoiceOPCodes["RESUMED"] = 9] = "RESUMED";
    VoiceOPCodes[VoiceOPCodes["CLIENTS_CONNECT"] = 11] = "CLIENTS_CONNECT";
    VoiceOPCodes[VoiceOPCodes["CLIENT_DISCONNECT"] = 13] = "CLIENT_DISCONNECT";
})(VoiceOPCodes || (exports.VoiceOPCodes = VoiceOPCodes = {}));
var VoiceCloseCodes;
(function (VoiceCloseCodes) {
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    VoiceCloseCodes[VoiceCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    VoiceCloseCodes[VoiceCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    VoiceCloseCodes[VoiceCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    VoiceCloseCodes[VoiceCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    VoiceCloseCodes[VoiceCloseCodes["INVALID_SESSION"] = 4006] = "INVALID_SESSION";
    VoiceCloseCodes[VoiceCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    VoiceCloseCodes[VoiceCloseCodes["SERVER_NOT_FOUND"] = 4011] = "SERVER_NOT_FOUND";
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_PROTOCOL"] = 4012] = "UNKNOWN_PROTOCOL";
    VoiceCloseCodes[VoiceCloseCodes["DISCONNECTED"] = 4013] = "DISCONNECTED";
    VoiceCloseCodes[VoiceCloseCodes["VOICE_SERVER_CRASHED"] = 4014] = "VOICE_SERVER_CRASHED";
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_ENCRYPTION_MODE"] = 4015] = "UNKNOWN_ENCRYPTION_MODE";
})(VoiceCloseCodes || (exports.VoiceCloseCodes = VoiceCloseCodes = {}));
var HubTypes;
(function (HubTypes) {
    HubTypes[HubTypes["DEFAULT"] = 0] = "DEFAULT";
    HubTypes[HubTypes["HIGH_SCHOOL"] = 1] = "HIGH_SCHOOL";
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
    ActivityFlags[ActivityFlags["INSTANCE"] = 1] = "INSTANCE";
    ActivityFlags[ActivityFlags["JOIN"] = 2] = "JOIN";
    ActivityFlags[ActivityFlags["SPECTATE"] = 4] = "SPECTATE";
    ActivityFlags[ActivityFlags["JOIN_REQUEST"] = 8] = "JOIN_REQUEST";
    ActivityFlags[ActivityFlags["SYNC"] = 16] = "SYNC";
    ActivityFlags[ActivityFlags["PLAY"] = 32] = "PLAY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_FRIENDS_ONLY"] = 64] = "PARTY_PRIVACY_FRIENDS_ONLY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_VOICE_CHANNEL"] = 128] = "PARTY_PRIVACY_VOICE_CHANNEL";
    ActivityFlags[ActivityFlags["EMBEDDED"] = 256] = "EMBEDDED";
})(ActivityFlags || (exports.ActivityFlags = ActivityFlags = {}));
var ThreadMemberFlags;
(function (ThreadMemberFlags) {
    ThreadMemberFlags[ThreadMemberFlags["HAS_INTERACTED"] = 1] = "HAS_INTERACTED";
    ThreadMemberFlags[ThreadMemberFlags["ALL_MESSAGES"] = 2] = "ALL_MESSAGES";
    ThreadMemberFlags[ThreadMemberFlags["ONLY_MENTIONS"] = 4] = "ONLY_MENTIONS";
    ThreadMemberFlags[ThreadMemberFlags["NO_MESSAGES"] = 8] = "NO_MESSAGES";
})(ThreadMemberFlags || (exports.ThreadMemberFlags = ThreadMemberFlags = {}));
var RoleConnectionMetadataTypes;
(function (RoleConnectionMetadataTypes) {
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_LESS_THAN_OR_EQUAL"] = 1] = "INTEGER_LESS_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_GREATER_THAN_OR_EQUAL"] = 2] = "INTEGER_GREATER_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_EQUAL"] = 3] = "INTEGER_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_NOT_EQUAL"] = 4] = "INTEGER_NOT_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_LESS_THAN_OR_EQUAL"] = 5] = "DATETIME_LESS_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_GREATER_THAN_OR_EQUAL"] = 6] = "DATETIME_GREATER_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_EQUAL"] = 7] = "BOOLEAN_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_NOT_EQUAL"] = 8] = "BOOLEAN_NOT_EQUAL";
})(RoleConnectionMetadataTypes || (exports.RoleConnectionMetadataTypes = RoleConnectionMetadataTypes = {}));
var GuildMemberFlags;
(function (GuildMemberFlags) {
    GuildMemberFlags[GuildMemberFlags["DID_REJOIN"] = 1] = "DID_REJOIN";
    GuildMemberFlags[GuildMemberFlags["COMPLETED_ONBOARDING"] = 2] = "COMPLETED_ONBOARDING";
    GuildMemberFlags[GuildMemberFlags["BYPASSES_VERIFICATION"] = 4] = "BYPASSES_VERIFICATION";
    GuildMemberFlags[GuildMemberFlags["STARTED_ONBOARDING"] = 8] = "STARTED_ONBOARDING";
    GuildMemberFlags[GuildMemberFlags["IS_GUEST"] = 16] = "IS_GUEST";
    GuildMemberFlags[GuildMemberFlags["STARTED_HOME_ACTIONS"] = 32] = "STARTED_HOME_ACTIONS";
    GuildMemberFlags[GuildMemberFlags["COMPLETED_HOME_ACTIONS"] = 64] = "COMPLETED_HOME_ACTIONS";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME"] = 128] = "AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_BIO"] = 256] = "AUTOMOD_QUARANTINED_BIO";
    GuildMemberFlags[GuildMemberFlags["DM_SETTINGS_UPSELL_ACKNOWLEDGED"] = 512] = "DM_SETTINGS_UPSELL_ACKNOWLEDGED";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_CLAN_TAG"] = 1024] = "AUTOMOD_QUARANTINED_CLAN_TAG";
})(GuildMemberFlags || (exports.GuildMemberFlags = GuildMemberFlags = {}));
var OnboardingPromptTypes;
(function (OnboardingPromptTypes) {
    OnboardingPromptTypes[OnboardingPromptTypes["MULTIPLE_CHOICE"] = 0] = "MULTIPLE_CHOICE";
    OnboardingPromptTypes[OnboardingPromptTypes["DROPDOWN"] = 1] = "DROPDOWN";
})(OnboardingPromptTypes || (exports.OnboardingPromptTypes = OnboardingPromptTypes = {}));
var AnimationTypes;
(function (AnimationTypes) {
    AnimationTypes[AnimationTypes["PREMIUM"] = 0] = "PREMIUM";
    AnimationTypes[AnimationTypes["BASIC"] = 1] = "BASIC";
})(AnimationTypes || (exports.AnimationTypes = AnimationTypes = {}));
var OnboardingModes;
(function (OnboardingModes) {
    OnboardingModes[OnboardingModes["DEFAULT"] = 0] = "DEFAULT";
    OnboardingModes[OnboardingModes["ADVANCED"] = 1] = "ADVANCED";
})(OnboardingModes || (exports.OnboardingModes = OnboardingModes = {}));
var InviteFlags;
(function (InviteFlags) {
    /** @deprecated Use `IS_GUEST_INVITE`. This will be removed in `1.15.0`. */
    InviteFlags[InviteFlags["GUEST"] = 1] = "GUEST";
    InviteFlags[InviteFlags["IS_GUEST_INVITE"] = 1] = "IS_GUEST_INVITE";
})(InviteFlags || (exports.InviteFlags = InviteFlags = {}));
var ReactionType;
(function (ReactionType) {
    ReactionType[ReactionType["NORMAL"] = 0] = "NORMAL";
    ReactionType[ReactionType["SUPER"] = 1] = "SUPER";
})(ReactionType || (exports.ReactionType = ReactionType = {}));
var AttachmentFlags;
(function (AttachmentFlags) {
    AttachmentFlags[AttachmentFlags["IS_CLIP"] = 1] = "IS_CLIP";
    AttachmentFlags[AttachmentFlags["IS_THUMBNAIL"] = 2] = "IS_THUMBNAIL";
    AttachmentFlags[AttachmentFlags["IS_REMIX"] = 4] = "IS_REMIX";
    AttachmentFlags[AttachmentFlags["IS_SPOILER"] = 8] = "IS_SPOILER";
    AttachmentFlags[AttachmentFlags["CONTAINS_EXPLICIT_MEDIA"] = 16] = "CONTAINS_EXPLICIT_MEDIA";
    AttachmentFlags[AttachmentFlags["IS_ANIMATED"] = 32] = "IS_ANIMATED";
})(AttachmentFlags || (exports.AttachmentFlags = AttachmentFlags = {}));
var SKUTypes;
(function (SKUTypes) {
    SKUTypes[SKUTypes["DURABLE_PRIMARY"] = 1] = "DURABLE_PRIMARY";
    SKUTypes[SKUTypes["DURABLE"] = 2] = "DURABLE";
    SKUTypes[SKUTypes["CONSUMABLE"] = 3] = "CONSUMABLE";
    SKUTypes[SKUTypes["BUNDLE"] = 4] = "BUNDLE";
    SKUTypes[SKUTypes["SUBSCRIPTION"] = 5] = "SUBSCRIPTION";
    SKUTypes[SKUTypes["SUBSCRIPTION_GROUP"] = 6] = "SUBSCRIPTION_GROUP";
})(SKUTypes || (exports.SKUTypes = SKUTypes = {}));
var SKUFlags;
(function (SKUFlags) {
    SKUFlags[SKUFlags["PREMIUM_PURCHASE"] = 1] = "PREMIUM_PURCHASE";
    SKUFlags[SKUFlags["HAS_FREE_PREMIUM_CONTENT"] = 2] = "HAS_FREE_PREMIUM_CONTENT";
    SKUFlags[SKUFlags["AVAILABLE"] = 4] = "AVAILABLE";
    SKUFlags[SKUFlags["PREMIUM_AND_DISTRIBUTION"] = 8] = "PREMIUM_AND_DISTRIBUTION";
    SKUFlags[SKUFlags["STICKER_PACK"] = 16] = "STICKER_PACK";
    SKUFlags[SKUFlags["GUILD_ROLE"] = 32] = "GUILD_ROLE";
    SKUFlags[SKUFlags["AVAILABLE_FOR_SUBSCRIPTION_GIFTING"] = 64] = "AVAILABLE_FOR_SUBSCRIPTION_GIFTING";
    SKUFlags[SKUFlags["APPLICATION_GUILD_SUBSCRIPTION"] = 128] = "APPLICATION_GUILD_SUBSCRIPTION";
    SKUFlags[SKUFlags["GUILD_SUBSCRIPTION"] = 128] = "GUILD_SUBSCRIPTION";
    SKUFlags[SKUFlags["APPLICATION_USER_SUBSCRIPTION"] = 256] = "APPLICATION_USER_SUBSCRIPTION";
    SKUFlags[SKUFlags["USER_SUBSCRIPTION"] = 256] = "USER_SUBSCRIPTION";
})(SKUFlags || (exports.SKUFlags = SKUFlags = {}));
var EntitlementTypes;
(function (EntitlementTypes) {
    EntitlementTypes[EntitlementTypes["PURCHASE"] = 1] = "PURCHASE";
    EntitlementTypes[EntitlementTypes["PREMIUM_SUBSCRIPTION"] = 2] = "PREMIUM_SUBSCRIPTION";
    EntitlementTypes[EntitlementTypes["DEVELOPER_GIFT"] = 3] = "DEVELOPER_GIFT";
    EntitlementTypes[EntitlementTypes["TEST_MODE_PURCHASE"] = 4] = "TEST_MODE_PURCHASE";
    EntitlementTypes[EntitlementTypes["FREE_PURCHASE"] = 5] = "FREE_PURCHASE";
    EntitlementTypes[EntitlementTypes["USER_GIFT"] = 6] = "USER_GIFT";
    EntitlementTypes[EntitlementTypes["PREMIUM_PURCHASE"] = 7] = "PREMIUM_PURCHASE";
    EntitlementTypes[EntitlementTypes["APPLICATION_SUBSCRIPTION"] = 8] = "APPLICATION_SUBSCRIPTION";
})(EntitlementTypes || (exports.EntitlementTypes = EntitlementTypes = {}));
var EntitlementOwnerTypes;
(function (EntitlementOwnerTypes) {
    EntitlementOwnerTypes[EntitlementOwnerTypes["GUILD"] = 1] = "GUILD";
    EntitlementOwnerTypes[EntitlementOwnerTypes["USER"] = 2] = "USER";
})(EntitlementOwnerTypes || (exports.EntitlementOwnerTypes = EntitlementOwnerTypes = {}));
var SKUAccessTypes;
(function (SKUAccessTypes) {
    SKUAccessTypes[SKUAccessTypes["PUBLIC"] = 1] = "PUBLIC";
})(SKUAccessTypes || (exports.SKUAccessTypes = SKUAccessTypes = {}));
var SubscriptionStatuses;
(function (SubscriptionStatuses) {
    SubscriptionStatuses[SubscriptionStatuses["ACTIVE"] = 0] = "ACTIVE";
    SubscriptionStatuses[SubscriptionStatuses["ENDING"] = 1] = "ENDING";
    SubscriptionStatuses[SubscriptionStatuses["INACTIVE"] = 2] = "INACTIVE";
})(SubscriptionStatuses || (exports.SubscriptionStatuses = SubscriptionStatuses = {}));
var PollLayoutType;
(function (PollLayoutType) {
    PollLayoutType[PollLayoutType["DEFAULT"] = 1] = "DEFAULT";
})(PollLayoutType || (exports.PollLayoutType = PollLayoutType = {}));
var ApplicationMonetizationState;
(function (ApplicationMonetizationState) {
    ApplicationMonetizationState[ApplicationMonetizationState["NONE"] = 1] = "NONE";
    ApplicationMonetizationState[ApplicationMonetizationState["ENABLED"] = 2] = "ENABLED";
    ApplicationMonetizationState[ApplicationMonetizationState["BLOCKED"] = 3] = "BLOCKED";
})(ApplicationMonetizationState || (exports.ApplicationMonetizationState = ApplicationMonetizationState = {}));
var ApplicationDiscoverabilityState;
(function (ApplicationDiscoverabilityState) {
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["INELIGIBLE"] = 1] = "INELIGIBLE";
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["NOT_DISCOVERABLE"] = 2] = "NOT_DISCOVERABLE";
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["DISCOVERABLE"] = 3] = "DISCOVERABLE";
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["FEATURABLE"] = 4] = "FEATURABLE";
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["BLOCKED"] = 5] = "BLOCKED";
})(ApplicationDiscoverabilityState || (exports.ApplicationDiscoverabilityState = ApplicationDiscoverabilityState = {}));
var ApplicationDiscoveryEligibilityFlags;
(function (ApplicationDiscoveryEligibilityFlags) {
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["VERIFIED"] = 1] = "VERIFIED";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["TAG"] = 2] = "TAG";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["DESCRIPTION"] = 4] = "DESCRIPTION";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["TERMS_OF_SERVICE"] = 8] = "TERMS_OF_SERVICE";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["PRIVACY_POLICY"] = 16] = "PRIVACY_POLICY";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["INSTALL_PARAMS"] = 32] = "INSTALL_PARAMS";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_NAME"] = 64] = "SAFE_NAME";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_DESCRIPTION"] = 128] = "SAFE_DESCRIPTION";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["APPROVED_COMMANDS"] = 256] = "APPROVED_COMMANDS";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SUPPORT_GUILD"] = 512] = "SUPPORT_GUILD";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_COMMANDS"] = 1024] = "SAFE_COMMANDS";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["MFA"] = 2048] = "MFA";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_DIRECTORY_OVERVIEW"] = 4096] = "SAFE_DIRECTORY_OVERVIEW";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SUPPORTED_LOCALES"] = 8192] = "SUPPORTED_LOCALES";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_SHORT_DESCRIPTION"] = 16384] = "SAFE_SHORT_DESCRIPTION";
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_ROLE_CONNECTIONS"] = 32768] = "SAFE_ROLE_CONNECTIONS";
})(ApplicationDiscoveryEligibilityFlags || (exports.ApplicationDiscoveryEligibilityFlags = ApplicationDiscoveryEligibilityFlags = {}));
var ApplicationExplicitContentFilterLevel;
(function (ApplicationExplicitContentFilterLevel) {
    ApplicationExplicitContentFilterLevel[ApplicationExplicitContentFilterLevel["DISABLED"] = 0] = "DISABLED";
    ApplicationExplicitContentFilterLevel[ApplicationExplicitContentFilterLevel["ENABLED"] = 1] = "ENABLED";
})(ApplicationExplicitContentFilterLevel || (exports.ApplicationExplicitContentFilterLevel = ApplicationExplicitContentFilterLevel = {}));
var ApplicationInteractionsVersion;
(function (ApplicationInteractionsVersion) {
    ApplicationInteractionsVersion[ApplicationInteractionsVersion["VERSION_1"] = 1] = "VERSION_1";
    ApplicationInteractionsVersion[ApplicationInteractionsVersion["VERSION_2"] = 2] = "VERSION_2";
})(ApplicationInteractionsVersion || (exports.ApplicationInteractionsVersion = ApplicationInteractionsVersion = {}));
var ApplicationMonetizationEligibilityFlags;
(function (ApplicationMonetizationEligibilityFlags) {
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["VERIFIED"] = 1] = "VERIFIED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["HAS_TEAM"] = 2] = "HAS_TEAM";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["APPROVED_COMMANDS"] = 4] = "APPROVED_COMMANDS";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TERMS_OF_SERVICE"] = 8] = "TERMS_OF_SERVICE";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["PRIVACY_POLICY"] = 16] = "PRIVACY_POLICY";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_NAME"] = 32] = "SAFE_NAME";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_DESCRIPTION"] = 64] = "SAFE_DESCRIPTION";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_ROLE_CONNECTIONS"] = 128] = "SAFE_ROLE_CONNECTIONS";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["NOT_QUARANTINED"] = 512] = "NOT_QUARANTINED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_LOCALE_SUPPORTED"] = 1024] = "USER_LOCALE_SUPPORTED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_AGE_SUPPORTED"] = 2048] = "USER_AGE_SUPPORTED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_DATE_OF_BIRTH_DEFINED"] = 4096] = "USER_DATE_OF_BIRTH_DEFINED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_MFA_ENABLED"] = 8192] = "USER_MFA_ENABLED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_EMAIL_VERIFIED"] = 16384] = "USER_EMAIL_VERIFIED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TEAM_MEMBERS_EMAIL_VERIFIED"] = 32768] = "TEAM_MEMBERS_EMAIL_VERIFIED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TEAM_MEMBERS_MFA_ENABLED"] = 65536] = "TEAM_MEMBERS_MFA_ENABLED";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["NO_BLOCKING_ISSUES"] = 131072] = "NO_BLOCKING_ISSUES";
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["VALID_PAYOUT_STATUS"] = 262144] = "VALID_PAYOUT_STATUS";
})(ApplicationMonetizationEligibilityFlags || (exports.ApplicationMonetizationEligibilityFlags = ApplicationMonetizationEligibilityFlags = {}));
var RPCApplicationState;
(function (RPCApplicationState) {
    RPCApplicationState[RPCApplicationState["DISABLED"] = 0] = "DISABLED";
    RPCApplicationState[RPCApplicationState["UNSUBMITTED"] = 1] = "UNSUBMITTED";
    RPCApplicationState[RPCApplicationState["SUBMITTED"] = 2] = "SUBMITTED";
    RPCApplicationState[RPCApplicationState["APPROVED"] = 3] = "APPROVED";
    RPCApplicationState[RPCApplicationState["REJECTED"] = 4] = "REJECTED";
})(RPCApplicationState || (exports.RPCApplicationState = RPCApplicationState = {}));
var StoreApplicationState;
(function (StoreApplicationState) {
    StoreApplicationState[StoreApplicationState["NONE"] = 1] = "NONE";
    StoreApplicationState[StoreApplicationState["PAID"] = 2] = "PAID";
    StoreApplicationState[StoreApplicationState["SUBMITTED"] = 3] = "SUBMITTED";
    StoreApplicationState[StoreApplicationState["APPROVED"] = 4] = "APPROVED";
    StoreApplicationState[StoreApplicationState["REJECTED"] = 5] = "REJECTED";
})(StoreApplicationState || (exports.StoreApplicationState = StoreApplicationState = {}));
var ApplicationVerificationState;
(function (ApplicationVerificationState) {
    ApplicationVerificationState[ApplicationVerificationState["INELIGIBLE"] = 1] = "INELIGIBLE";
    ApplicationVerificationState[ApplicationVerificationState["UNSUBMITTED"] = 2] = "UNSUBMITTED";
    ApplicationVerificationState[ApplicationVerificationState["SUBMITTED"] = 3] = "SUBMITTED";
    ApplicationVerificationState[ApplicationVerificationState["SUCCEEDED"] = 4] = "SUCCEEDED";
})(ApplicationVerificationState || (exports.ApplicationVerificationState = ApplicationVerificationState = {}));
var RoleFlags;
(function (RoleFlags) {
    RoleFlags[RoleFlags["IN_PROMPT"] = 1] = "IN_PROMPT";
})(RoleFlags || (exports.RoleFlags = RoleFlags = {}));
var MemberSearchSortType;
(function (MemberSearchSortType) {
    MemberSearchSortType[MemberSearchSortType["JOINED_AT_DESC"] = 1] = "JOINED_AT_DESC";
    MemberSearchSortType[MemberSearchSortType["JOINED_AT_ASC"] = 2] = "JOINED_AT_ASC";
    MemberSearchSortType[MemberSearchSortType["USER_ID_DESC"] = 3] = "USER_ID_DESC";
    MemberSearchSortType[MemberSearchSortType["USER_ID_ASC"] = 1] = "USER_ID_ASC";
})(MemberSearchSortType || (exports.MemberSearchSortType = MemberSearchSortType = {}));
var MemberJoinSourceType;
(function (MemberJoinSourceType) {
    MemberJoinSourceType[MemberJoinSourceType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    MemberJoinSourceType[MemberJoinSourceType["BOT"] = 1] = "BOT";
    MemberJoinSourceType[MemberJoinSourceType["INTEGRATION"] = 2] = "INTEGRATION";
    MemberJoinSourceType[MemberJoinSourceType["DISCOVERY"] = 3] = "DISCOVERY";
    MemberJoinSourceType[MemberJoinSourceType["HUB"] = 4] = "HUB";
    MemberJoinSourceType[MemberJoinSourceType["INVITE"] = 5] = "INVITE";
    MemberJoinSourceType[MemberJoinSourceType["VANITY_URL"] = 6] = "VANITY_URL";
    MemberJoinSourceType[MemberJoinSourceType["MANUAL_MEMBER_VERIFICATION"] = 7] = "MANUAL_MEMBER_VERIFICATION";
})(MemberJoinSourceType || (exports.MemberJoinSourceType = MemberJoinSourceType = {}));
var ActivityLocationKind;
(function (ActivityLocationKind) {
    ActivityLocationKind["GUILD_CHANNEL"] = "gc";
    ActivityLocationKind["PRIVATE_CHANNEL"] = "pc";
})(ActivityLocationKind || (exports.ActivityLocationKind = ActivityLocationKind = {}));
var ApplicationEventWebhookStatus;
(function (ApplicationEventWebhookStatus) {
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["DISABLED"] = 1] = "DISABLED";
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["ENABLED"] = 2] = "ENABLED";
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["DISABLED_BY_DISCORD"] = 3] = "DISABLED_BY_DISCORD";
})(ApplicationEventWebhookStatus || (exports.ApplicationEventWebhookStatus = ApplicationEventWebhookStatus = {}));
exports.ApplicationEventWebhookEventTypes = [
    "APPLICATION_AUTHORIZED",
    "APPLICATION_DEAUTHORIZED",
    "ENTITLEMENT_CREATE",
    "QUEST_USER_ENROLLMENT"
];
var EmbedFlags;
(function (EmbedFlags) {
    EmbedFlags[EmbedFlags["CONTAINS_EXPLICIT_MEDIA"] = 16] = "CONTAINS_EXPLICIT_MEDIA";
    EmbedFlags[EmbedFlags["IS_CONTENT_INVENTORY_ENTRY"] = 32] = "IS_CONTENT_INVENTORY_ENTRY";
})(EmbedFlags || (exports.EmbedFlags = EmbedFlags = {}));
var EmbedMediaFlags;
(function (EmbedMediaFlags) {
    EmbedMediaFlags[EmbedMediaFlags["IS_ANIMATED"] = 32] = "IS_ANIMATED";
})(EmbedMediaFlags || (exports.EmbedMediaFlags = EmbedMediaFlags = {}));
var SeparatorSpacingSize;
(function (SeparatorSpacingSize) {
    SeparatorSpacingSize[SeparatorSpacingSize["SMALL"] = 1] = "SMALL";
    SeparatorSpacingSize[SeparatorSpacingSize["LARGE"] = 2] = "LARGE";
})(SeparatorSpacingSize || (exports.SeparatorSpacingSize = SeparatorSpacingSize = {}));
var DisplayNameFont;
(function (DisplayNameFont) {
    DisplayNameFont[DisplayNameFont["BANGERS"] = 1] = "BANGERS";
    DisplayNameFont[DisplayNameFont["BIO_RHYME"] = 2] = "BIO_RHYME";
    DisplayNameFont[DisplayNameFont["CHERRY_BOMB"] = 3] = "CHERRY_BOMB";
    DisplayNameFont[DisplayNameFont["CHICLE"] = 4] = "CHICLE";
    DisplayNameFont[DisplayNameFont["COMPAGNON"] = 5] = "COMPAGNON";
    DisplayNameFont[DisplayNameFont["MUSEO_MODERNO"] = 6] = "MUSEO_MODERNO";
    DisplayNameFont[DisplayNameFont["NEO_CASTEL"] = 7] = "NEO_CASTEL";
    DisplayNameFont[DisplayNameFont["PIXELFY"] = 8] = "PIXELFY";
    DisplayNameFont[DisplayNameFont["RIBES"] = 9] = "RIBES";
    DisplayNameFont[DisplayNameFont["SINISTRE"] = 10] = "SINISTRE";
    DisplayNameFont[DisplayNameFont["DEFAULT"] = 11] = "DEFAULT";
    DisplayNameFont[DisplayNameFont["ZILLA_SLAB"] = 12] = "ZILLA_SLAB";
})(DisplayNameFont || (exports.DisplayNameFont = DisplayNameFont = {}));
var DisplayNameEffect;
(function (DisplayNameEffect) {
    DisplayNameEffect[DisplayNameEffect["SOLID"] = 1] = "SOLID";
    DisplayNameEffect[DisplayNameEffect["GRADIENT"] = 2] = "GRADIENT";
    DisplayNameEffect[DisplayNameEffect["NEON"] = 3] = "NEON";
    DisplayNameEffect[DisplayNameEffect["TOON"] = 4] = "TOON";
    DisplayNameEffect[DisplayNameEffect["POP"] = 5] = "POP";
    DisplayNameEffect[DisplayNameEffect["GLOW"] = 6] = "GLOW";
})(DisplayNameEffect || (exports.DisplayNameEffect = DisplayNameEffect = {}));
var InviteTargetUsersJobStatus;
(function (InviteTargetUsersJobStatus) {
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["PROCESSING"] = 1] = "PROCESSING";
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["COMPLETED"] = 2] = "COMPLETED";
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
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["UNLOCKED"] = 1] = "UNLOCKED";
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["PORTRAIT"] = 2] = "PORTRAIT";
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["LANDSCAPE"] = 3] = "LANDSCAPE";
})(EmbeddedActivityOrientationLockStateType || (exports.EmbeddedActivityOrientationLockStateType = EmbeddedActivityOrientationLockStateType = {}));
var EmbeddedActivityLabelType;
(function (EmbeddedActivityLabelType) {
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["NONE"] = 0] = "NONE";
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["NEW"] = 1] = "NEW";
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
    ApprovableConsoleType[ApprovableConsoleType["XBOX"] = 1] = "XBOX";
    ApprovableConsoleType[ApprovableConsoleType["PLAYSTATION_5"] = 2] = "PLAYSTATION_5";
    ApprovableConsoleType[ApprovableConsoleType["PLAYSTATION_4"] = 3] = "PLAYSTATION_4";
})(ApprovableConsoleType || (exports.ApprovableConsoleType = ApprovableConsoleType = {}));
var OverlayMethodFlags;
(function (OverlayMethodFlags) {
    OverlayMethodFlags[OverlayMethodFlags["OUT_OF_PROCESS"] = 1] = "OUT_OF_PROCESS";
})(OverlayMethodFlags || (exports.OverlayMethodFlags = OverlayMethodFlags = {}));
var TeamPayoutAccountStatus;
(function (TeamPayoutAccountStatus) {
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["UNSUBMITTED"] = 1] = "UNSUBMITTED";
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["PENDING"] = 2] = "PENDING";
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["ACTION_REQUIRED"] = 3] = "ACTION_REQUIRED";
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["ACTIVE"] = 4] = "ACTIVE";
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["BLOCKED"] = 5] = "BLOCKED";
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["SUSPENDED"] = 6] = "SUSPENDED";
})(TeamPayoutAccountStatus || (exports.TeamPayoutAccountStatus = TeamPayoutAccountStatus = {}));
var TeamPayoutGateway;
(function (TeamPayoutGateway) {
    TeamPayoutGateway[TeamPayoutGateway["STRIPE_TOPUP"] = 1] = "STRIPE_TOPUP";
    TeamPayoutGateway[TeamPayoutGateway["TIPALTI"] = 2] = "TIPALTI";
    TeamPayoutGateway[TeamPayoutGateway["STRIPE_PRIMARY"] = 3] = "STRIPE_PRIMARY";
})(TeamPayoutGateway || (exports.TeamPayoutGateway = TeamPayoutGateway = {}));
var ApplicationType;
(function (ApplicationType) {
    ApplicationType[ApplicationType["DEPRECATED_GAME"] = 1] = "DEPRECATED_GAME";
    ApplicationType[ApplicationType["MUSIC"] = 2] = "MUSIC";
    ApplicationType[ApplicationType["TICKETED_EVENTS"] = 3] = "TICKETED_EVENTS";
    ApplicationType[ApplicationType["CREATOR_MONETIZATION"] = 4] = "CREATOR_MONETIZATION";
    ApplicationType[ApplicationType["GAME"] = 5] = "GAME";
})(ApplicationType || (exports.ApplicationType = ApplicationType = {}));
var LobbyMemberFlags;
(function (LobbyMemberFlags) {
    LobbyMemberFlags[LobbyMemberFlags["CAN_LINK_LOBBY"] = 1] = "CAN_LINK_LOBBY";
})(LobbyMemberFlags || (exports.LobbyMemberFlags = LobbyMemberFlags = {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBZUEsMkVBQWtDO0FBRXJCLFFBQUEsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFBLFlBQVksR0FBTSxFQUFFLENBQUM7QUFDckIsUUFBQSxRQUFRLEdBQVUscUJBQXFCLENBQUM7QUFDeEMsUUFBQSxPQUFPLEdBQVcsR0FBRyxnQkFBUSxTQUFTLG9CQUFZLEVBQUUsQ0FBQztBQUNyRCxRQUFBLE9BQU8sR0FBVyxzQkFBRyxDQUFDLE9BQU8sQ0FBQztBQUM5QixRQUFBLFVBQVUsR0FBUSxXQUFXLGVBQU8seUNBQXlDLENBQUM7QUFDOUUsUUFBQSxpQkFBaUIsR0FBRztJQUM3QixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUc7SUFDM0QsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUNsRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7Q0FDbkIsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLE9BQU87SUFDUCxRQUFRO0NBQ0YsQ0FBQztBQUdFLFFBQUEsWUFBWSxHQUFHO0lBQ3hCLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLE1BQU07SUFDTixLQUFLO0NBQ0MsQ0FBQztBQUdYLElBQVksWUFJWDtBQUpELFdBQVksWUFB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ckosSUFBWSxjQTRTWDtBQTVTRCxXQUFZLGNBQWM7SUFDdEIscUVBQWlCLENBQUE7SUFDakIsNkVBQXdCLENBQUE7SUFDeEIscUZBQTRCLENBQUE7SUFDNUIsNkVBQXdCLENBQUE7SUFDeEIseUVBQXNCLENBQUE7SUFDdEIscUZBQTRCLENBQUE7SUFDNUIsMkVBQXVCLENBQUE7SUFDdkIsMkVBQXVCLENBQUE7SUFDdkIsNkVBQXdCLENBQUE7SUFDeEIsaUZBQTBCLENBQUE7SUFDMUIsK0VBQXlCLENBQUE7SUFDekIsK0VBQXlCLENBQUE7SUFDekIsdUVBQXFCLENBQUE7SUFDckIseUVBQXNCLENBQUE7SUFDdEIsdUVBQXFCLENBQUE7SUFDckIseUVBQXNCLENBQUE7SUFDdEIsNkVBQXdCLENBQUE7SUFDeEIsNkZBQWdDLENBQUE7SUFDaEMsNkVBQXdCLENBQUE7SUFDeEIseUVBQXNCLENBQUE7SUFDdEIscUVBQW9CLENBQUE7SUFDcEIscUVBQW9CLENBQUE7SUFDcEIseUZBQThCLENBQUE7SUFDOUIscUZBQTRCLENBQUE7SUFDNUIseUVBQXNCLENBQUE7SUFDdEIseUVBQXNCLENBQUE7SUFDdEIsMkVBQXVCLENBQUE7SUFDdkIsMkdBQXVDLENBQUE7SUFDdkMsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsMkVBQXVCLENBQUE7SUFDdkIsaUlBQWtELENBQUE7SUFDbEQsMkZBQStCLENBQUE7SUFDL0IsdUhBQTZDLENBQUE7SUFDN0MsNkVBQXdCLENBQUE7SUFDeEIscUZBQTRCLENBQUE7SUFDNUIscUdBQW9DLENBQUE7SUFDcEMsNkhBQWdELENBQUE7SUFDaEQsMkZBQStCLENBQUE7SUFDL0IsMkhBQStDLENBQUE7SUFDL0MsdUdBQXFDLENBQUE7SUFDckMseUdBQXNDLENBQUE7SUFDdEMsbUhBQTJDLENBQUE7SUFDM0MscUVBQW9CLENBQUE7SUFDcEIseUVBQXNCLENBQUE7SUFDdEIsMkVBQXVCLENBQUE7SUFDdkIseUdBQXNDLENBQUE7SUFDdEMsdUVBQXFCLENBQUE7SUFDckIsNkdBQXdDLENBQUE7SUFDeEMsdUZBQTZCLENBQUE7SUFDN0IsK0VBQXlCLENBQUE7SUFDekIsMkdBQXVDLENBQUE7SUFDdkMsMkdBQXVDLENBQUE7SUFDdkMsK0VBQXlCLENBQUE7SUFDekIseUZBQThCLENBQUE7SUFDOUIsbUZBQTJCLENBQUE7SUFDM0IscUhBQTRDLENBQUE7SUFDNUMsaUZBQTBCLENBQUE7SUFDMUIscUVBQW9CLENBQUE7SUFDcEIsK0ZBQWlDLENBQUE7SUFDakMsMkZBQStCLENBQUE7SUFDL0IsaUZBQTBCLENBQUE7SUFDMUIsK0hBQWlELENBQUE7SUFDakQsNkhBQWdELENBQUE7SUFDaEQsNkdBQXdDLENBQUE7SUFDeEMsNkVBQXdCLENBQUE7SUFDeEIsK0VBQXlCLENBQUE7SUFDekIsK0ZBQWlDLENBQUE7SUFDakMscUZBQTRCLENBQUE7SUFDNUIsdUZBQTZCLENBQUE7SUFDN0IsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsMkVBQXVCLENBQUE7SUFDdkIsbUZBQTJCLENBQUE7SUFDM0IsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsdUZBQTZCLENBQUE7SUFDN0IsK0VBQXlCLENBQUE7SUFDekIsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsK0ZBQWlDLENBQUE7SUFDakMsbUdBQW1DLENBQUE7SUFDbkMsbUdBQW1DLENBQUE7SUFDbkMseUdBQXNDLENBQUE7SUFDdEMsNkZBQWdDLENBQUE7SUFDaEMsdUhBQTZDLENBQUE7SUFDN0MscUhBQTRDLENBQUE7SUFDNUMsdUZBQTZCLENBQUE7SUFDN0IscUlBQW9ELENBQUE7SUFDcEQsaUZBQTBCLENBQUE7SUFDMUIsNkZBQWdDLENBQUE7SUFDaEMsMkhBQStDLENBQUE7SUFDL0MsbUdBQW1DLENBQUE7SUFDbkMseUpBQThELENBQUE7SUFDOUQsNkZBQWdDLENBQUE7SUFDaEMscUZBQTRCLENBQUE7SUFDNUIsK0VBQXlCLENBQUE7SUFDekIsNkZBQWdDLENBQUE7SUFDaEMsNkZBQWdDLENBQUE7SUFDaEMsMkZBQStCLENBQUE7SUFDL0IscUhBQTRDLENBQUE7SUFDNUMseUZBQThCLENBQUE7SUFDOUIsdUVBQXFCLENBQUE7SUFDckIscUdBQW9DLENBQUE7SUFDcEMsbUZBQTJCLENBQUE7SUFDM0IsbUdBQW1DLENBQUE7SUFDbkMseUhBQThDLENBQUE7SUFDOUMsK0VBQXlCLENBQUE7SUFDekIsK0ZBQWlDLENBQUE7SUFDakMsdUVBQXFCLENBQUE7SUFDckIsdUdBQXFDLENBQUE7SUFDckMscUVBQW9CLENBQUE7SUFDcEIsbUZBQTJCLENBQUE7SUFDM0IsMkhBQStDLENBQUE7SUFDL0MsbUhBQTJDLENBQUE7SUFDM0MscUZBQTRCLENBQUE7SUFDNUIsbUhBQTJDLENBQUE7SUFDM0MsbUdBQW1DLENBQUE7SUFDbkMseUhBQThDLENBQUE7SUFDOUMsK0dBQXlDLENBQUE7SUFDekMsK0ZBQWlDLENBQUE7SUFDakMseUdBQXNDLENBQUE7SUFDdEMsbUdBQW1DLENBQUE7SUFDbkMsdUVBQXFCLENBQUE7SUFDckIsK0VBQXlCLENBQUE7SUFDekIsK0VBQXlCLENBQUE7SUFDekIscUdBQW9DLENBQUE7SUFDcEMscUdBQW9DLENBQUE7SUFDcEMsMkVBQXVCLENBQUE7SUFDdkIsMkVBQXVCLENBQUE7SUFDdkIsdUZBQTZCLENBQUE7SUFDN0IsaUZBQTBCLENBQUE7SUFDMUIsMkZBQStCLENBQUE7SUFDL0IsMkZBQStCLENBQUE7SUFDL0IseUZBQThCLENBQUE7SUFDOUIsaUdBQWtDLENBQUE7SUFDbEMseUdBQXNDLENBQUE7SUFDdEMsbUhBQTJDLENBQUE7SUFDM0MseUZBQThCLENBQUE7SUFDOUIsNkZBQWdDLENBQUE7SUFDaEMscUZBQTRCLENBQUE7SUFDNUIscUZBQTRCLENBQUE7SUFDNUIseUVBQXNCLENBQUE7SUFDdEIsdUVBQXFCLENBQUE7SUFDckIsaUdBQWtDLENBQUE7SUFDbEMsaUZBQTBCLENBQUE7SUFDMUIsK0VBQXlCLENBQUE7SUFDekIscUdBQW9DLENBQUE7SUFDcEMscUZBQTRCLENBQUE7SUFDNUIsK0dBQXlDLENBQUE7SUFDekMsdUZBQTZCLENBQUE7SUFDN0IsaUZBQTBCLENBQUE7SUFDMUIsdUZBQTZCLENBQUE7SUFDN0IscUdBQW9DLENBQUE7SUFDcEMsdUdBQXFDLENBQUE7SUFDckMseUZBQThCLENBQUE7SUFDOUIsdUVBQXFCLENBQUE7SUFDckIsbUZBQTJCLENBQUE7SUFDM0IscUdBQW9DLENBQUE7SUFDcEMsaUZBQTBCLENBQUE7SUFDMUIscUlBQW9ELENBQUE7SUFDcEQsOEZBQWlDLENBQUE7SUFDakMscUZBQTRCLENBQUE7SUFDNUIsNkZBQWdDLENBQUE7SUFDaEMsbUZBQTJCLENBQUE7SUFDM0IsaUhBQTBDLENBQUE7SUFDMUMseUdBQXNDLENBQUE7SUFDdEMsdUdBQXFDLENBQUE7SUFDckMseUVBQXNCLENBQUE7SUFDdEIsMkZBQStCLENBQUE7SUFDL0IsdUZBQTZCLENBQUE7SUFDN0IsNkZBQWdDLENBQUE7SUFDaEMsdUdBQXFDLENBQUE7SUFDckMsK0hBQWlELENBQUE7SUFDakQsdUdBQXFDLENBQUE7SUFDckMsdUZBQTZCLENBQUE7SUFDN0IsNkVBQXdCLENBQUE7SUFDeEIsdUhBQTZDLENBQUE7SUFDN0MsK0hBQWlELENBQUE7SUFDakQsNkdBQXdDLENBQUE7SUFDeEMsdUZBQTZCLENBQUE7SUFDN0IsbUdBQW1DLENBQUE7SUFDbkMsMkhBQStDLENBQUE7SUFDL0MseUZBQThCLENBQUE7SUFDOUIsNkVBQXdCLENBQUE7SUFDeEIsbUdBQW1DLENBQUE7SUFDbkMsaUhBQTBDLENBQUE7SUFDMUMsdUhBQTZDLENBQUE7SUFDN0MseUlBQXNELENBQUE7SUFDdEQsdUVBQXFCLENBQUE7SUFDckIseUZBQThCLENBQUE7SUFDOUIsbUdBQW1DLENBQUE7SUFDbkMsMkdBQXVDLENBQUE7SUFDdkMsMkdBQXVDLENBQUE7SUFDdkMsMkhBQStDLENBQUE7SUFDL0MsbUhBQTJDLENBQUE7SUFDM0MsbUpBQTJELENBQUE7SUFDM0QsNklBQXdELENBQUE7SUFDeEQsNkZBQWdDLENBQUE7SUFDaEMsNkZBQWdDLENBQUE7SUFDaEMscUhBQTRDLENBQUE7SUFDNUMsK0lBQXlELENBQUE7SUFDekQsbUpBQTJELENBQUE7SUFDM0QsdUlBQXFELENBQUE7SUFDckQsNkdBQXdDLENBQUE7SUFDeEMsdUlBQXFELENBQUE7SUFDckQsdUlBQXFELENBQUE7SUFDckQsaUhBQTBDLENBQUE7SUFDMUMseUhBQThDLENBQUE7SUFDOUMscUdBQW9DLENBQUE7SUFDcEMsbUhBQTJDLENBQUE7SUFDM0MsbUhBQTJDLENBQUE7SUFDM0MseUdBQXNDLENBQUE7SUFDdEMscUVBQW9CLENBQUE7SUFDcEIsdUVBQXFCLENBQUE7SUFDckIsdUVBQXFCLENBQUE7SUFDckIsMkVBQXVCLENBQUE7SUFDdkIsbUZBQTJCLENBQUE7SUFDM0IsbUZBQTJCLENBQUE7SUFDM0IsK0VBQXlCLENBQUE7SUFDekIscUZBQTRCLENBQUE7SUFDNUIscUdBQW9DLENBQUE7SUFDcEMscUdBQW9DLENBQUE7SUFDcEMsMkdBQXVDLENBQUE7SUFDdkMseUdBQXNDLENBQUE7SUFDdEMseUdBQXNDLENBQUE7SUFDdEMsaUdBQWtDLENBQUE7SUFDbEMsK0dBQXlDLENBQUE7SUFDekMsdUdBQXFDLENBQUE7SUFDckMsK0VBQXlCLENBQUE7SUFDekIsNkdBQXdDLENBQUE7SUFDeEMsd0lBQXNELENBQUE7SUFDdEQsa0pBQTJELENBQUE7SUFDM0Qsd0hBQThDLENBQUE7SUFDOUMsc0dBQXFDLENBQUE7SUFDckMsMEhBQStDLENBQUE7SUFDL0MsOEZBQWlDLENBQUE7SUFDakMsa0dBQW1DLENBQUE7SUFDbkMsNEZBQWdDLENBQUE7SUFDaEMsZ0dBQWtDLENBQUE7SUFDbEMsd0ZBQThCLENBQUE7SUFDOUIsd0hBQThDLENBQUE7SUFDOUMsb0ZBQTRCLENBQUE7SUFDNUIsa0lBQW1ELENBQUE7SUFDbkQsb0hBQTRDLENBQUE7SUFDNUMsZ0ZBQTBCLENBQUE7SUFDMUIsZ0ZBQTBCLENBQUE7SUFDMUIsMEdBQXVDLENBQUE7SUFDdkMsc0ZBQTZCLENBQUE7SUFDN0Isb0dBQW9DLENBQUE7SUFDcEMsb0hBQTRDLENBQUE7SUFDNUMsc0hBQTZDLENBQUE7SUFDN0Msd0lBQXNELENBQUE7SUFDdEQsMEhBQStDLENBQUE7SUFDL0Msc0hBQTZDLENBQUE7SUFDN0MsOEdBQXlDLENBQUE7SUFDekMsd0dBQXNDLENBQUE7SUFDdEMsOEdBQXlDLENBQUE7SUFDekMsOEZBQWlDLENBQUE7SUFDakMsMEZBQStCLENBQUE7SUFDL0IsMEhBQStDLENBQUE7SUFDL0MsOEdBQXlDLENBQUE7SUFDekMsb0ZBQTRCLENBQUE7SUFDNUIsd0pBQThELENBQUE7SUFDOUQsb0lBQW9ELENBQUE7SUFDcEQsb0tBQW9FLENBQUE7SUFDcEUsd0xBQThFLENBQUE7SUFDOUUsd01BQXNGLENBQUE7SUFDdEYsb0pBQTRELENBQUE7SUFDNUQsa0pBQTJELENBQUE7SUFDM0QsOEhBQWlELENBQUE7SUFDakQsd0dBQXNDLENBQUE7SUFDdEMsNEZBQWdDLENBQUE7SUFDaEMsZ0dBQWtDLENBQUE7SUFDbEMsc0dBQXFDLENBQUE7SUFDckMsb0hBQTRDLENBQUE7SUFDNUMsOEZBQWlDLENBQUE7SUFDakMsMElBQXVELENBQUE7SUFDdkQsc0lBQXFELENBQUE7SUFDckQsd0dBQXNDLENBQUE7SUFDdEMsMEhBQStDLENBQUE7SUFDL0MsZ0hBQTBDLENBQUE7SUFDMUMsd0dBQXNDLENBQUE7SUFDdEMsZ0dBQWtDLENBQUE7SUFDbEMsc0ZBQTZCLENBQUE7SUFDN0Isc0ZBQTZCLENBQUE7SUFDN0Isd0VBQXNCLENBQUE7SUFDdEIsNEhBQWdELENBQUE7SUFDaEQsZ0dBQWtDLENBQUE7SUFDbEMsb0lBQW9ELENBQUE7SUFDcEQsZ0hBQTBDLENBQUE7SUFDMUMsOEZBQWlDLENBQUE7SUFDakMsd0lBQXNELENBQUE7SUFDdEQsa0ZBQTJCLENBQUE7SUFDM0Isa0dBQW1DLENBQUE7SUFDbkMsc0dBQXFDLENBQUE7SUFDckMsMEdBQXVDLENBQUE7SUFDdkMsa0hBQTJDLENBQUE7SUFDM0MsMEZBQStCLENBQUE7QUFDbkMsQ0FBQyxFQTVTVyxjQUFjLDhCQUFkLGNBQWMsUUE0U3pCIn0=