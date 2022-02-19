interface GenericEntry {
  /** generated unique uuid */
  id: string;
  /** name of entry */
  name: string;
  /** full description string of item */
  desc?: string;
  /** entry category for filters */
  category?: string;
}

declare namespace Data {
  const enum Size {
    twoXtraSmall = "2xs",
    xtraSmall = "xs",
    small = "sm",
    medium = "md",
    large = "lg",
    xtraLarge = "xl",
    twoXtraLarge = "2xl",
  }

  const enum QuickSelectTypes {
    item = "ITEM",
    container = "CONTAINER",
    blueprint = "BLUEPRINT",
    list = "LIST",
  }

  /**
   * Overarching locations of user-owned items
   */
  interface Location extends GenericEntry {}

  /**
   * Rooms can also be abstracted areas of a location
   */
  interface Room extends GenericEntry {
    /** location uuid */
    location?: string;
  }

  /**
   * Containers are any object that could contain items
   * exs: a box, a cabinet, closets, drawers of a dresser, etc.
   */
  interface Container extends Room {
    /** size of entry */
    size: Size;
    /** room location uuid */
    room?: string;
    /** is this a quick selectable entry */
    quickSelect: boolean;
  }

  /**
   * Item can be any quantifiable object that could be tracked
   */
  interface Item extends GenericEntry {
    /** size of entry */
    size: Size;
    /** location uuids, could be in multiple places */
    locations: string[];
    /** room location uuids, could be in multiple places */
    rooms: string[];
    /** container uuids, could be in multiple places */
    containers: string[];
    /** can this item be depleted */
    consumable: boolean;
    /** more generic filter tags */
    tags: string[];
    /** current quantity of an item */
    quantity: number;
    /** is this a quick selectable entry */
    quickSelect: boolean;
    /** is this an owned item or a toBeAdded */
    owned: boolean;
  }

  /**
   * Quickselect is a favorites field that is consistently rendered to teh side of the application
   */
  interface QuickSelect {
    /** generated unique uuid */
    id: string;
    /** which of the targetable types is this entry */
    type: QuickSelectTypes;
    /** the priority listing for render order*/
    priority: number;
  }

  /**
   * Blueprints are creations including required items and steps
   */
  interface Blueprint extends GenericEntry {
    /** what items are needed for this recipe */
    items: Item[];
    /** untracked/specified tools needed for the recipe */
    tools: string;
    /** actual recipe instructions */
    recipe: string;
  }

  /**
   * Lists are abstractions of to-get/will-get items
   */
  interface List extends GenericEntry {
    /** a list of items that can be quick-added to owned items */
    items: {
      item: Item;
      quantity: number;
    }[];
  }

  export type EntryType = Item | Container | Room | Location | QuickSelect | List | Blueprint;
}
