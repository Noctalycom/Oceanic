"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Miscellaneous */
const Soundboard_1 = tslib_1.__importDefault(require("../structures/Soundboard"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Methods that don't fit anywhere else. Located at {@link Client#rest | Client#rest}{@link RESTManager#misc | .misc}. */
class Miscellaneous {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Get the default soundboard sounds.
     * @caching This method **does not** cache its result.
     */
    async getDefaultSoundboardSounds() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SOUNDBOARD_DEFAULT_SOUNDS,
        }).then(data => data.map(d => new Soundboard_1.default(d, this._manager.client)));
    }
    /**
     * Get a sticker.
     * @param stickerID The ID of the sticker to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached, or if the sticker is not a guild sticker.
     * @caches {@link Guild#stickers | Guild#stickers}
     */
    async getSticker(stickerID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.STICKER(stickerID),
        }).then(data => data.guild_id === undefined ? this._manager.client.util.convertSticker(data) : this._manager.client.guilds.get(data.guild_id)?.stickers.update(data) ?? this._manager.client.util.convertSticker(data));
    }
    /**
     * Get a default sticker pack.
     * @caching This method **does not** cache its result.
     */
    async getStickerPack(stickerPackID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.STICKER_PACK(stickerPackID),
        }).then(data => ({
            bannerAssetID: data.banner_asset_id,
            coverStickerID: data.cover_sticker_id,
            description: data.description,
            id: data.id,
            name: data.name,
            skuID: data.sku_id,
            stickers: data.stickers.map(sticker => this._manager.client.util.convertSticker(sticker)),
        }));
    }
    /**
     * Get the default sticker packs.
     * @caching This method **does not** cache its result.
     */
    async getStickerPacks() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.STICKER_PACKS,
        }).then(data => data.sticker_packs.map(pack => ({
            bannerAssetID: pack.banner_asset_id,
            coverStickerID: pack.cover_sticker_id,
            description: pack.description,
            id: pack.id,
            name: pack.name,
            skuID: pack.sku_id,
            stickers: pack.stickers.map(sticker => this._manager.client.util.convertSticker(sticker)),
        })));
    }
    /**
     * Get the list of usable voice regions.
     * @caching This method **does not** cache its result.
     */
    async getVoiceRegions() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.VOICE_REGIONS,
        });
    }
    /**
     * Refresh expired attachment URLs.
     * @param urls The CDN urls to refresh.
     */
    async refreshAttachmentURLs(urls) {
        return this._manager.authRequest({
            method: "POST",
            path: Routes.REFRESH_ATTACHMENT_URLS,
            json: {
                attachment_urls: urls,
            },
        }).then(data => ({
            refreshedURLs: data.refreshed_urls,
        }));
    }
}
exports.default = Miscellaneous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzY2VsbGFuZW91cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yb3V0ZXMvTWlzY2VsbGFuZW91cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUM7QUFDakMsa0ZBQWtEO0FBQ2xELCtEQUF5QztBQUt6QywwSEFBMEg7QUFDMUgsTUFBcUIsYUFBYTtJQUN0QixRQUFRLENBQWM7SUFDOUIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLDBCQUEwQjtRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFzQztZQUNsRSxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMseUJBQXlCO1NBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxvQkFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQWlCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTBCO1lBQ3RELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNU4sQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsYUFBcUI7UUFDdEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBOEI7WUFDMUQsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7U0FDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDbkMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDckMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVGLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQXdEO1lBQ3BGLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsYUFBYSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3JDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1RixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQWlDO1lBQzdELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1NBQzdCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBbUI7UUFDM0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBOEM7WUFDMUUsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLHVCQUF1QjtZQUNwQyxJQUFJLEVBQUU7Z0JBQ0YsZUFBZSxFQUFFLElBQUk7YUFDeEI7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Q0FDSjtBQTlGRCxnQ0E4RkMifQ==