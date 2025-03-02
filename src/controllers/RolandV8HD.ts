import { Output } from 'midi';
import { ButtonState, InputSource, SplitVfxType, TransitionType } from '../enums';
import { CC } from '../midi/CC';

const DEBUG = false;
/**
 * Class for controlling Roland V-8HD video switcher via MIDI
 * Provides methods to control video transitions, effects, and audio levels
 */
export class RolandV8HD {
    private output: Output;
    private readonly MIDI_CHANNEL = 0; // Fixed at 00H

    /**
     * Creates a new instance of RolandV8HD controller
     * Automatically searches for and connects to the Roland V-8HD device
     * @throws {Error} If Roland V-8HD MIDI device is not found
     */
    constructor() {
        this.output = new Output();
        this.initializeMidi();
    }

    /**
     * Initializes MIDI connection with Roland V-8HD
     * @private
     * @throws {Error} If Roland V-8HD device cannot be found
     */
    private initializeMidi(): void {
        // List available MIDI output ports
        const portCount = this.output.getPortCount();
        const ports = [];

        for (let i = 0; i < portCount; i++) {
            ports.push(this.output.getPortName(i));
        }

        // Find and open the Roland V-8HD port
        for (let i = 0; i < portCount; i++) {
            const portName = this.output.getPortName(i);
            if (portName.includes("Roland") || portName.includes("V-8HD")) {
                this.output.openPort(i);
                if (DEBUG) console.log(`Connected to Roland V-8HD on port ${i}: ${portName}`);
                return;
            }
        }

        throw new Error("Roland V-8HD not found. Available MIDI outputs: " + ports.join(", "));
    }

    /**
     * Sends a MIDI Control Change message to the device
     * @private
     * @param {CC} cc - Control Change number
     * @param {number} value - Value to send (0-127)
     */
    private sendControlChange(cc: CC, value: number): void {
        // Format: [status, control, value]
        // status is 0xB0 (Control Change on Channel 0) + channel number
        this.output.sendMessage([0xB0 + this.MIDI_CHANNEL, cc, value]);
    }

    /**
     * Sets the video fader position
     * @param {number} position - Position value (0-127, bottom to top)
     * @throws {Error} If position is out of range
     */
    setVideoFader(position: number): void {
        if (position < 0 || position > 127) {
            throw new Error("Video fader position must be between 0 and 127");
        }
        this.sendControlChange(CC.PANPOT, position);
    }

    /**
     * Sets the transition type
     * @param {TransitionType} type - Type of transition (MIX or WIPE)
     */
    setTransitionType(type: TransitionType): void {
        this.sendControlChange(CC.EXPRESSION, type);
    }

    /**
     * Sets the Mix/Wipe transition time
     * @param {number} seconds - Transition time in seconds (0.0-4.0)
     * @throws {Error} If time is out of range
     */
    setMixWipeTime(seconds: number): void {
        if (seconds < 0 || seconds > 4.0) {
            throw new Error("Mix/Wipe time must be between 0.0 and 4.0 seconds");
        }
        // Convert seconds to MIDI value (0-40)
        const value = Math.round(seconds * 10);
        this.sendControlChange(CC.EFFECT_CONTROL_1, value);
    }

    /**
     * Sets the PinP 1 transition time
     * @param {number} seconds - Transition time in seconds (0.0-4.0)
     * @throws {Error} If time is out of range
     */
    setPinP1Time(seconds: number): void {
        if (seconds < 0 || seconds > 4.0) {
            throw new Error("PinP 1 time must be between 0.0 and 4.0 seconds");
        }
        const value = Math.round(seconds * 10);
        this.sendControlChange(CC.EFFECT_CONTROL_2, value);
    }

    /**
     * Sets the PinP 2 transition time
     * @param {number} seconds - Transition time in seconds (0.0-4.0)
     * @throws {Error} If time is out of range
     */
    setPinP2Time(seconds: number): void {
        if (seconds < 0 || seconds > 4.0) {
            throw new Error("PinP 2 time must be between 0.0 and 4.0 seconds");
        }
        const value = Math.round(seconds * 10);
        this.sendControlChange(CC.UNDEFINED_14, value);
    }

