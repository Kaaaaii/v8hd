/**
 * Enum representing available Split/VFX effect types on Roland V-8HD
 * Values based on p. 106 of the manual
 */
export enum SplitVfxType {
    /** Vertical split effect */
    SPLIT_V = 0x00,
    /** Horizontal split effect */
    SPLIT_H = 0x01,
    /** Partial mosaic effect */
    PART_MOSAIC = 0x02,
    /** Background mosaic effect */
    BACKGROUND_MOSAIC = 0x03,
    /** Full image mosaic effect */
    FULL_MOSAIC = 0x04,
    /** Wave effect */
    WAVE = 0x05,
    /** RGB replacement effect */
    RGB_REPLACE = 0x06,
    /** Color pass effect */
    COLOR_PASS = 0x07,
    /** Negative effect */
    NEGATIVE = 0x08,
    /** Colorize effect */
    COLORIZE = 0x09,
    /** Posterize effect */
    POSTERIZE = 0x0A,
    /** Silhouette effect */
    SILHOUETTE = 0x0B,
    /** Emboss effect */
    EMBOSS = 0x0C,
    /** Find edges effect */
    FIND_EDGES = 0x0D,
    /** Monocolor effect */
    MONOCOLOR = 0x0E,
    /** Hue offset effect */
    HUE_OFFSET = 0x0F,
    /** Saturation offset effect */
    SATURATION_OFFSET = 0x10,
    /** Value offset effect */
    VALUE_OFFSET = 0x11
}
