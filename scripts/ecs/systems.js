class SpriteRendererSystem extends System {
    // This method will get called on every frame by default
    execute(_delta, _time) {
        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach(entity => {
            const sprite = entity.getComponent(Sprite);
            const position = entity.getComponent(Position);

            this.render(sprite, position);
        });
    }

    render(sprite, position) {
        image(
            sprite.image,
            position.x,
            position.y,
            sprite.width,
            sprite.height
        )

        // if (sprite.destinationVector2D && sprite.destinationRectangle) {
        //     image(
        //         sprite.image,
        //         sprite.destinationRectangle.vector2D.x,
        //         sprite.destinationRectangle.vector2D.y,
        //         sprite.destinationRectangle.width,
        //         sprite.destinationRectangle.height,
        //         sprite.sourceRectangle.vector2D.x,
        //         sprite.sourceRectangle.vector2D.y,
        //         sprite.sourceRectangle.width,
        //         sprite.sourceRectangle.height
        //     )
        // }
    }

}

// Define a query of entities that have "Renderable" and "Sprite" components
SpriteRendererSystem.queries = {
    renderables: { components: [Renderable, Sprite] }
}

class HorizontalMovementSystem extends System {
    execute(delta, time) {
        // Iterate through all the entities on the query
        this.queries.entities.results.forEach(entity => {
            const position = entity.getMutableComponent(Position);
            const velocity = entity.getComponent(Velocity);

            position.x -= velocity.x;

            if (position.x < -width) {
                position.x = width;
            }
        });
    }
}

HorizontalMovementSystem.queries = {
    entities: { components: [Position, Velocity] },
}
