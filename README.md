# v8hd

Control interface for Roland V-8HD video switchers.

## Installation

```bash
npm install v8hd
```

## Example

The following example demonstrates how to connect to a Roland V-8HD video switcher and execute a transition.

### JavaScript

```javascript
const { RolandV8HD, TransitionType, ButtonState } = require("v8hd");

// Create new controller instance
const v8hd = new RolandV8HD();
console.log("Connected to Roland V-8HD");

// Configure transition type and speed
v8hd.setTransitionType(TransitionType.MIX);
v8hd.setMixWipeTime(1.5); // 1.5 second transition time

// Execute a transition
v8hd.setAutoButton(ButtonState.ON);

// Clean up when done
v8hd.close();
console.log("Connection closed");
```

### TypeScript

```typescript
import { RolandV8HD, TransitionType, ButtonState } from "v8hd";

// Create new controller instance
const v8hd = new RolandV8HD();
console.log("Connected to Roland V-8HD");

// Configure transition type and speed
v8hd.setTransitionType(TransitionType.MIX);
v8hd.setMixWipeTime(1.5); // 1.5 second transition time

// Execute a transition
v8hd.setAutoButton(ButtonState.ON);

// Clean up when done
v8hd.close();
console.log("Connection closed");
```

## Features

- MIDI control interface for Roland V-8HD video switchers
- Easy-to-use API for common video switching operations

## Current Limitations

At the moment, this library only supports sending the "MIDI Messages Received at MIDI IN" part of the Roland V-8HD specification.

## Future Development

The library will be expanded in the future to support System Exclusive Messages, which will enable comprehensive control of the device, including:

- Pressing specific buttons (like menu navigation)
- Saving data to the device
- Setting device names and labels
- Full access to all device functions

## Documentation

For the official Roland V-8HD documentation and manuals, please visit:
[Roland Pro AV Support](https://proav.roland.com/global/support/by_product/v-8hd/owners_manuals/)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Credits

This package provides an interface for Roland V-8HD video switchers.
For official documentation and support, please refer to the [Roland Pro AV website](https://proav.roland.com/global/support/by_product/v-8hd/owners_manuals/).
