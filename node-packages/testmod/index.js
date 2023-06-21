// Copyright Jeff

class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

export const item_library = [
  new Item("cpu", "Central Processing Unit"),
  new Item("ram", "Random Access Memory"),
  new Item("gpu", "Graphics Processing Unit")
];

export function get_random_item(){
  return item_library[Math.floor(Math.random()*item_library.length)];
}

