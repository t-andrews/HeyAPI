import { FieldNode } from "graphql";

export class GraphQLNodeUtil {

    public static doesSelectionFieldExist(nodes: ReadonlyArray<FieldNode>, fieldName: string): boolean {
        if (!nodes || nodes.length < 1) {
            return false;
        }

        const parentNode: FieldNode = nodes[0];

        return !!parentNode.selectionSet!.selections.find(selection => (<FieldNode> selection).name.value === fieldName);
    }
}
