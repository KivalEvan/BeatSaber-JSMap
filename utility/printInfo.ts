console.log(
    'Light Color Event Box Group',
    difficulty.lightColorEventBoxGroups.length,
    '\nLight Color Event Box',
    difficulty.lightColorEventBoxGroups.reduce((t, e) => t + e.events.length, 0),
    '\nLight Color',
    difficulty.lightColorEventBoxGroups.reduce(
        (t, e) => t + e.events.reduce((r, y) => r + y.events.length, 0),
        0
    )
);
console.log();
console.log(
    'Light Rotation Event Box Group',
    difficulty.lightRotationEventBoxGroups.length,
    '\nLight Rotation Event Box',
    difficulty.lightRotationEventBoxGroups.reduce((t, e) => t + e.events.length, 0),
    '\nLight Rotation',
    difficulty.lightRotationEventBoxGroups.reduce(
        (t, e) => t + e.events.reduce((r, y) => r + y.events.length, 0),
        0
    )
);
console.log(
    difficulty.lightColorEventBoxGroups.reduce(
        (t, e) => t + e.events.reduce((r, y) => r + y.events.length, 0),
        0
    ) +
        difficulty.lightRotationEventBoxGroups.reduce(
            (t, e) => t + e.events.reduce((r, y) => r + y.events.length, 0),
            0
        )
);
