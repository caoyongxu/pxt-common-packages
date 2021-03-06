#include "pxt.h"

namespace pxt {

#if CONFIG_ENABLED(DEVICE_USB)
CodalUSB usb;
HF2 hf2;
#if CONFIG_ENABLED(DEVICE_MOUSE)
USBHIDMouse mouse;
#endif
#if CONFIG_ENABLED(DEVICE_KEYBOARD)
USBHIDKeyboard keyboard;
#endif
#if CONFIG_ENABLED(DEVICE_JOYSTICK)
USBHIDJoystick joystick;
#endif

// TODO extract these from uf2_info()?
static const char *string_descriptors[] = {
    "Example Corp.",
    "PXT Device",
    "42424242",
};

void usb_init() {
    usb.stringDescriptors = string_descriptors;
#if CONFIG_ENABLED(DEVICE_MOUSE)
    usb.add(mouse);
#endif
#if CONFIG_ENABLED(DEVICE_KEYBOARD)
    usb.add(keyboard);
#endif
#if CONFIG_ENABLED(DEVICE_JOYSTICK)
    usb.add(joystick);
#endif
    usb.add(hf2);
    usb.start();
}

void dumpDmesg() {
    hf2.sendSerial("\nDMESG:\n", 8);
    hf2.sendSerial(codalLogStore.buffer, codalLogStore.ptr);
    hf2.sendSerial("\n\n", 2);
}

void sendSerial(const char *data, int len) {
    hf2.sendSerial(data, len);
}

#else
void usb_init() {}
void dumpDmesg() {}
void sendSerial(const char *data, int len) {}
#endif
}