    /**
     * Sets the DSK transition time
     * @param {number} seconds - Transition time in seconds (0.0-4.0)
     * @throws {Error} If time is out of range
     */
    setDSKTime(seconds: number): void {
        if (seconds < 0 || seconds > 4.0) {
            throw new Error("DSK time must be between 0.0 and 4.0 seconds");
        }
        const value = Math.round(seconds * 10);
        this.sendControlChange(CC.UNDEFINED_15, value);
    }

    /**
     * Sets the PinP 1 input source
     * @param {InputSource} source - Source to use for PinP 1
     */
    setPinP1Source(source: InputSource): void {
        this.sendControlChange(CC.GENERAL_PURPOSE_1, source);
    }

    /**
     * Sets the PinP 1 horizontal position
     * @param {number} percent - Position as percentage (-50 to 50%)
     * @throws {Error} If position is out of range
     */
    setPinP1PositionH(percent: number): void {
        if (percent < -50 || percent > 50) {
            throw new Error("PinP 1 horizontal position must be between -50 and 50%");
        }
        // Convert percent to MIDI value (10-100)
        const value = Math.round(percent + 50) + 10;
        this.sendControlChange(CC.GENERAL_PURPOSE_2, value);
    }

    /**
     * Sets the PinP 1 vertical position
     * @param {number} percent - Position as percentage (-50 to 50%)
     * @throws {Error} If position is out of range
     */
    setPinP1PositionV(percent: number): void {
        if (percent < -50 || percent > 50) {
            throw new Error("PinP 1 vertical position must be between -50 and 50%");
        }
        // Convert percent to MIDI value (10-100)
        const value = Math.round(percent + 50) + 10;
        this.sendControlChange(CC.GENERAL_PURPOSE_3, value);
    }

    /**
     * Sets the PinP 1 size
     * @param {number} percent - Size as percentage (10-100%)
     * @throws {Error} If size is out of range
     */
    setPinP1Size(percent: number): void {
        if (percent < 10 || percent > 100) {
            throw new Error("PinP 1 size must be between 10 and 100%");
        }
        this.sendControlChange(CC.GENERAL_PURPOSE_4, percent);
    }

    /**
     * Sets the PinP 1 view zoom
     * @param {number} percent - Zoom as percentage (100-1000%)
     * @throws {Error} If zoom is out of range
     */
    setPinP1ViewZoom(percent: number): void {
        if (percent < 100 || percent > 1000) {
            throw new Error("PinP 1 view zoom must be between 100 and 1000%");
        }
        // Convert percent to MIDI value (10-100)
        const value = Math.round(((percent - 100) / 900) * 90) + 10;
        this.sendControlChange(CC.UNDEFINED_20, value);
    }

    /**
     * Sets the PinP 2 input source
     * @param {InputSource} source - Source to use for PinP 2
     */
    setPinP2Source(source: InputSource): void {
        this.sendControlChange(CC.UNDEFINED_21, source);
    }

    /**
     * Sets the PinP 2 horizontal position
     * @param {number} percent - Position as percentage (-50 to 50%)
     * @throws {Error} If position is out of range
     */
    setPinP2PositionH(percent: number): void {
        if (percent < -50 || percent > 50) {
            throw new Error("PinP 2 horizontal position must be between -50 and 50%");
        }
        const value = Math.round(percent + 50) + 10;
        this.sendControlChange(CC.UNDEFINED_22, value);
    }

    /**
     * Sets the PinP 2 vertical position
     * @param {number} percent - Position as percentage (-50 to 50%)
     * @throws {Error} If position is out of range
     */
    setPinP2PositionV(percent: number): void {
        if (percent < -50 || percent > 50) {
            throw new Error("PinP 2 vertical position must be between -50 and 50%");
        }
        const value = Math.round(percent + 50) + 10;
        this.sendControlChange(CC.UNDEFINED_23, value);
    }

