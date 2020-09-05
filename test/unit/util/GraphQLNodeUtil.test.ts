import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { FieldNode, SelectionSetNode } from "graphql";
import { GraphQLNodeUtil } from "../../../src/util/GraphQLNodeUtil";

chai.use(sinonChai);

describe("GraphQL Node Util",  () => {

    describe("Positive scenarios",  () => {

        it("Should return true for a node with requested field selected", async () => {
            const fieldName1: string = "field_name1";
            const fieldName2: string = "field_name2";
            const fieldName3: string = "field_name3";

            const nodes: ReadonlyArray<FieldNode> = [<FieldNode> {
                name: {
                    value: "parent_name"
                },
                selectionSet: <SelectionSetNode> {
                    selections: <any> [
                        {
                            name: {
                                value: fieldName1
                            }
                        },
                        {
                            name: {
                                value: fieldName2
                            }
                        },
                        {
                            name: {
                                value: fieldName3
                            }
                        }
                    ]
                }
            }];

            const result1: boolean = GraphQLNodeUtil.doesSelectionFieldExist(nodes, fieldName1);
            const result2: boolean = GraphQLNodeUtil.doesSelectionFieldExist(nodes, fieldName2);
            const result3: boolean = GraphQLNodeUtil.doesSelectionFieldExist(nodes, fieldName3);

            expect(result1).to.be.true;
            expect(result2).to.be.true;
            expect(result3).to.be.true;
        });
    });

    describe("Negative scenarios", async () => {

        it("Should return false for a node without the requested field selected", async () => {
            const fieldName: string = "field_name";

            const nodes: ReadonlyArray<FieldNode> = [<FieldNode> {
                name: {
                    value: "parent_name"
                },
                selectionSet: <SelectionSetNode> {
                    selections: <any> [{
                        name: {
                            value: "not_the_field_name"
                        }
                    }]
                }
            }];

            const result: boolean = GraphQLNodeUtil.doesSelectionFieldExist(nodes, fieldName);

            expect(result).to.be.false;
        });

        it("Should return false for undefined nodes", async () => {
            const result: boolean = GraphQLNodeUtil.doesSelectionFieldExist(undefined!, "field_name");

            expect(result).to.be.false;
        });
    });
});
