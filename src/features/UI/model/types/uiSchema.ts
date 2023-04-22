// <Адрес страницы, позиция скролла>
export type ScrollSchemaType = Record<string, number>;

export interface IUiSchema {
  scroll: ScrollSchemaType;
}
