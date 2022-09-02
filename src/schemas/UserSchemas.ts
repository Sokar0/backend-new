export const userSchema = {
    type: 'object',
    properties: {
        id: { type: 'number', nullable: false },
        firstName: { type: 'string', nullable: false },
        lastName: { type: 'string', nullable: false },
    },
};

export const userInputSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', nullable: false },
        lastName: { type: 'string', nullable: false },
    },
};