    /**
     * Sets the PinP 2 size
     * @param {number} percent - Size as percentage (10-100%)
     * @throws {Error} If size is out of range
     */
    setPinP2Size(percent: number): void {
        if (percent < 10 || percent > 100) {
            throw new Error("PinP 2 size must be between 10 and 100%");
        }
        this.sendControlChange(CC.UNDEFINED_24, percent);
    }

    /**
     * Sets the PinP 2 view zoom
     * @param {number} percent - Zoom as percentage (100-1000%)
     * @throws {Error} If zoom is out of range
     */
    setPinP2ViewZoom(percent: number): void {
        if (percent < 100 || percent > 1000) {
            throw new Error("PinP 2 view zoom must be between 100 and 1000%");
        }
        const value = Math.round(((percent - 100) / 900) * 90) + 10;
        this.sendControlChange(CC.UNDEFINED_25, value);
    }

    /**
     * Sets the DSK source
     * @param {InputSource} source - Source to use for DSK
     */
    setDSKSource(source: InputSource): void {
        this.sendControlChange(CC.UNDEFINED_26, source);
    }

    /**
     * Sets the DSK level
     * @param {number} level - Level value (0-127)
     * @throws {Error} If level is out of range
     */
    setDSKLevel(level: number): void {
        if (level < 0 || level > 127) {
            throw new Error("DSK level must be between 0 and 127");
        }
        this.sendControlChange(CC.UNDEFINED_27, level);
    }

    /**
     * Sets the DSK gain
     * @param {number} gain - Gain value (0-127, converts to 0-255)
     * @throws {Error} If gain is out of range
     */
    setDSKGain(gain: number): void {
        if (gain < 0 || gain > 127) {
            throw new Error("DSK gain must be between 0 and 127");
        }
        this.sendControlChange(CC.DSK_GAIN, gain);
    }

    /**
     * Sets the DSK mix level
     * @param {number} level - Mix level value (0-127, converts to 0-255)
     * @throws {Error} If level is out of range
     */
    setDSKMixLevel(level: number): void {
        if (level < 0 || level > 127) {
            throw new Error("DSK mix level must be between 0 and 127");
        }
        this.sendControlChange(CC.DSK_MIX_LEVEL, level);
    }

    /**
     * Sets the SPLIT/VFX A switch state
     * @param {ButtonState} state - ON or OFF state, defaults to ON
     */
    setSplitVfxASwitch(state: ButtonState = ButtonState.ON): void {
        this.sendControlChange(CC.SPLIT_VFX_A_SW, state);
    }

    /**
     * Sets the SPLIT/VFX A effect type
     * @param {SplitVfxType} type - Effect type to use
     */
    setSplitVfxAType(type: SplitVfxType): void {
        this.sendControlChange(CC.SPLIT_VFX_A_TYPE, type);
    }

    /**
     * Sets the SPLIT/VFX B switch state
     * @param {ButtonState} state - ON or OFF state, defaults to ON
     */
    setSplitVfxBSwitch(state: ButtonState = ButtonState.ON): void {
        this.sendControlChange(CC.SPLIT_VFX_B_SW, state);
    }

    /**
     * Sets the SPLIT/VFX B effect type
     * @param {SplitVfxType} type - Effect type to use
     */
    setSplitVfxBType(type: SplitVfxType): void {
        this.sendControlChange(CC.SPLIT_VFX_B_TYPE, type);
    }

    /**
     * Sets the OUTPUT FADE knob counter-clockwise value
     * @param {number} value - Fade value (0-63)
     * @throws {Error} If value is out of range
     */
    setOutputFadeCCW(value: number): void {
        if (value < 0 || value > 63) {
            throw new Error("OUTPUT FADE counter-clockwise value must be between 0 and 63");
        }
        this.sendControlChange(CC.OUTPUT_FADE_CCW, value);
    }

    /**
     * Sets the OUTPUT FADE knob clockwise value
     * @param {number} value - Fade value (0-63)
     * @throws {Error} If value is out of range
     */
    setOutputFadeCW(value: number): void {
        if (value < 0 || value > 63) {
            throw new Error("OUTPUT FADE clockwise value must be between 0 and 63");
        }
        this.sendControlChange(CC.OUTPUT_FADE_CW, value);
    }

