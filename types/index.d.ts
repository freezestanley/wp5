declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
interface MyWindow extends Window {
  abc(): void;
}

declare var window: MyWindow;
