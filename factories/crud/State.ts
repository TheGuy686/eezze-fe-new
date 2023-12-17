export function InitStateCrudVars() {
    return {
        deleteEntity: {},
        isDoingDeleteRequest: false,
        isDoingRequest: false,
        editIndex: undefined,
        editingKey: '',
        entityId: '',
        isEdit: false,
        entity: {},
        entities: [],
    };
}