namespace light {

    /**
     * An animation of a NeoPixel
     */
    //% fixedInstances
    export class NeoPixelAnimation {
        constructor() { }

        /**
         * Creates an animator instance
         * @param strip the strip to execute on
         */
        createRenderer(strip: NeoPixelStrip): () => boolean {
            return undefined;
        }
    }

    class RainbowCycleAnimation extends NeoPixelAnimation {
        public delay: number;
        constructor(delay: number) {
            super();
            this.delay = delay;
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const n = strip.length();
            let offset = 0;
            return () => {
                for (let i = 0; i < n; i++) {
                    strip.setPixelColor(i, hsv(((i * 256) / (n - 1) + offset) % 0xff, 0xff, 0xff));
                }
                offset += 128 / n;
                if (offset >= 0xff) {
                    offset = 0;
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    //% fixedInstance block="rainbow" whenUsed jres blockIdentity="light._animationPicker"
    export const rainbowAnimation: NeoPixelAnimation = new RainbowCycleAnimation(50);

    class RunningLightsAnimation extends NeoPixelAnimation {
        public red: number;
        public green: number;
        public blue: number;
        public delay: number;

        constructor(red: number, green: number, blue: number, delay: number) {
            super();
            this.red = red;
            this.green = green;
            this.blue = blue;

            this.delay = delay;
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const l = strip.length();
            let iteration = 0;
            let step = 0;
            return () => {
                if (iteration < l * 2) {
                    step++;
                    for (let i = 0; i < l; i++) {
                        const level = (Math.isin(i + step) * 127) + 128;
                        strip.setPixelColor(i, rgb(level * this.red / 255, level * this.green / 255, level * this.blue / 255));
                    }
                    iteration++;
                    return true;
                } else {
                    step = 0;
                    iteration = 0;
                    return false;
                }
            }
        }
    }

    //% fixedInstance block="running lights" jres blockIdentity="light._animationPicker"
    export const runningLightsAnimation: NeoPixelAnimation = new RunningLightsAnimation(0xff, 0, 0, 50);

    class CometAnimation extends NeoPixelAnimation {
        public red: number;
        public green: number;
        public blue: number;
        public delay: number;

        constructor(red: number, green: number, blue: number, delay: number) {
            super();
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.delay = delay;
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const l = strip.length();
            const spacing = (255 / l) >> 0;
            let start = -1;
            let step = 0;
            const offsets: number[] = [];
            for (let i = 0; i < l; i++) {
                offsets[i] = spacing * i;
            }
            return () => {
                for (let i = 0; i < l; i++) {
                    offsets[i] = (offsets[i] + (step * 2)) % 255
                    strip.setPixelColor(i, rgb(255 - offsets[i], this.green, this.blue));
                }
                step++;
                if (step * 2 > 0xff) {
                    step = 0;
                    return false;
                }
                return true;
            }
        }
    }

    //% fixedInstance block="comet" jres blockIdentity="light._animationPicker"
    export const cometAnimation: NeoPixelAnimation = new CometAnimation(0xff, 0, 0xff, 50);

    class SparkleAnimation extends NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        constructor(red: number, green: number, blue: number, delay: number) {
            super();
            this.rgb = rgb(red, green, blue);
            this.delay = delay;
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const l = strip.length();
            let count = 0;
            let pixel = -1;
            let pixelColor = 0;
            return () => {
                if (count == 0)
                    strip.clear();
                if (pixel < 0) {
                    pixel = Math.randomRange(0, l - 1);
                    pixelColor = strip.pixelColor(pixel);
                    strip.setPixelColor(pixel, this.rgb);

                } else {
                    strip.setPixelColor(pixel, pixelColor);
                    pixel = -1;
                }
                count++;
                if (count > 50) {
                    count = 0;
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    //% fixedInstance block="sparkle" jres blockIdentity="light._animationPicker"
    export const sparkleAnimation: NeoPixelAnimation = new SparkleAnimation(0xff, 0xff, 0xff, 50);

    class ColorWipeAnimation extends NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        constructor(rgb: number, delay: number) {
            super();
            this.rgb = rgb;
            this.delay = delay;
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const l = strip.length();
            let i = 0;
            let reveal = true;
            return () => {
                if (i < l) {
                    if (reveal) {
                        strip.setPixelColor(i, this.rgb);
                    } else {
                        strip.setPixelColor(i, 0);
                    }
                    i++;
                } else {
                    reveal = !reveal;
                    i = 0;
                    if (reveal)
                        return false;
                }
                return true;
            }
        }
    }

    //% fixedInstance block="color wipe" jres blockIdentity="light._animationPicker"
    export const colorWipeAnimation: NeoPixelAnimation = new ColorWipeAnimation(0x0000ff, 50);

    class TheatreChaseAnimation extends NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        constructor(red: number, green: number, blue: number, delay: number) {
            super();
            this.rgb = rgb(red, green, blue);
            this.delay = delay;
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const l = strip.length();
            let j = 0;
            let q = 0;
            let on = false;
            return () => {
                if (j < 10) { // 10 cycles of chasing
                    if (q < 3) {
                        if (on) {
                            for (let i = 0; i < l; i = i + 3) {
                                strip.setPixelColor(i + q, this.rgb); // every third pixel on
                            }
                        }
                        else {
                            for (let i = 0; i < l; i = i + 3) {
                                strip.setPixelColor(i + q, 0); // every third pixel off
                            }
                        }
                        on = !on;
                        q++;
                    } else {
                        q = 0;
                    }
                    j++;
                } else {
                    j = 0;
                    return false;
                }
                return true;
            }
        }
    }

    //% fixedInstance block="theater chase" jres blockIdentity="light._animationPicker"
    export const theaterChaseAnimation: NeoPixelAnimation = new TheatreChaseAnimation(0xff, 0, 0, 50);

    class GlowAnimation extends NeoPixelAnimation {
        constructor() {
            super();
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const brightness = strip.brightness();
            let db = -Math.max(8, brightness / 16);
            let b = brightness;
            return () => {
                b += db;
                if (b <= 0) { // bottom of glow
                    b = 0;
                    db = -db;
                } else if (b >= brightness) { // high glow
                    b = brightness;
                    db = -db;
                }                
                strip.setBrightness(b);
                return b == brightness;
            }
        }
    }

    //% fixedInstance block="glow" jres blockIdentity="light._animationPicker"
    export const glowAnimation: NeoPixelAnimation = new GlowAnimation();
}