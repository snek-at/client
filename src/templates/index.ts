// import { GraphqlTemplate } from "./graphql";
import { SnekTemplate } from './snek';

export interface IMainTemplate {
  snek: SnekTemplate;
}

/**
 * @description A Template with initializes all SubTemplates
 */
export class MainTemplate implements IMainTemplate{
  public snek = new SnekTemplate();
}
