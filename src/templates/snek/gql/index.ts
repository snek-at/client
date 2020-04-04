import { SnekGqlQuery } from "./queries/index";
import { SnekGqlMutation } from './mutations/index';

export interface ISnekGqlTemplate {
    queries: SnekGqlQuery;
    mutations: SnekGqlMutation;
}

/**
 * @description A Template with initializes all SubTemplates
 */
export class SnekGql {
    public queries = new SnekGqlQuery();
    public mutations = new SnekGqlMutation();
}
