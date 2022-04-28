declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" {
  const content: any;
  export default content;
}

declare var self: any;

declare interface ILocation {
  url: string;
  clientIp: string;
  geo?: Geolocation;
}
