export type CKANAction =
  'site_read' |
  'package_list' |
  'organization_list' |
  'member_list' |
  'group_list' |
  'tag_list' |
  'licence_list' |
  'user_list' |
  'package_show' |
  'organization_show' |
  'user_show'
  ;

export interface ICKANResponse {
  help: string;
  success: boolean;
  result: any;
}

export interface ICKANUser {
  email_hash: string;
  about: string;
  capacity: string;
  name: string;
  created: Date;
  openid?: any;
  sysadmin: boolean;
  activity_streams_email_notifications: boolean;
  state: string;
  number_of_edits: number;
  display_name: string;
  fullname: string;
  id: string;
  number_created_packages: number;
}

export interface ICKANOrganization {
  users: ICKANUser[];
  display_name: string;
  description: string;
  image_display_url: string;
  package_count: number;
  created: Date;
  name: string;
  is_organization: boolean;
  state: string;
  extras: any[];
  image_url: string;
  groups: any[];
  type: string;
  title: string;
  revision_id: string;
  num_followers: number;
  id: string;
  tags: any[];
  approval_status: string;
}

export interface ICKANTag {
  vocabulary_id?: any;
  state: string;
  display_name: string;
  id: string;
  name: string;
}

export interface ICKANResource {
  mimetype?: any;
  cache_url?: any;
  hash: string;
  description: string;
  name: string;
  format: string;
  url: string;
  datastore_active: boolean;
  cache_last_updated?: any;
  package_id: string;
  created: Date;
  state: string;
  mimetype_inner?: any;
  last_modified?: any;
  position: number;
  revision_id: string;
  url_type?: any;
  id: string;
  resource_type?: any;
  size?: any;
}

export interface ICKANDataset {
  license_title: string;
  maintainer: string;
  relationships_as_object: any[];
  private: boolean;
  maintainer_email: string;
  num_tags: number;
  id: string;
  metadata_created: Date;
  metadata_modified: Date;
  author: string;
  author_email: string;
  state: string;
  version: string;
  creator_user_id: string;
  type: string;
  resources: ICKANResource[];
  num_resources: number;
  tags: ICKANTag[];
  groups: any[];
  license_id: string;
  relationships_as_subject: any[];
  organization: ICKANOrganization;
  name: string;
  isopen: boolean;
  url: string;
  notes: string;
  owner_org: string;
  extras: any[];
  license_url: string;
  title: string;
  revision_id: string;
}
