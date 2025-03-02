import { RolandV8HD, TransitionType, InputSource, ButtonState } from '../src';

/**
 * Example demonstrating basic usage of Roland V-8HD controller
 */

// Create new controller instance
const v8hd = new RolandV8HD();
console.log('Connected to Roland V-8HD');

// Configure transition type and speed
v8hd.setTransitionType(TransitionType.MIX);
v8hd.setMixWipeTime(1.5); // 1.5 second transition time

// Execute a transition
v8hd.setAutoButton(ButtonState.ON);

// Clean up when done
v8hd.close();
console.log('Connection closed');