    /**
     * Sets the audio input level for a specific input channel
     * @param {number} input - Input channel (1-8)
     * @param {number} level - Level value (0-127)
     * @throws {Error} If input or level is out of range
     */
    setAudioInputLevel(input: number, level: number): void {
        if (level < 0 || level > 127) {
            throw new Error("Audio input level must be between 0 and 127");
        }

        if (input < 1 || input > 8) {
            throw new Error("Input number must be between 1 and 8");
        }

        const ccNumber = CC.AUDIO_LEVEL_INPUT_1 + (input - 1);
        this.sendControlChange(ccNumber, level);
    }

    /**
     * Sets the audio level for the AUDIO IN source
     * @param {number} level - Level value (0-127)
     * @throws {Error} If level is out of range
     */
    setAudioInLevel(level: number): void {
        if (level < 0 || level > 127) {
            throw new Error("Audio input level must be between 0 and 127");
        }
        this.sendControlChange(CC.AUDIO_LEVEL_AUDIO_IN, level);
    }

    /**
     * Sets the audio output level
     * @param {number} level - Level value (0-127)
     * @throws {Error} If level is out of range
     */
    setAudioOutputLevel(level: number): void {
        if (level < 0 || level > 127) {
            throw new Error("Audio output level must be between 0 and 127");
        }
        this.sendControlChange(CC.AUDIO_OUTPUT_LEVEL, level);
    }

    /**
     * Sets the CUT button state
     * @param {ButtonState} state - ON or OFF state, defaults to ON
     */
    setCutButton(state: ButtonState = ButtonState.ON): void {
        this.sendControlChange(CC.CUT_BUTTON, state);
    }

    /**
     * Sets the AUTO button state
     * @param {ButtonState} state - ON or OFF state, defaults to ON
     */
    setAutoButton(state: ButtonState = ButtonState.ON): void {
        this.sendControlChange(CC.AUTO_BUTTON, state);
    }

    /**
     * Triggers the H CUT I video switch
     * Performs an immediate cut transition
     */
    triggerHCutI(): void {
        this.sendControlChange(CC.H_CUT_I, 0x01);  // Any value works, using 1
    }

    /**
     * Triggers the H AUTO TAKE I video switch
     * Performs an auto transition based on current settings
     */
    triggerHAutoTakeI(): void {
        this.sendControlChange(CC.H_AUTO_TAKE_I, 0x01);  // Any value works, using 1
    }

    /**
     * Sets the audio input mute state for a specific input channel
     * @param {number} input - Input channel (1-8)
     * @param {ButtonState} state - Mute state (ON to mute, OFF to unmute)
     * @throws {Error} If input is out of range
     */
    setAudioInputMute(input: number, state: ButtonState): void {
        if (input < 1 || input > 8) {
            throw new Error("Input number must be between 1 and 8");
        }

        const ccNumber = CC.AUDIO_MUTE_INPUT_1 + (input - 1);
        // For audio mutes, the value corresponds to the input number when ON
        const value = state === ButtonState.ON ? input : 0x00;
        this.sendControlChange(ccNumber, value);
    }

    /**
     * Sets the AUDIO IN mute state
     * @param {ButtonState} state - Mute state (ON to mute, OFF to unmute)
     */
    setAudioInMute(state: ButtonState): void {
        // For AUDIO IN mute, the value is 0x09 when ON
        const value = state === ButtonState.ON ? 0x09 : 0x00;
        this.sendControlChange(CC.AUDIO_MUTE_AUDIO_IN, value);
    }

    /**
     * Sets the audio output mute state
     * @param {ButtonState} state - Mute state (ON to mute, OFF to unmute)
     */
    setAudioOutputMute(state: ButtonState): void {
        // For output mute, the value is 0x10 when ON
        const value = state === ButtonState.ON ? 0x10 : 0x00;
        this.sendControlChange(CC.AUDIO_MUTE_OUTPUT, value);
    }

    /**
     * Closes the MIDI connection and releases resources
     * Call this method when finished using the controller
     */
    close(): void {
        this.output.closePort();
    }
}
