import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  // it('should foo', () => {
  //   const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe('fixme');
  // });

  it('the quality decreases for everything except the special items', () => {
    let items = [
      new Item('Aged Brie', 10, 40), 
      new Item('Cheese', 20, 50),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 40),
      new Item('Bread', 30, 30),
      new Item('Sulfuras, Hand of Ragnaros', 25, 44)

    ];
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(40)
    expect(items[1].quality).toBe(49);
    expect(items[2].quality).toBeGreaterThan(40);
    expect(items[3].quality).toBe(29);
    expect(items[4].quality).toBe(44);
  });
});
