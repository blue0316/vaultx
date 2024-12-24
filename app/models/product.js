import Model, { attr } from '@ember-data/model';
export default class ProductModel extends Model {
  @attr name;
  @attr rating;
  @attr category;
  @attr description;
  @attr price;
  @attr features;
  @attr colors;
}
