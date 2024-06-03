declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// declare module "*.module.scss";


declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";
declare module "*.webp";
declare module "*.svg";

declare module "*.md";