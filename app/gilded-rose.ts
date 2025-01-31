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

enum PRODUCT {
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURUS = 'Sulfuras, Hand of Ragnaros',
  CONJURED_CAKE = 'Conjured Mana Cake'
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
    let quality: number;

    if (sellIn <= 0) {
      quality = 0;
    } else if (sellIn < 6) {
      quality = item.quality + 3;
    } else if (sellIn < 11) {
      quality = item.quality + 2;
    } else {
      quality = item.quality + 1;
    }
    item.quality = Math.min(quality, 50)
    this.updateSaleIn(item);

    return item;
  }

  updateSulfuras(item: Item): Item {
    return item;
  }

  updateConjuredManaCake(item: Item): Item {
    item.quality = Math.max(0, item.quality - 2);
    this.updateSaleIn(item);

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
      switch(name) {
        case PRODUCT.AGED_BRIE:
          item = this.updateAgedBrie(item);
          break;
        case PRODUCT.BACKSTAGE_PASSES:
          item = this.updateBackstagePasses(item);
          break;
        case PRODUCT.SULFURUS:
          item = this.updateSulfuras(item);
          break;
        case PRODUCT.CONJURED_CAKE:
          item = this.updateConjuredManaCake(item)
          break;
        default:
          item = this.updateItem(item);
      }  
    }

    return this.items;
  }
}
