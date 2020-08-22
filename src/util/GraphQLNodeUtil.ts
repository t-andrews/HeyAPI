import { FieldNode } from "graphql";

export class GraphQLNodeUtil {

    public static doesSelectionFieldExist(nodes: ReadonlyArray<FieldNode>, parentName: string, fieldName: string): boolean {
        if (!nodes) {
            return false;
        }

        const node = <FieldNode> nodes.find(x => x.name.value === parentName);

        if(!node) {
            return false;
        }

        return !!node.selectionSet!.selections.find(x => (<FieldNode> x).name.value === fieldName);
    }
}
