import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('check the quality decreases for everything except the special items', () => {
    let items = [
      new Item('Aged Brie', 10, 40), 
      new Item('Cheese', 20, 50),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 40),
      new Item('Bread', 30, 30),
      new Item('Sulfuras, Hand of Ragnaros', 25, 80)

    ];
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(40)
    expect(items[1].quality).toBe(49);
    expect(items[2].quality).toBeGreaterThan(40);
    expect(items[3].quality).toBe(29);
    expect(items[4].quality).toBe(80);
  });

  it('check Backstage passes to a TAFKAL80ETC concert increases quality then drops to 0', () => {
    let items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 40),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40),
    ];
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(42);
    expect(items[1].quality).toBe(43);
    expect(items[2].quality).toBe(0);
  })

  it('check "Aged Brie" increases in Quality the older it gets', () => {
    let items = [new Item('Aged Brie', 10, 30)]
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(31);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(32);
  })

  it('checks item quality doesnt go above 50, or 80 if the item is Sulfuras', () => {
    let items = [
      new Item('Sulfuras, Hand of Ragnaros', 25, 80),
      new Item('Milk', 5, 50),
      new Item('Aged Brie', 4, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 3, 47),
      new Item('Cheese', 6, 50)
    ]
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[1].quality).toBe(49);
    expect(items[2].quality).toBe(50);
    expect(items[3].quality).toBe(50);
    expect(items[4].quality).toBe(49);
  })

  it('checks that quality degrades twice as fast once the sell by date has passed', () => {
    let items = [
      new Item('Sulfuras, Hand of Ragnaros', -5, 80),
      new Item('Milk', -5, 50),
      new Item('Aged Brie', -4, 48),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
      new Item('Cheese', -6, 50)
    ]
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[1].quality).toBe(48);
    expect(items[2].quality).toBe(49);
    expect(items[3].quality).toBe(0);
    expect(items[4].quality).toBe(48);
  })

  it('Checks the sellin for Sulfurus doesnt reduce', () => {
    let items = [new Item('Sulfuras, Hand of Ragnaros', 25, 80)]
    const gildedRose = new GildedRose(items);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(25);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(25);

  })

  it('checks quality never goes below 0', () => {
    let items = [
      new Item('Milk', 6, 0),
      new Item('Cheese', 3, 0),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0) 
    ]
    const guildedRose = new GildedRose(items);
    items = guildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(0);
  })
});
