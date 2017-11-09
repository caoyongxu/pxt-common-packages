#include "pxt.h"

extern void device_heap_print();

namespace control {

/**
 * Announce that an event happened to registered handlers.
 * @param src ID of the MicroBit Component that generated the event
 * @param value Component specific code indicating the cause of the event.
 */
//% weight=21 blockGap=12 blockId="control_raise_event"
//% help=control/raise-event
//% block="raise event|from %src|with value %value" blockExternalInputs=1
void raiseEvent(int src, int value) {
    Event evt(src, value);
}

/**
* Determine the version of system software currently running.
*/
//% blockId="control_device_dal_version" block="device dal version"
//% help=control/device-dal-version
String deviceDalVersion() {
    return mkString(device.getVersion());
}

/**
* Allocates the next user notification event
*/
//% help=control/allocate-notify-event
int allocateNotifyEvent() {
    return ::allocateNotifyEvent();
}

/**
* print out info about state of CODAL heap
*/o
//% block
void deviceHeapPrint() {
    device_heap_print();
}

}
