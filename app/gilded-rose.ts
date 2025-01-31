export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateSaleIn(item: Item): Item {
    item.sellIn = item.sellIn - 1;

    return item;
  }

  updateAgedBrie(item: Item): Item {
    item.quality = Math.min(50, item.quality + 1);
    this.updateSaleIn(item);
    
    return item;
  }

  updateBackstagePasses(item: Item): Item {
    const { sellIn }  = item;

    if (sellIn <= 0) {
      item.quality = 0;
    } else if (sellIn < 6) {
      item.quality = item.quality + 3;
    } else if (sellIn < 11) {
      item.quality = item.quality + 2;
    } else {
      item.quality = Math.min(50, item.quality + 1);
    }

    this.updateSaleIn(item);

    return item;
  }

  updateSulfuras(item: Item): Item {
    return item;
  }

  updateItem(item: Item): Item {   
    let quality: number = item.sellIn > 0 ? item.quality - 1 : item.quality - 2;
    item.quality = Math.max(0, quality);    
    this.updateSaleIn(item);
    
    return item;
  }

  updateQuality(): Item[] {
    for (let item of this.items) {
      const { name } = item;
      // TODO
      // Conjured Mana Cake "Conjured" items degrade in Quality twice as fast as normal items
      if (name === 'Aged Brie') {
        item = this.updateAgedBrie(item);
      } else if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        item = this.updateBackstagePasses(item);
      } else if (name === 'Sulfuras, Hand of Ragnaros') {
        item = this.updateSulfuras(item);
      } else {
        item = this.updateItem(item);
      }
    }

    return this.items;
  }
}
