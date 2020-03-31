// import { GraphqlTemplate } from "./graphql";
import { SnekTemplate } from './snek';

export interface IMainTemplate {
  snek: SnekTemplate;
}

export class MainTemplate implements IMainTemplate{
  public snek = new SnekTemplate();
}
