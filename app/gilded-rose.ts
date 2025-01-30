export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
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

  updadeSaleIn(index) {
    if (this.items[index].name != 'Sulfuras, Hand of Ragnaros') {
      this.items[index].sellIn = this.items[index].sellIn - 1;
    }
  }

  getAgedBrieQuality(item: Item) {
    let quality = item.quality;
    if (quality < 50) {
      quality += 1;
    }
    
    return quality;
  }

  getBackstagePassesQuality(item: Item) {
    let quality = item.quality;
    let sellIn = item.sellIn;

    if (sellIn > 0) {
      if (sellIn > 10) {
        quality = quality + 1;
      }
      if (sellIn > 5 && sellIn <= 10) {
        quality = quality + 2;
      }

      if (sellIn <= 5) {
        quality = quality + 3;
      }
    } else {
      quality = 0;
    }
  
    return Math.min(50, quality) ;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const name = item.name;
      const sellIn = item.sellIn;

      if (name === 'Aged Brie') {
        item.quality = this.getAgedBrieQuality(item);
      } else if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        item.quality = this.getBackstagePassesQuality(item);
      } else if (name === 'Sulfuras, Hand of Ragnaros') {
        item.quality = item.quality;
      } else {
          if (sellIn > 0) {
            item.quality = item.quality - 1;
          } else {
            item.quality = item.quality - 2;
          }
      }
    }

    return this.items;
  }
}
