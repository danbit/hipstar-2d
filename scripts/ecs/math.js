// https://github.com/MozillaReality/ecsy/blob/dev/site/examples/canvas/math.js 
class Vector2D {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(source) {
        this.x = source.x;
        this.y = source.y;
        return this;
    }

    clone() {
        return new Vector2().set(this.x, this.y);
    }
}

Types.Vector2DType = createType({
    baseType: Vector2D,
    create: defaultValue => {
        if (typeof defaultValue !== "undefined") {
            return defaultValue;
        }
        return new Vector2D();
    },
    reset: (src, key, defaultValue) => {
        if (typeof defaultValue !== "undefined") {
            src[key] = defaultValue;
        } else {
            src[key] = new Vector2D();
        }
    },
    clear: (src, key) => {
        src[key].length = new Vector2D();
    },
});