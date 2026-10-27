"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Application */
const Routes = tslib_1.__importStar(require("../util/Routes"));
const ClientApplication_1 = tslib_1.__importDefault(require("./ClientApplication"));
const OAuthGuild_1 = tslib_1.__importDefault(require("./OAuthGuild"));
const SKU_1 = tslib_1.__importDefault(require("./SKU"));
const Team_1 = tslib_1.__importDefault(require("./Team"));
const User_1 = tslib_1.__importDefault(require("./User"));
/** Represents an application. */
class Application extends ClientApplication_1.default {
    aliases;
    /** The approved console types for social SDK builds */
    approvedConsoles;
    /** The approximate number of guilds the application is in. */
    approximateGuildCount;
    /** Approximate count of users that have OAuth2 authorizations for the application */
    approximateUserAuthorizationCount;
    /** The approximate number of users this application has been installed by. */
    approximateUserInstallCount;
    /** Approximate count of guilds the application's bot is in */
    botApproximateGuildCount;
    /** Whether the application's bot is disabled by Discord (default false) */
    botDisabled;
    /** @deprecated If the bot can be invited by anyone. */
    botPublic;
    /** Whether the application's bot is quarantined by Discord; quarantined bots cannot join more guilds or start new direct messages (default false) */
    botQuarantined;
    /** @deprecated If authorizing the bot requires a code grant. */
    botRequireCodeGrant;
    /** The URL which users will be directed to when connecting their account in the application to their Discord account */
    connectionEntrypointURL;
    /** This application's rich presence invite cover image hash, if any. */
    coverImage;
    /** The current guild creator monetization state of the application */
    creatorMonetizationState;
    /** This application's default custom authorization link, if any. */
    customInstallURL;
    /** The URL used for deep linking during OAuth2 authorization on mobile devices */
    deeplinkURI;
    /** The description of the application. */
    description;
    /** The companies that developed the application */
    developers;
    /** The state of this application's discoverability. */
    discoverabilityState;
    /** The { @link Constants~ApplicationDiscoveryEligibilityFlags | flags } for this application's discovery eligibility. */
    discoveryEligibilityFlags;
    /** The configuration for the application's embedded activity */
    embeddedActivityConfig;
    /** The ID of the EULA required to play the application's game */
    eulaID;
    /** If webhook events are enabled for the app. */
    eventWebhooksStatus;
    /** List of Webhook event types the app subscribes to. */
    eventWebhooksTypes;
    /** Event webhooks URL for the app to receive webhook events. */
    eventWebhooksURL;
    /** The unique executables of the application's game */
    executables;
    /** The explicit content filter for this application. */
    explicitContentFilter;
    // flags is in the parent class
    /** If this application is a game sold on Discord, the guild to which it has been linked. This will only be present if received via {@link REST/Applications.getCurrent | `/applications/@me`}. */
    guild;
    /** If this application is a game sold on Discord, the ID of the guild to which it has been linked. */
    guildID;
    /** Whether the Discord client is allowed to hook into the application's game directly */
    hook;
    /** The icon hash of the application. */
    icon;
    /** Settings for this application's in-app authorization link, if enabled. */
    installParams;
    /** Whether only the application owner can add the integration */
    integrationPublic;
    /** Whether the integration will only be added upon completion of a full OAuth2 token exchange */
    integrationRequireCodeGrant;
    /** The install types available for this application. */
    integrationTypes;
    /** The configs for the install types available for this application. */
    integrationTypesConfig;
    /** This applications interaction endpoint url, if any. */
    interactionsEndpointURL;
    /** The event types that will be received like http interactions, if interactionsVersion is 2. */
    interactionsEventTypes;
    /** The interactions version of this application. */
    interactionsVersion;
    /** What guilds the application can be authorized in */
    internalGuildRestriction;
    /** Whether the application is discoverable in the application directory */
    isDiscoverable;
    /** If this application is monetized. */
    isMonetized;
    /** Whether the application is verified */
    isVerified;
    /** The maximum possible participants in the application's embedded activity (-1 for no limit) */
    maxParticipants;
    /** The { @link Constants~ApplicationMonetizationEligibilityFlags | flags } for this application's monetization eligibility. */
    monetizationEligibilityFlags;
    /** This application's monetization state. */
    monetizationState;
    /** The name of the application. */
    name;
    /** Whether the application's game supports the Discord overlay (default false) */
    overlay;
    /** Whether to use the compatibility hook for the overlay (default false) */
    overlayCompatibilityHook;
    /** The { @link Constants~OverlayMethodFlags | methods of overlaying } that the application's game supports */
    overlayMethods;
    /** Whether the Discord overlay is known to be problematic with this application's game (default false) */
    overlayWarn;
    /** The owner of this application. */
    owner;
    /** The ID of the parent application */
    parentID;
    /** The pricing localization strategy used for the application's store presence */
    pricingLocalizationStrategy;
    /** If this application is a game sold on Discord, the id of the Game's SKU. */
    primarySKUID;
    /** A URL to this application's privacy policy. */
    privacyPolicyURL;
    /** The companies that published the application */
    publishers;
    /** The redirect URIs for this application. */
    redirectURIs;
    /** This application's role connections verification url, if any. */
    roleConnectionsVerificationURL;
    /** The state of this application's RPC application. */
    rpcApplicationState;
    /** A list of rpc origin urls, if rpc is enabled. */
    rpcOrigins;
    /** If this application is a game sold on Discord, the slug that links to its store page. */
    slug;
    /** The state of this application's store application state. */
    storeApplicationState;
    /** Whether the application has public subscriptions or products available for purchase */
    storefrontAvailable;
    /** The tags for this application. */
    tags;
    /** The team that owns this application. */
    team;
    /** A URL to this application's terms of service. */
    termsOfServiceURL;
    /** The third party SKUs of the application's game */
    thirdPartySKUs;
    /** The type of this application. */
    type;
    /** The state of this application's verification. */
    verificationState;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data, client);
        this.description = data.description;
        this.hook = data.hook;
        this.icon = data.icon;
        this.isDiscoverable = data.is_discoverable;
        this.isMonetized = data.is_monetized;
        this.isVerified = data.is_verified;
        this.name = data.name;
        this.storefrontAvailable = data.storefront_available;
        this.type = data.type;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.aliases !== undefined)
            this.aliases = data.aliases;
        if (data.approved_consoles !== undefined)
            this.approvedConsoles = data.approved_consoles;
        if (data.approximate_guild_count !== undefined)
            this.approximateGuildCount = data.approximate_guild_count;
        if (data.approximate_user_authorization_count !== undefined)
            this.approximateUserAuthorizationCount = data.approximate_user_authorization_count;
        if (data.approximate_user_install_count !== undefined)
            this.approximateUserInstallCount = data.approximate_user_install_count;
        if (data.bot_approximate_guild_count !== undefined)
            this.botApproximateGuildCount = data.bot_approximate_guild_count;
        if (data.bot_disabled !== undefined)
            this.botDisabled = data.bot_disabled;
        if (data.bot_quarantined !== undefined)
            this.botQuarantined = data.bot_quarantined;
        if (data.bot_public !== undefined)
            this.botPublic = data.bot_public;
        if (data.bot_require_code_grant !== undefined)
            this.botRequireCodeGrant = data.bot_require_code_grant;
        if (data.connection_entrypoint_url !== undefined)
            this.connectionEntrypointURL = data.connection_entrypoint_url;
        if (data.cover_image !== undefined)
            this.coverImage = data.cover_image;
        if (data.creator_monetization_state !== undefined)
            this.creatorMonetizationState = data.creator_monetization_state;
        if (data.custom_install_url !== undefined)
            this.customInstallURL = data.custom_install_url;
        if (data.deeplink_uri !== undefined)
            this.deeplinkURI = data.deeplink_uri;
        if (data.description !== undefined)
            this.description = data.description;
        if (data.developers !== undefined)
            this.developers = data.developers;
        if (data.discoverability_state !== undefined)
            this.discoverabilityState = data.discoverability_state;
        if (data.discovery_eligibility_flags !== undefined)
            this.discoveryEligibilityFlags = data.discovery_eligibility_flags;
        if (data.embedded_activity_config !== undefined) {
            this.embeddedActivityConfig = {
                activityPreviewVideoAssetID: data.embedded_activity_config.activity_preview_video_asset_id,
                applicationID: data.embedded_activity_config.application_id,
                blockedLocales: data.embedded_activity_config.blocked_locales,
                clientPlatformConfig: Object.entries(data.embedded_activity_config.client_platform_config).reduce((obj, [key, value]) => {
                    obj[key] = {
                        labelType: value.label_type,
                        labelUntil: value.label_until ? new Date(value.label_until) : null,
                        omitBadgeFromSurfaces: value.omit_badge_from_surfaces,
                        releasePhase: value.release_phase,
                    };
                    return obj;
                }, {}),
                defaultOrientationLockState: data.embedded_activity_config.default_orientation_lock_state,
                displaysAdvertisements: data.embedded_activity_config.displays_advertisements,
                freePeriodEndsAt: data.embedded_activity_config.free_period_ends_at ? new Date(data.embedded_activity_config.free_period_ends_at) : null,
                freePeriodStartsAt: data.embedded_activity_config.free_period_starts_at ? new Date(data.embedded_activity_config.free_period_starts_at) : null,
                hasCspException: data.embedded_activity_config.has_csp_exception,
                legacyResponsiveAspectRatio: data.embedded_activity_config.legacy_responsive_aspect_ratio,
                premiumTierRequirement: data.embedded_activity_config.premium_tier_requirement,
                requiresAgeGate: data.embedded_activity_config.requires_age_gate,
                shelfRank: data.embedded_activity_config.shelf_rank,
                supportedLocales: data.embedded_activity_config.supported_locales,
                supportedPlatforms: data.embedded_activity_config.supported_platforms,
                tabletDefaultOrientationLockState: data.embedded_activity_config.tablet_default_orientation_lock_state,
            };
        }
        if (data.eula_id !== undefined)
            this.eulaID = data.eula_id;
        if (data.event_webhooks_status !== undefined)
            this.eventWebhooksStatus = data.event_webhooks_status;
        if (data.event_webhooks_types !== undefined)
            this.eventWebhooksTypes = data.event_webhooks_types;
        if (data.event_webhooks_url !== undefined)
            this.eventWebhooksURL = data.event_webhooks_url;
        if (data.executables !== undefined) {
            this.executables = data.executables.map(executable => ({
                isLauncher: executable.is_launcher,
                name: executable.name,
                os: executable.os,
            }));
        }
        if (data.explicit_content_filter !== undefined)
            this.explicitContentFilter = data.explicit_content_filter;
        if (data.flags !== undefined)
            this.flags = data.flags;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.guild !== undefined)
            this.guild = data.guild ? new OAuthGuild_1.default(data.guild, this.client) : null;
        if (data.guild_id !== undefined)
            this.guildID = data.guild_id;
        if (data.hook !== undefined)
            this.hook = data.hook;
        if (data.icon !== undefined)
            this.icon = data.icon;
        if (data.install_params !== undefined)
            this.installParams = data.install_params;
        if (data.integration_public !== undefined)
            this.integrationPublic = data.integration_public;
        if (data.integration_require_code_grant !== undefined)
            this.integrationRequireCodeGrant = data.integration_require_code_grant;
        if (data.integration_types !== undefined)
            this.integrationTypes = data.integration_types;
        if (data.integration_types_config !== undefined)
            this.integrationTypesConfig = Object.entries(data.integration_types_config).reduce((obj, [key, value]) => {
                obj[key] = {
                    oauth2InstallParams: value.oauth2_install_params,
                };
                return obj;
            }, {});
        if (data.interactions_endpoint_url !== undefined)
            this.interactionsEndpointURL = data.interactions_endpoint_url;
        if (data.interactions_event_types !== undefined)
            this.interactionsEventTypes = data.interactions_event_types;
        if (data.interactions_version !== undefined)
            this.interactionsVersion = data.interactions_version;
        if (data.internal_guild_restriction !== undefined)
            this.internalGuildRestriction = data.internal_guild_restriction;
        if (data.is_discoverable !== undefined)
            this.isDiscoverable = data.is_discoverable;
        if (data.is_monetized !== undefined)
            this.isMonetized = data.is_monetized;
        if (data.is_verified !== undefined)
            this.isVerified = data.is_verified;
        if (data.max_participants !== undefined)
            this.maxParticipants = data.max_participants;
        if (data.monetization_eligibility_flags !== undefined)
            this.monetizationEligibilityFlags = data.monetization_eligibility_flags;
        if (data.monetization_state !== undefined)
            this.monetizationState = data.monetization_state;
        if (data.name !== undefined)
            this.name = data.name;
        if (data.overlay !== undefined)
            this.overlay = data.overlay;
        if (data.overlay_compatibility_hook !== undefined)
            this.overlayCompatibilityHook = data.overlay_compatibility_hook;
        if (data.overlay_methods !== undefined)
            this.overlayMethods = data.overlay_methods;
        if (data.overlay_warn !== undefined)
            this.overlayWarn = data.overlay_warn;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (data.owner !== undefined)
            this.owner = data.owner ? new User_1.default(data.owner, this.client) : null;
        if (data.parent_id !== undefined)
            this.parentID = data.parent_id;
        if (data.pricing_localization_strategy !== undefined)
            this.pricingLocalizationStrategy = data.pricing_localization_strategy;
        if (data.primary_sku_id !== undefined)
            this.primarySKUID = data.primary_sku_id;
        if (data.privacy_policy_url !== undefined)
            this.privacyPolicyURL = data.privacy_policy_url;
        if (data.publishers !== undefined)
            this.publishers = data.publishers;
        if (data.redirect_uris !== undefined)
            this.redirectURIs = data.redirect_uris;
        if (data.role_connections_verification_url !== undefined)
            this.roleConnectionsVerificationURL = data.role_connections_verification_url;
        if (data.rpc_application_state !== undefined)
            this.rpcApplicationState = data.rpc_application_state;
        if (data.rpc_origins !== undefined)
            this.rpcOrigins = data.rpc_origins;
        if (data.slug !== undefined)
            this.slug = data.slug;
        if (data.store_application_state !== undefined)
            this.storeApplicationState = data.store_application_state;
        if (data.storefront_available !== undefined)
            this.storefrontAvailable = data.storefront_available;
        if (data.tags !== undefined)
            this.tags = data.tags;
        if (data.team !== undefined)
            this.team = data.team ? new Team_1.default(data.team, this.client) : null;
        if (data.terms_of_service_url !== undefined)
            this.termsOfServiceURL = data.terms_of_service_url;
        if (data.third_party_skus !== undefined)
            this.thirdPartySKUs = data.third_party_skus.map(sku => new SKU_1.default(sku, this.client));
        if (data.type !== undefined)
            this.type = data.type;
        if (data.verification_state !== undefined)
            this.verificationState = data.verification_state;
        if (data.verify_key !== undefined)
            this.verifyKey = data.verify_key;
    }
    /**
     * The url of this application's cover image.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    coverImageURL(format, size) {
        return this.coverImage ? this.client.util.formatImage(Routes.APPLICATION_COVER(this.id, this.coverImage), format, size) : null;
    }
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.APPLICATION_ICON(this.id, this.icon), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            aliases: this.aliases,
            approvedConsoles: this.approvedConsoles,
            approximateGuildCount: this.approximateGuildCount,
            approximateUserAuthorizationCount: this.approximateUserAuthorizationCount,
            approximateUserInstallCount: this.approximateUserInstallCount,
            botApproximateGuildCount: this.botApproximateGuildCount,
            botDisabled: this.botDisabled,
            botPublic: this.botPublic,
            botQuarantined: this.botQuarantined,
            botRequireCodeGrant: this.botRequireCodeGrant,
            connectionEntrypointURL: this.connectionEntrypointURL,
            coverImage: this.coverImage,
            creatorMonetizationState: this.creatorMonetizationState,
            customInstallURL: this.customInstallURL,
            deeplinkURI: this.deeplinkURI,
            description: this.description,
            developers: this.developers,
            discoverabilityState: this.discoverabilityState,
            discoveryEligibilityFlags: this.discoveryEligibilityFlags,
            embeddedActivityConfig: this.embeddedActivityConfig,
            eulaID: this.eulaID,
            eventWebhooksStatus: this.eventWebhooksStatus,
            eventWebhooksTypes: this.eventWebhooksTypes,
            eventWebhooksURL: this.eventWebhooksURL,
            executables: this.executables,
            explicitContentFilter: this.explicitContentFilter,
            guild: this.guild?.toJSON() ?? null,
            guildID: this.guildID,
            hook: this.hook,
            icon: this.icon,
            installParams: this.installParams,
            integrationPublic: this.integrationPublic,
            integrationRequireCodeGrant: this.integrationRequireCodeGrant,
            integrationTypes: this.integrationTypes,
            integrationTypesConfig: this.integrationTypesConfig,
            interactionsEndpointURL: this.interactionsEndpointURL,
            interactionsEventTypes: this.interactionsEventTypes,
            interactionsVersion: this.interactionsVersion,
            internalGuildRestriction: this.internalGuildRestriction,
            isDiscoverable: this.isDiscoverable,
            isMonetized: this.isMonetized,
            isVerified: this.isVerified,
            maxParticipants: this.maxParticipants,
            monetizationEligibilityFlags: this.monetizationEligibilityFlags,
            monetizationState: this.monetizationState,
            name: this.name,
            overlay: this.overlay,
            overlayCompatibilityHook: this.overlayCompatibilityHook,
            overlayMethods: this.overlayMethods,
            overlayWarn: this.overlayWarn,
            owner: this.owner?.toJSON() ?? null,
            parentID: this.parentID,
            pricingLocalizationStrategy: this.pricingLocalizationStrategy,
            primarySKUID: this.primarySKUID,
            privacyPolicyURL: this.privacyPolicyURL,
            publishers: this.publishers,
            redirectURIs: this.redirectURIs,
            roleConnectionsVerificationURL: this.roleConnectionsVerificationURL,
            rpcApplicationState: this.rpcApplicationState,
            rpcOrigins: this.rpcOrigins,
            slug: this.slug,
            storeApplicationState: this.storeApplicationState,
            storefrontAvailable: this.storefrontAvailable,
            tags: this.tags,
            team: this.team?.toJSON() ?? null,
            termsOfServiceURL: this.termsOfServiceURL,
            thirdPartySKUs: this.thirdPartySKUs?.map(sku => sku.toJSON()),
            type: this.type,
            verificationState: this.verificationState,
            verifyKey: this.verifyKey,
        };
    }
}
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9BcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsK0RBQXlDO0FBRXpDLG9GQUFvRDtBQUNwRCxzRUFBc0M7QUFDdEMsd0RBQXdCO0FBQ3hCLDBEQUEwQjtBQUMxQiwwREFBMEI7QUF1QjFCLGlDQUFpQztBQUNqQyxNQUFxQixXQUFZLFNBQVEsMkJBQWlCO0lBQ3RELE9BQU8sQ0FBaUI7SUFDeEIsdURBQXVEO0lBQ3ZELGdCQUFnQixDQUFnQztJQUNoRCw4REFBOEQ7SUFDOUQscUJBQXFCLENBQVU7SUFDL0IscUZBQXFGO0lBQ3JGLGlDQUFpQyxDQUFVO0lBQzNDLDhFQUE4RTtJQUM5RSwyQkFBMkIsQ0FBVTtJQUNyQyw4REFBOEQ7SUFDOUQsd0JBQXdCLENBQVU7SUFDbEMsMkVBQTJFO0lBQzNFLFdBQVcsQ0FBVztJQUN0Qix1REFBdUQ7SUFDdkQsU0FBUyxDQUFXO0lBQ3BCLHFKQUFxSjtJQUNySixjQUFjLENBQVc7SUFDekIsZ0VBQWdFO0lBQ2hFLG1CQUFtQixDQUFXO0lBQzlCLHdIQUF3SDtJQUN4SCx1QkFBdUIsQ0FBVTtJQUNqQyx3RUFBd0U7SUFDeEUsVUFBVSxDQUFpQjtJQUMzQixzRUFBc0U7SUFDdEUsd0JBQXdCLENBQVU7SUFDbEMsb0VBQW9FO0lBQ3BFLGdCQUFnQixDQUFVO0lBQzFCLGtGQUFrRjtJQUNsRixXQUFXLENBQVU7SUFDckIsMENBQTBDO0lBQzFDLFdBQVcsQ0FBUztJQUNwQixtREFBbUQ7SUFDbkQsVUFBVSxDQUFnRDtJQUMxRCx1REFBdUQ7SUFDdkQsb0JBQW9CLENBQW1DO0lBQ3ZELHlIQUF5SDtJQUN6SCx5QkFBeUIsQ0FBVTtJQUNuQyxnRUFBZ0U7SUFDaEUsc0JBQXNCLENBQTZDO0lBQ25FLGlFQUFpRTtJQUNqRSxNQUFNLENBQVU7SUFDaEIsaURB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QUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDMUUsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDbkYsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDdEcsSUFBSSxJQUFJLENBQUMseUJBQXlCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDaEgsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7UUFDbkgsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDM0YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDMUUsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDckcsSUFBSSxJQUFJLENBQUMsMkJBQTJCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUM7UUFDdEgsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHO2dCQUMxQiwyQkFBMkIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsK0JBQStCO2dCQUMxRixhQUFhLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGNBQWM7Z0JBQzNELGNBQWMsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsZUFBZTtnQkFDN0Qsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtvQkFDcEgsR0FBRyxDQUFDLEdBQW1DLENBQUMsR0FBRzt3QkFDdkMsU0FBUyxFQUFFLEtBQUssQ0FBQyxVQUFVO3dCQUMzQixVQUFVLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNsRSxxQkFBcUIsRUFBRSxLQUFLLENBQUMsd0JBQXdCO3dCQUNyRCxZQUFZLEVBQUUsS0FBSyxDQUFDLGFBQWE7cUJBQ3BDLENBQUM7b0JBQ0YsT0FBTyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQyxFQUFFLEVBQTZGLENBQUM7Z0JBQ2pHLDJCQUEyQixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyw4QkFBOEI7Z0JBQ3pGLHNCQUFzQixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUI7Z0JBQzdFLGdCQUFnQixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ3hJLGtCQUFrQixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQzlJLGVBQWUsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCO2dCQUNoRSwyQkFBMkIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsOEJBQThCO2dCQUN6RixzQkFBc0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsd0JBQXdCO2dCQUM5RSxlQUFlLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQjtnQkFDaEUsU0FBUyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVO2dCQUNuRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCO2dCQUNqRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsbUJBQW1CO2dCQUNyRSxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMscUNBQXFDO2FBQ3pHLENBQUM7UUFDTixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDcEcsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDakcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDM0YsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxVQUFVLEVBQUUsVUFBVSxDQUFDLFdBQVc7Z0JBQ2xDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtnQkFDckIsRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLHVCQUF1QixLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQzFHLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RELHVFQUF1RTtRQUN2RSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkcsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDaEYsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDNUYsSUFBSSxJQUFJLENBQUMsOEJBQThCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUM7UUFDOUgsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDekYsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBNEMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDak0sR0FBRyxDQUFDLEdBQXVDLENBQUMsR0FBRztvQkFDM0MsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLHFCQUFxQjtpQkFDbkQsQ0FBQztnQkFDRixPQUFPLEdBQUcsQ0FBQztZQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNQLElBQUksSUFBSSxDQUFDLHlCQUF5QixLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDO1FBQ2hILElBQUksSUFBSSxDQUFDLHdCQUF3QixLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQzdHLElBQUksSUFBSSxDQUFDLG9CQUFvQixLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ2xHLElBQUksSUFBSSxDQUFDLDBCQUEwQixLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQ25ILElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ25GLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzFFLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZFLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN0RixJQUFJLElBQUksQ0FBQyw4QkFBOEIsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQztRQUMvSCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUM1RixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQywwQkFBMEIsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQztRQUNuSCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNuRixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxRSx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakcsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakUsSUFBSSxJQUFJLENBQUMsNkJBQTZCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7UUFDNUgsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDM0YsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0UsSUFBSSxJQUFJLENBQUMsaUNBQWlDLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUM7UUFDdkksSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDcEcsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDMUcsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDbEcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDN0YsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDaEcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksYUFBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzSCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUM1RixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGFBQWEsQ0FBQyxNQUFvQixFQUFFLElBQWE7UUFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25JLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ2pELGlDQUFpQyxFQUFFLElBQUksQ0FBQyxpQ0FBaUM7WUFDekUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQjtZQUM3RCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1lBQ3ZELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QjtZQUNyRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0Isd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtZQUN2RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtZQUN6RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCO1lBQ25ELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtZQUNqRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJO1lBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUN6QywyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCO1lBQzdELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQjtZQUNuRCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCO1lBQ3JELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0I7WUFDbkQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtZQUM3Qyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1lBQ3ZELGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsNEJBQTRCO1lBQy9ELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0I7WUFDdkQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJO1lBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QiwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCO1lBQzdELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsOEJBQThCLEVBQUUsSUFBSSxDQUFDLDhCQUE4QjtZQUNuRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ2pELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSTtZQUNqQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3RCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQ3pDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNVdELDhCQTRXQyJ9