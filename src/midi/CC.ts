/**
 * MIDI Control Change numbers for Roland V-8HD functions
 * @internal
 */
export enum CC {
    /** Video fader position */
    PANPOT = 0x0A,
    /** Transition type */
    EXPRESSION = 0x0B,
    /** Mix/Wipe time */
    EFFECT_CONTROL_1 = 0x0C,
    /** PinP 1 time */
    EFFECT_CONTROL_2 = 0x0D,
    /** PinP 2 time */
    UNDEFINED_14 = 0x0E,
    /** DSK time */
    UNDEFINED_15 = 0x0F,
    /** PinP 1 source */
    GENERAL_PURPOSE_1 = 0x10,
    /** PinP 1 position H */
    GENERAL_PURPOSE_2 = 0x11,
    /** PinP 1 position V */
    GENERAL_PURPOSE_3 = 0x12,
    /** PinP 1 size */
    GENERAL_PURPOSE_4 = 0x13,
    /** PinP 1 view zoom */
    UNDEFINED_20 = 0x14,
    /** PinP 2 source */
    UNDEFINED_21 = 0x15,
    /** PinP 2 position H */
    UNDEFINED_22 = 0x16,
    /** PinP 2 position V */
    UNDEFINED_23 = 0x17,
    /** PinP 2 size */
    UNDEFINED_24 = 0x18,
    /** PinP 2 view zoom */
    UNDEFINED_25 = 0x19,
    /** DSK source */
    UNDEFINED_26 = 0x1A,
    /** DSK level */
    UNDEFINED_27 = 0x1B,
    /** DSK Gain */
    DSK_GAIN = 0x1C,
    /** DSK Mix Level */
    DSK_MIX_LEVEL = 0x1D,
    /** Split/VFX A Switch */
    SPLIT_VFX_A_SW = 0x1E,
    /** Split/VFX A Type */
    SPLIT_VFX_A_TYPE = 0x1F,
    /** Split/VFX B Switch */
    SPLIT_VFX_B_SW = 0x20,
    /** Split/VFX B Type */
    SPLIT_VFX_B_TYPE = 0x21,
    /** Output Fade knob (counter-clockwise) */
    OUTPUT_FADE_CCW = 0x22,
    /** Output Fade knob (clockwise) */
    OUTPUT_FADE_CW = 0x23,
    /** Audio Input Level 1 */
    AUDIO_LEVEL_INPUT_1 = 0x24,
    /** Audio Input Level 2 */
    AUDIO_LEVEL_INPUT_2 = 0x25,
    /** Audio Input Level 3 */
    AUDIO_LEVEL_INPUT_3 = 0x26,
    /** Audio Input Level 4 */
    AUDIO_LEVEL_INPUT_4 = 0x27,
    /** Audio Input Level 5 */
    AUDIO_LEVEL_INPUT_5 = 0x28,
    /** Audio Input Level 6 */
    AUDIO_LEVEL_INPUT_6 = 0x29,
    /** Audio Input Level 7 */
    AUDIO_LEVEL_INPUT_7 = 0x2A,
    /** Audio Input Level 8 */
    AUDIO_LEVEL_INPUT_8 = 0x2B,
    /** Audio Input Level (AUDIO IN) */
    AUDIO_LEVEL_AUDIO_IN = 0x2C,
    /** Audio Output Level */
    AUDIO_OUTPUT_LEVEL = 0x2D,
    /** CUT button */
    CUT_BUTTON = 0x34,
    /** AUTO button */
    AUTO_BUTTON = 0x35,
    /** H CUT I video switch */
    H_CUT_I = 0x36,
    /** H AUTO TAKE I video switch */
    H_AUTO_TAKE_I = 0x37,
    /** Audio Input Mute (INPUT 1) */
    AUDIO_MUTE_INPUT_1 = 0x38,
    /** Audio Input Mute (INPUT 2) */
    AUDIO_MUTE_INPUT_2 = 0x39,
    /** Audio Input Mute (INPUT 3) */
    AUDIO_MUTE_INPUT_3 = 0x3A,
    /** Audio Input Mute (INPUT 4) */
    AUDIO_MUTE_INPUT_4 = 0x3B,
    /** Audio Input Mute (INPUT 5) */
    AUDIO_MUTE_INPUT_5 = 0x3C,
    /** Audio Input Mute (INPUT 6) */
    AUDIO_MUTE_INPUT_6 = 0x3D,
    /** Audio Input Mute (INPUT 7) */
    AUDIO_MUTE_INPUT_7 = 0x3E,
    /** Audio Input Mute (INPUT 8) */
    AUDIO_MUTE_INPUT_8 = 0x3F,
    /** Audio Input Mute (AUDIO IN) */
    AUDIO_MUTE_AUDIO_IN = 0x40,
    /** Audio Output Mute */
    AUDIO_MUTE_OUTPUT = 0x41,
}
