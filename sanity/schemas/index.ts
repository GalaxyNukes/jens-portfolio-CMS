// sanity/schemas/index.ts
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { project } from "./project";
import { experience } from "./experience";
import { post } from "./post";

export const schemaTypes = [siteSettings, homePage, project, experience, post];
