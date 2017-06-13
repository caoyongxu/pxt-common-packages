# was Pressed

Check if a button was pressed earlier.

```sig
input.buttonA.wasPressed()
```
The fact that a button was pressed earlier is remembered. Once **was pressed** is used, this fact is forgotten and
the result is `false` the next time you check with **was pressed** (button _state_ is reset). But, if you press the button again before you
check with **was pressed**, it will tell you `true`. 
## Returns

* a [boolean](types/boolean): `true` if the button was pressed before, `false` if the button was not pressed before

## Example

Set all the pixels to green if button `A` was pressed before button `B`. If not, turn all pixels off when button `B`is pressed.

```blocks
input.buttonB.onEvent(ButtonEvent.Click, () => {
    if (input.buttonA.wasPressed()) {
        light.pixels.setAll(Colors.Green)
    } else {
        light.pixels.setAll(Colors.Black)
    }
})
```

## See Also
[``||is pressed||``](/reference/input/button-is-pressed), [``||on event||``](/reference/input/button-on-event)