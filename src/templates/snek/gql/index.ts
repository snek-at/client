import { SnekGqlQuery } from "./queries/index";
import { SnekGqlMutation } from './mutations/index';

export class SnekGql {
    public queries = new SnekGqlQuery();
    public mutations = new SnekGqlMutation();
}
